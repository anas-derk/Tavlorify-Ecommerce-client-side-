import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import validations from "../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";

export default function AddNewCategoryStyle() {

    const categoriesData = ["Man", "Pojke", "Kvinna", "Flicka"];

    const styleImagesData = [
        { formValidationKey: "verticalStyleImage", orientation: "Vertical"},
        { formValidationKey: "horizontalStyleImage", orientation: "Horizontal" },
        { formValidationKey: "squareStyleImage", orientation: "Square" },
    ];

    const [categoryName, setCategoryName] = useState("");

    const [styleImageFiles, setStyleImageFiles] = useState({ vertical: "", horizontal: "", square: "" });

    const [isAddingStatus, setIsAddingStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [isErrorStatus, setIsErrorStatus] = useState(false);

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        }
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
                            msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
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
                            msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
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
                            msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
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
                            msg: "عذراً ، يجب أن يكون الملف أو الملفات صور من امتداد png أو jpg !!"
                        },
                    },
                },
            ]);
            setFormValidationErrors(errorsObject);
            if (Object.keys(errorsObject).length == 0) {
                let formData = new FormData();
                formData.append("categoryName", categoryName);
                for(let styleImageData of styleImagesData) {
                    formData.append(styleImageData.formValidationKey, styleImageFiles[styleImageData.orientation]);
                }
                setIsAddingStatus(true);
                const res = await axios.post(`${process.env.BASE_API_URL}/image-to-image/styles/add-new-style`, formData);
                const result = await res.data;
                if (result === "Adding New Category Style For Image To Image Page Process Is Succesfuly !!") {
                    setIsAddingStatus(false);
                    setIsSuccessStatus(true);
                    let successTimeout = setTimeout(() => {
                        setIsSuccessStatus(false);
                        clearTimeout(successTimeout);
                    }, 2000);
                }
            }
        }
        catch (err) {
            setIsErrorStatus(true);
            let errorTimeout = setTimeout(() => {
                setIsErrorStatus(false);
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    return (
        <div className="add-new-style">
            <Head>
                <title>Tavlorify Store - Add New Category Style For Face Swap</title>
            </Head>
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
                                <option value={index} key={index}>{category}</option>
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
                                            vertical: styleImageData.orientation === "Vertical" ? e.target.files[0] : "",
                                            horizontal: styleImageData.orientation === "Horizontal" ? e.target.files[0] : "",
                                            square: styleImageData.orientation === "Square" ? e.target.files[0] : "",
                                        }
                                    )}
                                />
                                {formValidationErrors[styleImageData.formValidationKey] && <p className='error-msg text-danger mb-2'>{formValidationErrors[styleImageData.formValidationKey]}</p>}
                            </div>
                        ))}
                        {!isAddingStatus && !isErrorStatus && !isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto">Add Now</button>}
                        {isAddingStatus && <button type="submit" className="btn btn-warning w-100 d-block mx-auto" disabled>Adding Now ...</button>}
                        {isErrorStatus && <button type="submit" className="btn btn-danger w-100 d-block mx-auto" disabled>Sorry, Someting Went Wrong, Please Try Again</button>}
                        {isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto" disabled>Adding Process Is Successfuly !!</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}