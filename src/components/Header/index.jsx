import Link from "next/link";
import headerData from "./header_data.jsx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { BiBrain } from "react-icons/bi"
import { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import { BsCart2 } from "react-icons/bs";

const Header = () => {
    const [userId, setUserId] = useState({});
    const router = useRouter();
    const signOut = () => {
        localStorage.removeItem("e-commerce-canvas-user-id");
        router.reload();

    }
    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem("e-commerce-canvas-user-id"));
        setUserId(userId);
    }, []);
    return (
        <header className="global-header bg-success">
            <nav className="navbar navbar-expand-xl navbar-light">
                <div className="container">
                    <span className="navbar-brand fw-bold">Tavlorify Store</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <HiOutlineBars3 />
                    </button>
                    <div className="collapse navbar-collapse justify-content-around" id="navbarNav">
                        <ul className="navbar-nav align-items-center justify-content-center flex-grow-1">
                            {headerData.navbarLinks.map((data, index) =>
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link color-black" href={data.route}>
                                        <span className={`icon me-2`}>{data.icon}</span>
                                        {data.pageTitle}
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item ai-services-item">
                                <div className="nav-link color-black">
                                    <span className="icon me-2">
                                        <BiBrain />
                                    </span>
                                    AI Services
                                </div>
                                <ul className="ai-services-list">
                                    {headerData.aiServicesData.map((ai_service_info, index) => (
                                        <li className="ai-service-item p-3" key={index}>
                                            <Link className="ai-service-link" href={ai_service_info.route}>
                                                <span className="icon me-2">{ai_service_info.icon}</span>
                                                {ai_service_info.pageTitle}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link color-black" href="/cart">
                                    <span className={`icon me-2`}>
                                        <BsCart2 />
                                    </span>
                                    Cart
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item profile-item">
                                <div className="border profile-icon-item p-2 text-center">
                                    <CgProfile className="profile-icon" />
                                </div>
                                <ul className="authentication-list">
                                    {userId && <li className="auth-item p-3">
                                        <Link className="auth-link" href="/profile">
                                            <span className="icon me-2">
                                                <CgProfile />
                                            </span>
                                            My Profile
                                        </Link>
                                    </li>}
                                    {!userId && headerData.authenticationData.map((authInfo, index) => (
                                        <li className="auth-item p-3" key={index}>
                                            <Link className="auth-link" href={authInfo.route}>
                                                <span className="icon me-2">{authInfo.icon}</span>
                                                {authInfo.pageTitle}
                                            </Link>
                                        </li>
                                    ))}
                                    {userId && <li className="auth-item p-3" onClick={signOut}>
                                        <span className="icon me-2">
                                            <GoSignOut />
                                        </span>
                                        Sign Out
                                    </li>}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;