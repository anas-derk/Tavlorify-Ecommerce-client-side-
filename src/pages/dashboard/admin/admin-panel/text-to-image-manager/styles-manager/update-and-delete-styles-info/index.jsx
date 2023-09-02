import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";

const UpdateCategoryStyleInfo = () => {

    const router = useRouter();

    const [categoryIndex, setCategoryIndex] = useState(-1);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    const [isUpdateStyleImageStatus, setIsUpdateStyleImageStatus] = useState(false);

    const [isDeleteStatus, setIsDeleteStatus] = useState(false);

    const [categoryData, setCategoryData] = useState(null);

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStylesData, setCategoryStylesData] = useState([]);

    const [updatedStyleImageIndex, setUpdatedStyleImageIndex] = useState(-1);

    const [updatedStyleIndex, setUpdatedStyleIndex] = useState(-1);

    const [deletedStyleIndex, setDeletedStyleIndex] = useState(-1);

    const [files, setFiles] = useState([]);

    const getAllCategoriesDataForTextToImage = () => {
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/categories/all-categories-data`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    console.log(result);
                } else {
                    setCategoriesData(result);
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            getAllCategoriesDataForTextToImage();
        }
    }, []);

    const changeStyleName = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoryStylesData[styleIndex].name = newValue;
        setCategoryData(categoriesDataTemp);
    }

    const changeStylePrompt = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoryStylesData[styleIndex].prompt = newValue;
        setCategoryData(categoriesDataTemp);
    }

    const changeStyleNegativePrompt = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoryStylesData[styleIndex].negative_prompt = newValue;
        setCategoryData(categoriesDataTemp);
    }

    const changeStyleImage = (styleIndex, newValue) => {
        let styleFiles = files;
        styleFiles[styleIndex] = newValue;
        setFiles(styleFiles);
    }

    const getCategoryStyles = () => {
        setFiles([]);
        setIsWaitStatus(true);
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/styles/category-styles-data?categoryName=${categoriesData[categoryIndex].name}`)
            .then((res) => {
                setCategoryStylesData(res.data);
                setIsWaitStatus(false);
            })
            .catch((err) => console.log(err));
    }

    const updateStyleImage = async (styleIndex) => {
        if (typeof files[styleIndex] === "object") {
            setUpdatedStyleImageIndex(styleIndex);
            setIsUpdateStyleImageStatus(true);
            try {
                let formData = new FormData();
                formData.append("styleImage", files[styleIndex]);
                await Axios.put(`${process.env.BASE_API_URL}/admin/update-style-image?service=text-to-image&styleId=${categoryStylesData[styleIndex]._id}`, formData);
                getCategoryStyles();
                setIsUpdateStyleImageStatus(false);
                setUpdatedStyleImageIndex(-1);
            } catch (err) {
                setIsUpdateStyleImageStatus(false);
                setUpdatedStyleImageIndex(-1);
                console.log(err);
            }
        }
    }

    const updateStyleData = (styleIndex) => {
        setUpdatedStyleIndex(styleIndex);
        setIsUpdateStatus(true);
        Axios.put(`${process.env.BASE_API_URL}/text-to-image/styles/update-style-data/${categoryStylesData[styleIndex]._id}`, {
            newName: categoryStylesData[styleIndex].name,
            newPrompt: categoryStylesData[styleIndex].prompt,
            newNegativePrompt: categoryStylesData[styleIndex].negative_prompt,
        })
            .then((res) => {
                if (typeof res.data !== "string") {
                    setUpdatedStyleIndex(-1);
                    setIsWaitStatus(false);
                    setIsUpdateStatus(false);
                }
            })
            .catch((err) => console.log(err));
    }

    const deleteStyle = (styleIndex) => {
        setDeletedStyleIndex(styleIndex);
        setIsDeleteStatus(true);
        Axios.delete(`${process.env.BASE_API_URL}/text-to-image/styles/delete-style-data/${categoryStylesData[styleIndex]._id}?imgSrc=${categoryStylesData[styleIndex].imgSrc}`)
            .then(() => {
                getCategoryStyles();
                setDeletedStyleIndex(-1);
                setIsDeleteStatus(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="update-category-styles-info">
            <Head>
                <title>Tavlorify Store - Update And Delete Category Styles Info For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete Category Styles Info For Text To Image Page</h1>
                    <h5 className="mb-3 text-center">Please Select The Category</h5>
                    <form className="select-category-form mb-2 text-center">
                        <select className="form-control w-50 mx-auto mb-3" onChange={(e) => {
                            setCategoryIndex(parseInt(e.target.value));
                        }}>
                            <option defaultValue="" hidden>Select The Category</option>
                            {categoriesData.map((category, index) => (
                                <option value={index} key={index}>{category.name}</option>
                            ))}
                        </select>
                        <button className="btn btn-success" type="button" onClick={getCategoryStyles}>Get Styles Data For This Category</button>
                    </form>
                    {isWaitStatus && <span className="loader"></span>}
                    {categoryStylesData.length > 0 && !isWaitStatus && <div className="categories-and-styles-box p-3">
                        <table className="categories-and-styles-table mb-4">
                            <thead>
                                <tr>
                                    <th>Style Name</th>
                                    <th>Prompt</th>
                                    <th>Negative Prompt</th>
                                    <th>Model Name</th>
                                    <th>Image</th>
                                    <th>Process</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryStylesData.map((style, styleIndex) => (
                                    <tr key={styleIndex}>
                                        <td className="style-name-cell">
                                            <input
                                                type="text"
                                                placeholder="Enter Style Name"
                                                className="style-name p-2"
                                                defaultValue={style.name}
                                                onChange={(e) => changeStyleName(styleIndex, e.target.value.trim())}
                                            />
                                        </td>
                                        <td>
                                            <textarea
                                                placeholder="Enter Negative Prompt"
                                                defaultValue={style.prompt}
                                                className="p-2"
                                                onChange={(e) => changeStylePrompt(styleIndex, e.target.value.trim())}
                                            ></textarea>
                                        </td>
                                        <td>
                                            <textarea
                                                placeholder="Enter Negative Prompt"
                                                defaultValue={style.negative_prompt}
                                                className="p-2"
                                                onChange={(e) => changeStyleNegativePrompt(styleIndex, e.target.value.trim())}
                                            ></textarea>
                                        </td>
                                        <td className="model-name-cell">{style.modelName}</td>
                                        <td className="style-image-cell">
                                            <img
                                                src={`${process.env.BASE_API_URL}/${style.imgSrc}`}
                                                alt={`${style.name} Image`}
                                                width="100"
                                                height="100"
                                                className="d-block mx-auto mb-3"
                                            />
                                            <input
                                                type="file"
                                                className="form-control mx-auto mb-3"
                                                style={{
                                                    width: "257px"
                                                }}
                                                accept=".jpg,.png"
                                                onChange={(e) => changeStyleImage(styleIndex, e.target.files[0])}
                                            />
                                            {styleIndex !== updatedStyleImageIndex && <button
                                                className="btn btn-danger"
                                                onClick={() => updateStyleImage(styleIndex)}
                                            >
                                                Change Image
                                            </button>}
                                            {isUpdateStyleImageStatus && styleIndex === updatedStyleImageIndex && <p className="alert alert-primary mb-3 d-block">Update ...</p>}
                                        </td>
                                        <td className="update-and-delete-cell">
                                            {styleIndex !== updatedStyleIndex && <button
                                                className="btn btn-danger mb-3 d-block w-100"
                                                onClick={() => updateStyleData(styleIndex)}
                                            >Update</button>}
                                            {isUpdateStatus && styleIndex === updatedStyleIndex && <p className="alert alert-primary mb-3 d-block">Update ...</p>}
                                            {styleIndex !== deletedStyleIndex && <button
                                                className="btn btn-danger d-block w-100"
                                                onClick={() => deleteStyle(styleIndex)}
                                            >Delete</button>}
                                            {isDeleteStatus && styleIndex === deletedStyleIndex && <p className="alert alert-primary">Delete ...</p>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default UpdateCategoryStyleInfo;