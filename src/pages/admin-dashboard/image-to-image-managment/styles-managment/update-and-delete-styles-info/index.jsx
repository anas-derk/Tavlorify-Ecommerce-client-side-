import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import validations from "../../../../../../public/global_functions/validations";
import { getAllImageToImageCategories } from "../../../../../../public/global_functions/popular";

export default function UpdateCategoryStyleInfo() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [categoryIndex, setCategoryIndex] = useState(-1);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    const [isUpdateStyleImageStatus, setIsUpdateStyleImageStatus] = useState(false);

    const [isDeleteStatus, setIsDeleteStatus] = useState(false);

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStylesData, setCategoryStylesData] = useState([]);

    const [updatedStyleImageIndex, setUpdatedStyleImageIndex] = useState(-1);

    const [updatedStyleIndex, setUpdatedStyleIndex] = useState(-1);

    const [deletedStyleIndex, setDeletedStyleIndex] = useState(-1);

    const [files, setFiles] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("tavlorify-store-admin-user-token");
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    } else {
                        result = await getAllImageToImageCategories();
                        setCategoriesData(result.data);
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.push("/admin-dashboard/login");
    }, []);

    const changeStyleData = (styleIndex, fieldName, newValue) => {
        categoryStylesData[styleIndex][fieldName] = newValue;
    }

    const changeStyleImage = (styleIndex, newValue) => {
        let styleFiles = files;
        styleFiles[styleIndex] = newValue;
        setFiles(styleFiles);
    }

    const getCategoryStyles = async () => {
        try {
            setIsWaitStatus(true);
            const res = await axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[categoryIndex].name}`);
            setCategoryStylesData(res.data.data);
            setIsWaitStatus(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    const updateStyleImage = async (styleIndex) => {
        if (typeof files[styleIndex] === "object") {
            setUpdatedStyleImageIndex(styleIndex);
            setIsUpdateStyleImageStatus(true);
            try {
                let formData = new FormData();
                formData.append("styleImage", files[styleIndex]);
                const res = await axios.put(`${process.env.BASE_API_URL}/admin/update-style-image?service=image-to-image&styleId=${categoryStylesData[styleIndex]._id}`, formData);
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

    const updateStyleData = async (styleIndex) => {
        try {
            setUpdatedStyleIndex(styleIndex);
            setIsUpdateStatus(true);
            await axios.put(`${process.env.BASE_API_URL}/image-to-image/styles/update-style-data/${categoryStylesData[styleIndex]._id}?categoryName=${categoryStylesData[styleIndex].categoryName}`, {
                newCategoryStyleSortNumber: categoryStylesData[styleIndex].sortNumber,
                newName: categoryStylesData[styleIndex].name,
                newPrompt: categoryStylesData[styleIndex].prompt,
                newNegativePrompt: categoryStylesData[styleIndex].negative_prompt,
                newDdimSteps: categoryStylesData[styleIndex].ddim_steps,
                newStrength: categoryStylesData[styleIndex].strength,
            });
            setUpdatedStyleIndex(-1);
            setIsWaitStatus(false);
            setIsUpdateStatus(false);
            getCategoryStyles();
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteStyle = async (styleIndex) => {
        try {
            setDeletedStyleIndex(styleIndex);
            setIsDeleteStatus(true);
            await axios.delete(`${process.env.BASE_API_URL}/image-to-image/styles/delete-style-data/${categoryStylesData[styleIndex]._id}?categoryName=${categoryStylesData[styleIndex].categoryName}`);
            getCategoryStyles();
            setDeletedStyleIndex(-1);
            setIsDeleteStatus(false);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="update-category-styles-info">
            <Head>
                <title>Tavlorify Store - Update And Delete Category Styles Info For Image To Image</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete Category Styles Info For Image To Image Page</h1>
                        <h6 className="mb-3 text-center fw-bold">Please Select The Category</h6>
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
                        {categoryStylesData.length > 0 && !isWaitStatus && <div className="categories-and-styles-box p-3 data-box">
                            <table className="categories-and-styles-table mb-4 data-table long-width-table">
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
                                                <select className="form-control" onChange={(e) => changeStyleData(styleIndex, "sortNumber", e.target.value)}>
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
                                                    className="p-2 form-control"
                                                    onChange={(e) => changeStyleData(styleIndex, "name", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <textarea
                                                    placeholder="Enter Prompt"
                                                    defaultValue={style.prompt}
                                                    className="p-3 form-control"
                                                    onChange={(e) => changeStyleData(styleIndex, "prompt", e.target.value)}
                                                ></textarea>
                                            </td>
                                            <td>
                                                <textarea
                                                    placeholder="Enter Negative Prompt"
                                                    defaultValue={style.negative_prompt}
                                                    className="p-3 form-control"
                                                    onChange={(e) => changeStyleData(styleIndex, "negative_prompt", e.target.value)}
                                                ></textarea>
                                            </td>
                                            <td>
                                                <input
                                                    placeholder="Enter Ddim Steps"
                                                    defaultValue={style.ddim_steps}
                                                    className="p-2 form-control"
                                                    onChange={(e) => changeStyleData(styleIndex, "ddim_steps", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    placeholder="Enter Strength"
                                                    defaultValue={style.strength}
                                                    className="p-2 form-control"
                                                    onChange={(e) => changeStyleData(styleIndex, "strength", e.target.value)}
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
                                                    className="form-control mx-auto mb-3 form-control"
                                                    width="257"
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
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    )
}