import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { BsCart2, BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import global_data from "../../../public/data/global";
import { GrFormClose } from "react-icons/gr";

const Header = ({ newTotalProductsCount }) => {
    const [userId, setUserId] = useState({});
    const [allProductsData, setAllProductsData] = useState("");
    const [totalProductsCount, setTotalProductsCount] = useState("");
    const [isDisplayAllProductManagmentBox, setIsDisplayAllProductManagmentBox] = useState(false);
    const [pricesDetailsSummary, setPricesDetailsSummary] = useState({
        totalPriceBeforeDiscount: 0,
        totalDiscount: 0,
        totalPriceAfterDiscount: 0,
    });
    const router = useRouter();
    useEffect(() => {
        let userId = localStorage.getItem("tavlorify-store-user-id");
        setUserId(userId);
        const allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (allProductsData) {
            setAllProductsData(allProductsData);
            setTotalProductsCount(allProductsData.length);
        } else setTotalProductsCount(0);
    }, [newTotalProductsCount]);
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
    const signOut = () => {
        localStorage.removeItem("tavlorify-store-user-id");
        router.reload();
    }
    return (
        // Start Global Header
        <header className="global-header pt-3 pb-2">
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
                                                    generatedImagePathInMyServerAsQuery: "assets/images/generatedImages/previewImageForPosterInTextToImage.png",
                                                    paintingTypeAsQuery: "poster",
                                                    positionAsQuery: "vertical",
                                                    sizeAsQuery: "50x70",
                                                    isExistWhiteBorderAsQuery: "without-border",
                                                    frameColorAsQuery: "none",
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
                                                    generatedImagePathInMyServerAsQuery: "assets/images/generatedImages/previewImageForPosterInImageToImage.png",
                                                    paintingTypeAsQuery: "poster",
                                                    positionAsQuery: "vertical",
                                                    sizeAsQuery: "50x70",
                                                    isExistWhiteBorderAsQuery: "without-border",
                                                    frameColorAsQuery: "none",
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
                                                    generatedImagePathInMyServerAsQuery: "assets/images/generatedImages/previewImageForCanvasInTextToImage.png",
                                                    paintingTypeAsQuery: "canvas",
                                                    positionAsQuery: "vertical",
                                                    sizeAsQuery: "30x40",
                                                    isExistWhiteBorderAsQuery: "without-border",
                                                    frameColorAsQuery: "none",
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
                                                    generatedImagePathInMyServerAsQuery: "assets/images/generatedImages/previewImageForPosterInImageToImage.png",
                                                    paintingTypeAsQuery: "canvas",
                                                    positionAsQuery: "vertical",
                                                    sizeAsQuery: "30x40",
                                                    isExistWhiteBorderAsQuery: "without-border",
                                                    frameColorAsQuery: "none",
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
                                <div className="nav-link btn show-all-products-btn">
                                    {!isDisplayAllProductManagmentBox && <BsCart2 className="cart-icon" onClick={displayAllProductManagmentBox} />}
                                    {isDisplayAllProductManagmentBox && <GrFormClose className="close-all-product-managment-box" onClick={closeAllProductManagmentBox} />}
                                    {!isDisplayAllProductManagmentBox && <span className="total-products-count-box fw-bold">{totalProductsCount}</span>}
                                    {isDisplayAllProductManagmentBox && <div className="all-products-managment-box pb-3 ps-3 pe-3">
                                        {allProductsData.length > 0 ? allProductsData.map((productData) => (
                                            <div className="row bg-white border border-2 align-items-center" key={productData._id}>
                                                <div className="col-md-3 p-3 text-center">
                                                    <Link href={{
                                                        pathname: `/${productData.service}`,
                                                        query: {
                                                            generatedImagePathInMyServerAsQuery: productData.generatedImageURL,
                                                            textPromptAsQuery: productData.textPrompt,
                                                            paintingTypeAsQuery: productData.paintingType,
                                                            positionAsQuery: productData.position,
                                                            sizeAsQuery: productData.size,
                                                            isExistWhiteBorderAsQuery: productData.isExistWhiteBorder,
                                                            frameColorAsQuery: productData.frameColor,
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
                                                <div className="col-md-7 p-3 text-start">
                                                    <h6 className="fw-bold">{productData.paintingType}</h6>
                                                    <h6>Frame: {productData.frameColor}</h6>
                                                    <h6>{productData.isExistWhiteBorder}</h6>
                                                    <h6>{productData.position}</h6>
                                                    <h6>{productData.size} Cm</h6>
                                                    <h6 className="fw-bold price-after-discount">{productData.priceAfterDiscount * productData.quantity} kr</h6>
                                                    {productData.priceBeforeDiscount != productData.priceAfterDiscount && <h6 className="fw-bold price-before-discount text-decoration-line-through">{productData.priceBeforeDiscount * productData.quantity} kr</h6>}
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
                                                <div className="col-md-2 text-center">
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
                                            <div className="row bg-white border border-2 align-items-center text-center">
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
                                            <Link href="/checkout" className="btn btn-dark w-100 p-3">Go To Checkout</Link>
                                        </>}
                                    </div>}
                                </div>
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
        </header>
        // End Global Header
    );
}

export default Header;