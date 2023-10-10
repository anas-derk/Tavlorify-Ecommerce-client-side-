import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";
import Link from "next/link";

const OrdersManager = () => {
    const [allOrders, setAllOrders] = useState([]);
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
            getAllOrders()
                .then((result) => {
                    if (result.length > 0) {
                        setAllOrders(result);
                        setTotalPagesCount(Math.ceil(result.length / pageSize));
                        getCurrentSliceFromOrdersDataList(currentPage, result);
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
        setCurrentPage(currentPage);
        const startPageIndex = (currentPage - 1) * pageSize;
        const endPageIndex = startPageIndex + pageSize;
        setCurrentSliceFromOrdersDataList(allOrders.slice(startPageIndex, endPageIndex));
    }
    const getPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        getCurrentSliceFromOrdersDataList(newCurrentPage, allOrders);
    }
    const getNextPage = () => {
        const newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        getCurrentSliceFromOrdersDataList(newCurrentPage, allOrders);
    }
    const paginationBar = () => {
        const paginationButtons = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            if (i < 11) {
                paginationButtons.push(
                    <button
                        key={i}
                        className={`pagination-button me-3 p-2 ps-3 pe-3 ${currentPage === i ? "selection" : ""} ${i === 1 ? "ms-3" : ""}`}
                        onClick={() => getCurrentSliceFromOrdersDataList(i, allOrders)}
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
                    onClick={() => getCurrentSliceFromOrdersDataList(totalPagesCount, allOrders)}
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
                        getCurrentSliceFromOrdersDataList(pageNumber, allOrders);
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
                    {currentSliceFromOrdersDataList.length > 0 ? <div className="orders-data-box p-3">
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
                                {currentSliceFromOrdersDataList.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order.orderNumber}</td>
                                        <td>{order._id}</td>
                                        <td>{order.klarnaOrderId}</td>
                                        <td>{order.klarnaReference}</td>
                                        <td>{order.checkout_status}</td>
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
                    </div> : <p className="alert alert-danger">Sorry, Can't Find Any Orders !!</p>}
                    {totalPagesCount > 0 && paginationBar()}
                </div>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default OrdersManager;