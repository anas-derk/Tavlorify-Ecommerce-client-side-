import Link from "next/link";
import { BsCart2, BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { FaQuestion, FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash, BsPaintBucket } from "react-icons/bs";
import global_data from "../../../public/data/global";
import { GrFormClose } from "react-icons/gr";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import Axios from "axios";
import { MdOutlineContactPhone } from "react-icons/md";

const Header = ({ newTotalProductsCount }) => {
    const [allProductsData, setAllProductsData] = useState([]);
    const [totalProductsCount, setTotalProductsCount] = useState(null);
    const [isDisplayAllProductManagmentBox, setIsDisplayAllProductManagmentBox] = useState(false);
    const [isDisplayAllLinksBox, setIsDisplayAllLinksBox] = useState(false);
    const [displayingTheCustomDropdownMenuNames, setDisplayingTheCustomDropdownMenuNames] = useState([]);
    const [pricesDetailsSummary, setPricesDetailsSummary] = useState({
        totalPriceBeforeDiscount: 0,
        totalDiscount: 0,
        totalPriceAfterDiscount: 0,
    });
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isExistErrorInCreatingOrder, setIsExistErrorInCreatingOrder] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (Array.isArray(allProductsData)) {
            setAllProductsData(allProductsData);
            setTotalProductsCount(allProductsData.length);
        } else {
            setAllProductsData([]);
            setTotalProductsCount(0);
        }
    }, [newTotalProductsCount]);
    const getCartManagmentBoxInMediumScreensAndHigher = () => {
        return (
            <div className="cart-managment-box-in-medium-screens-and-higher cart-managment-box pb-3 ps-3 pe-3">
                {allProductsData.length > 0 ? allProductsData.map((productData) => (
                    <div className="row bg-white align-items-center" key={productData._id}>
                        <div className="col-3 p-3 text-center">
                            <Link href={{
                                pathname: `/${productData.service}`,
                                query: {
                                    generatedImageId: productData._id,
                                }
                            }}>
                                <img
                                    src={`${process.env.BASE_API_URL}/${productData.generatedImageURL}`}
                                    alt="product Image !!"
                                    className="product-image"
                                    width={`${global_data.appearedImageSizesForTextToImage[productData.paintingType][productData.isExistWhiteBorder][productData.position][productData.size].width / 6}`}
                                    height={`${global_data.appearedImageSizesForTextToImage[productData.paintingType][productData.isExistWhiteBorder][productData.position][productData.size].height / 6}`}
                                />
                            </Link>
                        </div>
                        <div className="col-4 p-3 text-start">
                            <h6 className="fw-bold">{productData.paintingType}</h6>
                            <h6>Frame: {productData.frameColor}</h6>
                            <h6>{productData.isExistWhiteBorder}</h6>
                            <h6>{productData.size} Cm</h6>
                            <h6 className="fw-bold price-after-discount">{productData.priceAfterDiscount * productData.quantity} kr</h6>
                            {productData.priceBeforeDiscount != productData.priceAfterDiscount && <h6 className="fw-bold price-before-discount text-decoration-line-through">{productData.priceBeforeDiscount * productData.quantity} kr</h6>}
                        </div>
                        <div className="col-3 text-center">
                            <AiOutlineMinus
                                className="quantity-control-icon me-2"
                                onClick={() => updateProductQuantityInCart(allProductsData, "decrease-product-quantity", productData._id)}
                            />
                            <span className="fw-bold me-2">{productData.quantity}</span>
                            <AiOutlinePlus
                                className="quantity-control-icon"
                                onClick={() => updateProductQuantityInCart(allProductsData, "increase-product-quantity", productData._id)}
                            />
                        </div>
                        <div className="col-2 text-center">
                            <BsTrash
                                className="trash-icon"
                                onClick={() => deleteProductFromCart(allProductsData, productData._id)}
                            />
                        </div>
                    </div>
                )) : <div className="not-found-any-products-alert-box fw-bold text-center d-flex flex-column align-items-center justify-content-center">
                    <BsCart2 className="cart-icon mb-4" />
                    <h4 className="fw-bold">Sorry, Your Cart Is Empty !!</h4>
                </div>}
                {allProductsData.length > 0 && <>
                    <div className="row bg-white border border-2 align-items-center text-center mb-3">
                        <div className="col-md-12 p-4 pt-3 fw-bold">
                            <div className="row mb-3">
                                <div className="col-md-9 text-start">Total Price Before Discount</div>
                                <div className="col-md-3 text-end">{pricesDetailsSummary.totalPriceBeforeDiscount} kr</div>
                            </div>
                            {pricesDetailsSummary.totalDiscount > 0 && <div className="row mb-3">
                                <div className="col-md-9 text-start">Total Discount</div>
                                <div className="col-md-3 text-danger text-end">-{pricesDetailsSummary.totalDiscount} kr</div>
                            </div>}
                            <div className="row">
                                <div className="col-md-9 text-start">Shipping</div>
                                <div className="col-md-3 text-end">0 kr</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-9 text-start">Total Price After Discount</div>
                                <div className="col-md-3 text-end">{pricesDetailsSummary.totalPriceAfterDiscount} kr</div>
                            </div>
                        </div>
                    </div>
                    {!isCreatingOrder && !isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-100 p-2 create-new-order-btn go-to-checkout-managment-btn"
                        onClick={createNewOrder}
                    >
                        Go To Checkout
                    </button>}
                    {isCreatingOrder && <button
                        className="btn btn-dark w-100 p-2 go-to-checkout-managment-btn"
                        disabled
                    >
                        Please Waiting ..
                    </button>}
                    {isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-100 p-2 go-to-checkout-managment-btn"
                        disabled
                    >
                        Sorry, Something Went Wrong, Please Try Again !!
                    </button>}
                </>}
            </div>
        );
    }
    const getCartManagmentBoxInMobileScreens = () => {
        return (
            <div className="cart-managment-box-in-mobile-screens cart-managment-box pb-3 ps-2 pe-2">
                {allProductsData.length > 0 ? <div className="products-details-and-managment p-3">
                    {allProductsData.map((productData) => (
                        <div className="row bg-white align-items-center pb-3 pe-3" key={productData._id}>
                            <div className="col-12 pt-3 text-center">
                                <Link href={{
                                    pathname: `/${productData.service}`,
                                    query: {
                                        generatedImageId: productData._id,
                                    }
                                }}>
                                    <img
                                        src={`${process.env.BASE_API_URL}/${productData.generatedImageURL}`}
                                        alt="product Image !!"
                                        className="product-image"
                                        width={`${global_data.appearedImageSizesForTextToImage[productData.paintingType][productData.isExistWhiteBorder][productData.position][productData.size].width / 6}`}
                                        height={`${global_data.appearedImageSizesForTextToImage[productData.paintingType][productData.isExistWhiteBorder][productData.position][productData.size].height / 6}`}
                                    />
                                </Link>
                            </div>
                            <div className="col-12 p-3 text-center">
                                <h6 className="fw-bold">{productData.paintingType}</h6>
                                <h6>Frame: {productData.frameColor}</h6>
                                <h6>{productData.isExistWhiteBorder}</h6>
                                <h6>{productData.size} Cm</h6>
                            </div>
                            <div className="col-4">
                                <AiOutlineMinus
                                    className="quantity-control-icon me-2"
                                    onClick={() => updateProductQuantityInCart(allProductsData, "decrease-product-quantity", productData._id)}
                                />
                                <span className="fw-bold me-2">{productData.quantity}</span>
                                <AiOutlinePlus
                                    className="quantity-control-icon"
                                    onClick={() => updateProductQuantityInCart(allProductsData, "increase-product-quantity", productData._id)}
                                />
                            </div>
                            <div className="col-4 text-center">
                                <h6 className="fw-bold price-after-discount">{productData.priceAfterDiscount * productData.quantity} kr</h6>
                                {productData.priceBeforeDiscount != productData.priceAfterDiscount && <h6 className="fw-bold price-before-discount text-decoration-line-through">{productData.priceBeforeDiscount * productData.quantity} kr</h6>}
                            </div>
                            <div className="col-4 text-end">
                                <BsTrash
                                    className="trash-icon"
                                    onClick={() => deleteProductFromCart(allProductsData, productData._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div> : <div className="not-found-any-products-alert-box fw-bold text-center d-flex flex-column align-items-center justify-content-center">
                    <BsCart2 className="cart-icon mb-4" />
                    <h4 className="fw-bold">Sorry, Your Cart Is Empty !!</h4>
                </div>}
                {allProductsData.length > 0 && <>
                    <div className="summary-box bg-white border border-2 text-center mb-3 m-3 p-3">
                        <div className="row mb-3 m-0">
                            <div className="col-9 text-start fw-bold">Total Price Before Discount</div>
                            <div className="col-3 text-end fw-bold">{pricesDetailsSummary.totalPriceBeforeDiscount} kr</div>
                        </div>
                        {pricesDetailsSummary.totalDiscount > 0 && <div className="row mb-3 m-0">
                            <div className="col-9 text-start fw-bold">Total Discount</div>
                            <div className="col-3 text-danger text-end fw-bold">-{pricesDetailsSummary.totalDiscount} kr</div>
                        </div>}
                        <div className="row m-0">
                            <div className="col-9 text-start fw-bold">Shipping</div>
                            <div className="col-3 text-end fw-bold">0 kr</div>
                        </div>
                        <hr />
                        <div className="row m-0">
                            <div className="col-9 text-start fw-bold">Total Price After Discount</div>
                            <div className="col-3 text-end fw-bold">{pricesDetailsSummary.totalPriceAfterDiscount} kr</div>
                        </div>
                    </div>
                    {!isCreatingOrder && !isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-75 p-3 create-new-order-btn go-to-checkout-managment-btn d-block mx-auto"
                        onClick={createNewOrder}
                    >
                        Go To Checkout
                    </button>}
                    {isCreatingOrder && <button
                        className="btn btn-dark w-75 p-2 go-to-checkout-managment-btn d-block mx-auto"
                        disabled
                    >
                        Please Waiting ..
                    </button>}
                    {isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-75 p-2 go-to-checkout-managment-btn d-block mx-auto"
                        disabled
                    >
                        Sorry, Something Went Wrong, Please Try Again !!
                    </button>}
                </>}
            </div>
        );
    }
    const displayAllProductManagmentBox = () => {
        let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (allProductsData) {
            let totalPriceBeforeDiscount = calcTotalOrderPriceBeforeDiscount(allProductsData);
            let totalDiscount = calcTotalOrderDiscount(allProductsData);
            let totalPriceAfterDiscount = calcTotalOrderPriceAfterDiscount(totalPriceBeforeDiscount, totalDiscount);
            setPricesDetailsSummary({
                ...pricesDetailsSummary,
                totalPriceBeforeDiscount,
                totalDiscount,
                totalPriceAfterDiscount,
            });
            setAllProductsData(allProductsData);
        }
        setIsDisplayAllProductManagmentBox(true);
    }
    const closeAllProductManagmentBox = () => {
        setIsDisplayAllProductManagmentBox(false);
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
    const updateProductQuantityInCart = (allProductsData, operation, productId) => {
        switch (operation) {
            case "increase-product-quantity": {
                allProductsData.forEach((product) => {
                    if (product._id === productId && product.quantity < 50) product.quantity++;
                });
                break;
            }
            case "decrease-product-quantity": {
                allProductsData.forEach((product) => {
                    if (product._id === productId && product.quantity > 1) product.quantity--;
                });
                break;
            }
            default: {
                console.log("Error, Wrong Operation !!");
            }
        }
        let totalPriceBeforeDiscount = calcTotalOrderPriceBeforeDiscount(allProductsData);
        let totalDiscount = calcTotalOrderDiscount(allProductsData);
        let totalPriceAfterDiscount = calcTotalOrderPriceAfterDiscount(totalPriceBeforeDiscount, totalDiscount);
        localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
        setPricesDetailsSummary({
            ...pricesDetailsSummary,
            totalPriceBeforeDiscount,
            totalDiscount,
            totalPriceAfterDiscount,
        });
        setAllProductsData(allProductsData);
    }
    const deleteProductFromCart = (allProductsData, productId) => {
        let newAllProductData = allProductsData.filter((product) => product._id != productId);
        let totalPriceBeforeDiscount = calcTotalOrderPriceBeforeDiscount(newAllProductData);
        let totalDiscount = calcTotalOrderDiscount(newAllProductData);
        let totalPriceAfterDiscount = calcTotalOrderPriceAfterDiscount(totalPriceBeforeDiscount, totalDiscount);
        localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(newAllProductData));
        setPricesDetailsSummary({
            ...pricesDetailsSummary,
            totalPriceBeforeDiscount,
            totalDiscount,
            totalPriceAfterDiscount,
        });
        setAllProductsData(newAllProductData);
        setTotalProductsCount(newAllProductData.length);
    }
    const createNewOrder = async () => {
        try {
            setIsCreatingOrder(true);
            const res = await Axios.post(`${process.env.BASE_API_URL}/orders/create-new-order`);
            const result = await res.data;
            if (result.msg === "Creating New Order Has Been Successfuly !!") {
                router.push(`/checkout?orderId=${result.orderId}`);
            }
        }
        catch (err) {
            setIsExistErrorInCreatingOrder(true);
            let errorInCreatedOrderTimeout = setTimeout(() => {
                setIsExistErrorInCreatingOrder(false);
                clearTimeout(errorInCreatedOrderTimeout);
            }, 1500);
        }
    }
    const signOut = () => {
        localStorage.removeItem("tavlorify-store-user-id");
        router.reload();
    }
    return (
        // Start Global Header
        <header className="global-header">
            {/* Start Navbar Component From Bootstrap */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top pt-3">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" href="/">Tavlorify Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-lg-0 align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">
                                    <AiOutlineHome />
                                    <span className="ms-2">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
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
                                                    paintingTypeAsQuery: "poster",
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
                                                    paintingTypeAsQuery: "poster",
                                                }
                                            }}
                                        >
                                            Image To Image
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
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
                                                    paintingTypeAsQuery: "canvas",
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
                                                    paintingTypeAsQuery: "canvas",
                                                }
                                            }}
                                        >
                                            Image To Image
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/who-are-we">
                                    <BsInfoCircle />
                                    <span className="ms-2">Who Are We ?</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/contact-us">
                                    <MdOutlineContactPhone />
                                    <span className="ms-2">Contact Us</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/faq">
                                    <FaQuestion />
                                    <span className="ms-2">FAQ</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link btn show-all-products-btn">
                                    {!isDisplayAllProductManagmentBox && <BsCart2 className="cart-icon" onClick={displayAllProductManagmentBox} />}
                                    {isDisplayAllProductManagmentBox && <GrFormClose className="close-all-product-managment-box" onClick={closeAllProductManagmentBox} />}
                                    {!isDisplayAllProductManagmentBox && <span className="total-products-count-box fw-bold">{totalProductsCount}</span>}
                                    {isDisplayAllProductManagmentBox && getCartManagmentBoxInMediumScreensAndHigher()}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* Start Navbar Component From Bootstrap */}
            <nav className="custom-navbar-for-mobiles-and-tablets-devices fixed-top p-3 d-flex justify-content-between align-items-center">
                {!isDisplayAllLinksBox && <FaBars className="bar-icon icon" onClick={() => setIsDisplayAllLinksBox(true)} />}
                {isDisplayAllLinksBox && <GrFormClose className="close-all-links-box icon" onClick={() => setIsDisplayAllLinksBox(false)} />}
                <Link href="/" className="home-link">
                    <h5 className="fw-bold web-app-name mb-0">Tavlorify Store</h5>
                </Link>
                <div className="cart-icon-box">
                    {!isDisplayAllProductManagmentBox && <BsCart2 className="cart-icon icon" onClick={displayAllProductManagmentBox} />}
                    {isDisplayAllProductManagmentBox && <GrFormClose className="close-all-product-managment-box icon" onClick={closeAllProductManagmentBox} />}
                    {!isDisplayAllProductManagmentBox && <span className="total-products-count-box fw-bold">{totalProductsCount}</span>}
                </div>
                {isDisplayAllLinksBox && <ul className="links-list">
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/">
                            <AiOutlineHome />
                            <span className="ms-2">Home</span>
                        </Link>
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <BsPaintBucket />
                        <span className="ms-2">Poster</span>
                        {!displayingTheCustomDropdownMenuNames.includes("poster-dropdown-menu") && <IoIosArrowRoundDown className="icon" onClick={() => setDisplayingTheCustomDropdownMenuNames([...displayingTheCustomDropdownMenuNames, "poster-dropdown-menu"])} />}
                        {displayingTheCustomDropdownMenuNames.includes("poster-dropdown-menu") && <IoIosArrowRoundUp className="icon" onClick={() => setDisplayingTheCustomDropdownMenuNames(displayingTheCustomDropdownMenuNames.filter(name => name !== "poster-dropdown-menu"))} />}
                        {displayingTheCustomDropdownMenuNames.includes("poster-dropdown-menu") && <ul className="dropdown-menu-for-custom-navbar mt-2">
                            <li className="pt-2 pb-2 dropdown-menu-item-for-custom-navbar">
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/text-to-image",
                                        query: {
                                            paintingTypeAsQuery: "poster",
                                        }
                                    }}
                                >
                                    <FaLongArrowAltRight className="me-2" />
                                    <span>Text To Image</span>
                                </Link>
                            </li>
                            <li className="pt-2 pb-2 dropdown-menu-item-for-custom-navbar">
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/image-to-image",
                                        query: {
                                            paintingTypeAsQuery: "poster",
                                        }
                                    }}
                                >
                                    <FaLongArrowAltRight className="me-2" />
                                    <span>Image To Image</span>
                                </Link>
                            </li>
                        </ul>}
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <BsPaintBucket />
                        <span className="ms-2">Canvas</span>
                        {!displayingTheCustomDropdownMenuNames.includes("canvas-dropdown-menu") && <IoIosArrowRoundDown className="icon" onClick={() => setDisplayingTheCustomDropdownMenuNames([...displayingTheCustomDropdownMenuNames, "canvas-dropdown-menu"])} />}
                        {displayingTheCustomDropdownMenuNames.includes("canvas-dropdown-menu") && <IoIosArrowRoundUp className="icon" onClick={() => setDisplayingTheCustomDropdownMenuNames(displayingTheCustomDropdownMenuNames.filter(name => name !== "canvas-dropdown-menu"))} />}
                        {displayingTheCustomDropdownMenuNames.includes("canvas-dropdown-menu") && <ul className="dropdown-menu-for-custom-navbar mt-2">
                            <li className="pt-2 pb-2 dropdown-menu-item-for-custom-navbar">
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/text-to-image",
                                        query: {
                                            paintingTypeAsQuery: "canvas",
                                        }
                                    }}
                                >
                                    <FaLongArrowAltRight className="me-2" />
                                    <span>Text To Image</span>
                                </Link>
                            </li>
                            <li className="pt-2 pb-2 dropdown-menu-item-for-custom-navbar">
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/image-to-image",
                                        query: {
                                            paintingTypeAsQuery: "canvas",
                                        }
                                    }}
                                >
                                    <FaLongArrowAltRight className="me-2" />
                                    <span>Image To Image</span>
                                </Link>
                            </li>
                        </ul>}
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/who-are-we">
                            <AiOutlineHome />
                            <span className="ms-2">Who Are We ?</span>
                        </Link>
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/contact-us">
                            <MdOutlineContactPhone />
                            <span className="ms-2">Contact Us</span>
                        </Link>
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/faq">
                            <FaQuestion />
                            <span className="ms-2">FAQ</span>
                        </Link>
                    </li>
                </ul>}
                {isDisplayAllProductManagmentBox && getCartManagmentBoxInMobileScreens()}
            </nav>
        </header>
        // End Global Header
    );
}

export default Header;