import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from "axios";
import Link from "next/link";

const Cart = () => {
    const [canvasEcommerceProductsList, setCanvasEcommerceProductsList] = useState([]);
    const [isWaitOrdering, setIsWaitOrdering] = useState(false);
    const [productOrderedID, setProductOrderedID] = useState("");
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let canvasEcommerceProducts = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (canvasEcommerceProducts) {
            setCanvasEcommerceProductsList(canvasEcommerceProducts);
            let total = 0;
            canvasEcommerceProducts.forEach((product) => {
                total += product.price * product.count;
            });
            setTotal(total);
        }
    }, []);
    const orderProduct = async (productInfo) => {
        const orderDetails = {
            purchase_country: "SE",
            purchase_currency: "SEK",
            locale: "sv-SE",
            order_amount: Number(productInfo.count) * productInfo.price * 100,
            order_tax_amount: 0,
            order_lines: [
                {
                    type: "physical",
                    reference: productInfo._id,
                    name: "Art Painting",
                    quantity: Number(productInfo.count),
                    quantity_unit: "pcs",
                    unit_price: productInfo.price * 100,
                    tax_rate: 0,
                    total_amount: Number(productInfo.count) * productInfo.price * 100,
                    total_discount_amount: 0,
                    total_tax_amount: 0,
                }
            ],
            merchant_urls: {
                terms: `${process.env.BASE_API_URL}/terms`,
                checkout: "https://www.example.com/checkout/{checkout.order.id}",
                confirmation: "https://www.example.com/confirmation.html?order_id={checkout.order.id}",
                push: "https://www.example.com/api/push?order_id={checkout.order.id}"
            }
        }
        try {
            setIsWaitOrdering(true);
            setProductOrderedID(productInfo._id);
            const res = await Axios.post(`${process.env.BASE_API_URL}/orders/send-order-to-klarna`, orderDetails);
            const result = await res.data;
            setIsWaitOrdering(false);
            setProductOrderedID("");
            window.open(`/checkout/${result.order_id}`, "_blank");
        }
        catch (err) {
            setIsWaitOrdering(false);
            setProductOrderedID("");
            console.log(err.response.data);
        }
    }
    const deleteProduct = (id) => {
        let canvasEcommerceUserCart = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        canvasEcommerceUserCart = canvasEcommerceUserCart.filter((product) => product._id != id);
        localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(canvasEcommerceUserCart));
        setCanvasEcommerceProductsList(canvasEcommerceUserCart);
    }
    const deleteAllProductsFromCart = () => {
        localStorage.removeItem("tavlorify-store-user-cart");
        setCanvasEcommerceProductsList([]);
    }
    return (
        // Start Cart Page
        <div className="cart">
            <Head>
                <title>Tavlorify Store - Cart</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container-fluid pt-4 pb-4">
                <h1 className="text-center mb-5 fw-bold welcome-msg mx-auto pb-3">Hello To You In Cart Page</h1>
                {canvasEcommerceProductsList.length > 0 ? <table className="products-table mb-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Frame Color</th>
                            <th>dimentions</th>
                            <th>price</th>
                            <th>Image</th>
                            <th>Count</th>
                            <th>Total Price</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canvasEcommerceProductsList.map((productInfo, index) => (
                            <tr key={index}>
                                <td className="product-name-cell">
                                    {productInfo.name}
                                </td>
                                <td>
                                    {productInfo.type}
                                </td>
                                <td>
                                    {productInfo.frameColor}
                                </td>
                                <td>
                                    {productInfo.dimentions} cm
                                </td>
                                <td className="product-price-cell">
                                    {productInfo.price}
                                </td>
                                <td className="product-image-cell">
                                    <img src={`${productInfo.imageSrc}`} alt={`${productInfo.name}`} width="100" height="100" />
                                </td>
                                <td className="product-count-cell">
                                    {productInfo.count}
                                </td>
                                <td className="total-price-cell">
                                    {productInfo.price * productInfo.count}
                                </td>
                                <td className="proceses-cell">
                                    <button
                                        className="btn btn-danger d-block mx-auto mb-3"
                                        onClick={() => deleteProduct(productInfo._id)}
                                    >
                                        Delete
                                    </button>
                                    {!isWaitOrdering && <button
                                        className="btn btn-success"
                                        onClick={() => orderProduct(productInfo)}
                                    >
                                        Order
                                    </button>}
                                    {isWaitOrdering && productOrderedID === productInfo._id && <button
                                        className="btn btn-danger"
                                        disabled
                                    >
                                        Waiting Order ...
                                    </button>}
                                </td>
                            </tr>
                        ))}
                        {canvasEcommerceProductsList.length >= 2 && <tr>
                            <td colSpan={8}>
                                total: {total}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger d-block mx-auto mb-3"
                                    onClick={deleteAllProductsFromCart}
                                >
                                    Delete All
                                </button>
                            </td>
                        </tr>}
                    </tbody>
                </table> : <p className="alert alert-danger">Sorry, Not Found Any Products Added To Your Cart !!</p>}
            </div>
            {/* End Container From Bootstrap */}
        </div >
        // End Cart Page
    );
}

export default Cart;