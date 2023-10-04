import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";

const OrdersManager = () => {
    const [allOrders, setAllOrders] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            getAllOrders()
                .then((result) => {
                    setAllOrders(result);
                });
        }
    }, []);
    const getAllOrders = async () => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/orders/all-orders`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="orders-manager">
            <Head>
                <title>Tavlorify Store - Orders Manager</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Orders Manager</h1>
                    {allOrders.length > 0 ? <div className="orders-data-box p-3">
                        <table className="orders-data-table mb-4">
                            <thead>
                                <tr>
                                    <th>Order Id</th>
                                    <th>Klarna Order Id</th>
                                    <th>Checkout Status</th>
                                    <th>Status</th>
                                    <th>Added Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.klarnaOrderId}</td>
                                        <td>{order.checkout_status}</td>
                                        <td>{order.status}</td>
                                        <td>{order.added_date}</td>
                                        <td>
                                            <div className="all-order-data">
                                                <p>Billing Addres:</p>
                                                <p>City: {order.billing_address.city}</p>
                                                <p>email: {order.billing_address.email}</p>
                                                <p>given_name: {order.billing_address.given_name}</p>
                                                <p>family_name: {order.billing_address.family_name}</p>
                                                <p>phone: {order.billing_address.phone}</p>
                                                <p>postal_code: {order.billing_address.postal_code}</p>
                                                <p>street_address: {order.billing_address.street_address}</p>
                                                <hr />
                                                <p>shipping_address:</p>
                                                <p>City: {order.shipping_address.city}</p>
                                                <p>email: {order.shipping_address.email}</p>
                                                <p>given_name: {order.shipping_address.given_name}</p>
                                                <p>family_name: {order.shipping_address.family_name}</p>
                                                <p>phone: {order.shipping_address.phone}</p>
                                                <p>postal_code: {order.shipping_address.postal_code}</p>
                                                <p>street_address: {order.shipping_address.street_address}</p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : <p className="alert alert-danger">Sorry, Can't Find Any Orders !!</p>}
                </div>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default OrdersManager;