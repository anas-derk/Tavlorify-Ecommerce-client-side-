import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";

const Orders = () => {
    const [canvasEcommerceUserOrdersList, setCanvasEcommerceUserOrdersList] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        let canvasEcommerceUserOrders = JSON.parse(localStorage.getItem("canvas-ecommerce-user-orders"));
        if (canvasEcommerceUserOrders) {
            setCanvasEcommerceUserOrdersList(canvasEcommerceUserOrders);
            let total = 0;
            canvasEcommerceUserOrders.forEach((product) => {
                total += product.price * product.count;
            });
            setTotal(total);
        }
    }, []);
    return (
        // Start Orders Page
        <div className="orders">
            <Head>
                <title>Tavlorify Store - Orders</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container pt-4 pb-4">
                <h1 className="text-center mb-4">Hello To You In Orders Page</h1>
                {canvasEcommerceUserOrdersList.length > 0 ? <table className="products-table mb-4">
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
                        </tr>
                    </thead>
                    <tbody>
                        {canvasEcommerceUserOrdersList.map((productInfo, index) => (
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
                                    {productInfo.dimentions}
                                </td>
                                <td className="product-price-cell">
                                    {productInfo.price}
                                </td>
                                <td className="product-image-cell">
                                    <img src={`${process.env.BASE_API_URL}/${productInfo.imageSrc}`} alt={`${productInfo.name}`} width="100" height="100" />
                                </td>
                                <td className="product-count-cell">
                                    {productInfo.count}
                                </td>
                                <td className="total-price-cell">
                                    {productInfo.price * productInfo.count}
                                </td>
                            </tr>
                        ))}
                        {canvasEcommerceUserOrdersList.length >= 2 && <tr>
                            <td colSpan={7}>
                                total: { total }
                            </td>
                        </tr>}
                    </tbody>
                </table> : <p className="alert alert-danger">Sorry, Not Found Any Products Added To Your Cart !!</p>}
            </div>
            {/* End Container From Bootstrap */}
        </div >
        // End Orders Page
    );
}

export default Orders;