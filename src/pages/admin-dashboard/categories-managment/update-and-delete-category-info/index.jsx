import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAllCategoriesForService, getAdminInfo } from "../../../../../public/global_functions/popular";

export default function UpdateAndDeleteCategoryInfo({ pageName }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const [categoriesData, setCategoriesData] = useState([]);

    const [waitMsg, setWaitMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(-1);

    const router = useRouter();

    useEffect(() => {
        setIsLoadingPage(true);
        setCategoriesData([]);
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
                    if (err?.response?.status === 401) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setErrorMsgOnLoadingThePage(err?.message === "Network Error" ? "Network Error" : "Sorry, Something Went Wrong, Please Try Again !");
                    }
                });
        } else router.replace("/admin-dashboard/login");
    }, [pageName]);

    const changeCategoryData = (categoryIndex, fieldName, newValue) => {
        categoriesData[categoryIndex][fieldName] = newValue;
    }

    const updateCategoryInfo = async (categoryIndex) => {
        try {
            setWaitMsg("Please Wait Updating ...");
            setSelectedCategoryIndex(categoryIndex);
            const res = await axios.put(`${process.env.BASE_API_URL}/categories/update-category-data/${categoriesData[categoryIndex]._id}?service=${pageName}`, {
                newCategorySortNumber: categoriesData[categoryIndex].sortNumber,
                newCategoryName: categoriesData[categoryIndex].name,
            }, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            const result = res.data;
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Updating Successfull !!");
                let successTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    setSelectedCategoryIndex(-1);
                    clearTimeout(successTimeout);
                }, 1500);
            } else {
                setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    setSelectedCategoryIndex(-1);
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
        catch (err) {
            if (err?.response?.status === 401) {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.replace("/admin-dashboard/login");
            }
            else {
                setWaitMsg("");
                setErrorMsg(err?.message === "Network Error" ? "Network Error" : "Sorry, Someting Went Wrong, Please Repeate The Process !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    setSelectedCategoryIndex(-1);
                    clearTimeout(errorTimeout);
                }, 1500);
            }
        }
    }

    const deleteCategory = async (categoryIndex) => {
        try {
            setWaitMsg("Please Wait To Deleting ...");
            setSelectedCategoryIndex(categoryIndex);
            const result = (await axios.delete(`${process.env.BASE_API_URL}/categories/${categoriesData[categoryIndex]._id}`, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            })).data;
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Deleting Successfull !!");
                let successTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    setSelectedCategoryIndex(-1);
                    clearTimeout(successTimeout);
                }, 1500);
            } else {
                setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    setSelectedCategoryIndex(-1);
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
        catch (err) {
            if (err?.response?.status === 401) {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.replace("/admin-dashboard/login");
            }
            else {
                setWaitMsg("");
                setErrorMsg(err?.message === "Network Error" ? "Network Error" : "Sorry, Someting Went Wrong, Please Repeate The Process !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    setSelectedCategoryIndex(-1);
                    clearTimeout(errorTimeout);
                }, 1500);
            }
        }
    }

    return (
        // Start Update And Delete Category Info
        <div className="update-and-delete-category-info">
            <Head>
                <title>Tavlorify Store - Categories Managagment For {pageName}</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    {/* Start Container */}
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete {pageName} Categories Page</h1>
                        {categoriesData.length > 0 ?
                            <div className="categories-data-box p-3 data-box">
                                {/* Start Categories Table */}
                                <table className="categories-table mb-4 data-table text-center">
                                    <thead>
                                        <tr>
                                            <th>Old Category Sort</th>
                                            <th>New Category Sort</th>
                                            <th>Category Name</th>
                                            <th>Processes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoriesData.map((category, categoryIndex) => (
                                            <tr key={categoryIndex}>
                                                <td className="category-sort-number-cell">
                                                    {categoryIndex + 1}
                                                </td>
                                                <td className="select-category-sort-number-cell">
                                                    <select className="form-control" onChange={(e) => changeCategoryData(categoryIndex, "sortNumber", e.target.value)}>
                                                        <option value="" hidden>Please Select Sort</option>
                                                        {categoriesData.map((category, categoryIndex) => (
                                                            <option value={categoryIndex + 1} key={categoryIndex}>{categoryIndex + 1}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="category-name-cell">
                                                    <input
                                                        type="text"
                                                        className="category-name-input form-control"
                                                        placeholder="Category Name"
                                                        defaultValue={category.name}
                                                        onChange={(e) => changeCategoryData(categoryIndex, "name", e.target.value.trim())}
                                                    />
                                                </td>
                                                <td className="update-and-delete-cell">
                                                    {categoryIndex !== selectedCategoryIndex && <button
                                                        className="btn btn-success mb-3 d-block w-100"
                                                        onClick={() => updateCategoryInfo(categoryIndex)}
                                                    >Update</button>}
                                                    {categoriesData.length > 1 && categoryIndex !== selectedCategoryIndex && <button
                                                        className="btn btn-danger d-block w-100"
                                                        onClick={() => deleteCategory(categoryIndex)}
                                                    >Delete</button>}
                                                    {waitMsg && selectedCategoryIndex === categoryIndex && <button
                                                        className="btn btn-info d-block mx-auto global-button"
                                                        disabled
                                                    >{waitMsg}</button>}
                                                    {errorMsg && selectedCategoryIndex === categoryIndex && <button
                                                        className="btn btn-danger d-block mx-auto global-button"
                                                        disabled
                                                    >{errorMsg}</button>}
                                                    {successMsg && selectedCategoryIndex === categoryIndex && <button
                                                        className="btn btn-success d-block mx-auto global-button"
                                                        disabled
                                                    >{successMsg}</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : <p className="alert alert-danger">Sorry, Can't Find Any Category For {pageName} !!</p>}
                        {/* End Categories Table */}
                    </div>
                    {/* End Container */}
                </div>
            </>}
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div>
        // End Update And Delete Category Info
    );
}

export function getServerSideProps(context) {
    const pageName = context.query.pageName;
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