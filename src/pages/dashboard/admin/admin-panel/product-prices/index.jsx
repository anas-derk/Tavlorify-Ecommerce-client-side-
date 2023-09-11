import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import { useEffect, useState } from "react";

const ProductPrices = ({ productName, productsData }) => {

    const [isUpdateProductPriceStatus, setIsUpdateProductPriceStatus] = useState(false);

    const [updatedProductPriceIndex, setUpdatedProductPriceIndex] = useState(-1);

    const [updatedProductPrices, setUpdatedProductPrices] = useState([]);

    useEffect(() => {
        setUpdatedProductPrices(productsData);
    }, []);

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

    const updatePriceNow = async (productIndex) => {
        setUpdatedProductPriceIndex(productIndex);
        setIsUpdateProductPriceStatus(true);
        try {
            await Axios.put(`${process.env.BASE_API_URL}/prices/update-product-price/${productsData[productIndex]._id}`, {
                newProductPriceBeforeDiscount: updatedProductPrices[productIndex].priceBeforeDiscount,
                newProductPriceAfterDiscount: updatedProductPrices[productIndex].priceAfterDiscount,
            });
            setUpdatedProductPriceIndex(-1);
            setIsUpdateProductPriceStatus(false);
        }
        catch(err) {
            setUpdatedProductPriceIndex(-1);
            setIsUpdateProductPriceStatus(false);
            console.log(err);
        }
    }

    return (
        <div className="product-prices">
            <Head>
                <title>Tavlorify Store - Product Prices</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Prices Page For { productName.toUpperCase() }</h1>
                    {productsData.length > 0 && <div className="product-data-box p-3">
                        <table className="product-data-tabel">
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
                                {productsData.map((productData, index) => (
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
                                                onClick={() => updatePriceNow(index)}
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
                    {productsData.length === 0 && <p className="alert alert-danger">Sorry, Can't Find Any Product Prices !!</p>}
                </div>
            </div>
        </div>
    );
}

export default ProductPrices;

export async function getServerSideProps(context) {
    const productName = context.query.productName;
    try {
        const res = await Axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-name?productName=${productName}`);
        const productsData  = await res.data;
        return {
            props: {
                productName: productName,
                productsData: productsData,
            }
        }
    }
    catch (err) {
        return {
            props: {
                productName: productName,
                productsData: [],
            }
        }
    }
}