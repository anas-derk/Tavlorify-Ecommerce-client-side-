import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import text_to_image_data from "../../../../../../../public/data/global";
import Axios from "axios";
import validations from "../../../../../../../public/global_functions/validations";

const AddProduct = () => {

    const router = useRouter();
    const [file, setFile] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productDimetionsType, setProductDimetionsType] = useState("");
    const [productDimetions, setProductDimetions] = useState("");
    const [productPrice, setProductPrice] = useState("0.0");
    const [waitMsg, setWaitMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [formValidationErrors, setFormValidationErrors] = useState({});

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    const addProduct = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "file",
                value: file,
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
                name: "productName",
                value: productName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "productType",
                value: productType,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "productDimetionsType",
                value: productDimetionsType,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "productDimetions",
                value: productDimetions,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "productPrice",
                value: productPrice,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            let productData = new FormData();
            productData.append("imageSrc", file);
            productData.append("name", productName);
            productData.append("type", productType);
            productData.append("dimentions", productDimetions);
            productData.append("price", );
            setWaitMsg("please wait ...");
            try {
                let res = await Axios.post(`${process.env.BASE_API_URL}/products/add-new-product`, productData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                let result = await res.data;
                setTimeout(() => {
                    setWaitMsg("");
                    setSuccessMsg(result);
                    setTimeout(() => {
                        setSuccessMsg("");
                    }, 2000);
                }, 1500);
            }
            catch (err) {
                setTimeout(() => {
                    setWaitMsg("");
                    setErrorMsg(result);
                    setTimeout(() => {
                        setErrorMsg("");
                    }, 2000);
                }, 1500);
            }
        }
    }
    return (
        // Start Add Product Page
        <div className="add-product">
            <Head>
                <title>Tavlorify Store - Add Product</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add Product Page</h1>
                    <form className="add-product-form w-50 mx-auto" onSubmit={addProduct}>
                        <div
                            className={`file-box p-3 bg-white form-control ${formValidationErrors["file"] ? "border border-danger mb-2" : "mb-2"}`}
                        >
                            <h6 className="fw-bold">Please Upload Product Image</h6>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        {formValidationErrors["file"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["file"]}</p>}
                        <h6 className="fw-bold">Please Enter Product Name</h6>
                        <input
                            type="text"
                            placeholder="product name"
                            className={`form-control p-2 ${formValidationErrors["productName"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setProductName(e.target.value.trim())}
                        />
                        {formValidationErrors["productName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["productName"]}</p>}
                        <h6 className="fw-bold">Please Select Product Type</h6>
                        <select
                            className={`form-control p-2 ${formValidationErrors["productType"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setProductType(e.target.value)}
                        >
                            <option value="" hidden>Product Type</option>
                            <option value="canvas-prints">Canvas Prints</option>
                            <option value="framed-prints">Framed Prints</option>
                        </select>
                        {formValidationErrors["productType"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["productType"]}</p>}
                        <h6 className="fw-bold">Please Select Product Type Dimentions</h6>
                        <select
                            className={`form-control p-2 ${formValidationErrors["productDimetionsType"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setProductDimetionsType(e.target.value)}
                        >
                            <option value="" hidden>Select Product Type Dimentions</option>
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="square">Square</option>
                        </select>
                        {formValidationErrors["productDimetionsType"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["productDimetionsType"]}</p>}
                        {productDimetionsType && <>
                            <h6 className="fw-bold">Please Select Product Dimentions</h6>
                            <select
                                className={`form-control p-2 ${formValidationErrors["productDimetions"] ? "border border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setProductDimetions(e.target.value)}
                            >
                                <option value="" hidden>Select Product Dimentions</option>
                                {text_to_image_data.allDimetions[productDimetionsType].map((dimentions, index) => (
                                    <option value={dimentions} key={index}>{dimentions}</option>
                                ))}
                            </select>
                            {formValidationErrors["productDimetions"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["productDimetions"]}</p>}
                        </>}
                        <h6 className="fw-bold">Please Enter Product Price</h6>
                        <input
                            type="number"
                            placeholder="product price"
                            className={`form-control p-2 ${formValidationErrors["productPrice"] ? "border border-danger mb-2" : "mb-4"}`}
                            onChange={(e) => setProductPrice(e.target.value)}
                            defaultValue={productPrice}
                        />
                        {formValidationErrors["productPrice"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["productPrice"]}</p>}
                        {!waitMsg && !errorMsg && !successMsg && <button type="submit" className="btn btn-success w-100 p-2">Add Product</button>}
                        {waitMsg && <button className="btn btn-warning w-100" disabled>Wait</button>}
                        {errorMsg && <p className="alert alert-danger mt-4">{waitMsg}</p>}
                        {successMsg && <p className="alert alert-success mt-4">{successMsg}</p>}
                    </form>
                </div>
            </section>
            {/* End Content Section */}
        </div>
        // End Add Product Page
    );
}

export default AddProduct;