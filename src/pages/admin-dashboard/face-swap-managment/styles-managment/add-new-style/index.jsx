import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import validations from "../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import LoaderPage from "@/components/LoaderPage";

export default function AddNewCategoryStyle() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [categoryName, setCategoryName] = useState("");

    const [styleImageFiles, setStyleImageFiles] = useState({ vertical: "", horizontal: "", square: "" });

    const [isAddingStatus, setIsAddingStatus] = useState(false);

    const [successMsg, setSuccessMsg] = useState(false);

    const [errorMsg, setErrorMsg] = useState(false);

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const router = useRouter();

    const categoriesData = ["Man", "Pojke", "Kvinna", "Flicka"];

    const styleImagesData = [
        { formValidationKey: "verticalStyleImage", orientation: "vertical" },
        { formValidationKey: "horizontalStyleImage", orientation: "horizontal" },
        { formValidationKey: "squareStyleImage", orientation: "square" },
    ];

    useEffect(() => {
        const adminToken = localStorage.getItem("tavlorify-store-admin-user-token");
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    } else {
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

    const addNewCategoryStyle = async (e) => {
        try {
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
                    name: "verticalStyleImage",
                    value: styleImageFiles.vertical,
                    rules: {
                        isRequired: {
                            msg: "Sorry, Can't Be Field Is Empty !!",
                        },
                        isImage: {
                            msg: "Sorry, Invalid Image Type, Please Upload JPG Or PNG Or Webp Image File !!"
                        },
                    },
                },
                {
                    name: "verticalStyleImage",
                    value: styleImageFiles.vertical,
                    rules: {
                        isRequired: {
                            msg: "Sorry, Can't Be Field Is Empty !!",
                        },
                        isImage: {
                            msg: "Sorry, Invalid Image Type, Please Upload JPG Or PNG Or Webp Image File !!"
                        },
                    },
                },
                {
                    name: "horizontalStyleImage",
                    value: styleImageFiles.horizontal,
                    rules: {
                        isRequired: {
                            msg: "Sorry, Can't Be Field Is Empty !!",
                        },
                        isImage: {
                            msg: "Sorry, Invalid Image Type, Please Upload JPG Or PNG Or Webp Image File !!"
                        },
                    },
                },
                {
                    name: "squareStyleImage",
                    value: styleImageFiles.square,
                    rules: {
                        isRequired: {
                            msg: "Sorry, Can't Be Field Is Empty !!",
                        },
                        isImage: {
                            msg: "Sorry, Invalid Image Type, Please Upload JPG Or PNG Or Webp Image File !!"
                        },
                    },
                },
            ]);
            setFormValidationErrors(errorsObject);
            if (Object.keys(errorsObject).length == 0) {
                let formData = new FormData();
                for (let styleImageData of styleImagesData) {
                    formData.append(styleImageData.formValidationKey, styleImageFiles[styleImageData.orientation]);
                }
                setIsAddingStatus(true);
                const res = await axios.post(`${process.env.BASE_API_URL}/face-swap/styles/add-new-style?categoryName=${categoryName}`, formData, {
                    headers: {
                        Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                    }
                });
                const result = res.data;
                setIsAddingStatus(false);
                if (!result.error) {
                    setSuccessMsg(result.msg);
                    let successTimeout = setTimeout(() => {
                        setSuccessMsg(false);
                        clearTimeout(successTimeout);
                    }, 2000);
                }
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem("asfour-store-admin-user-token");
                await router.push("/admin-dashboard/login");
                return;
            }
            setIsAddingStatus(false);
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    return (
        <div className="add-new-style">
            <Head>
                <title>Tavlorify Store - Add New Category Style For Face Swap</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add New Category Style Page For Face Swap</h1>
                        <form className="add-new-style-form w-50 mx-auto mb-4" onSubmit={addNewCategoryStyle}>
                            <select
                                className={`form-control p-2 ${formValidationErrors["categoryName"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => { setCategoryName(e.target.value.trim()); }}
                            >
                                <option defaultValue="" hidden>Select The Category</option>
                                {categoriesData.map((category, index) => (
                                    <option value={category} key={index}>{category}</option>
                                ))}
                            </select>
                            {formValidationErrors["categoryName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryName"]}</p>}
                            {styleImagesData.map((styleImageData, index) => (
                                <div className="style-image-data" key={index}>
                                    <h6 className="fw-bold mb-3">Please Select {styleImageData.orientation} Style Image</h6>
                                    <input
                                        type="file"
                                        className={`form-control p-2 ${formValidationErrors[styleImageData.formValidationKey] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Category Image"
                                        onChange={(e) => setStyleImageFiles(
                                            {
                                                ...styleImageFiles,
                                                vertical: styleImageData.orientation === "vertical" ? e.target.files[0] : styleImageFiles.vertical,
                                                horizontal: styleImageData.orientation === "horizontal" ? e.target.files[0] : styleImageFiles.horizontal,
                                                square: styleImageData.orientation === "square" ? e.target.files[0] : styleImageFiles.square,
                                            }
                                        )}
                                    />
                                    {formValidationErrors[styleImageData.formValidationKey] && <p className='error-msg text-danger mb-2'>{formValidationErrors[styleImageData.formValidationKey]}</p>}
                                </div>
                            ))}
                            {!isAddingStatus && !errorMsg && !successMsg && <button type="submit" className="btn btn-success w-100 d-block mx-auto">Add Now</button>}
                            {isAddingStatus && <button type="submit" className="btn btn-warning w-100 d-block mx-auto" disabled>Adding Now ...</button>}
                            {errorMsg && <button type="submit" className="btn btn-danger w-100 d-block mx-auto" disabled>{errorMsg}</button>}
                            {successMsg && <button type="submit" className="btn btn-success w-100 d-block mx-auto" disabled>{successMsg}</button>}
                        </form>
                    </div>
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}