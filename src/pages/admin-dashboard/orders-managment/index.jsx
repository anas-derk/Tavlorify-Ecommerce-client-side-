import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import Link from "next/link";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import validations from "../../../../public/global_functions/validations";
import PaginationBar from "@/components/PaginationBar";

export default function OrdersManagment({ ordersType }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [allOrdersInsideThePage, setAllOrdersInsideThePage] = useState([]);

    const [isFilteringOrdersStatus, setIsFilteringOrdersStatus] = useState(false);

    const [selectedOrderIndex, setSelectedOrderIndex] = useState(-1);

    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const [isDeletingStatus, setIsDeletingStatus] = useState(false);

    const [successMsg, setSuccessMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPagesCount, setTotalPagesCount] = useState(0);

    const [filters, setFilters] = useState({
        orderNumber: -1,
        orderId: "",
        klarnaReference: "",
        status: "",
        customerName: "",
        email: "",
    });

    const router = useRouter();

    const pageSize = 5;

    const orderStatus = ["pending", "shipping", "completing"];

    const returnedOrderStatus = ["awaiting products", "received products", "checking products", "returned products"];

    useEffect(() => {
        setIsLoadingPage(true);
        const adminToken = localStorage.getItem("tavlorify-store-admin-user-token");
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    } else {
                        setAllOrdersInsideThePage([]);
                        setTotalPagesCount(0);
                        result = await getOrdersCount();
                        if (result.data > 0) {
                            setAllOrdersInsideThePage((await getAllOrdersInsideThePage(1, pageSize)).data);
                            setTotalPagesCount(Math.ceil(result.data / pageSize));
                        }
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.push("/admin-dashboard/login");
    }, [ordersType]);

    const getOrdersCount = async (filters) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/${ordersType}/orders-count?${filters ? filters : ""}`);
            return res.data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const getAllOrdersInsideThePage = async (pageNumber, pageSize, filters) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/${ordersType}/all-orders-inside-the-page?pageNumber=${pageNumber}&pageSize=${pageSize}&${filters ? filters : ""}`);
            return res.data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const getDateFormated = (orderedDate) => {
        let orderedDateInDateFormat = new Date(orderedDate);
        const year = orderedDateInDateFormat.getFullYear();
        const month = orderedDateInDateFormat.getMonth() + 1;
        const day = orderedDateInDateFormat.getDate();
        orderedDateInDateFormat = `${year} / ${month} / ${day}`;
        return orderedDateInDateFormat;
    }

    const getPreviousPage = async () => {
        setIsFilteringOrdersStatus(true);
        const newCurrentPage = currentPage - 1;
        setAllOrdersInsideThePage((await getAllOrdersInsideThePage(newCurrentPage, pageSize, getFilteringString(filters))).data);
        setCurrentPage(newCurrentPage);
        setIsFilteringOrdersStatus(false);
    }

    const getNextPage = async () => {
        setIsFilteringOrdersStatus(true);
        const newCurrentPage = currentPage + 1;
        setAllOrdersInsideThePage((await getAllOrdersInsideThePage(newCurrentPage, pageSize, getFilteringString(filters))).data);
        setCurrentPage(newCurrentPage);
        setIsFilteringOrdersStatus(false);
    }

    const getSpecificPage = async (pageNumber) => {
        setIsFilteringOrdersStatus(true);
        setAllOrdersInsideThePage((await getAllOrdersInsideThePage(pageNumber, pageSize, getFilteringString(filters))).data);
        setCurrentPage(pageNumber);
        setIsFilteringOrdersStatus(false);
    }

    const getFilteringString = (filters) => {
        let filteringString = "";
        if (filters.orderNumber !== -1 && filters.orderNumber) filteringString += `orderNumber=${filters.orderNumber}&`;
        if (filters.orderId) filteringString += `_id=${filters.orderId}&`;
        if (filters.klarnaReference) filteringString += `klarnaReference=${filters.klarnaReference}&`;
        if (filters.status) filteringString += `status=${filters.status}&`;
        if (filters.customerName) filteringString += `customerName=${filters.customerName}&`;
        if (filters.email) filteringString += `email=${filters.email}&`;
        if (filteringString) filteringString = filteringString.substring(0, filteringString.length - 1);
        return filteringString;
    }

    const filterOrders = async () => {
        try {
            setIsFilteringOrdersStatus(true);
            let filteringString = getFilteringString(filters);
            const result = await getOrdersCount(filteringString);
            if (result.data > 0) {
                setAllOrdersInsideThePage((await getAllOrdersInsideThePage(1, pageSize, filteringString)).data);
                setTotalPagesCount(Math.ceil(result.data / pageSize));
                setIsFilteringOrdersStatus(false);
            } else {
                setAllOrdersInsideThePage([]);
                setTotalPagesCount(0);
                setIsFilteringOrdersStatus(false);
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem("tavlorify-store-admin-user-token");
                await router.push("/admin-dashboard/login");
                return;
            }
            setIsFilteringOrdersStatus(false);
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    const addOrderAsReturned = async (orderId) => {
        try {
            const res = await axios.post(`${process.env.BASE_API_URL}/returned-orders/create-new-order/${orderId}`, undefined, {
                headers: {
                    Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                }
            });
            const result = res.data;
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem("tavlorify-store-admin-user-token");
                await router.push("/admin-dashboard/login");
                return;
            }
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    const changeOrderData = (productIndex, fieldName, newValue) => {
        allOrdersInsideThePage[productIndex][fieldName] = newValue;
    }

    const updateOrderData = async (orderIndex) => {
        try {
            setIsUpdatingStatus(true);
            setSelectedOrderIndex(orderIndex);
            const res = await axios.put(`${process.env.BASE_API_URL}/${ordersType}/update-order/${allOrdersInsideThePage[orderIndex]._id}`, {
                order_amount: allOrdersInsideThePage[orderIndex].order_amount,
                status: allOrdersInsideThePage[orderIndex].status,
            }, {
                headers: {
                    Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                }
            });
            const result = await res.data;
            if (!result.error) {
                setIsUpdatingStatus(false);
                setSuccessMsg(result.msg);
                let successTimeout = setTimeout(() => {
                    setSuccessMsg("");
                    setSelectedOrderIndex(-1);
                    clearTimeout(successTimeout);
                }, 3000);
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem("tavlorify-store-admin-user-token");
                await router.push("/admin-dashboard/login");
                return;
            }
            setIsUpdatingStatus(false);
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    const deleteOrder = async (orderIndex) => {
        try {
            setIsDeletingStatus(true);
            setSelectedOrderIndex(orderIndex);
            const res = await axios.delete(`${process.env.BASE_API_URL}/${ordersType}/delete-order/${allOrdersInsideThePage[orderIndex]._id}`, {
                headers: {
                    Authorization: localStorage.getItem("tavlorify-store-admin-user-token")
                }
            });
            setIsDeletingStatus(false);
            setSuccessMsg(res.data.msg);
            let successTimeout = setTimeout(async () => {
                setSuccessMsg("");
                setSelectedOrderIndex(-1);
                setIsFilteringOrdersStatus(true);
                setAllOrdersInsideThePage((await getAllOrdersInsideThePage(1, pageSize)).data);
                setCurrentPage(1);
                setIsFilteringOrdersStatus(false);
                clearTimeout(successTimeout);
            }, 3000);
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem("tavlorify-store-admin-user-token");
                await router.push("/admin-dashboard/login");
                return;
            }
            setIsDeletingStatus(false);
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    return (
        <div className="orders-managment">
            <Head>
                <title>Tavlorify Store - Orders Managment</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                {/* Start Control Panel Header */}
                <ControlPanelHeader />
                {/* End Control Panel Header */}
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center pt-3 pb-3">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In {ordersType} Managment</h1>
                        <div className="orders-managment">
                            <section className="filters mb-3 bg-white border-3 border-info p-3 text-start">
                                <h5 className="section-name fw-bold text-center">Filters: </h5>
                                <hr />
                                <div className="row">
                                    <div className="col-md-4 d-flex align-items-center">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Order Number</h6>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Pleae Enter Order Number"
                                            min="1"
                                            max={allOrdersInsideThePage.length}
                                            onChange={(e) => setFilters({ ...filters, orderNumber: e.target.valueAsNumber })}
                                        />
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Order Id</h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pleae Enter Order Id"
                                            onChange={(e) => setFilters({ ...filters, orderId: e.target.value.trim() })}
                                        />
                                    </div>
                                    {ordersType === "orders" && <div className="col-md-4 d-flex align-items-center">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Klarna Reference</h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pleae Enter Reference"
                                            onChange={(e) => setFilters({ ...filters, klarnaReference: e.target.value.trim() })}
                                        />
                                    </div>}
                                    <div className="col-md-4 d-flex align-items-center">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Status</h6>
                                        <select
                                            className="select-order-status form-select"
                                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        >
                                            <option value="" hidden>Pleae Enter Status</option>
                                            <option value="">All</option>
                                            {ordersType === "orders" &&
                                                orderStatus.map((status, index) => (
                                                    <option value={status} key={index}>{status}</option>
                                                ))
                                            }
                                            {ordersType === "returned-orders" &&
                                                returnedOrderStatus.map((status, index) => (
                                                    <option value={status} key={index}>{status}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center mt-4">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Customer Name</h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pleae Enter Customer Name"
                                            onChange={(e) => setFilters({ ...filters, customerName: e.target.value.trim() })}
                                        />
                                    </div>
                                    <div className="col-md-4 d-flex align-items-center mt-4">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Customer Email</h6>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Pleae Enter Customer Email"
                                            onChange={(e) => setFilters({ ...filters, email: e.target.value.trim() })}
                                        />
                                    </div>
                                    {!isFilteringOrdersStatus && <button
                                        className="btn btn-success d-block w-25 mx-auto mt-2"
                                        onClick={() => filterOrders()}
                                    >
                                        Filter
                                    </button>}
                                    {isFilteringOrdersStatus && <button
                                        className="btn btn-success d-block w-25 mx-auto mt-2"
                                        disabled
                                    >
                                        Filtering ...
                                    </button>}
                                </div>
                            </section>
                            {allOrdersInsideThePage.length > 0 && !isFilteringOrdersStatus && <section className="orders-data-box p-3 data-box">
                                <table className="orders-data-table mb-4 data-table">
                                    <thead>
                                        <tr>
                                            <th>Order Number</th>
                                            <th>Order Id</th>
                                            {ordersType === "returned-orders" && <>
                                                <th>Returned Order Number</th>
                                                <th>Returned Order Id</th>
                                            </>}
                                            {ordersType === "orders" && <>
                                                <th>Klarna Order Id</th>
                                                <th>Klarna Reference</th>
                                                <th>Checkout Status</th>
                                            </>}
                                            <th width="200">Status</th>
                                            <th>Order Total Amount</th>
                                            <th>Added Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allOrdersInsideThePage.map((order, orderIndex) => (
                                            <tr key={order._id}>
                                                <td>{order.orderNumber}</td>
                                                {ordersType === "orders" && <td>{order._id}</td>}
                                                {ordersType === "returned-orders" && <td>{order.orderId}</td>}
                                                {ordersType === "returned-orders" && <>
                                                    <td>{order.returnedOrderNumber}</td>
                                                    <td>{order._id}</td>
                                                </>}
                                                {ordersType === "orders" && <>
                                                    <td>{order.klarnaOrderId}</td>
                                                    <td>{order.klarnaReference}</td>
                                                    <td>{order.checkout_status}</td>
                                                </>}
                                                <td>
                                                    <h6 className="fw-bold">{order.status}</h6>
                                                    <hr />
                                                    <select
                                                        className="select-order-status form-select"
                                                        onChange={(e) => changeOrderData(orderIndex, "status", e.target.value)}
                                                    >
                                                        <option value="" hidden>Pleae Enter Status</option>
                                                        {ordersType === "orders" &&
                                                            orderStatus.map((status, index) => (
                                                                <option value={status} key={index}>{status}</option>
                                                            ))
                                                        }
                                                        {ordersType === "returned-orders" &&
                                                            returnedOrderStatus.map((status, index) => (
                                                                <option value={status} key={index}>{status}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        defaultValue={order.order_amount}
                                                        className="form-control"
                                                        placeholder="Pleae Enter Order Amount"
                                                        onChange={(e) => changeOrderData(orderIndex, "order_amount", e.target.valueAsNumber)}
                                                    />
                                                </td>
                                                <td>{getDateFormated(order.added_date)}</td>
                                                <td>
                                                    {!isUpdatingStatus && !isDeletingStatus && !order.isDeleted && orderIndex !== selectedOrderIndex && <button
                                                        className="btn btn-info d-block mx-auto mb-3"
                                                        onClick={() => updateOrderData(orderIndex)}
                                                    >
                                                        Update
                                                    </button>}
                                                    {isUpdatingStatus && orderIndex === selectedOrderIndex && <button
                                                        className="btn btn-info d-block mx-auto mb-3"
                                                        disabled
                                                    >
                                                        Updating ...
                                                    </button>}
                                                    {successMsg && orderIndex === selectedOrderIndex && <button
                                                        className="btn btn-success d-block mx-auto mb-3"
                                                        disabled
                                                    >
                                                        Success
                                                    </button>}
                                                    {!isUpdatingStatus && !isDeletingStatus && !order.isDeleted && orderIndex !== selectedOrderIndex && <button
                                                        className="btn btn-danger d-block mx-auto mb-3"
                                                        onClick={() => deleteOrder(orderIndex)}
                                                    >
                                                        Delete
                                                    </button>}
                                                    {isDeletingStatus && !order.isDeleted && orderIndex === selectedOrderIndex && <button
                                                        className="btn btn-danger d-block mx-auto mb-3"
                                                        disabled
                                                    >
                                                        Deleting ...
                                                    </button>}
                                                    {order.isDeleted && <button
                                                        className="btn btn-danger d-block mx-auto mb-3"
                                                        disabled
                                                    >
                                                        Deleted Successful
                                                    </button>}
                                                    {errorMsg && orderIndex === selectedOrderIndex && <button
                                                        className="btn btn-danger d-block mx-auto mb-3"
                                                        disabled
                                                    >
                                                        {errorMsg}
                                                    </button>}
                                                    {!isUpdatingStatus && !isDeletingStatus && !errorMsg && !successMsg && <Link href={`/admin-dashboard/orders-managment/${order._id}?ordersType=${ordersType}`} className="btn btn-success d-block mx-auto mb-4">Show Details</Link>}
                                                    {ordersType === "orders" && !order.isReturned && (order.checkout_status === "AUTHORIZED" || order.checkout_status === "CAPTURED" || order.checkout_status === "EXPIRED") && <button className="btn btn-danger d-block mx-auto mb-3" onClick={() => addOrderAsReturned(order._id)}>Add As Returned</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>}
                            {allOrdersInsideThePage.length === 0 && !isFilteringOrdersStatus && <p className="alert alert-danger">Sorry, Can't Find Any Orders !!</p>}
                            {isFilteringOrdersStatus && <div className="loader-table-box d-flex flex-column align-items-center justify-content-center">
                                <span className="loader-table-data"></span>
                            </div>}
                        </div>
                        {totalPagesCount > 1 && !isFilteringOrdersStatus &&
                            <PaginationBar
                                totalPagesCount={totalPagesCount}
                                currentPage={currentPage}
                                getPreviousPage={getPreviousPage}
                                getNextPage={getNextPage}
                                getSpecificPage={getSpecificPage}
                            />
                        }
                    </div>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}

export function getServerSideProps({ query }) {
    const ordersType = query.ordersType;
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
            ordersType,
        }
    }
}