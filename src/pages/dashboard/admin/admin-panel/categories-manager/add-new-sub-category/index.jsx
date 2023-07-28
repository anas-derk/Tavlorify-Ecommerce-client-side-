import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import Axios from "axios";
import validations from "../../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";

const AddNewSubCategory = () => {

    const [categoriesList, setCategoriesList] = useState([]);

    const [categoryName, setCategoryName] = useState("");

    const [subCategoryName, setSubCategoryName] = useState("");

    const [isAddingStatus, setIsAddingStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/categories/all-categories`)
            .then((res) => {
                console.log(res.data);
                setCategoriesList(res.data);
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg("Sorry, Something Went Wrong");
            });
        }
    }, []);

    const addNewSubCategory = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "categoryName",
                value: categoryName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "subCategoryName",
                value: subCategoryName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsAddingStatus(true);
            try {
                const res = await Axios.post(`${process.env.BASE_API_URL}/categories/add-new-sub-category/${categoryName}`, {
                    subCategoryName: subCategoryName,
                });
                const result = await res.data;
                setIsAddingStatus(false);
                if (result === "Congratulations, the sub category has been successfully added") {
                    setIsSuccessStatus(true);
                    let successTimeout = setTimeout(() => {
                        setIsSuccessStatus(false);
                        clearTimeout(successTimeout);
                    }, 2000);
                } else {
                    setErrorMsg(result);
                    let errorTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errorTimeout);
                    }, 2000);
                }
            }
            catch (err) {
                console.log(err);
                setIsAddingStatus(false);
                setErrorMsg("Sorry, Something Went Wrong");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
    }

    return (
        <div className="add-new-sub-category">
            <Head>
                <title>Tavlorify Store - Add New Sub Category</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add New Sub Category Page</h1>
                    {(categoriesList.length > 0) ? <form className="add-new-category-form w-50 mx-auto mb-3" onSubmit={addNewSubCategory}>
                        <select
                            className={`form-control p-2 ${formValidationErrors["categoryName"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Category Name"
                            onChange={(e) => setCategoryName(e.target.value)}
                        >
                            <option hidden value="">Please Select Category Name</option>
                            {categoriesList.map((category) => (
                                <option value={category.name} key={category._id}>{category.name}</option>
                            ))}
                        </select>
                        {formValidationErrors["categoryName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryName"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["subCategoryName"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Sub Category Name"
                            onChange={(e) => setSubCategoryName(e.target.value.trim())}
                        />
                        {formValidationErrors["subCategoryName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["subCategoryName"]}</p>}
                        {!isAddingStatus && !errorMsg && !isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto">Add Now</button>}
                        {isAddingStatus && <button type="submit" className="btn btn-warning w-100 d-block mx-auto" disabled>Adding Now ...</button>}
                        {errorMsg && <button type="submit" className="btn btn-danger w-100 d-block mx-auto" disabled>{errorMsg}</button>}
                        {isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto" disabled>Adding Process Is Successfuly !!</button>}
                    </form> : <p className="alert alert-danger">Sorry, Can't Find Any Categories !!</p>}
                </div>
            </div>
        </div>
    );
}

export default AddNewSubCategory;