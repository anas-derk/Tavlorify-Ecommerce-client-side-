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

    const [isDeleteStatus, setIsDeleteStatus] = useState(false);

    const [categoryData, setCategoryData] = useState(null);

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStylesData, setCategoryStylesData] = useState([]);

    const [updatedStyleIndex, setUpdatedStyleIndex] = useState(-1);

    const [deletedStyleIndex, setDeletedStyleIndex] = useState(-1);

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
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
    }, []);

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

    const getCategoryStyles = (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/styles/category-styles-data?categoryName=${categoriesData[categoryIndex].name}`)
            .then((res) => {
                setCategoryStylesData(res.data);
                setIsWaitStatus(false);
            })
            .catch((err) => console.log(err));
    }

    const updateStyleData = (styleIndex) => {
        setUpdatedStyleIndex(styleIndex);
        setIsUpdateStatus(true);
        Axios.put(`${process.env.BASE_API_URL}/text-to-image/styles/update-style-data/${categoryStylesData[styleIndex]._id}`, {
            newPrompt: categoryStylesData[styleIndex].prompt,
            newNegativePrompt: categoryStylesData[styleIndex].negative_prompt,
        })
            .then((res) => {
                if (typeof res.data !== "string") {
                    setIsWaitStatus(false);
                    setTimeout(() => {
                        router.reload();
                    }, 1000);
                }
            })
            .catch((err) => console.log(err));
    }

    const deleteStyle = (styleIndex) => {
        setDeletedStyleIndex(styleIndex);
        setIsDeleteStatus(true);
        Axios.delete(`${process.env.BASE_API_URL}/text-to-image/styles/delete-style-data/${categoryStylesData[styleIndex]._id}?imgSrc=${categoryStylesData[styleIndex].imgSrc}`)
            .then((res) => {
                console.log(res.data);
                setIsWaitStatus(false);
                setTimeout(() => {
                    router.reload();
                }, 1000);
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
                    <form className="select-category-form mb-2 text-center" onSubmit={getCategoryStyles}>
                        <select className="form-control w-50 mx-auto mb-3" onChange={(e) => {
                            setCategoryIndex(parseInt(e.target.value));
                        }}>
                            <option defaultValue="" hidden>Select The Category</option>
                            {categoriesData.map((category, index) => (
                                <option value={index} key={index}>{category.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="btn btn-success">Get Styles Data For This Category</button>
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
                                    <th>Process</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryStylesData.map((style, styleIndex) => (
                                    <tr key={styleIndex}>
                                        <td className="style-name-cell">{style.name}</td>
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