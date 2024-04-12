import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import LoaderPage from "@/components/LoaderPage";
import validations from "../../../../public/global_functions/validations";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function ProductPrices({ productName }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [isUpdateProductPriceStatus, setIsUpdateProductPriceStatus] = useState(false);

    const [updatedProductPriceIndex, setUpdatedProductPriceIndex] = useState(-1);

    const [productPricesData, setProductPricesData] = useState([]);

    const [updatedProductPrices, setUpdatedProductPrices] = useState([]);

    useEffect(() => {
        setIsLoadingPage(true);
        const adminToken = localStorage.getItem("tavlorify-store-admin-user-token");
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    } else {
                        setProductPricesData([]);
                        setIsUpdateProductPriceStatus([]);
                        result = await getProductPricesData();
                        setProductPricesData(result.data);
                        setUpdatedProductPrices(result.data);
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    console.log(err)
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
    }, [productName]);

    const getProductPricesData = async () => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-name?productName=${productName}`);
            return res.data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const changeProductPriceBeforeDiscount = (productIndex, newValue) => {
        let updatedProductPricesTemp = updatedProductPrices;
        updatedProductPricesTemp[productIndex].priceBeforeDiscount = Number(newValue);
        setUpdatedProductPrices(updatedProductPricesTemp);
    }

    const changeProductPriceAfterDiscount = (productIndex, newValue) => {
        let updatedProductPricesTemp = updatedProductPrices;
        updatedProductPricesTemp[productIndex].priceAfterDiscount = Number(newValue);
        setUpdatedProductPrices(updatedProductPricesTemp);
    }

    const updateProductPrice = async (productIndex) => {
        try {
            setUpdatedProductPriceIndex(productIndex);
            setIsUpdateProductPriceStatus(true);
            const result = await axios.put(`${process.env.BASE_API_URL}/prices/update-product-price/${productPricesData[productIndex]._id}`, {
                newProductPriceBeforeDiscount: updatedProductPrices[productIndex].priceBeforeDiscount,
                newProductPriceAfterDiscount: updatedProductPrices[productIndex].priceAfterDiscount,
            }, {
                headers: {
                    Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                }
            });
            if (!result.error) {

            }
            setUpdatedProductPriceIndex(-1);
            setIsUpdateProductPriceStatus(false);
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem("tavlorify-store-admin-user-token");
                await router.push("/admin-dashboard/login");
                return;
            }
            setUpdatedProductPriceIndex(-1);
            setIsUpdateProductPriceStatus(false);
        }
    }

    return (
        <div className="product-prices-managment">
            <Head>
                <title>Tavlorify Store - Product Prices Managment</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Prices Managment Page For {productName.toUpperCase()}</h1>
                        {productPricesData.length > 0 && <div className="product-data-box p-3 data-box">
                            <table className="product-data-tabel data-table">
                                <thead>
                                    <tr>
                                        <th>Number</th>
                                        <th>Dimentions</th>
                                        <th>Position</th>
                                        <th>Price Before Discount</th>
                                        <th>Price After Discount</th>
                                        <th>Process</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productPricesData.map((productData, index) => (
                                        <tr key={index}>
                                            <td className="fw-bold">{index + 1}</td>
                                            <td className="product-dimentions-cell">
                                                {productData.dimentions}
                                            </td>
                                            <td className="product-position-cell">{productData.position}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control w-100 p-2 product-price-before-discount"
                                                    defaultValue={productData.priceBeforeDiscount}
                                                    onChange={(e) => changeProductPriceBeforeDiscount(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control w-100 p-2 product-price-after-discount"
                                                    defaultValue={productData.priceAfterDiscount}
                                                    onChange={(e) => changeProductPriceAfterDiscount(index, e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {updatedProductPriceIndex !== index && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    onClick={() => updateProductPrice(index)}
                                                >
                                                    Update
                                                </button>}
                                                {updatedProductPriceIndex === index && isUpdateProductPriceStatus && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    Update Price Now ...
                                                </button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                        {productPricesData.length === 0 && <p className="alert alert-danger">Sorry, Can't Find Any Product Prices !!</p>}
                    </div>
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}

export function getServerSideProps(context) {
    const productName = context.query.productName;
    return {
        props: {
            productName: productName,
        }
    }
}