import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import LoaderPage from "@/components/LoaderPage";

export default function OrderDetails() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [orderDetails, setOrderDetails] = useState({});

    const [updatingOrderProductIndex, setUpdatingOrderProductIndex] = useState(-1);

    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const [isDeletingStatus, setIsDeletingStatus] = useState(false);

    const [deletingOrderProductIndex, setDeletingOrderProductIndex] = useState(false);

    const router = useRouter();

    const { orderId } = router.query;

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        } else {
            if (orderId) {
                getOrderDetails(orderId)
                    .then((result) => {
                        setOrderDetails(result);
                        setIsLoadingPage(false);
                    });
            }
        }
    }, [orderId]);

    const getOrderDetails = async (orderId) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/orders/order-details/${orderId}`);
            return await res.data;
        }
        catch (err) {
            return err;
        }
    }

    const changeOrderProductData = (productIndex, fieldName, newValue) => {
        let orderLinesTemp = orderDetails.order_lines;
        orderLinesTemp[productIndex][fieldName] = newValue;
        setOrderDetails({ ...orderDetails, order_lines: orderLinesTemp });
    }

    const updateOrderProductData = async (orderProductIndex) => {
        setIsUpdatingStatus(true);
        setUpdatingOrderProductIndex(orderProductIndex);
        try {
            const res = await axios.put(`${process.env.BASE_API_URL}/orders/products/update-product/${orderDetails._id}/${orderDetails.order_lines[orderProductIndex]._id}`, {
                quantity: orderDetails.order_lines[orderProductIndex].quantity,
                name: orderDetails.order_lines[orderProductIndex].name,
                total_amount: orderDetails.order_lines[orderProductIndex].total_amount,
                unit_price: orderDetails.order_lines[orderProductIndex].unit_price,
            });
            const result = await res.data;
            if (result === "Updating Order Details Has Been Successfuly !!") {
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

    const deleteProductFromOrder = async (orderProductIndex) => {
        setIsDeletingStatus(true);
        setDeletingOrderProductIndex(orderProductIndex);
        try {
            const res = await axios.delete(`${process.env.BASE_API_URL}/orders/products/delete-product/${orderDetails._id}/${orderDetails.order_lines[orderProductIndex]._id}`);
            const result = await res.data;
            if (result === "Deleting Product From Order Has Been Successfuly !!") {
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
        <div className="order-details">
            <Head>
                <title>Tavlorify Store - Order Details</title>
            </Head>
            {!isLoadingPage ? <>
                {/* Start Control Panel Header */}
                <ControlPanelHeader />
                {/* End Control Panel Header */}
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Orders Details</h1>
                        {Array.isArray(orderDetails.order_lines) && orderDetails.order_lines.length > 0 ? <div className="order-details-box p-3 data-box">
                            <table className="order-data-table mb-5 data-table">
                                <thead>
                                    <tr>
                                        <th>Reference / Product Id</th>
                                        <th>Quantity</th>
                                        <th>Name</th>
                                        <th>Unit Price</th>
                                        <th>Total</th>
                                        <th>Image</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.order_lines.map((orderProduct, orderProductIndex) => (
                                        orderProduct.name !== "Tavlorify" && <tr key={orderProduct.reference}>
                                            <td>{orderProduct.reference}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control quantity"
                                                    defaultValue={orderProduct.quantity}
                                                    onChange={(e) => changeOrderProductData(orderProductIndex, "quantity", e.target.valueAsNumber)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control name"
                                                    defaultValue={orderProduct.name}
                                                    onChange={(e) => changeOrderProductData(orderProductIndex, "name", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control unit-price"
                                                    defaultValue={orderProduct.unit_price}
                                                    onChange={(e) => changeOrderProductData(orderProductIndex, "unit_price", e.target.valueAsNumber)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control total-amount"
                                                    defaultValue={orderProduct.total_amount}
                                                    onChange={(e) => changeOrderProductData(orderProductIndex, "total_amount", e.target.valueAsNumber)}
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src={orderProduct.image_url}
                                                    alt="product Image !!"
                                                    width="100"
                                                    height="100"
                                                />
                                            </td>
                                            <td>
                                                {orderProductIndex !== updatingOrderProductIndex && <button
                                                    className="btn btn-info d-block mx-auto mb-3"
                                                    onClick={() => updateOrderProductData(orderProductIndex)}
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
                                                    onClick={() => deleteProductFromOrder(orderProductIndex)}
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
                            <section className="customer-info">
                                <div className="row">
                                    <div className="col-md-6 bg-white border border-2 border-dark">
                                        <div className="billing-address-box text-start p-3">
                                            <h6 className="fw-bold">Billing Address</h6>
                                            <hr />
                                            <p className="city fw-bold info">City: {orderDetails.billing_address.city}</p>
                                            <p className="email fw-bold info">Email: {orderDetails.billing_address.email}</p>
                                            <p className="name fw-bold info">Name: {orderDetails.billing_address.given_name}</p>
                                            <p className="family-name fw-bold info">Family Name: {orderDetails.billing_address.family_name}</p>
                                            <p className="phone fw-bold info">Phone: {orderDetails.billing_address.phone}</p>
                                            <p className="postal-code fw-bold info">Postal Code: {orderDetails.billing_address.postal_code}</p>
                                            <p className="street-address fw-bold info">Street Address: {orderDetails.billing_address.street_address}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 bg-white border border-2 border-dark">
                                        <div className="shipping-address-box text-start p-3">
                                            <h6 className="fw-bold">Shipping Address</h6>
                                            <hr />
                                            <p className="city fw-bold info">City: {orderDetails.shipping_address.city}</p>
                                            <p className="email fw-bold info">Email: {orderDetails.shipping_address.email}</p>
                                            <p className="name fw-bold info">Name: {orderDetails.shipping_address.given_name}</p>
                                            <p className="family-name fw-bold info">Family Name: {orderDetails.shipping_address.family_name}</p>
                                            <p className="phone fw-bold info">Phone: {orderDetails.shipping_address.phone}</p>
                                            <p className="postal-code fw-bold info">Postal Code: {orderDetails.shipping_address.postal_code}</p>
                                            <p className="street-address fw-bold info">Street Address: {orderDetails.shipping_address.street_address}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div> : <p className="alert alert-danger order-not-found-error">Sorry, This Order Is Not Found !!</p>}
                    </div>
                </section>
                {/* End Content Section */}
            </> : <LoaderPage />}
        </div>
    );
}