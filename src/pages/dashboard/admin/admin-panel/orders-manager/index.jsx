import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import Link from "next/link";

const OrdersManager = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [isWaitStatus, setIsWaitStatus] = useState(false);
    const [updatingOrderIndex, setUpdatingOrderIndex] = useState(-1);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isDeletingStatus, setIsDeletingStatus] = useState(false);
    const [deletingOrderIndex, setDeletingOrderIndex] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [currentSliceFromOrdersDataList, setCurrentSliceFromOrdersDataList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const router = useRouter();
    const pageSize = 3;

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            getAllOrders()
                .then((result) => {
                    if (result.length > 0) {
                        setAllOrders(result);
                        setTotalPagesCount(Math.ceil(result.length / pageSize));
                        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(currentPage, result);
                        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    }
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
    const getDateFormated = (orderedDate) => {
        let orderedDateInDateFormat = new Date(orderedDate);
        const year = orderedDateInDateFormat.getFullYear();
        const month = orderedDateInDateFormat.getMonth() + 1;
        const day = orderedDateInDateFormat.getDate();
        orderedDateInDateFormat = `${year} / ${month} / ${day}`;
        return orderedDateInDateFormat;
    }
    const getCurrentSliceFromOrdersDataList = (currentPage, allOrders) => {
        const startPageIndex = (currentPage - 1) * pageSize;
        const endPageIndex = startPageIndex + pageSize;
        const determinatedOrders = allOrders.slice(startPageIndex, endPageIndex);
        return determinatedOrders;
    }
    const getPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(newCurrentPage, allOrders);
        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
        setCurrentPage(newCurrentPage);
    }
    const getNextPage = () => {
        const newCurrentPage = currentPage + 1;
        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(newCurrentPage, allOrders);
        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
        setCurrentPage(newCurrentPage);
    }
    const paginationBar = () => {
        const paginationButtons = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            if (i < 11) {
                paginationButtons.push(
                    <button
                        key={i}
                        className={`pagination-button me-3 p-2 ps-3 pe-3 ${currentPage === i ? "selection" : ""} ${i === 1 ? "ms-3" : ""}`}
                        onClick={() => {
                            const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(i, allOrders);
                            setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                            setCurrentPage(i);
                        }}
                    >
                        {i}
                    </button>
                );
            }
        }
        if (totalPagesCount > 10) {
            paginationButtons.push(
                <span className="me-3 fw-bold" key={`${Math.random()}-${Date.now()}`}>...</span>
            );
            paginationButtons.push(
                <button
                    key={totalPagesCount}
                    className={`pagination-button me-3 p-2 ps-3 pe-3 ${currentPage === totalPagesCount ? "selection" : ""}`}
                    onClick={() => {
                        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(pageNumber, allOrders);
                        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                        setCurrentPage(pageNumber);
                    }}
                >
                    {totalPagesCount}
                </button>
            );
        }
        return (
            <section className="pagination d-flex justify-content-center align-items-center">
                {currentPage !== 1 && <BsArrowLeftSquare
                    className="previous-page-icon pagination-icon"
                    onClick={getPreviousPage}
                />}
                {paginationButtons}
                {currentPage !== totalPagesCount && <BsArrowRightSquare
                    className="next-page-icon pagination-icon me-3"
                    onClick={getNextPage}
                />}
                <span className="current-page-number-and-count-of-pages p-3 bg-secondary text-white me-3">The Page {currentPage} of {totalPagesCount} Pages</span>
                <form
                    className="navigate-to-specific-page w-25"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(pageNumber, allOrders);
                        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                        setCurrentPage(pageNumber);
                    }}
                >
                    <input
                        type="number"
                        className="form-control p-2"
                        placeholder="Enter Page Number"
                        min="1"
                        max={totalPagesCount}
                        onChange={(e) => setPageNumber(e.target.valueAsNumber)}
                    />
                </form>
            </section>
        );
    }
    const filterOrders = (e, filterStandard, value) => {
        e.preventDefault();
        if (!value || (filterStandard == "status" && value == "all")) {
            const determinatedOrders = getCurrentSliceFromOrdersDataList(1, allOrders);
            setCurrentSliceFromOrdersDataList(determinatedOrders);
            setTotalPagesCount(Math.ceil(allOrders.length / pageSize));
        } else {
            switch (filterStandard) {
                case "orderNumber": {
                    setCurrentSliceFromOrdersDataList(allOrders.filter((order) => order.orderNumber == value));
                    setTotalPagesCount(1);
                    break;
                }
                case "orderId": {
                    setCurrentSliceFromOrdersDataList(allOrders.filter((order) => order._id == value));
                    setTotalPagesCount(1);
                    break;
                }
                case "klarnaReference": {
                    setCurrentSliceFromOrdersDataList(allOrders.filter((order) => order.klarnaReference == value));
                    setTotalPagesCount(1);
                    break;
                }
                case "given_name": {
                    const determinatedOrders = allOrders.filter((order) => order.billing_address.given_name.toLowerCase() == value.toLowerCase());
                    const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(1, determinatedOrders);
                    setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    setTotalPagesCount(Math.ceil(determinatedOrders.length / pageSize));
                    break;
                }
                case "email": {
                    const determinatedOrders = allOrders.filter((order) => order.billing_address.email.toLowerCase() == value.toLowerCase());
                    const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(1, determinatedOrders);
                    setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    setTotalPagesCount(Math.ceil(determinatedOrders.length / pageSize));
                    break;
                }
                case "status": {
                    const determinatedOrders = allOrders.filter((order) => order.status == value);
                    const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(1, determinatedOrders);
                    setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    setTotalPagesCount(Math.ceil(determinatedOrders.length / pageSize));
                    break;
                }
                default: {
                    return "Error, Wrong Filter Standard !!";
                }
            }
        }
    }
    const addOrderAsReturned = async (orderId) => {
        try {
            const res = await Axios.post(`${process.env.BASE_API_URL}/returned-orders/create-new-order/${orderId}`);
            const result = await res.data;
            console.log(result);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }
    const changeOrderData = (productIndex, fieldName, newValue) => {
        let ordersDataTemp = allOrders;
        ordersDataTemp[productIndex][fieldName] = newValue;
        setAllOrders(ordersDataTemp);
    }
    const updateOrderData = async (orderIndex) => {
        setIsUpdatingStatus(true);
        setUpdatingOrderIndex(orderIndex);
        try{
            const res = await Axios.put(`${process.env.BASE_API_URL}/orders/update-order/${allOrders[orderIndex]._id}`, {
                order_amount: allOrders[orderIndex].order_amount,
                status: allOrders[orderIndex].status,
            });
            const result = await res.data;
            if (result === "Updating Order Details Has Been Successfuly !!") {
                setUpdatingOrderIndex(-1);
                setIsUpdatingStatus(false);
            }
        }
        catch(err){
            console.log(err);
            setUpdatingOrderIndex(-1);
            setIsUpdatingStatus(false);
        }
    }
    const deleteOrder = async (orderIndex) => {
        try{
            setIsDeletingStatus(true);
            setDeletingOrderIndex(orderIndex);
            const res = await Axios.delete(`${process.env.BASE_API_URL}/orders/delete-order/${currentSliceFromOrdersDataList[orderIndex]._id}`);
            const result = await res.data;
            console.log(result);
            setIsDeletingStatus(false);
            setDeletingOrderIndex(-1);
        }
        catch(err) {
            console.log(err);
            setIsDeletingStatus(false);
            setDeletingOrderIndex(-1);
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
            <section className="content d-flex justify-content-center align-items-center flex-column text-center pt-3 pb-3">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Orders Manager</h1>
                    {allOrders.length > 0 && <div className="orders-managment">
                        <section className="filters mb-3 bg-white border-3 border-info p-3 text-start">
                            <h3 className="section-name">Filters: </h3>
                            <hr />
                            <div className="row">
                                <div className="col-md-3 d-flex align-items-center">
                                    <h6 className="me-2 mb-0 fw-bold text-center">Order Number</h6>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Pleae Enter Order Number"
                                        min="1"
                                        max={allOrders.length}
                                        onChange={(e) => filterOrders(e, "orderNumber", e.target.valueAsNumber)}
                                    />
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <h6 className="me-2 mb-0 fw-bold text-center">Order Id</h6>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pleae Enter Order Id"
                                        onChange={(e) => filterOrders(e, "orderId", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <h6 className="me-2 mb-0 fw-bold text-center">Klarna Reference</h6>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pleae Enter Reference"
                                        onChange={(e) => filterOrders(e, "klarnaReference", e.target.value)}
                                    />
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <h6 className="me-2 mb-0 fw-bold text-center">Status</h6>
                                    <select
                                        className="select-order-status form-select"
                                        onChange={(e) => filterOrders(e, "status", e.target.value)}
                                    >
                                        <option value="" hidden>Pleae Enter Status</option>
                                        <option value="all">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="shipping">Shipping</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="col-md-3 d-flex align-items-center mt-4">
                                    <h6 className="me-2 mb-0 fw-bold text-center">Customer</h6>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pleae Enter Customer Name"
                                        onChange={(e) => filterOrders(e, "given_name", e.target.value.trim())}
                                    />
                                </div>
                                <div className="col-md-3 d-flex align-items-center mt-4">
                                    <h6 className="me-2 mb-0 fw-bold text-center">Customer</h6>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Pleae Enter Customer Email"
                                        onChange={(e) => filterOrders(e, "email", e.target.value.trim())}
                                    />
                                </div>
                            </div>
                        </section>
                        {currentSliceFromOrdersDataList.length > 0 ? <section className="orders-data-box p-3">
                            <table className="orders-data-table mb-4">
                                <thead>
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Order Id</th>
                                        <th>Klarna Order Id</th>
                                        <th>Klarna Reference</th>
                                        <th>Checkout Status</th>
                                        <th>Status</th>
                                        <th>Order Total Amount</th>
                                        <th>Added Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentSliceFromOrdersDataList.map((order, orderIndex) => (
                                        <tr key={order._id}>
                                            <td>{order.orderNumber}</td>
                                            <td>{order._id}</td>
                                            <td>{order.klarnaOrderId}</td>
                                            <td>{order.klarnaReference}</td>
                                            <td>{order.checkout_status}</td>
                                            <td>
                                                <h6 className="fw-bold">{order.status}</h6>
                                                <hr />
                                                <select
                                                    className="select-order-status form-select"
                                                    onChange={(e) => changeOrderData(orderIndex, "status", e.target.value)}
                                                >
                                                    <option value="" hidden>Pleae Enter Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="shipping">Shipping</option>
                                                    <option value="completed">Completed</option>
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
                                                {orderIndex !== updatingOrderIndex && <button
                                                    className="btn btn-info d-block mx-auto mb-3"
                                                    onClick={() => updateOrderData(orderIndex)}
                                                >
                                                    Update
                                                </button>}
                                                {isUpdatingStatus && orderIndex === updatingOrderIndex && <button
                                                    className="btn btn-info d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    Updating ...
                                                </button>}
                                                {orderIndex !== deletingOrderIndex && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    onClick={() => deleteOrder(orderIndex)}
                                                >
                                                    Delete
                                                </button>}
                                                {isDeletingStatus && orderIndex === deletingOrderIndex && <button
                                                    className="btn btn-danger d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    Deleting ...
                                                </button>}
                                                <Link href={`/dashboard/admin/admin-panel/orders-manager/${order._id}`} className="btn btn-success d-block mx-auto mb-4">Show Details</Link>
                                                {!order.isReturned && (order.checkout_status === "AUTHORIZED" || order.checkout_status === "CAPTURED")  && <button className="btn btn-danger d-block mx-auto mb-3" onClick={() => addOrderAsReturned(order._id)}>Add As Returned</button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section> : <p className="alert alert-danger">Sorry, Can't Find Any Orders !!</p>}
                    </div>}
                    {totalPagesCount > 0 && paginationBar()}
                </div>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default OrdersManager;