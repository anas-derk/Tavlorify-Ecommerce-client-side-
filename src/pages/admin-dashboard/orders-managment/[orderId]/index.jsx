import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo } from "../../../../../public/global_functions/popular";

export default function OrderDetails({ orderId, ordersType }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [orderDetails, setOrderDetails] = useState({});

    const [waitMsg, setWaitMsg] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [selectedOrderProductIndex, setSelectedOrderProductIndex] = useState(-1);

    const router = useRouter();

    useEffect(() => {
        setIsLoadingPage(true);
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    } else {
                        setOrderDetails((await getOrderDetails(orderId)).data);
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.replace("/admin-dashboard/login");
    }, [ordersType]);

    const getOrderDetails = async (orderId) => {
        try {
            return (await axios.get(`${process.env.BASE_API_URL}/${ordersType}/order-details/${orderId}`)).data;
        }
        catch (err) {
            throw err;
        }
    }

    const changeOrderProductData = (productIndex, fieldName, newValue) => {
        let orderLinesTemp = orderDetails.order_lines;
        orderLinesTemp[productIndex][fieldName] = newValue;
        setOrderDetails({ ...orderDetails, order_lines: orderLinesTemp });
    }

    const updateOrderProductData = async (orderProductIndex) => {
        try {
            setWaitMsg("Please Wait Updating ...");
            setSelectedOrderProductIndex(orderProductIndex);
            const res = await axios.put(`${process.env.BASE_API_URL}/${ordersType}/products/update-product/${orderDetails._id}/${orderDetails.order_lines[orderProductIndex]._id}`, {
                quantity: orderDetails.order_lines[orderProductIndex].quantity,
                name: orderDetails.order_lines[orderProductIndex].name,
                total_amount: orderDetails.order_lines[orderProductIndex].total_amount,
                unit_price: orderDetails.order_lines[orderProductIndex].unit_price,
            }, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            const result = res.data;
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Updating Successfull !!");
                let successTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    setSelectedOrderProductIndex(-1);
                    clearTimeout(successTimeout);
                }, 3000);
            } else {
                setSelectedOrderProductIndex(-1);
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.push("/admin-dashboard/login");
                return;
            }
            setWaitMsg("");
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setSelectedOrderProductIndex(-1);
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    const deleteProductFromOrder = async (orderProductIndex) => {
        try {
            setWaitMsg("Please Wait Deleting ...");
            setSelectedOrderProductIndex(orderProductIndex);
            const res = await axios.delete(`${process.env.BASE_API_URL}/${ordersType}/products/delete-product/${orderDetails._id}/${orderDetails.order_lines[orderProductIndex]._id}`, {
                headers: {
                    Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
                }
            });
            const result = res.data;
            setWaitMsg("");
            if (!result.error) {
                setSuccessMsg("Deleting Successfull !!");
                let successTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    setSelectedOrderProductIndex(-1);
                    clearTimeout(successTimeout);
                }, 3000);
            } else {

            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.push("/admin-dashboard/login");
                return;
            }
            setWaitMsg("");
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setSelectedOrderProductIndex(-1);
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    return (
        <div className="order-details">
            <Head>
                <title>Tavlorify Store - Order Details</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Control Panel Header */}
                <ControlPanelHeader />
                {/* End Control Panel Header */}
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In {ordersType} Details</h1>
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
                                                {orderProductIndex !== selectedOrderProductIndex && <button
                                                    className="btn btn-info d-block mx-auto mb-3"
                                                    onClick={() => updateOrderProductData(orderProductIndex)}
                                                >
                                                    Update
                                                </button>}
                                                {orderProductIndex !== selectedOrderProductIndex && orderDetails.order_lines.length > 2 && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    onClick={() => deleteProductFromOrder(orderProductIndex)}
                                                >
                                                    Delete
                                                </button>}
                                                {waitMsg && orderProductIndex === selectedOrderProductIndex && <button
                                                    className="btn btn-info d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {waitMsg}
                                                </button>}
                                                {successMsg && orderProductIndex === selectedOrderProductIndex && <button
                                                    className="btn btn-success d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {successMsg}
                                                </button>}
                                                {errorMsg && orderProductIndex === selectedOrderProductIndex && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {errorMsg}
                                                </button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {ordersType === "orders" && <section className="customer-info">
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
                            </section>}
                            {ordersType === "returned-orders" && <section className="customer-info bg-white border border-2 border-dark p-3">
                                <h6 className="fw-bold">Customer Details</h6>
                                <hr />
                                <p className="email fw-bold info">Email: {orderDetails.customer.email}</p>
                                <p className="name fw-bold info">Name: {orderDetails.customer.first_name}</p>
                                <p className="family-name fw-bold info">Family Name: {orderDetails.customer.last_name}</p>
                                <p className="phone fw-bold info">Phone: {orderDetails.customer.phone}</p>
                            </section>}
                        </div> : <p className="alert alert-danger order-not-found-error">Sorry, This Order Is Not Completed !!</p>}
                    </div>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}

export async function getServerSideProps({ params, query }) {
    const { orderId } = params;
    if (!orderId) {
        return {
            redirect: {
                permanent: false,
                destination: "/admin-dashboard/orders-managment",
            },
        }
    }
    const { ordersType } = query;
    if (ordersType !== "orders" && ordersType !== "returned-orders") {
        return {
            redirect: {
                permanent: false,
                destination: "/admin-dashboard",
            },
        }
    }
    return {
        props: {
            orderId,
            ordersType
        },
    }
}