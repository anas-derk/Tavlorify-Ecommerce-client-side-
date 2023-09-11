import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import { useState } from "react";

const ProductPrices = ({ productName, productsData }) => {

    const [isUpdateProductPriceStatus, setIsUpdateProductPriceStatus] = useState(false);

    const [updatedProductPriceIndex, setUpdatedProductPriceIndex] = useState(-1);

    const changeProductPriceBeforeDiscount = (productIndex, newValue) => {
        console.log(productIndex, newValue);
    }

    const changeProductPriceAfterDiscount = (productIndex, newValue) => {
        console.log(productIndex, newValue);
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
                                                type="number"
                                                className="form-control w-100 p-2 product-price-before-discount"
                                                value={productData.priceBeforeDiscount}
                                                onClick={(e) => changeProductPriceBeforeDiscount(index, e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control w-100 p-2 product-price-after-discount"
                                                value={productData.priceAfterDiscount}
                                                onClick={(e) => changeProductPriceAfterDiscount(index, e.target.value)}
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
        console.log(productsData);
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