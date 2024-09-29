import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo } from "../../../../public/global_functions/popular";
import { useRouter } from "next/router";
import NotFoundError from "@/components/NotFoundError";

export default function ProductPrices({ productName }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const [waitMsg, setWaitMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [selectedProductPriceIndex, setSelectedProductPriceIndex] = useState(-1);

    const [productPricesData, setProductPricesData] = useState([]);

    const [updatedProductPrices, setUpdatedProductPrices] = useState([]);

    const router = useRouter();

    useEffect(() => {
        setIsLoadingPage(true);
        setProductPricesData([]);
        setWaitMsg([]);
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    } else {
                        result = await getProductPricesData();
                        setProductPricesData(result.data);
                        setUpdatedProductPrices(result.data);
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
    }, [productName]);

    const getProductPricesData = async () => {
        try {
            return (await axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-name?productName=${productName}`)).data;
        }
        catch (err) {
            throw err;
        }
    }

    const changeProductPrice = (productIndex, name, newValue) => {
        let updatedProductPricesTemp = updatedProductPrices;
        updatedProductPricesTemp[productIndex][name] = Number(newValue);
        setUpdatedProductPrices(updatedProductPricesTemp);
    }

    const updateProductPrice = async (productIndex) => {
        try {
            setWaitMsg("Please Wait To Updating ...");
            setSelectedProductPriceIndex(productIndex);
            const result = await axios.put(`${process.env.BASE_API_URL}/prices/update-product-price/${productPricesData[productIndex]._id}`, {
                newProductPriceBeforeDiscount: updatedProductPrices[productIndex].priceBeforeDiscount,
                newProductPriceAfterDiscount: updatedProductPrices[productIndex].priceAfterDiscount,
            }, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Updating Successfull !!");
                let successTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    setSelectedProductPriceIndex(-1);
                    clearTimeout(successTimeout);
                }, 3000);
            } else {
                setSelectedProductPriceIndex(-1);
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
                    setSelectedProductPriceIndex(-1);
                    clearTimeout(errorTimeout);
                }, 1500);
            }
        }
    }

    return (
        <div className="product-prices-managment">
            <Head>
                <title>Tavlorify Store - Product Prices Managment</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
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
                                    {productPricesData.map((productData, productIndex) => (
                                        <tr key={productIndex}>
                                            <td className="fw-bold">{productIndex + 1}</td>
                                            <td className="product-dimentions-cell">
                                                {productData.dimentions}
                                            </td>
                                            <td className="product-position-cell">{productData.position}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control w-100 p-2 product-price-before-discount"
                                                    defaultValue={productData.priceBeforeDiscount}
                                                    onChange={(e) => changeProductPrice(productIndex, "priceBeforeDiscount", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control w-100 p-2 product-price-after-discount"
                                                    defaultValue={productData.priceAfterDiscount}
                                                    onChange={(e) => changeProductPrice(productIndex, "priceAfterDiscount", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {selectedProductPriceIndex !== productIndex && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    onClick={() => updateProductPrice(productIndex)}
                                                >
                                                    Update
                                                </button>}
                                                {selectedProductPriceIndex === productIndex && waitMsg && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {waitMsg}
                                                </button>}
                                                {successMsg && productIndex === selectedProductPriceIndex && <button
                                                    className="btn btn-success d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {successMsg}
                                                </button>}
                                                {errorMsg && productIndex === selectedProductPriceIndex && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {errorMsg}
                                                </button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                        {productPricesData.length === 0 && <NotFoundError errorMsg="Sorry, Can't Find Any Product Prices !!" />}
                    </div>
                </div>
            </>}
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div>
    );
}

export function getServerSideProps(context) {
    const productName = context.query.productName;
    return {
        props: {
            productName,
        }
    }
}