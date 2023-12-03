import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

export default function UpdateAndDeleteCategoryInfo() {

    const [categoriesData, setCategoriesData] = useState([]);

    const [isUpdateStatus, setIsUpdateStatus] = useState(false);

    const [isDeleteStatus, setIsDeleteStatus] = useState(false);

    const [updatedCategoryIndex, setUpdatedCategoryIndex] = useState(-1);

    const [deletedCategoryIndex, setDeletedCategoryIndex] = useState(-1);

    const [updatedCategoriesData, setUpdatedCategoriesData] = useState([]);

    const router = useRouter();

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
                        setUpdatedCategoriesData(result.map((category) => {
                            return {
                                ...category,
                            }
                        }));
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const changeCategorySortNumber = (categoryIndex, newValue) => {
        let categoriesDataTemp = updatedCategoriesData;
        categoriesDataTemp[categoryIndex].sortNumber = Number(newValue);
        setUpdatedCategoriesData(categoriesDataTemp);
    }

    const changeCategoryName = (categoryIndex, newValue) => {
        let categoriesDataTemp = updatedCategoriesData;
        categoriesDataTemp[categoryIndex].name = newValue;
        setUpdatedCategoriesData(categoriesDataTemp);
    }

    const updateCategoryInfo = (categoryIndex) => {
        setUpdatedCategoryIndex(categoryIndex);
        setIsUpdateStatus(true);
        Axios.put(`${process.env.BASE_API_URL}/text-to-image/categories/update-category-data/${categoriesData[categoryIndex]._id}`, {
            newCategorySortNumber: updatedCategoriesData[categoryIndex].sortNumber,
            newCategoryName: updatedCategoriesData[categoryIndex].name,
        })
            .then(() => {
                setTimeout(() => {
                    setIsUpdateStatus(false);
                    router.reload();
                }, 1000);
            })
            .catch((err) => console.log(err));
    }

    const deleteCategory = (categoryIndex) => {
        setDeletedCategoryIndex(categoryIndex);
        setIsDeleteStatus(true);
        Axios.delete(`${process.env.BASE_API_URL}/text-to-image/categories/delete-category-data/${categoriesData[categoryIndex]._id}`)
            .then((res) => {
                setTimeout(() => {
                    setIsDeleteStatus(false);
                    router.reload();
                }, 1000);
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Update And Delete Category Info
        <div className="update-and-delete-category-info">
            <Head>
                <title>Tavlorify Store - Categories Manager For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                {/* Start Container */}
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete Text To Image Categories Page</h1>
                    {categoriesData.length > 0 ?
                        <div className="categories-data-box p-3 data-box">
                            {/* Start Categories Table */}
                            <table className="categories-table mb-4 text-center data-table">
                                <thead>
                                    <tr>
                                        <th>Old Category Sort</th>
                                        <th>New Category Sort</th>
                                        <th>Category Name</th>
                                        <th>Proceses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoriesData.map((category, index) => (
                                        <tr key={index}>
                                            <td className="category-sort-number-cell">
                                                {index + 1}
                                            </td>
                                            <td className="select-category-sort-number-cell">
                                                <select className="form-control" onChange={(e) => changeCategorySortNumber(index, e.target.value)}>
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
                                                    onChange={(e) => changeCategoryName(index, e.target.value.trim())}
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
                        : <p className="alert alert-danger">Sorry, Can't Find Any Text To Image Category !!</p>}
                    {/* End Categories Table */}
                </div>
                {/* End Container */}
            </div>
        </div>
        // End Update And Delete Category Info
    );
}