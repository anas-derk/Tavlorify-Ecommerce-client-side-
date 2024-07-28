import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { inputValuesValidation } from "../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo } from "../../../../../../public/global_functions/popular";

export default function AddNewCategory() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [categoryName, setCategoryName] = useState("");

    const [categoryImageFile, setCategoryImageFile] = useState("");

    const [styleName, setStyleName] = useState("");

    const [stylePrompt, setStylePrompt] = useState("");

    const [styleNegativePrompt, setStyleNegativePrompt] = useState("");

    const [modelName, setModelName] = useState("");

    const [styleImageFile, setStyleImageFile] = useState("");

    const [waitMsg, setWaitMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    } else {
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
    }, []);

    const addNewCategory = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        let errorsObject = inputValuesValidation([
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
                name: "categoryImageFile",
                value: categoryImageFile,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    isImage: {
                        msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                    },
                },
            },
            {
                name: "styleName",
                value: styleName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "stylePrompt",
                value: stylePrompt,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "styleNegativePrompt",
                value: styleNegativePrompt,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "modelName",
                value: modelName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "styleImageFile",
                value: styleImageFile,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    isImage: {
                        msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setWaitMsg("Please Wait Adding Category ...");
            let formData = new FormData();
            formData.append("categoryName", categoryName);
            formData.append("categoryImgFile", categoryImageFile);
            formData.append("styleName", styleName);
            formData.append("stylePrompt", stylePrompt);
            formData.append("styleNegativePrompt", styleNegativePrompt);
            formData.append("modelName", modelName);
            formData.append("styleImgFile", styleImageFile);
            try {
                const res = await axios.post(`${process.env.BASE_API_URL}/text-to-image/categories/add-new-category`, formData, {
                    headers: {
                        Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                    }
                });
                const result = await res.data;
                setWaitMsg("");
                if (!result.error) {
                    setSuccessMsg(result.msg);
                    let successTimeout = setTimeout(() => {
                        setSuccessMsg("");
                        clearTimeout(successTimeout);
                    }, 2000);
                }
            }
            catch (err) {
                if (err?.response?.data?.msg === "Unauthorized Error") {
                    localStorage.removeItem("tavlorify-store-admin-user-token");
                    await router.push("/admin-dashboard/login");
                    return;
                }
                setWaitMsg("");
                setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
    }

    return (
        <div className="add-new-category">
            <Head>
                <title>Tavlorify Store - Add New Category For Text To Image</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add New Category Page For Text To Image</h1>
                        <form className="add-new-category-form w-50 mx-auto" onSubmit={addNewCategory}>
                            <input
                                type="text"
                                className={`form-control p-2 ${formValidationErrors["categoryName"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter Category Name"
                                onChange={(e) => setCategoryName(e.target.value.trim())}
                            />
                            {formValidationErrors["categoryName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryName"]}</p>}
                            <input
                                type="file"
                                className={`form-control p-2 ${formValidationErrors["categoryImageFile"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter Category Image"
                                onChange={(e) => setCategoryImageFile(e.target.files[0])}
                            />
                            {formValidationErrors["categoryImageFile"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryImageFile"]}</p>}
                            <input
                                type="text"
                                className={`form-control p-2 ${formValidationErrors["styleName"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter The First Style Name"
                                onChange={(e) => setStyleName(e.target.value.trim())}
                            />
                            {formValidationErrors["styleName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["styleName"]}</p>}
                            <textarea
                                style={{ resize: "none" }}
                                className={`form-control p-2 ${formValidationErrors["stylePrompt"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter Style Prompt"
                                onChange={(e) => setStylePrompt(e.target.value.trim())}
                            ></textarea>
                            {formValidationErrors["stylePrompt"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["stylePrompt"]}</p>}
                            <textarea
                                style={{ resize: "none" }}
                                className={`form-control p-2 ${formValidationErrors["styleNegativePrompt"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter Style Negative Prompt"
                                onChange={(e) => setStyleNegativePrompt(e.target.value.trim())}
                            ></textarea>
                            {formValidationErrors["styleNegativePrompt"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["styleNegativePrompt"]}</p>}
                            <select
                                type="text"
                                className={`form-control p-2 ${formValidationErrors["modelName"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setModelName(e.target.value)}
                            >
                                <option hidden value="">Please Select Model Name</option>
                                <option value="dreamshaper">Dreamshaper</option>
                                <option value="stable-diffusion">Stable Diffusion</option>
                                <option value="deliberate-v2">Deliberate</option>
                                <option value="sdxl">Sdxl</option>
                                <option value="openjourney">Openjourney</option>
                            </select>
                            {formValidationErrors["modelName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["modelName"]}</p>}
                            <input
                                type="file"
                                className={`form-control p-2 ${formValidationErrors["styleImageFile"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter Category Image"
                                onChange={(e) => setStyleImageFile(e.target.files[0])}
                            />
                            {formValidationErrors["styleImageFile"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["styleImageFile"]}</p>}
                            {!waitMsg && !errorMsg && !successMsg && <button type="submit" className="btn btn-success w-100 d-block mx-auto">Add Now</button>}
                            {waitMsg && <button type="submit" className="btn btn-warning w-100 d-block mx-auto" disabled>{waitMsg}</button>}
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