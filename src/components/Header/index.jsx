import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { BsCart2, BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import Axios from "axios";

const Header = () => {
    const [userId, setUserId] = useState({});
    const [allProductsData, setAllProductsData] = useState("");
    const [isWaitOrdering, setIsWaitOrdering] = useState("");
    const router = useRouter();
    useEffect(() => {
        let userId = localStorage.getItem("tavlorify-store-user-id");
        setUserId(userId);
        const allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        setAllProductsData(allProductsData);
    }, []);
    const signOut = () => {
        localStorage.removeItem("tavlorify-store-user-id");
        router.reload();
    }
    const calcTotalOrderPriceBeforeDiscount = (allProductsData) => {
        let tempTotalPriceBeforeDiscount = 0;
        allProductsData.forEach((product) => {
            tempTotalPriceBeforeDiscount += product.priceBeforeDiscount * product.quantity;
        });
        return tempTotalPriceBeforeDiscount;
    }
    const calcTotalOrderDiscount = (allProductsData) => {
        let tempTotalDiscount = 0;
        allProductsData.forEach((product) => {
            tempTotalDiscount += (product.priceBeforeDiscount - product.priceAfterDiscount) * product.quantity;
        });
        return tempTotalDiscount;
    }
    const calcTotalOrderPriceAfterDiscount = (totalPriceBeforeDiscount, totalDiscount) => {
        return totalPriceBeforeDiscount - totalDiscount;
    }
    const calcTotalProductPriceDiscountForKlarnaCheckoutAPI = (priceBeforeDiscount, priceAfterDiscount, quantity) => {
        return (priceBeforeDiscount - priceAfterDiscount) * quantity;
    }
    const calcTotalProductPriceIncludedDiscountForKlarnaCheckoutAPI = (priceAfterDiscount, quantity) => {
        return priceAfterDiscount * quantity;
    }
    const getOrderLinesForKlarnaCheckoutAPI = (allProductsData) => {
        let order_lines = [];
        allProductsData.forEach((product) => {
            order_lines.push({
                type: "physical",
                reference: product._id,
                name: `${product.paintingType}, ${product.frameColor} Frame, ${product.isExistWhiteBorder}, ${product.position}, ${product.size} Cm`,
                quantity: product.quantity,
                quantity_unit: "pcs",
                unit_price: product.priceBeforeDiscount * 100,
                tax_rate: 0,
                total_amount: calcTotalProductPriceIncludedDiscountForKlarnaCheckoutAPI(product.priceAfterDiscount, product.quantity) * 100,
                total_discount_amount: calcTotalProductPriceDiscountForKlarnaCheckoutAPI(product.priceBeforeDiscount, product.priceAfterDiscount, product.quantity) * 100,
                total_tax_amount: 0,
                image_url: `${product.generatedImageURL}`,
            });
        });
        return order_lines;
    }
    const orderAllProducts = async () => {
        const orderDetails = {
            purchase_country: "SE",
            purchase_currency: "SEK",
            locale: "sv-SE",
            order_amount: calcTotalOrderPriceAfterDiscount(calcTotalOrderPriceBeforeDiscount(allProductsData), calcTotalOrderDiscount(allProductsData)) * 100,
            order_tax_amount: 0,
            order_lines: getOrderLinesForKlarnaCheckoutAPI(allProductsData),
            merchant_urls: {
                terms: `https://tavlorify.se/terms`,
                checkout: `https://tavlorify.se/checkout/{checkout.order.id}`,
                confirmation: `https://tavlorify.se/confirmation/{checkout.order.id}`,
                push: `https://tavlorify.se/confirmation/{checkout.order.id}`,
            },
            options: {
                allow_separate_shipping_address: true,
            }
        }
        try {
            setIsWaitOrdering(true);
            const res = await Axios.post(`${process.env.BASE_API_URL}/orders/send-order-to-klarna`, orderDetails);
            const result = await res.data;
            setIsWaitOrdering(false);
            window.open(`/checkout/${result.order_id}`, "_blank");
        }
        catch (err) {
            setIsWaitOrdering(false);
            console.log(err.response.data);
        }
    }
    return (
        // Start Global Header
        <header className="global-header">
            {/* Start Top Header */}
            <div className="top-header pt-2 pb-2">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link className="navbar-brand fw-bold" href="/">Tavlorify Store</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item me-2">
                                    <Link className="nav-link" aria-current="page" href="/">
                                        <AiOutlineHome />
                                        <span className="ms-2">Home</span>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown me-2">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>Poster</span>
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: "/text-to-image",
                                                    query: {
                                                        printsName: "poster",
                                                    }
                                                }}
                                            >
                                                Text To Image
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: "/image-to-image",
                                                    query: {
                                                        printsName: "poster",
                                                    }
                                                }}
                                            >
                                                Image To Image
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown me-2">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Canvas
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: "/text-to-image",
                                                    query: {
                                                        printsName: "canvas",
                                                    }
                                                }}
                                            >
                                                Text To Image
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: "/image-to-image",
                                                    query: {
                                                        printsName: "canvas",
                                                    }
                                                }}
                                            >
                                                Image To Image
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" aria-current="page" href="/who-are-we">
                                        <BsInfoCircle />
                                        <span className="ms-2">Who Are We ?</span>
                                    </Link>
                                </li>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" aria-current="page" href="/contact-us">
                                        <BsCart2 />
                                        <span className="ms-2">Contact Us</span>
                                    </Link>
                                </li>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" aria-current="page" href="/faq">
                                        <FaQuestion />
                                        <span className="ms-2">FAQ</span>
                                    </Link>
                                </li>
                                {!userId && <>
                                    <li className="nav-item me-2">
                                        <Link className="nav-link" aria-current="page" href="/login">
                                            <FiLogIn />
                                            <span className="ms-2">Log In</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item bg-dark auth-item me-2">
                                        <Link className="nav-link text-white" aria-current="page" href="/sign-up">
                                            <AiOutlineUserAdd />
                                            <span className="ms-2">Sign Up for Free</span>
                                        </Link>
                                    </li>
                                </>}
                                <li className="nav-item me-2">
                                    <button
                                        className="nav-link btn"
                                        onClick={orderAllProducts}
                                    >
                                        <BsCart2 style={{ fontSize: "25px" }} />
                                    </button>
                                </li>
                                {userId && <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href="/profile">
                                            <CgProfile />
                                            <span className="ms-2">My Profile</span>
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item bg-danger auth-item text-white sign-out-btn d-flex align-items-center p-2"
                                        onClick={signOut}
                                    >
                                        <GoSignOut />
                                        <span className="ms-2">Sign Out</span>
                                    </li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {/* End Top Header */}
        </header>
        // End Global Header
    );
}

export default Header;