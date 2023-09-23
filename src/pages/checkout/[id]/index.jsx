import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Checkout = () => {
    const [canvasEcommerceProductsList, setCanvasEcommerceProductsList] = useState([]);
    const [isWaitOrdering, setIsWaitOrdering] = useState(false);
    const [productOrderedID, setProductOrderedID] = useState("");
    const [total, setTotal] = useState(0);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        let canvasEcommerceProducts = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (canvasEcommerceProducts) {
            setCanvasEcommerceProductsList(canvasEcommerceProducts);
            let total = 0;
            canvasEcommerceProducts.forEach((product) => {
                total += product.price * product.quantity;
            });
            setTotal(total);
        }
        if (id) {
            getKlarnaOrderDetails(id)
                .then((result) => {
                    renderKlarnaCheckoutHtmlSnippetFromKlarnaCheckoutAPI(result.html_snippet);
                }).catch((err) => console.log(err));
        }
    }, [id]);
    const getKlarnaOrderDetails = async (orderId) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/orders/order-details-from-klarna/${orderId}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }
    const renderKlarnaCheckoutHtmlSnippetFromKlarnaCheckoutAPI = (htmlSnippet) => {
        try {
            let checkoutContainer = document.getElementById("my-checkout-container");
            checkoutContainer.innerHTML = htmlSnippet;
            let scriptsTags = checkoutContainer.getElementsByTagName("script");
            for (let i = 0; i < scriptsTags.length; i++) {
                let parentNode = scriptsTags[i].parentNode;
                let newScriptTag = document.createElement("script");
                newScriptTag.type = "text/javascript";
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
            }
        }
        catch (err) {
            throw Error(err);
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
        // Start Checkout Page
        <div className="checkout">
            <Head>
                <title>Tavlorify Store - Checkout</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container-fluid pt-4 pb-4">
                <h1 className="text-center mb-5 fw-bold welcome-msg mx-auto pb-3">Hello To You In Checkout Page</h1>
                {canvasEcommerceProductsList.length > 0 ? <table className="products-table mb-4">
                    <thead>
                        <tr>
                            <th>Painting Type</th>
                            <th>Frame Color</th>
                            <th>position</th>
                            <th>dimentions</th>
                            <th>is Exist White Border</th>
                            <th>price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Image</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canvasEcommerceProductsList.map((productInfo, index) => (
                            <tr key={index}>
                                <td>
                                    {productInfo.paintingType}
                                </td>
                                <td>
                                    {productInfo.frameColor}
                                </td>
                                <td>
                                    {productInfo.position}
                                </td>
                                <td>
                                    {productInfo.size} cm
                                </td>
                                <td>
                                    {productInfo.isExistWhiteBorder}
                                </td>
                                <td className="product-price-cell">
                                    {productInfo.price}
                                </td>
                                <td className="product-count-cell">
                                    {productInfo.quantity}
                                </td>
                                <td className="total-price-cell">
                                    {productInfo.price * productInfo.quantity}
                                </td>
                                <td className="product-image-cell">
                                    <img src={`${productInfo.generatedImageURL}`} alt={`${productInfo._id}`} width="100" height="100" />
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
                            <td colSpan={9}>
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
            <div id="my-checkout-container"></div>
        </div >
        // End Checkout Page
    );
}

export default Checkout;