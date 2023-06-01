import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from "axios";

const ProductInfo = ({ result }) => {
    useEffect(() => {
        console.log(result)
    }, []);
    return (
        // Start Product Info Page
        <div className="product-info bg-info">
            <Head>
                <title>Tavlorify Store - Product Info</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container pt-4 pb-4">
                {typeof result === "object" ?
                    /* Start Grid System */
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-md-2">
                            aaa
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-5">
                            <div className="product-image-box">
                                <img src={`${process.env.BASE_API_URL}/${result.imageSrc}`} alt={result.name} className="product-image mb-3 canvas-prints-image prints-image" />
                            </div>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-5">
                            {/* Start Product Details Box */}
                            <div className="product-details-box bg-white border border-2 p-4 pb-5 pt-5">
                                <h3 className="text-center">Product Details:</h3>
                                <h5 className="mb-3">Product Name: { result.name }</h5>
                                <h5>Product Type: { result.type }</h5>
                                <h5>Product Dimentions: { result.dimentions }</h5>
                                <h5 className="mb-4">Product Price: { result.price } $</h5>
                                <button className="btn btn-success w-100">Add To Cart</button>
                            </div>
                            {/* End Product Details Box */}
                        </div>
                        {/* End Column */}
                    </div>
                    /* End Grid System */
                    : <p className="alert alert-danger">Sorry This Product It Not Found !!!</p>}
            </div>
            {/* End Container From Bootstrap */}
        </div >
        // End Product Info Page
    );
}

export async function getServerSideProps(context) {
    let productId = context.params.id;
    let res = await Axios.get(`${process.env.BASE_API_URL}/products/product-info/${productId}`);
    let result = await res.data;
    return {
        props: {
            result,
        },
    }
}

export default ProductInfo;