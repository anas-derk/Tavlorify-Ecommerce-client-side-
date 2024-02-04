import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
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
import axios from "axios";
import { MdOutlineContactPhone } from "react-icons/md";
import LogoImage from "@/../public/images/Logo/logo1.jpg";

export default function Header({ newTotalProductsCount }) {

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
                            <h6>RAM: {productData.frameColor}</h6>
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
                    <h4 className="fw-bold">Förlåt, din kundvagn är tom !</h4>
                </div>}
                {allProductsData.length > 0 && <>
                    <div className="row bg-white border border-2 align-items-center text-center mb-3">
                        <div className="col-md-12 p-4 pt-3 fw-bold">
                            <div className="row mb-3">
                                <div className="col-md-9 text-start">Totalpris innan rabatt</div>
                                <div className="col-md-3 text-end">{pricesDetailsSummary.totalPriceBeforeDiscount} kr</div>
                            </div>
                            {pricesDetailsSummary.totalDiscount > 0 && <div className="row mb-3">
                                <div className="col-md-9 text-start">Total rabatt</div>
                                <div className="col-md-3 text-danger text-end">-{pricesDetailsSummary.totalDiscount} kr</div>
                            </div>}
                            <div className="row">
                                <div className="col-md-9 text-start">Frakt</div>
                                <div className="col-md-3 text-end">0 kr</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-9 text-start">Totalpris efter rabatt</div>
                                <div className="col-md-3 text-end">{pricesDetailsSummary.totalPriceAfterDiscount} kr</div>
                            </div>
                        </div>
                    </div>
                    {!isCreatingOrder && !isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-100 p-2 create-new-order-btn go-to-checkout-managment-btn"
                        onClick={createNewOrder}
                    >
                        Gå till kassan
                    </button>}
                    {isCreatingOrder && <button
                        className="btn btn-dark w-100 p-2 go-to-checkout-managment-btn"
                        disabled
                    >
                        Var god vänta ..
                    </button>}
                    {isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-100 p-2 go-to-checkout-managment-btn"
                        disabled
                    >
                        Tyvärr, något gick fel. Försök igen !
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
                                <h6>RAM: {productData.frameColor}</h6>
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
                    <h4 className="fw-bold">Förlåt, din kundvagn är tom!</h4>
                </div>}
                {allProductsData.length > 0 && <>
                    <div className="summary-box bg-white border border-2 text-center mb-3 m-3 p-3">
                        <div className="row mb-3 m-0">
                            <div className="col-9 text-start fw-bold">Totalpris innan rabatt</div>
                            <div className="col-3 text-end fw-bold">{pricesDetailsSummary.totalPriceBeforeDiscount} kr</div>
                        </div>
                        {pricesDetailsSummary.totalDiscount > 0 && <div className="row mb-3 m-0">
                            <div className="col-9 text-start fw-bold">Total rabatt</div>
                            <div className="col-3 text-danger text-end fw-bold">-{pricesDetailsSummary.totalDiscount} kr</div>
                        </div>}
                        <div className="row m-0">
                            <div className="col-9 text-start fw-bold">Frakt</div>
                            <div className="col-3 text-end fw-bold">0 kr</div>
                        </div>
                        <hr />
                        <div className="row m-0">
                            <div className="col-9 text-start fw-bold">Totalpris efter rabatt</div>
                            <div className="col-3 text-end fw-bold">{pricesDetailsSummary.totalPriceAfterDiscount} kr</div>
                        </div>
                    </div>
                    {!isCreatingOrder && !isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-75 p-3 create-new-order-btn go-to-checkout-managment-btn d-block mx-auto"
                        onClick={createNewOrder}
                    >
                        Gå till kassan
                    </button>}
                    {isCreatingOrder && <button
                        className="btn btn-dark w-75 p-2 go-to-checkout-managment-btn d-block mx-auto"
                        disabled
                    >
                        Var god vänta ..
                    </button>}
                    {isExistErrorInCreatingOrder && <button
                        className="btn btn-dark w-75 p-2 go-to-checkout-managment-btn d-block mx-auto"
                        disabled
                    >
                        Tyvärr, något gick fel. Försök igen!
                    </button>}
                </>}
            </div>
        );
    }

    const handleDisplayOrHideAllProductManagmentBox = () => {
        if (isDisplayAllProductManagmentBox) setIsDisplayAllProductManagmentBox(false);
        else {
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
                setIsDisplayAllProductManagmentBox(true);
            }
        }
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
                return "Error, Wrong Operation !!";
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
            const res = await axios.post(`${process.env.BASE_API_URL}/orders/create-new-order`);
            const result = await res.data;
            if (result.msg === "Creating New Order Has Been Successfuly !!") {
                router.push(`/checkout?orderId=${result.orderId}`);
            }
        }
        catch (err) {
            setIsCreatingOrder(false);
            setIsExistErrorInCreatingOrder(true);
            let errorInCreatedOrderTimeout = setTimeout(() => {
                setIsExistErrorInCreatingOrder(false);
                clearTimeout(errorInCreatedOrderTimeout);
            }, 1500);
        }
    }
    
    return (
        // Start Global Header
        <header className="global-header">
            {/* Start Custom Navbar */}
            <nav className="custom-navbar fixed-top pt-3 pb-3">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <Link className="brand-name fw-bold" href="/">
                                <img src={LogoImage.src} alt="Logo Image" width={150} />
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <ul className="link-list d-flex align-items-center justify-content-center">
                                <li className="link-item p-2">
                                    <Link className="link" href="/">
                                        HEMSIDA
                                    </Link>
                                </li>
                                <li className="link-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>POSTERS</span>
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
                                                Förvandla ord till konstverk
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
                                                förvandla foton till konstverk
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: "/face-swap",
                                                    query: {
                                                        paintingTypeAsQuery: "poster",
                                                    }
                                                }}
                                            >
                                                ansiktsbyte
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="link-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>CANVASTAVLOR</span>
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
                                                Förvandla ord till konstverk
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
                                                förvandla foton till konstverk
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: "/face-swap",
                                                    query: {
                                                        paintingTypeAsQuery: "canvas",
                                                    }
                                                }}
                                            >
                                                ansiktsbyte
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="link-item p-2">
                                    <Link className="link" aria-current="page" href="/who-are-we">
                                        OM OSS
                                    </Link>
                                </li>
                                <li className="link-item p-2">
                                    <Link className="link" aria-current="page" href="/contact-us">
                                        RING OSS
                                    </Link>
                                </li>
                                <li className="link-item p-2">
                                    <Link className="link" aria-current="page" href="/faq">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <ul className="link-list d-flex align-items-center justify-content-end">
                                <li className="link-item" onClick={handleDisplayOrHideAllProductManagmentBox}>
                                    <div className="link btn show-all-products-btn">
                                        {!isDisplayAllProductManagmentBox && <BsCart2 className="cart-icon" />}
                                        {isDisplayAllProductManagmentBox && <GrFormClose className="close-all-product-managment-box" />}
                                        {!isDisplayAllProductManagmentBox && <span className="total-products-count-box fw-bold">{totalProductsCount}</span>}
                                        {isDisplayAllProductManagmentBox && getCartManagmentBoxInMediumScreensAndHigher()}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {/* End Custom Navbar */}
            <nav className="custom-navbar-for-mobiles-and-tablets-devices fixed-top p-3 d-flex justify-content-between align-items-center">
                {!isDisplayAllLinksBox && <FaBars className="bar-icon icon" onClick={() => setIsDisplayAllLinksBox(true)} />}
                {isDisplayAllLinksBox && <GrFormClose className="close-all-links-box icon" onClick={() => setIsDisplayAllLinksBox(false)} />}
                <Link href="/" className="home-link">
                    <h5 className="fw-bold web-app-name mb-0">TAVLORIFY</h5>
                </Link>
                <div className="cart-icon-box" onClick={handleDisplayOrHideAllProductManagmentBox}>
                    {!isDisplayAllProductManagmentBox && <BsCart2 className="cart-icon icon" />}
                    {isDisplayAllProductManagmentBox && <GrFormClose className="close-all-product-managment-box icon" />}
                    {!isDisplayAllProductManagmentBox && <span className="total-products-count-box fw-bold">{totalProductsCount}</span>}
                </div>
                {isDisplayAllLinksBox && <ul className="links-list">
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/">
                            <AiOutlineHome />
                            <span className="ms-2">HEMSIDA</span>
                        </Link>
                    </li>
                    <li
                        className="link-item p-3 border-bottom border-2"
                        onClick={() => setDisplayingTheCustomDropdownMenuNames(displayingTheCustomDropdownMenuNames.includes("poster-dropdown-menu") ? displayingTheCustomDropdownMenuNames.filter(name => name !== "poster-dropdown-menu") :  [...displayingTheCustomDropdownMenuNames, "poster-dropdown-menu"])}
                    >
                        <BsPaintBucket />
                        <span className="ms-2">POSTERS</span>
                        {!displayingTheCustomDropdownMenuNames.includes("poster-dropdown-menu") && <IoIosArrowRoundDown className="icon" />}
                        {displayingTheCustomDropdownMenuNames.includes("poster-dropdown-menu") && <IoIosArrowRoundUp className="icon" />}
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
                                    <span>Förvandla ord till konstverk</span>
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
                                    <span>förvandla foton till konstverk</span>
                                </Link>
                            </li>
                            <li className="pt-2 pb-2 dropdown-menu-item-for-custom-navbar">
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/face-swap",
                                        query: {
                                            paintingTypeAsQuery: "poster",
                                        }
                                    }}
                                >
                                    <FaLongArrowAltRight className="me-2" />
                                    <span>ansiktsbyte</span>
                                </Link>
                            </li>
                        </ul>}
                    </li>
                    <li
                        className="link-item p-3 border-bottom border-2"
                        onClick={() => setDisplayingTheCustomDropdownMenuNames(displayingTheCustomDropdownMenuNames.includes("canvas-dropdown-menu") ? displayingTheCustomDropdownMenuNames.filter(name => name !== "canvas-dropdown-menu") :  [...displayingTheCustomDropdownMenuNames, "canvas-dropdown-menu"])}
                    >
                        <BsPaintBucket />
                        <span className="ms-2">CANVASTAVLOR</span>
                        {!displayingTheCustomDropdownMenuNames.includes("canvas-dropdown-menu") && <IoIosArrowRoundDown className="icon"  />}
                        {displayingTheCustomDropdownMenuNames.includes("canvas-dropdown-menu") && <IoIosArrowRoundUp className="icon" />}
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
                                    <span>Förvandla ord till konstverk</span>
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
                                    <span>förvandla foton till konstverk</span>
                                </Link>
                            </li>
                            <li className="pt-2 pb-2 dropdown-menu-item-for-custom-navbar">
                                <Link
                                    className="link"
                                    href={{
                                        pathname: "/face-swap",
                                        query: {
                                            paintingTypeAsQuery: "canvas",
                                        }
                                    }}
                                >
                                    <FaLongArrowAltRight className="me-2" />
                                    <span>ansiktsbyte</span>
                                </Link>
                            </li>
                        </ul>}
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/who-are-we">
                            <AiOutlineHome />
                            <span className="ms-2">VILKA äR VI?</span>
                        </Link>
                    </li>
                    <li className="link-item p-3 border-bottom border-2">
                        <Link className="link" aria-current="page" href="/contact-us">
                            <MdOutlineContactPhone />
                            <span className="ms-2">RINH OSS</span>
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