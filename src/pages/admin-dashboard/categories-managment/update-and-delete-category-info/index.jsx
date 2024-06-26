import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import validations from "../../../../../public/global_functions/validations";
import { getAllTextToImageCategories, getAllImageToImageCategories } from "../../../../../public/global_functions/popular";

export default function UpdateAndDeleteCategoryInfo({ pageName }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [categoriesData, setCategoriesData] = useState([]);

    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    const [isDeleteStatus, setIsDeleteStatus] = useState(false);

    const [updatedCategoryIndex, setUpdatedCategoryIndex] = useState(-1);

    const [deletedCategoryIndex, setDeletedCategoryIndex] = useState(-1);

    const router = useRouter();

    useEffect(() => {
        setIsLoadingPage(true);
        const adminToken = localStorage.getItem("tavlorify-store-admin-user-token");
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    } else {
                        setCategoriesData([]);
                        if (pageName === "text-to-image") {
                            result = await getAllTextToImageCategories();
                        }
                        if (pageName === "image-to-image") {
                            result = await getAllImageToImageCategories();
                        }
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
    }, [pageName]);

    const changeCategoryData = (categoryIndex, fieldName, newValue) => {
        categoriesData[categoryIndex][fieldName] = newValue;
    }

    const updateCategoryInfo = async (categoryIndex) => {
        try {
            setUpdatedCategoryIndex(categoryIndex);
            setIsUpdateStatus(true);
            if (pageName === "text-to-image") {
                await axios.put(`${process.env.BASE_API_URL}/text-to-image/categories/update-category-data/${categoriesData[categoryIndex]._id}`, {
                    newCategorySortNumber: categoriesData[categoryIndex].sortNumber,
                    newCategoryName: categoriesData[categoryIndex].name,
                }, {
                    headers: {
                        Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                    }
                });
            }
            else {
                await axios.put(`${process.env.BASE_API_URL}/image-to-image/categories/update-category-data/${categoriesData[categoryIndex]._id}`, {
                    newCategorySortNumber: categoriesData[categoryIndex].sortNumber,
                    newCategoryName: categoriesData[categoryIndex].name,
                }, {
                    headers: {
                        Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                    }
                });
            }
            setTimeout(() => {
                setIsUpdateStatus(false);
                router.reload();
            }, 1000);
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteCategory = async (categoryIndex) => {
        try {
            setDeletedCategoryIndex(categoryIndex);
            setIsDeleteStatus(true);
            if (pageName === "text-to-image") {
                await axios.delete(`${process.env.BASE_API_URL}/text-to-image/categories/delete-category-data/${categoriesData[categoryIndex]._id}`, {
                    headers: {
                        Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                    }
                });
            }
            if (pageName === "image-to-image") {
                await axios.delete(`${process.env.BASE_API_URL}/image-to-image/categories/delete-category-data/${categoriesData[categoryIndex]._id}`, {
                    headers: {
                        Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                    }
                });
            }
            setTimeout(() => {
                setIsDeleteStatus(false);
                router.reload();
            }, 1000);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        // Start Update And Delete Category Info
        <div className="update-and-delete-category-info">
            <Head>
                <title>Tavlorify Store - Categories Managagment For { pageName }</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    {/* Start Container */}
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete { pageName } Categories Page</h1>
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
                                        {categoriesData.map((category, index) => (
                                            <tr key={index}>
                                                <td className="category-sort-number-cell">
                                                    {index + 1}
                                                </td>
                                                <td className="select-category-sort-number-cell">
                                                    <select className="form-control" onChange={(e) => changeCategoryData(index, "sortNumber", e.target.value)}>
                                                        <option value="" hidden>Please Select Sort</option>
                                                        {categoriesData.map((category, index) => (
                                                            <option value={index + 1} key={index}>{index + 1}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="category-name-cell">
                                                    <input
                                                        type="text"
                                                        className="category-name-input form-control"
                                                        placeholder="Category Name"
                                                        defaultValue={category.name}
                                                        onChange={(e) => changeCategoryData(index, "name", e.target.value.trim())}
                                                    />
                                                </td>
                                                <td className="update-and-delete-cell">
                                                    {index !== updatedCategoryIndex && <button
                                                        className="btn btn-danger mb-3 d-block w-100"
                                                        onClick={() => updateCategoryInfo(index)}
                                                    >Update</button>}
                                                    {isUpdateStatus && index === updatedCategoryIndex && <p className="alert alert-primary mb-3 d-block">Update ...</p>}
                                                    {categoriesData.length > 1 && index !== deletedCategoryIndex && <button
                                                        className="btn btn-danger d-block w-100"
                                                        onClick={() => deleteCategory(index)}
                                                    >Delete</button>}
                                                    {isDeleteStatus && index === deletedCategoryIndex && <p className="alert alert-primary">Delete ...</p>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            : <p className="alert alert-danger">Sorry, Can't Find Any Category For { pageName } !!</p>}
                        {/* End Categories Table */}
                    </div>
                    {/* End Container */}
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
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