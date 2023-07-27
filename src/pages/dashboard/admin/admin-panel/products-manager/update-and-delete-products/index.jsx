import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const ProductsProcess = () => {

    const router = useRouter();

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [productsData, setProductsData] = useState([]);

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/products/all-products`)
                .then((res) => {
                    let result = res.data;
                    if (typeof result === "string") {
                        setErrorMsg(result);
                    } else {
                        setProductsData(result);
                    }
                })
                .catch((err) => setErrorMsg(err));
        }
    }, []);

    const changeProductName = (productIndex, newValue) => {
        let productsDataTemp = productsData;
        productsDataTemp[productIndex].name = newValue;
        setProductsData(productsDataTemp);
    }

    const changeProductPrice = (productIndex, newValue) => {
        let productsDataTemp = productsData;
        productsDataTemp[productIndex].price = newValue;
        setProductsData(productsDataTemp);
    }

    const updateProduct = (productIndex) => {
        setIsWaitStatus(true);
        Axios.put(`${process.env.BASE_API_URL}/products/${productsData[productIndex]._id}`, {
            name: productsData[productIndex].name,
            price: productsData[productIndex].price,
        })
            .then((res) => {
                if (typeof res.data !== "string") {
                    setTimeout(() => {
                        setIsWaitStatus(false);
                        router.reload();
                    }, 1500);
                }
            })
            .catch((err) => setErrorMsg(err));
    }

    const deleteProduct = (productId) => {
        setIsWaitStatus(true);
        Axios.delete(`${process.env.BASE_API_URL}/products/${productId}`)
            .then((res) => {
                setTimeout(() => {
                    setIsWaitStatus(false);
                    router.reload();
                }, 1500);
            })
            .catch((err) => setErrorMsg(err));
    }

    return (
        <div className="update-and-delete-products text-center">
            <Head>
                <title>Tavlorify Store - Update And Delete Products</title>
            </Head>
            <ControlPanelHeader />
            <section className="content pt-3">
                <div className="container-fluid">
                    <h1 className="welcome-msg fw-bold mx-auto pb-3 mb-4">Hello To You In Update And Delete Products Page</h1>
                    {productsData.length > 0 ? <div className="products-box">
                        <table className="products-table mb-4">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>dimentions</th>
                                    <th>price</th>
                                    <th>Image</th>
                                    <th>Process</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsData.map((product, index) => (
                                    <tr key={product._id}>
                                        <td className="product-name-cell">
                                            <input
                                                placeholder="Enter New Product Name"
                                                defaultValue={product.name}
                                                className="p-2"
                                                onChange={(e) => changeProductName(index, e.target.value.trim())}
                                            ></input>
                                        </td>
                                        <td>
                                            {product.type}
                                        </td>
                                        <td>
                                            {product.dimentions}
                                        </td>
                                        <td className="product-price-cell">
                                            <input
                                                placeholder="Enter New Product Price"
                                                defaultValue={product.price}
                                                className="p-2"
                                                onChange={(e) => changeProductPrice(index, e.target.value.trim())}
                                            ></input>
                                        </td>
                                        <td className="product-image-cell">
                                            <img src={`${process.env.BASE_API_URL}/${product.imageSrc}`} alt="Product Image !!" width="100" height="100" />
                                        </td>
                                        <td className="update-cell">
                                            {!isWaitStatus && <>
                                                <button
                                                    className="btn btn-warning d-block mb-3 mx-auto"
                                                    onClick={() => updateProduct(index)}
                                                >Update</button>
                                                <hr />
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteProduct(product._id)}
                                                >Delete</button>
                                            </>}
                                            {isWaitStatus && <button
                                                className="btn btn-info d-block mb-3 mx-auto"
                                            >Please Waiting</button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : <p className="alert alert-danger w-50 mx-auto">Sorry, Not Found Any Products !!</p>}
                </div>
            </section>
        </div>
    );
}

export default ProductsProcess;