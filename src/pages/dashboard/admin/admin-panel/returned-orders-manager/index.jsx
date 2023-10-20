import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import Link from "next/link";

const ReturnedOrdersManager = () => {
    const [allReturnedOrders, setallReturnedOrders] = useState([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [currentSliceFromOrdersDataList, setCurrentSliceFromOrdersDataList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const pageSize = 3;
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            getAllReturnedOrders()
                .then((result) => {
                    if (result.length > 0) {
                        setallReturnedOrders(result);
                        setTotalPagesCount(Math.ceil(result.length / pageSize));
                        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(currentPage, result);
                        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    }
                });
        }
    }, []);
    const getAllReturnedOrders = async () => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/returned-orders/all-orders`);
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
    const getCurrentSliceFromOrdersDataList = (currentPage, allReturnedOrders) => {
        const startPageIndex = (currentPage - 1) * pageSize;
        const endPageIndex = startPageIndex + pageSize;
        const determinatedOrders = allReturnedOrders.slice(startPageIndex, endPageIndex);
        return determinatedOrders;
    }
    const getPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(newCurrentPage, allReturnedOrders);
        setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
        setCurrentPage(newCurrentPage);
    }
    const getNextPage = () => {
        const newCurrentPage = currentPage + 1;
        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(newCurrentPage, allReturnedOrders);
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
                            const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(i, allReturnedOrders);
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
                        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(pageNumber, allReturnedOrders);
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
                        const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(pageNumber, allReturnedOrders);
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
            const determinatedOrders = getCurrentSliceFromOrdersDataList(1, allReturnedOrders);
            setCurrentSliceFromOrdersDataList(determinatedOrders);
            setTotalPagesCount(Math.ceil(allReturnedOrders.length / pageSize));
        } else {
            switch (filterStandard) {
                case "orderNumber": {
                    setCurrentSliceFromOrdersDataList(allReturnedOrders.filter((order) => order.orderNumber == value));
                    setTotalPagesCount(1);
                    break;
                }
                case "orderId": {
                    setCurrentSliceFromOrdersDataList(allReturnedOrders.filter((order) => order._id == value));
                    setTotalPagesCount(1);
                    break;
                }
                case "klarnaReference": {
                    setCurrentSliceFromOrdersDataList(allReturnedOrders.filter((order) => order.klarnaReference == value));
                    setTotalPagesCount(1);
                    break;
                }
                case "given_name": {
                    const determinatedOrders = allReturnedOrders.filter((order) => order.billing_address.given_name.toLowerCase() == value.toLowerCase());
                    const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(1, determinatedOrders);
                    setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    setTotalPagesCount(Math.ceil(determinatedOrders.length / pageSize));
                    break;
                }
                case "email": {
                    const determinatedOrders = allReturnedOrders.filter((order) => order.billing_address.email.toLowerCase() == value.toLowerCase());
                    const determinatedOrdersInCurrentPage = getCurrentSliceFromOrdersDataList(1, determinatedOrders);
                    setCurrentSliceFromOrdersDataList(determinatedOrdersInCurrentPage);
                    setTotalPagesCount(Math.ceil(determinatedOrders.length / pageSize));
                    break;
                }
                case "status": {
                    const determinatedOrders = allReturnedOrders.filter((order) => order.status == value);
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
    return (
        <div className="returned-orders-manager">
            <Head>
                <title>Tavlorify Store - Returned Orders Manager</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center pt-3 pb-3">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Returned Orders Manager</h1>
                    {allReturnedOrders.length > 0 && <div className="returned-orders-managment">
                        {/* <section className="filters mb-3 bg-white border-3 border-info p-3 text-start">
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
                                        max={allReturnedOrders.length}
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
                        </section> */}
                        {currentSliceFromOrdersDataList.length > 0 ? <section className="returned-orders-data-box p-3">
                            <table className="returned-orders-data-table mb-4">
                                <thead>
                                    <tr>
                                        <th>Order Number</th>
                                        <th>Order Id</th>
                                        <th>Returned Order Number</th>
                                        <th>Returned Order Id</th>
                                        <th>Status</th>
                                        <th>Order Total Amount</th>
                                        <th>Added Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentSliceFromOrdersDataList.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order.orderNumber}</td>
                                            <td>{order._id}</td>
                                            <td>{order.orderNumber}</td>
                                            <td>{order._id}</td>
                                            <td>{order.status}</td>
                                            <td>{order.order_amount / 100}</td>
                                            <td>{getDateFormated(order.added_date)}</td>
                                            <td>
                                                <button className="btn btn-danger d-block mx-auto mb-3">Delete</button>
                                                <button className="btn btn-info d-block mx-auto mb-3">Update</button>
                                                <Link href={`/dashboard/admin/admin-panel/orders-manager/${order._id}`} className="btn btn-success d-block mx-auto">Show Details</Link>
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

export default ReturnedOrdersManager;