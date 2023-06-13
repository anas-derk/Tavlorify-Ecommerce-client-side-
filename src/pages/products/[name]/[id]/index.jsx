import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

const ProductInfo = ({ result }) => {

    const [quantity, setQuantity] = useState(1);

    const router = useRouter();

    const addToCart = (e) => {
        e.preventDefault();
        console.log(result);
        let userId = localStorage.setItem("e-commerce-canvas-user-id", router.query.id);
        if (!userId) {
            let productInfoToCart = {
                ...result,
                count: parseInt(quantity),
            }
            let canvasEcommerceProducts = JSON.parse(localStorage.getItem("canvas-ecommerce-products"));
            if (canvasEcommerceProducts) {
                canvasEcommerceProducts.push(productInfoToCart);
                localStorage.setItem("canvas-ecommerce-products", JSON.stringify(canvasEcommerceProducts));
            } else {
                let canvasEcommerceProductsList = [];
                canvasEcommerceProductsList.push(productInfoToCart);
                localStorage.setItem("canvas-ecommerce-products", JSON.stringify(canvasEcommerceProductsList));
            }
        }
    }

    return (
        // Start Product Info Page
        <div className="product-info">
            <Head>
                <title>Tavlorify Store - Product Info</title>
            </Head>
            <Header />
            <div className="page-content">
                <div className="overlay">
                    {/* Start Container From Bootstrap */}
                    <div className="container pt-4 pb-4">
                        <h1 className="text-center welcome-msg mb-4">Hello To You In Product Info Page</h1>
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
                                    <div className="product-details-box p-4">
                                        <h3 className="text-center">Product Details:</h3>
                                        <h5 className="mb-3">Product Name: {result.name}</h5>
                                        <h5>Product Type: {result.type}</h5>
                                        <h5>Product Dimentions: {result.dimentions}</h5>
                                        <h5 className="mb-4">Product Price: {result.price} $</h5>
                                        <form className="add-to-cart-form" onSubmit={addToCart}>
                                            <input
                                                type="number"
                                                className="form-control mb-4 p-3"
                                                placeholder="Please Enter Quantity"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="btn btn-success w-100 p-3">Add To Cart</button>
                                        </form>
                                    </div>
                                    {/* End Product Details Box */}
                                </div>
                                {/* End Column */}
                            </div>
                            /* End Grid System */
                            : <p className="alert alert-danger">Sorry This Product It Not Found !!!</p>}
                    </div>
                    {/* End Container From Bootstrap */}
                </div>
            </div>
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