import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { BiBrain } from "react-icons/bi"
import { BsCart2, BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome, AiOutlineUserAdd, AiOutlineContacts } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { HiArrowSmDown } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";

const Header = () => {
    const [userId, setUserId] = useState({});
    const [optionsLinkName, setOptionsLinkName] = useState("");
    const router = useRouter();
    const signOut = () => {
        localStorage.removeItem("tavlorify-store-user-id");
        router.reload();
    }
    useEffect(() => {
        let userId = localStorage.getItem("tavlorify-store-user-id");
        setUserId(userId);
    }, []);
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
                                {!userId && <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href="/login">
                                            <FiLogIn />
                                            <span className="ms-2">Log In</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item bg-dark auth-item">
                                        <Link className="nav-link text-white" aria-current="page" href="/sign-up">
                                            <AiOutlineUserAdd />
                                            <span className="ms-2">Sign Up for Free</span>
                                        </Link>
                                    </li>
                                </>}
                                <li className="nav-item ms-3">
                                    <Link className="nav-link" aria-current="page" href="/cart">
                                        <BsCart2 />
                                        <span className="ms-2">My Cart</span>
                                    </Link>
                                </li>
                                <li className="nav-item ms-3">
                                    <Link className="nav-link" aria-current="page" href="/orders">
                                        <MdProductionQuantityLimits />
                                        <span className="ms-2">My Orders</span>
                                    </Link>
                                </li>
                                {userId && <>
                                    <li className="nav-item">
                                        <Link className="nav-link" aria-current="page" href="/profile">
                                            <CgProfile />
                                            <span className="ms-2">My Profile</span>
                                        </Link>
                                    </li>
                                    <li
                                        className="nav-item ms-3 bg-danger auth-item text-white sign-out-btn d-flex align-items-center p-2"
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
            {/* Start Bottom Header */}
            <div className="bottom-header pt-2 pb-2">
                {/* Start Container From Bootstrap */}
                <div className="container-fluid">
                    <ul className="website-explain-list d-flex justify-content-center">
                        <li className="link-item p-2">
                            <Link className="link text-dark" href='/'>
                                <AiOutlineHome />
                                <span className="ms-2">Home</span>
                            </Link>
                        </li>
                        <li className="link-item p-2" style={optionsLinkName === "poster" ? { backgroundColor: "#CCC", borderRadius: "4px" } : {}}>
                            <Link className="link text-dark" href='/products'>
                                <MdProductionQuantityLimits />
                                <span className="ms-2">Poster</span>
                            </Link>
                            <HiArrowSmDown
                                className="show-and-hide-links-btn"
                                onClick={() => setOptionsLinkName(value => value === "poster" ? "" : "poster")}
                            />
                            {optionsLinkName === "poster" && <ul className="links-box">
                                <li className="p-3">
                                    <Link
                                        href={{
                                            pathname: "/text-to-image",
                                            query: {
                                                printsName: "poster",
                                            }
                                        }}
                                        className="text-dark"
                                    >
                                        Text To Image
                                    </Link>
                                </li>
                                <li className="p-3">
                                    <Link href="/image-to-image" className="text-dark">
                                        Image To Image
                                    </Link>
                                </li>
                                <li className="p-3">
                                    <Link href="/products" className="text-dark">
                                        Products
                                    </Link>
                                </li>
                            </ul>}
                        </li>
                        <li className="link-item p-2" style={optionsLinkName === "canvas" ? { backgroundColor: "#CCC", borderRadius: "4px" } : {}}>
                            <Link className="link text-dark" href='/products'>
                                <BiBrain />
                                <span className="ms-2">Canvas</span>
                            </Link>
                            <HiArrowSmDown
                                className="show-and-hide-links-btn"
                                onClick={() => setOptionsLinkName(value => value === "canvas" ? "" : "canvas")}
                            />
                            {optionsLinkName === "canvas" && <ul className="links-box">
                                <li className="p-3">
                                <Link
                                        href={{
                                            pathname: "/text-to-image",
                                            query: {
                                                printsName: "canvas",
                                            }
                                        }}
                                        className="text-dark"
                                    >
                                        Text To Image
                                    </Link>
                                </li>
                                <li className="p-3">
                                    <Link href="/image-to-image" className="text-dark">
                                        Image To Image
                                    </Link>
                                </li>
                                <li className="p-3">
                                    <Link href="/products" className="text-dark">
                                        Products
                                    </Link>
                                </li>
                            </ul>}
                        </li>
                        <li className="link-item p-2">
                            <Link className="link text-dark" href='/who-are-we'>
                                <BsInfoCircle />
                                <span className="ms-2">Who Are We ?</span>
                            </Link>
                        </li>
                        <li className="link-item p-2">
                            <Link className="link text-dark" href='/contact-us'>
                                <AiOutlineContacts />
                                <span className="ms-2">Contact Us</span>
                            </Link>
                        </li>
                        <li className="link-item p-2">
                            <Link className="link text-dark" href='/faq'>
                                <FaQuestion />
                                <span className="ms-2">FAQ</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* End Container From Bootstrap */}
            </div>
            {/* End Bottom Header */}
        </header>
        // End Global Header
    );
}

export default Header;