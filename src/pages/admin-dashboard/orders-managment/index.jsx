import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import Link from "next/link";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function OrdersManagment() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [allOrdersInsideThePage, setAllOrdersInsideThePage] = useState([]);

    const [isFilteringOrdersStatus, setIsFilteringOrdersStatus] = useState(false);

    const [selectedOrderIndex, setSelectedOrderIndex] = useState(-1);

    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const [isDeletingStatus, setIsDeletingStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [isErrorStatus, setIsErrorStatus] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPagesCount, setTotalPagesCount] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);

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

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        } else {
            getOrdersCount()
                .then(async (result) => {
                    if (result > 0) {
                        const result1 = await getAllOrdersInsideThePage(1, pageSize);
                        setAllOrdersInsideThePage(result1);
                        setTotalPagesCount(Math.ceil(result / pageSize));
                    }
                    setIsLoadingPage(false);
                }).catch(() => {
                    setIsLoadingPage(false);
                    setIsErrorMsgOnLoadingThePage(true);
                });
        }
    }, []);

    const getOrdersCount = async (filters) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/orders/orders-count?${filters ? filters : ""}`);
            return await res.data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const getAllOrdersInsideThePage = async (pageNumber, pageSize, filters) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/orders/all-orders-inside-the-page?pageNumber=${pageNumber}&pageSize=${pageSize}&${filters ? filters : ""}`);
            return await res.data;
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

    const addOrderAsReturned = async (orderId) => {
        try {
            const res = await axios.post(`${process.env.BASE_API_URL}/returned-orders/create-new-order/${orderId}`);
            const result = await res.data;
            console.log(result);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    const changeOrderData = (productIndex, fieldName, newValue) => {
        allOrdersInsideThePage[productIndex][fieldName] = newValue;
    }

    const updateOrderData = async (orderIndex) => {
        setIsUpdatingStatus(true);
        setSelectedOrderIndex(orderIndex);
        try {
            const res = await axios.put(`${process.env.BASE_API_URL}/orders/update-order/${allOrdersInsideThePage[orderIndex]._id}`, {
                order_amount: allOrdersInsideThePage[orderIndex].order_amount,
                status: allOrdersInsideThePage[orderIndex].status,
            });
            const result = await res.data;
            if (result === "Updating Order Details Has Been Successfuly !!") {
                setIsUpdatingStatus(false);
                setIsSuccessStatus(true);
                let successTimeout = setTimeout(() => {
                    setIsSuccessStatus(false);
                    setSelectedOrderIndex(-1);
                    clearTimeout(successTimeout);
                }, 3000);
            }
        }
        catch (err) {
            setIsUpdatingStatus(false);
            setIsErrorStatus(true);
            let errorTimeout = setTimeout(() => {
                setIsErrorStatus(false);
                setSelectedOrderIndex(-1);
                clearTimeout(errorTimeout);
            }, 3000);
        }
    }

    const deleteOrder = async (orderIndex) => {
        try {
            setIsDeletingStatus(true);
            setSelectedOrderIndex(orderIndex);
            await axios.delete(`${process.env.BASE_API_URL}/orders/delete-order/${allOrdersInsideThePage[orderIndex]._id}`);
            setIsDeletingStatus(false);
            setIsSuccessStatus(true);
            let successTimeout = setTimeout(async () => {
                setIsSuccessStatus(false);
                setSelectedOrderIndex(-1);
                setIsFilteringOrdersStatus(true);
                setAllOrdersInsideThePage(await getAllOrdersInsideThePage(1, pageSize));
                setCurrentPage(1);
                setIsFilteringOrdersStatus(false);
                clearTimeout(successTimeout);
            }, 3000);
        }
        catch (err) {
            setIsDeletingStatus(false);
            setIsErrorStatus(true);
            let errorTimeout = setTimeout(() => {
                setIsErrorStatus(false);
                setSelectedOrderIndex(-1);
                clearTimeout(errorTimeout);
            }, 3000);
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
                        <h1 className="welcome-msg mb-4 fw-bold pb-3 mx-auto">Hello To You In Orders Managment</h1>
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
                                    <div className="col-md-4 d-flex align-items-center">
                                        <h6 className="me-2 mb-0 fw-bold text-center">Klarna Reference</h6>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Pleae Enter Reference"
                                            onChange={(e) => setFilters({ ...filters, klarnaReference: e.target.value.trim() })}
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
                                            <option value="pending">Pending</option>
                                            <option value="shipping">Shipping</option>
                                            <option value="completed">Completed</option>
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
                                        {allOrdersInsideThePage.map((order, orderIndex) => (
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
                                                    {isSuccessStatus && orderIndex === selectedOrderIndex && <button
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
                                                    {isErrorStatus && orderIndex === selectedOrderIndex && <button
                                                        className="btn btn-danger d-block mx-auto mb-3"
                                                        disabled
                                                    >
                                                        Sorry, Error In Process
                                                    </button>}
                                                    {!isUpdatingStatus && !isDeletingStatus && !isErrorStatus && !isSuccessStatus && <Link href={`/dashboard/admin/admin-panel/orders-managment/${order._id}`} className="btn btn-success d-block mx-auto mb-4">Show Details</Link>}
                                                    {!order.isReturned && (order.checkout_status === "AUTHORIZED" || order.checkout_status === "CAPTURED") && <button className="btn btn-danger d-block mx-auto mb-3" onClick={() => addOrderAsReturned(order._id)}>Add As Returned</button>}
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
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}