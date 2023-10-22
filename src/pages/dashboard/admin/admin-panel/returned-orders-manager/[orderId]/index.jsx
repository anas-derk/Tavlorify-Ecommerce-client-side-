import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";

const ReturnedreturnedOrderDetails = () => {
    const [returnedOrderDetails, setReturnedOrderDetails] = useState({});
    const [updatingOrderProductIndex, setUpdatingOrderProductIndex] = useState(-1);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isDeletingStatus, setIsDeletingStatus] = useState(false);
    const [deletingOrderProductIndex, setDeletingOrderProductIndex] = useState(false);
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
    const changeReturnedOrderProductData = (productIndex, fieldName, newValue) => {
        let orderLinesTemp = returnedOrderDetails.order_lines;
        orderLinesTemp[productIndex][fieldName] = newValue;
        setReturnedOrderDetails({ ...returnedOrderDetails, order_lines: orderLinesTemp });
    }
    const updateReturnedOrderProductData = async (orderProductIndex) => {
        setIsUpdatingStatus(true);
        setUpdatingOrderProductIndex(orderProductIndex);
        try {
            const res = await Axios.put(`${process.env.BASE_API_URL}/returned-orders/products/update-product/${returnedOrderDetails._id}/${returnedOrderDetails.order_lines[orderProductIndex]._id}`, {
                quantity: returnedOrderDetails.order_lines[orderProductIndex].quantity,
                name: returnedOrderDetails.order_lines[orderProductIndex].name,
                unit_price: returnedOrderDetails.order_lines[orderProductIndex].unit_price,
                total_amount: returnedOrderDetails.order_lines[orderProductIndex].total_amount,
                return_reason: returnedOrderDetails.order_lines[orderProductIndex].return_reason,
            });
            const result = await res.data;
            if (result === "Updating Returned Order Details Has Been Successfuly !!") {
                setUpdatingOrderProductIndex(-1);
                setIsUpdatingStatus(false);
            }
        }
        catch (err) {
            console.log(err);
            setDeletingOrderProductIndex(-1);
            setIsUpdatingStatus(false);
        }
    }
    const deleteProductFromReturnedOrder = async (orderProductIndex) => {
        setIsDeletingStatus(true);
        setDeletingOrderProductIndex(orderProductIndex);
        try {
            const res = await Axios.delete(`${process.env.BASE_API_URL}/returned-orders/products/delete-product/${returnedOrderDetails._id}/${returnedOrderDetails.order_lines[orderProductIndex]._id}`);
            const result = await res.data;
            if (result === "Deleting Product From Returned Order Has Been Successfuly !!") {
                setIsDeletingStatus(false);
                setDeletingOrderProductIndex(-1);
            }
        }
        catch (err) {
            console.log(err);
            setIsDeletingStatus(false);
            setDeletingOrderProductIndex(-1);
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
                                    <th>Return Reason</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnedOrderDetails.order_lines.map((orderProduct, orderProductIndex) => (
                                    orderProduct.name !== "Tavlorify" && <tr key={orderProduct.reference}>
                                        <td>{orderProduct.reference}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control quantity"
                                                defaultValue={orderProduct.quantity}
                                                onChange={(e) => changeReturnedOrderProductData(orderProductIndex, "quantity", e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control name"
                                                defaultValue={orderProduct.name}
                                                onChange={(e) => changeReturnedOrderProductData(orderProductIndex, "name", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control unit-price"
                                                defaultValue={orderProduct.unit_price}
                                                onChange={(e) => changeReturnedOrderProductData(orderProductIndex, "unit_price", e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control total-amount"
                                                defaultValue={orderProduct.total_amount}
                                                onChange={(e) => changeReturnedOrderProductData(orderProductIndex, "total_amount", e.target.valueAsNumber)}
                                            />
                                        </td>
                                        <td>
                                            <textarea
                                                type="text"
                                                className="form-control return-reason"
                                                onChange={(e) => changeReturnedOrderProductData(orderProductIndex, "return_reason", e.target.value)}
                                            >{orderProduct.return_reason}</textarea>
                                        </td>
                                        <td>
                                            {orderProductIndex !== updatingOrderProductIndex && <button
                                                className="btn btn-info d-block mx-auto mb-3"
                                                onClick={() => updateReturnedOrderProductData(orderProductIndex)}
                                            >
                                                Update
                                            </button>}
                                            {isUpdatingStatus && orderProductIndex === updatingOrderProductIndex && <button
                                                className="btn btn-info d-block mx-auto mb-3"
                                                disabled
                                            >
                                                Updating ...
                                            </button>}
                                            {orderProductIndex !== deletingOrderProductIndex && <button
                                                className="btn btn-danger d-block mx-auto mb-3"
                                                onClick={() => deleteProductFromReturnedOrder(orderProductIndex)}
                                            >
                                                Delete
                                            </button>}
                                            {isDeletingStatus && orderProductIndex === deletingOrderProductIndex && <button
                                                className="btn btn-danger d-block mx-auto mb-3"
                                                disabled
                                            >
                                                Deleting ...
                                            </button>}
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