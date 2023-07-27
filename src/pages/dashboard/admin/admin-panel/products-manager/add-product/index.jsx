import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import text_to_image_data from "../../../../../../../public/data/global";
import Axios from "axios";

const AddProduct = () => {

    const router = useRouter();
    const [file, setFile] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productDimetionsType, setProductDimetionsType] = useState("");
    const [productDimetions, setProductDimetions] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [waitMsg, setWaitMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    const addProduct = async (e) => {
        e.preventDefault();
        let productData = new FormData();
        productData.append("imageSrc", file);
        productData.append("name", productName);
        productData.append("type", productType);
        productData.append("dimentions", productDimetions);
        productData.append("price", productPrice);
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
                        <div className="file-box p-3 mb-4 bg-white">
                            <h6 className="fw-bold">Please Upload Product Image</h6>
                            <input
                                type="file"
                                required
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <h6 className="fw-bold">Please Enter Product Name</h6>
                        <input
                            type="text"
                            placeholder="product name"
                            className="form-control mb-3"
                            required
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <h6 className="fw-bold">Please Select Product Type</h6>
                        <select
                            className="form-control mb-3"
                            required
                            onChange={(e) => setProductType(e.target.value)}
                        >
                            <option value="" hidden>Product Type</option>
                            <option value="canvas-prints">Canvas Prints</option>
                            <option value="framed-prints">Framed Prints</option>
                        </select>
                        <h6 className="fw-bold">Please Select Product Type Dimentions</h6>
                        <select
                            className="form-control mb-3"
                            required
                            onChange={(e) => setProductDimetionsType(e.target.value)}
                        >
                            <option value="" hidden>Select Product Type Dimentions</option>
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="square">Square</option>
                        </select>
                        {productDimetionsType && <>
                            <h6 className="fw-bold">Please Select Product Dimentions</h6>
                            <select
                                className="form-control mb-3"
                                required
                                onChange={(e) => setProductDimetions(e.target.value)}
                            >
                                <option value="" hidden>Select Product Dimentions</option>
                                {text_to_image_data.allDimetions[productDimetionsType].map((dimentions, index) => (
                                    <option value={dimentions} key={index}>{dimentions}</option>
                                ))}
                            </select>
                        </>}
                        <h6 className="fw-bold">Please Enter Product Price</h6>
                        <input
                            type="number"
                            placeholder="product price"
                            className="form-control mb-4"
                            required
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
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