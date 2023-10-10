import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";

const OrderDetails = () => {
    const [orderDetails, setOrderDetails] = useState({});
    const router = useRouter();
    const { orderId } = router.query;
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            if (orderId) {
                getOrderDetails(orderId)
                    .then((result) => {
                        setOrderDetails(result);
                    });
            }
        }
    }, [orderId]);
    const getOrderDetails = async (orderId) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/orders/order-details/${orderId}`);
            return await res.data;
        }
        catch (err) {
            return err.response.data;
        }
    }
    return (
        <div className="order-details">
            <Head>
                <title>Tavlorify Store - Order Details</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Orders Details</h1>
                    {Array.isArray(orderDetails.order_lines) && orderDetails.order_lines.length > 0 ? <div className="order-details-box p-3">
                        <table className="order-data-table mb-4">
                            <thead>
                                <tr>
                                    <th>Reference / Order Id</th>
                                    <th>Quantity</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.order_lines.map((orderProduct) => (
                                    orderProduct.name !== "Tavlorify" && <tr key={orderProduct.reference}>
                                        <td>{orderProduct.reference}</td>
                                        <td>{orderProduct.quantity}</td>
                                        <td>{orderProduct.name}</td>
                                        <td>{orderProduct.unit_price / 100}</td>
                                        <td>{orderProduct.total_amount / 100}</td>
                                        <td>
                                            <img
                                                src={orderProduct.image_url}
                                                alt="product Image !!"
                                                width="100"
                                                height="100"
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-danger d-block mx-auto mb-3">Delete</button>
                                            <button className="btn btn-info d-block mx-auto mb-3">Update</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : <p className="alert alert-danger">Sorry, This Order Is Not Found !!</p>}
                </div>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default OrderDetails;