import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";

export default function UpdateCategoryStyleInfo() {

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

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/image-to-image/categories/all-categories-data`)
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
    }, []);

    const changeCategorySortNumber = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoryStylesData[styleIndex].sortNumber = newValue;
        setCategoryData(categoriesDataTemp);
    }

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

    const changeDdimSteps = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoryStylesData[styleIndex].ddim_steps = newValue;
        setCategoryData(categoriesDataTemp);
    }

    const changeStrength = (styleIndex, newValue) => {
        let categoriesDataTemp = categoryData;
        categoryStylesData[styleIndex].strength = newValue;
        setCategoryData(categoriesDataTemp);
    }

    const changeStyleImage = (styleIndex, newValue) => {
        let styleFiles = files;
        styleFiles[styleIndex] = newValue;
        setFiles(styleFiles);
    }

    const getCategoryStyles = () => {
        setIsWaitStatus(true);
        Axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[categoryIndex].name}`)
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
                const res = await Axios.put(`${process.env.BASE_API_URL}/admin/update-style-image?service=image-to-image&styleId=${categoryStylesData[styleIndex]._id}`, formData);
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
        Axios.put(`${process.env.BASE_API_URL}/image-to-image/styles/update-style-data/${categoryStylesData[styleIndex]._id}?categoryName=${categoryStylesData[styleIndex].categoryName}`, {
            newCategoryStyleSortNumber: categoryStylesData[styleIndex].sortNumber,
            newName: categoryStylesData[styleIndex].name,
            newPrompt: categoryStylesData[styleIndex].prompt,
            newNegativePrompt: categoryStylesData[styleIndex].negative_prompt,
            newDdimSteps: categoryStylesData[styleIndex].ddim_steps,
            newStrength: categoryStylesData[styleIndex].strength,
        })
            .then((res) => {
                setUpdatedStyleIndex(-1);
                setIsWaitStatus(false);
                setIsUpdateStatus(false);
                getCategoryStyles();
            })
            .catch((err) => console.log(err));
    }

    const deleteStyle = (styleIndex) => {
        setDeletedStyleIndex(styleIndex);
        setIsDeleteStatus(true);
        Axios.delete(`${process.env.BASE_API_URL}/image-to-image/styles/delete-style-data/${categoryStylesData[styleIndex]._id}?categoryName=${categoryStylesData[styleIndex].categoryName}`)
            .then((res) => {
                getCategoryStyles();
                setDeletedStyleIndex(-1);
                setIsDeleteStatus(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="update-category-styles-info">
            <Head>
                <title>Tavlorify Store - Update And Delete Category Styles Info For Image To Image</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete Category Styles Info For Image To Image Page</h1>
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
                        <button type="button" className="btn btn-success" onClick={getCategoryStyles}>Get Styles Data For This Category</button>
                    </form>
                    {isWaitStatus && <span className="loader"></span>}
                    {categoryStylesData.length > 0 && !isWaitStatus && <div className="categories-and-styles-box p-3">
                        <table className="categories-and-styles-table mb-4">
                            <thead>
                                <tr>
                                    <th>Old + New Style Sort</th>
                                    <th>Style Name</th>
                                    <th>Prompt</th>
                                    <th>Negative Prompt</th>
                                    <th>Ddim Steps</th>
                                    <th>Strength</th>
                                    <th>Image</th>
                                    <th>Process</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryStylesData.map((style, styleIndex) => (
                                    <tr key={styleIndex}>
                                        <td className="style-sort-number">
                                            <h6 className="old-style-sort-number fw-bold">Old: {style.sortNumber}</h6>
                                            <hr />
                                            <select className="form-control" onChange={(e) => changeCategorySortNumber(styleIndex, e.target.value)}>
                                                <option value="" hidden>Please Select New Sort</option>
                                                {categoryStylesData.map((style, index) => (
                                                    <option value={index + 1} key={index}>{index + 1}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="style-name-cell">
                                            <input
                                                placeholder="Enter Style Name"
                                                defaultValue={style.name}
                                                className="p-2"
                                                onChange={(e) => changeStyleName(styleIndex, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <textarea
                                                placeholder="Enter Prompt"
                                                defaultValue={style.prompt}
                                                className="p-2"
                                                onChange={(e) => changeStylePrompt(styleIndex, e.target.value)}
                                            ></textarea>
                                        </td>
                                        <td>
                                            <textarea
                                                placeholder="Enter Negative Prompt"
                                                defaultValue={style.negative_prompt}
                                                className="p-2"
                                                onChange={(e) => changeStyleNegativePrompt(styleIndex, e.target.value)}
                                            ></textarea>
                                        </td>
                                        <td>
                                            <input
                                                placeholder="Enter Ddim Steps"
                                                defaultValue={style.ddim_steps}
                                                className="p-2"
                                                onChange={(e) => changeDdimSteps(styleIndex, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                placeholder="Enter Strength"
                                                defaultValue={style.strength}
                                                className="p-2"
                                                onChange={(e) => changeStrength(styleIndex, e.target.value)}
                                            />
                                        </td>
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
                                            {categoryStylesData.length > 1 && styleIndex !== deletedStyleIndex && <button
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