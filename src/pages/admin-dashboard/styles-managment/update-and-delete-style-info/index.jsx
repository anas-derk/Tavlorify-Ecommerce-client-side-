import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAllCategoriesForService, getAdminInfo, getStylesForCategoryInService } from "../../../../../public/global_functions/popular";
import TableLoader from "@/components/TableLoader";

export default function UpdateCategoryStyleInfo({ pageName }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [categoryName, setCategoryName] = useState("");

    const [isGetCategoryStyles, setisGetCategoryStyles] = useState(false);

    const [waitChangeStyleImageMsg, setWaitChangeStyleImageMsg] = useState("");

    const [errorChangeStyleImageMsg, setErrorChangeStyleImageMsg] = useState("");

    const [successChangeStyleImageMsg, setSuccessChangeStyleImageMsg] = useState("");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStylesData, setCategoryStylesData] = useState([]);

    const [waitMsg, setWaitMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [selectedStyleImageIndex, setSelectedStyleImageIndex] = useState(-1);

    const [selectedStyleIndex, setSelectedStyleIndex] = useState(-1);

    const [files, setFiles] = useState([]);

    const router = useRouter();

    useEffect(() => {
        setIsLoadingPage(true);
        setCategoryStylesData([]);
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    } else {
                        setCategoriesData((await getAllCategoriesForService(pageName)).data);
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.replace("/admin-dashboard/login");
    }, [pageName]);

    const getCategoryStyles = async (categoryName) => {
        try {
            setCategoryName(categoryName);
            setisGetCategoryStyles(true);
            setCategoryStylesData((await getStylesForCategoryInService(pageName, categoryName)).data);
            setisGetCategoryStyles(false);
        }
        catch (err) {
            setErrorMsg("Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    const changeStyleData = (styleIndex, fieldName, newValue) => {
        categoryStylesData[styleIndex][fieldName] = newValue;
    }

    const changeStyleImage = (styleIndex, newValue) => {
        let styleFiles = files;
        styleFiles[styleIndex] = newValue;
        setFiles(styleFiles);
    }

    const updateStyleImage = async (styleIndex) => {
        if (typeof files[styleIndex] === "object") {
            setSelectedStyleImageIndex(styleIndex);
            setWaitChangeStyleImageMsg(true);
            try {
                let formData = new FormData();
                formData.append("styleImage", files[styleIndex]);
                const result = (await axios.put(`${process.env.BASE_API_URL}/styles/update-style-image?service=${pageName}&styleId=${categoryStylesData[styleIndex]._id}`, formData, {
                    headers: {
                        Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                    }
                })).data;
                if (!result.error) {
                    setWaitChangeStyleImageMsg("");
                    setSuccessChangeStyleImageMsg("Change Image Successfull !!");
                    let successTimeout = setTimeout(async () => {
                        setSuccessChangeStyleImageMsg("");
                        setSelectedStyleImageIndex(-1);
                        categoryStylesData[styleIndex].imgSrc = result.data.newImagePath;
                        clearTimeout(successTimeout);
                    }, 1500);
                }
            } catch (err) {
                if (err?.response?.data?.msg === "Unauthorized Error") {
                    localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                    await router.push("/admin-dashboard/login");
                    return;
                }
                setWaitChangeStyleImageMsg(false);
                setErrorChangeStyleImageMsg("Sorry, Someting Went Wrong, Please Repeate The Process !!");
                let errorTimeout = setTimeout(() => {
                    setErrorChangeStyleImageMsg("");
                    setSelectedStyleImageIndex(-1);
                    clearTimeout(errorTimeout);
                }, 1500);
            }
        }
    }

    const updateStyleData = async (styleIndex) => {
        try {
            setWaitMsg("Please Wait Updating ...");
            setSelectedStyleIndex(styleIndex);
            const result = await axios.put(`${process.env.BASE_API_URL}/styles/update-style-data/${categoryStylesData[styleIndex]._id}?service=${pageName}&categoryName=${categoryStylesData[styleIndex].categoryName}`, {
                newCategoryStyleSortNumber: categoryStylesData[styleIndex].sortNumber,
                newName: categoryStylesData[styleIndex].name,
                newPrompt: categoryStylesData[styleIndex].prompt,
                newNegativePrompt: categoryStylesData[styleIndex].negative_prompt,
                newModelName: categoryStylesData[styleIndex].modelName,
                ...(pageName === "image-to-image" && {
                    newDdimSteps: categoryStylesData[styleIndex].ddim_steps,
                    newStrength: categoryStylesData[styleIndex].strength,
                }
                )
            }, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            if (!result.error) {
                setWaitMsg("");
                setSuccessMsg("Updating Successfull !!");
                let successTimeout = setTimeout(async () => {
                    setSuccessMsg("");
                    setSelectedStyleIndex(-1);
                    clearTimeout(successTimeout);
                }, 1500);
            } else {
                setSelectedStyleIndex(-1);
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.push("/admin-dashboard/login");
                return;
            }
            setWaitMsg("");
            setErrorMsg("Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setSelectedStyleIndex(-1);
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    const deleteStyle = async (styleIndex) => {
        try {
            setWaitMsg("Please Wait Deleting ...");
            setSelectedStyleIndex(styleIndex);
            const result = await axios.delete(`${process.env.BASE_API_URL}/styles/delete-style-data/${categoryStylesData[styleIndex]._id}`, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Updating Successfull !!");
                let successTimeout = setTimeout(async () => {
                    setSuccessMsg("");
                    setSelectedStyleIndex(-1);
                    setCategoryStylesData(categoryStylesData.filter((style, index) => index !== styleIndex));
                    clearTimeout(successTimeout);
                }, 1500);
            } else {
                setErrorMsg("Sorry, Someting Went Wrong, Please Repeate The Process !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    setSelectedStyleIndex(-1);
                    clearTimeout(errorTimeout);
                }, 1500);
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.push("/admin-dashboard/login");
                return;
            }
            setWaitMsg("");
            setErrorMsg("Sorry, Someting Went Wrong, Please Repeate The Process !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setSelectedStyleIndex(-1);
                clearTimeout(errorTimeout);
            }, 1500);
        }
    }

    return (
        <div className="update-category-styles-info">
            <Head>
                <title>Tavlorify Store - Update And Delete Category Styles Info For {pageName}</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete Category Styles Info For {pageName} Page</h1>
                        <h6 className="mb-3 text-center fw-bold">Please Select The Category</h6>
                        <form className="select-category-form mb-2 text-center">
                            <select className="form-control w-50 mx-auto mb-3" onChange={(e) => getCategoryStyles(e.target.value)}>
                                <option defaultValue="" hidden>Select The Category</option>
                                {categoriesData.map((category, categoryIndex) => (
                                    <option value={category.name} key={categoryIndex}>{category.name}</option>
                                ))}
                            </select>
                        </form>
                        {categoryStylesData.length > 0 && !isGetCategoryStyles && <div className="categories-and-styles-box p-3 data-box">
                            <table className="categories-and-styles-table mb-4 data-table long-width-table">
                                <thead>
                                    <tr>
                                        <th>Old + New Style Sort</th>
                                        <th>Style Name</th>
                                        {(pageName === "text-to-image" || pageName === "image-to-image") && <>
                                            <th>Prompt</th>
                                            <th>Negative Prompt</th>
                                        </>}
                                        {pageName === "text-to-image" && <th width="320">Old + New Model Name</th>}
                                        {pageName === "image-to-image" && <>
                                            <th>Ddim Steps</th>
                                            <th>Strength</th>
                                        </>}
                                        {(pageName === "text-to-image" || pageName === "image-to-image") && <th>Image</th>}
                                        {pageName === "face-swap" && <>
                                            <th>Vertical Image</th>
                                            <th>Horizontal Image</th>
                                            <th>Square Image</th>
                                        </>}
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
                                            {(pageName === "text-to-image" || pageName === "image-to-image") && <>
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
                                            </>}
                                            {pageName === "text-to-image" && <td className="model-name-cell">
                                                <h6 className="old-style-sort-number fw-bold">Old: {style.modelName}</h6>
                                                <hr />
                                                <select className="form-control" onChange={(e) => changeStyleData(styleIndex, "modelName", e.target.value)}>
                                                    <option hidden value="">Please Select New Model Name</option>
                                                    <option value="dreamshaper">Dreamshaper</option>
                                                    <option value="stable-diffusion">Stable Diffusion</option>
                                                    <option value="deliberate-v2">Deliberate</option>
                                                    <option value="sdxl">Sdxl</option>
                                                    <option value="openjourney">Openjourney</option>
                                                </select>
                                            </td>}
                                            {pageName === "image-to-image" && <>
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
                                            </>}
                                            {(pageName === "text-to-image" || pageName === "image-to-image") && <td className="style-image-cell">
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
                                                    accept=".jpg,.png,.webp"
                                                    onChange={(e) => changeStyleImage(styleIndex, e.target.files[0])}
                                                />
                                                {styleIndex !== selectedStyleImageIndex && <button
                                                    className="btn btn-danger"
                                                    onClick={() => updateStyleImage(styleIndex)}
                                                >
                                                    Change Image
                                                </button>}
                                                {waitChangeStyleImageMsg && selectedStyleImageIndex === styleIndex && <button
                                                    className="btn btn-info d-block mb-3 mx-auto"
                                                    disabled
                                                >{waitChangeStyleImageMsg}</button>}
                                                {successChangeStyleImageMsg && selectedStyleImageIndex === styleIndex && <button
                                                    className="btn btn-success d-block mb-3 mx-auto"
                                                    disabled
                                                >{successChangeStyleImageMsg}</button>}
                                                {errorChangeStyleImageMsg && selectedStyleImageIndex === styleIndex && <button
                                                    className="btn btn-danger d-block mb-3 mx-auto"
                                                    disabled
                                                >{errorChangeStyleImageMsg}</button>}
                                            </td>}
                                            {pageName === "face-swap" && style.imgsSrcList.map((imgSrc) => (
                                                <td className="face-swap-style-image">
                                                    <img
                                                        src={`${process.env.BASE_API_URL}/${imgSrc}`}
                                                        alt={`Style Image`}
                                                        width="100"
                                                        height="100"
                                                        className="d-block mx-auto mb-3"
                                                    />
                                                    <input
                                                        type="file"
                                                        className="form-control mx-auto mb-3 form-control"
                                                        width="257"
                                                        accept=".jpg,.png,.webp"
                                                        onChange={(e) => changeStyleImage(styleIndex, e.target.files[0])}
                                                    />
                                                    {styleIndex !== selectedStyleImageIndex && <button
                                                        className="btn btn-danger"
                                                        onClick={() => updateStyleImage(styleIndex)}
                                                    >
                                                        Change Image
                                                    </button>}
                                                    {waitChangeStyleImageMsg  && selectedStyleImageIndex === styleIndex && <button
                                                        className="btn btn-info d-block mb-3 mx-auto"
                                                        disabled
                                                    >{waitChangeStyleImageMsg}</button>}
                                                    {successChangeStyleImageMsg && selectedStyleImageIndex === styleIndex && <button
                                                        className="btn btn-success d-block mb-3 mx-auto"
                                                        disabled
                                                    >{successChangeStyleImageMsg}</button>}
                                                    {errorChangeStyleImageMsg && selectedStyleImageIndex === styleIndex && <button
                                                        className="btn btn-danger d-block mb-3 mx-auto"
                                                        disabled
                                                    >{errorChangeStyleImageMsg}</button>}
                                                </td>
                                            ))}
                                            <td className="update-and-delete-cell">
                                                {styleIndex !== selectedStyleIndex && <>
                                                    <button
                                                        className="btn btn-success mb-3 d-block w-100"
                                                        onClick={() => updateStyleData(styleIndex)}
                                                    >Update</button>
                                                    {categoryStylesData.length > 1 && <button
                                                        className="btn btn-danger mb-3 d-block w-100"
                                                        onClick={() => deleteStyle(styleIndex)}
                                                    >Delete</button>}
                                                </>}
                                                {waitMsg && selectedStyleIndex === styleIndex && <button
                                                    className="btn btn-info d-block mb-3 mx-auto global-button"
                                                    disabled
                                                >{waitMsg}</button>}
                                                {successMsg && selectedStyleIndex === styleIndex && <button
                                                    className="btn btn-success d-block mx-auto global-button"
                                                    disabled
                                                >{successMsg}</button>}
                                                {errorMsg && selectedStyleIndex === styleIndex && <button
                                                    className="btn btn-danger d-block mx-auto global-button"
                                                    disabled
                                                >{errorMsg}</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                        {categoryStylesData.length === 0 && !isGetCategoryStyles && categoryName && <p className="alert alert-danger w-75 mx-auto">Sorry, Can't Find Any Style For This Category !!</p>}
                        {isGetCategoryStyles && <TableLoader />}
                    </div>
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    )
}

export function getServerSideProps({ query }) {
    const { pageName } = query;
    if (pageName !== "text-to-image" && pageName !== "image-to-image") {
        return {
            redirect: {
                permanent: false,
                destination: "/admin-dashboard",
            },
        }
    }
    return {
        props: {
            pageName,
        }
    }
}