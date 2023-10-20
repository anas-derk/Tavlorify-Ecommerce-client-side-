import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";

const ReturnedreturnedOrderDetails = () => {
    const [returnedOrderDetails, setReturnedOrderDetails] = useState({});
    const router = useRouter();
    const { orderId } = router.query;
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            if (orderId) {
                getReturnedOrderDetails(orderId)
                    .then((result) => {
                        setReturnedOrderDetails(result);
                    });
            }
        }
    }, [orderId]);
    const getReturnedOrderDetails = async (orderId) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/returned-orders/order-details/${orderId}`);
            return await res.data;
        }
        catch (err) {
            return err.response.data;
        }
    }
    return (
        <div className="returned-order-details">
            <Head>
                <title>Tavlorify Store - Returned Order Details</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Orders Details</h1>
                    {Array.isArray(returnedOrderDetails.order_lines) && returnedOrderDetails.order_lines.length > 0 ? <div className="returned-order-details-box p-3">
                        <table className="returned-order-data-table mb-5">
                            <thead>
                                <tr>
                                    <th>Reference / Product Id</th>
                                    <th>Quantity</th>
                                    <th>Name</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                    <th>Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnedOrderDetails.order_lines.map((orderProduct) => (
                                    orderProduct.name !== "Tavlorify" && <tr key={orderProduct.reference}>
                                        <td>{orderProduct.reference}</td>
                                        <td>{orderProduct.quantity}</td>
                                        <td>{orderProduct.name}</td>
                                        <td>{orderProduct.unit_price / 100}</td>
                                        <td>{orderProduct.total_amount / 100}</td>
                                        <td>{orderProduct.reason}</td>
                                        <td>
                                            <button className="btn btn-danger d-block mx-auto mb-3">Delete</button>
                                            <button className="btn btn-info d-block mx-auto mb-3">Update</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <section className="customer-info bg-white border border-2 border-dark p-3">
                            <h4>Customer Details</h4>
                            <hr />
                            <p className="email fw-bold">Email: {returnedOrderDetails.customer.email}</p>
                            <p className="name fw-bold">Name: {returnedOrderDetails.customer.first_name}</p>
                            <p className="family-name fw-bold">Family Name: {returnedOrderDetails.customer.last_name}</p>
                            <p className="phone fw-bold">Phone: {returnedOrderDetails.customer.phone}</p>
                        </section>
                    </div> : <p className="alert alert-danger">Sorry, This Order Is Not Found !!</p>}
                </div>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default ReturnedreturnedOrderDetails;