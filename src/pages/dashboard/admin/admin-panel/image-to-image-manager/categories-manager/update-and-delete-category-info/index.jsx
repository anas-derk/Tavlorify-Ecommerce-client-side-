import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const UpdateAndDeleteCategoryInfo = () => {

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
            Axios.get(`${process.env.BASE_API_URL}/image-to-image/categories/all-categories-data`)
                .then((res) => {
                    let result = res.data;
                    if (typeof result === "string") {
                        console.log(result);
                    } else {
                        setCategoriesData(result);
                        setUpdatedCategoriesData(result.map((category) => {
                            return {
                                name: category.name,
                            }
                        }));
                    }
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const changeCategoryName = (categoryIndex, newValue) => {
        let categoriesDataTemp = updatedCategoriesData;
        categoriesDataTemp[categoryIndex].name = newValue;
        setUpdatedCategoriesData(categoriesDataTemp);
    }

    const updateCategoryName = (categoryIndex) => {
        setUpdatedCategoryIndex(categoryIndex);
        setIsUpdateStatus(true);
        Axios.put(`${process.env.BASE_API_URL}/image-to-image/categories/update-category-data/${categoriesData[categoryIndex]._id}?oldCategoryName=${categoriesData[categoryIndex].name}`, {
            newCategoryName: updatedCategoriesData[categoryIndex].name,
        })
            .then((res) => {
                setTimeout(() => {
                    setIsUpdateStatus(false);
                    setUpdatedCategoryIndex(-1);
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
                    let categoriesDataTemp = categoriesData.filter((category, index) => index !== categoryIndex);
                    setCategoriesData(categoriesDataTemp);
                    setDeletedCategoryIndex(-1);
                }, 1000);
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Update And Delete Category Info
        <div className="update-and-delete-category-info">
            <Head>
                <title>Tavlorify Store - Categories Manager For Image To Image</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                {/* Start Container */}
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Update And Delete Image To Image Categories Page</h1>
                    {/* Start Categories Table */}
                    {categoriesData.length > 0 ? <table className="categories-table mb-4 text-center">
                        <thead>
                            <tr>
                                <th>Category Name</th>
                                <th>Processes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoriesData.map((category, index) => (
                                <tr key={index}>
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
                                            onClick={() => updateCategoryName(index)}
                                        >Update</button>}
                                        {isUpdateStatus && index === updatedCategoryIndex && <p className="alert alert-primary mb-3 d-block">Update ...</p>}
                                        {index !== deletedCategoryIndex && <button
                                            className="btn btn-danger d-block w-100"
                                            onClick={() => deleteCategory(index)}
                                        >Delete</button>}
                                        {isDeleteStatus && index === deletedCategoryIndex && <p className="alert alert-primary">Delete ...</p>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> : <p className="alert alert-danger">Sorry, Can't Find Any Text To Image Category !!</p>}
                    {/* End Categories Table */}
                </div>
                {/* End Container */}
            </div>
        </div>
        // End Update And Delete Category Info
    );
}

export default UpdateAndDeleteCategoryInfo;