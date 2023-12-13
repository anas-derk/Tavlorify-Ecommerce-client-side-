import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import Link from "next/link";
import LoaderPage from "@/components/LoaderPage";

export default function ReturnedOrdersManager() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [allOrdersInsideThePage, setAllOrdersInsideThePage] = useState([]);

    const [isFilteringOrdersStatus, setIsFilteringOrdersStatus] = useState(false);

    const [updatingOrderIndex, setUpdatingOrderIndex] = useState(-1);

    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const [isDeletingStatus, setIsDeletingStatus] = useState(false);

    const [deletingOrderIndex, setDeletingOrderIndex] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPagesCount, setTotalPagesCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);

    const router = useRouter();

    const [filters, setFilters] = useState({
        orderNumber: -1,
        orderId: "",
        status: "",
        customerName: "",
        email: "",
    });

    const pageSize = 5;

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            getOrdersCount()
                .then(async (result) => {
                    if (result > 0) {
                        const result1 = await getAllOrdersInsideThePage(1, pageSize);
                        setAllOrdersInsideThePage(result1);
                        setTotalPagesCount(Math.ceil(result / pageSize));
                    }
                    setIsLoadingPage(false);
                });
        }
    }, []);

    const getOrdersCount = async (filters) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/returned-orders/orders-count?${filters ? filters : ""}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }

    const getAllOrdersInsideThePage = async (pageNumber, pageSize, filters) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/returned-orders/all-orders-inside-the-page?pageNumber=${pageNumber}&pageSize=${pageSize}&${filters ? filters : ""}`);
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

    const getPreviousPage = async () => {
        setIsFilteringOrdersStatus(true);
        const newCurrentPage = currentPage - 1;
        setAllOrdersInsideThePage(await getAllOrdersInsideThePage(newCurrentPage, pageSize));
        setCurrentPage(newCurrentPage);
        setIsFilteringOrdersStatus(false);
    }

    const getNextPage = async () => {
        setIsFilteringOrdersStatus(true);
        const newCurrentPage = currentPage + 1;
        setAllOrdersInsideThePage(await getAllOrdersInsideThePage(newCurrentPage, pageSize));
        setCurrentPage(newCurrentPage);
        setIsFilteringOrdersStatus(false);
    }

    const paginationBar = () => {
        const paginationButtons = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            if (i < 11) {
                paginationButtons.push(
                    <button
                        key={i}
                        className={`pagination-button me-3 p-2 ps-3 pe-3 ${currentPage === i ? "selection" : ""} ${i === 1 ? "ms-3" : ""}`}
                        onClick={async () => {
                            setIsFilteringOrdersStatus(true);
                            setAllOrdersInsideThePage(await getAllOrdersInsideThePage(i, pageSize));
                            setCurrentPage(i);
                            setIsFilteringOrdersStatus(false);
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
                    onClick={async () => {
                        setIsFilteringOrdersStatus(true);
                        setAllOrdersInsideThePage(await getAllOrdersInsideThePage(pageNumber, pageSize));
                        setCurrentPage(pageNumber);
                        setIsFilteringOrdersStatus(false);
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
                <span className="current-page-number-and-count-of-pages p-2 ps-3 pe-3 bg-secondary text-white me-3">The Page {currentPage} of {totalPagesCount} Pages</span>
                <form
                    className="navigate-to-specific-page-form w-25"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setIsFilteringOrdersStatus(true);
                        setAllOrdersInsideThePage(await getAllOrdersInsideThePage(pageNumber, pageSize));
                        setCurrentPage(pageNumber);
                        setIsFilteringOrdersStatus(false);
                    }}
                >
                    <input
                        type="number"
                        className="form-control p-1 ps-2 page-number-input"
                        placeholder="Enter Page Number"
                        min="1"
                        max={totalPagesCount}
                        onChange={(e) => setPageNumber(e.target.valueAsNumber)}
                    />
                </form>
            </section>
        );
    }

    const getFilteringString = (filters) => {
        let filteringString = "";
        if (filters.orderNumber !== -1 && filters.orderNumber) filteringString += `orderNumber=${filters.orderNumber}&`;
        if (filters.orderId) filteringString += `_id=${filters.orderId}&`;
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
            if (result > 0) {
                const result1 = await getAllOrdersInsideThePage(1, pageSize, filteringString);
                setAllOrdersInsideThePage(result1);
                setTotalPagesCount(Math.ceil(result / pageSize));
                setIsFilteringOrdersStatus(false);
            } else {
                setAllOrdersInsideThePage([]);
                setTotalPagesCount(0);
                setIsFilteringOrdersStatus(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const changeReturnedOrderData = (productIndex, fieldName, newValue) => {
        allReturnedOrders[productIndex][fieldName] = newValue;
    }

    const updateReturnedOrderData = async (orderIndex) => {
        setIsUpdatingStatus(true);
        setUpdatingOrderIndex(orderIndex);
        try {
            const res = await axios.put(`${process.env.BASE_API_URL}/returned-orders/update-order/${allReturnedOrders[orderIndex]._id}`, {
                order_amount: allReturnedOrders[orderIndex].order_amount,
                status: allReturnedOrders[orderIndex].status,
            });
            const result = await res.data;
            if (result === "Updating Returned Order Details Has Been Successfuly !!") {
                setUpdatingOrderIndex(-1);
                setIsUpdatingStatus(false);
            }
        }
        catch (err) {
            console.log(err);
            setUpdatingOrderIndex(-1);
            setIsUpdatingStatus(false);
        }
    }

    const deleteOrder = async (orderIndex) => {
        try {
            setIsDeletingStatus(true);
            setDeletingOrderIndex(orderIndex);
            const res = await axios.delete(`${process.env.BASE_API_URL}/returned-orders/delete-order/${allOrdersInsideThePage[orderIndex]._id}`);
            setIsDeletingStatus(false);
            setDeletingOrderIndex(-1);
        }
        catch (err) {
            console.log(err);
            setIsDeletingStatus(false);
            setDeletingOrderIndex(-1);
        }
    }

    return (
        <div className="returned-orders-managment">
            <Head>
                <title>Tavlorify Store - Returned Orders Managment</title>
            </Head>
            {!isLoadingPage ? <>
                {/* Start Control Panel Header */}
                <ControlPanelHeader />
                {/* End Control Panel Header */}
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center pt-3 pb-3">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Returned Orders Managment</h1>
                        <div className="returned-orders-managment ">
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
                                    <div className="col-md-4 d-flex align-items-center">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Status</h6>
                                        <select
                                            className="select-order-status form-select"
                                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                        >
                                            <option value="" hidden>Pleae Enter Status</option>
                                            <option value="">All</option>
                                            <option value="awaiting products">awaiting products</option>
                                            <option value="received products">received products</option>
                                            <option value="checking products">checking products</option>
                                            <option value="returned products">returned products</option>
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
                            {allOrdersInsideThePage.length > 0 && !isFilteringOrdersStatus && <section className="returned-orders-data-box p-3 data-box">
                                <table className="returned-orders-data-table mb-4 data-table">
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
                                        {allOrdersInsideThePage.map((order, orderIndex) => (
                                            <tr key={order._id}>
                                                <td>{order.orderNumber}</td>
                                                <td>{order._id}</td>
                                                <td>{order.returnedOrderNumber}</td>
                                                <td>{order._id}</td>
                                                <td>
                                                    <h6 className="fw-bold">{order.status}</h6>
                                                    <hr />
                                                    <select
                                                        className="select-returned-order-status form-select"
                                                        onChange={(e) => changeReturnedOrderData(orderIndex, "status", e.target.value)}
                                                    >
                                                        <option value="" hidden>Pleae Enter Status</option>
                                                        <option value="awaiting products">awaiting products</option>
                                                        <option value="received products">received products</option>
                                                        <option value="checking products">checking products</option>
                                                        <option value="returned products">returned products</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        defaultValue={order.order_amount}
                                                        className="form-control"
                                                        placeholder="Pleae Enter Order Amount"
                                                        onChange={(e) => changeReturnedOrderData(orderIndex, "order_amount", e.target.valueAsNumber)}
                                                    />
                                                </td>
                                                <td>{getDateFormated(order.added_date)}</td>
                                                <td>
                                                    {orderIndex !== updatingOrderIndex && <button
                                                        className="btn btn-info d-block mx-auto mb-3"
                                                        onClick={() => updateReturnedOrderData(orderIndex)}
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
                                                    <Link href={`/dashboard/admin/admin-panel/returned-orders-managment/${order._id}`} className="btn btn-success d-block mx-auto">Show Details</Link>
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
                        {totalPagesCount > 0 && !isFilteringOrdersStatus && paginationBar()}
                    </div>
                </section>
                {/* End Content Section */}
            </> : <LoaderPage />}
        </div>
    );
}