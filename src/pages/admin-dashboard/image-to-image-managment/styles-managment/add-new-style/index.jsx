import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import validations from "../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { addNewStyleToCategoryInSpecificService, getAdminInfo, getAllCategoriesForService } from "../../../../../../public/global_functions/popular";

export default function AddNewStyle() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryName, setCategoryName] = useState("");

    const [styleName, setStyleName] = useState("");

    const [stylePrompt, setStylePrompt] = useState("");

    const [styleNegativePrompt, setStyleNegativePrompt] = useState("");

    const [ddimSteps, setDdimSteps] = useState("");

    const [strength, setStrength] = useState("");

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
                        setCategoriesData((await getAllCategoriesForService("image-to-image")).data);
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
    }, []);

    const addNewStyle = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        const errorsObject = inputValuesValidation([
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
                name: "ddimSteps",
                value: ddimSteps,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "strength",
                value: strength,
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
                        msg: "Sorry, Invalid Image Type, Please Upload JPG Or PNG Or Webp Image File !!"
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            let formData = new FormData();
            formData.append("categoryName", categoryName);
            formData.append("styleName", styleName);
            formData.append("stylePrompt", stylePrompt);
            formData.append("styleNegativePrompt", styleNegativePrompt);
            formData.append("ddim_steps", ddimSteps);
            formData.append("strength", strength);
            formData.append("service", "image-to-image");
            formData.append("styleImgFile", styleImageFile);
            setWaitMsg("Please Wait To Adding New Style ...");
            try {
                const result = await addNewStyleToCategoryInSpecificService(formData);
                setWaitMsg("");
                if (!result.error) {
                    setSuccessMsg(result.msg);
                    let successTimeout = setTimeout(() => {
                        setSuccessMsg("");
                        clearTimeout(successTimeout);
                    }, 2000);
                } else {
                    setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
                    let errorTimeout = setTimeout(() => {
                        setErrorMsg("");
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
                        clearTimeout(errorTimeout);
                    }, 1500);
                }
            }
        }
    }

    return (
        <div className="add-new-style">
            <Head>
                <title>Tavlorify Store - Add New Category Style For Image To Image</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add New Category Style Page For Image To Image</h1>
                        <form className="add-new-category-form w-50 mx-auto mb-4" onSubmit={addNewStyle}>
                            <select
                                className={`form-control p-2 ${formValidationErrors["categoryName"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => { setCategoryName(e.target.value.trim()); }}
                            >
                                <option defaultValue="" hidden>Select The Category</option>
                                {categoriesData.map((category, index) => (
                                    <option value={category.name} key={index}>{category.name}</option>
                                ))}
                            </select>
                            {formValidationErrors["categoryName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["categoryName"]}</p>}
                            <input
                                type="text"
                                className={`form-control p-2 ${formValidationErrors["styleName"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter Style Name"
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
                            <input
                                type="text"
                                className={`form-control p-2 ${formValidationErrors["ddimSteps"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter The Ddim Steps"
                                onChange={(e) => setDdimSteps(e.target.value.trim())}
                            />
                            {formValidationErrors["ddimSteps"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["ddimSteps"]}</p>}
                            <input
                                type="text"
                                className={`form-control p-2 ${formValidationErrors["strength"] ? "border border-danger mb-2" : "mb-4"}`}
                                placeholder="Please Enter The Strength"
                                onChange={(e) => setStrength(e.target.value.trim())}
                            />
                            {formValidationErrors["strength"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["strength"]}</p>}
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
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div>
    );
}