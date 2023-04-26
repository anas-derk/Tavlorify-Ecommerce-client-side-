import Link from "next/link";
import headerData from "./header_data.jsx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FcSearch } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";

const Header = () => {
    return (
        <header className="global-header bg-success">
            <nav className="navbar navbar-expand-xl navbar-light">
                <div className="container-fluid">
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
                        </ul>
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item profile-item">
                                <div className="border profile-icon-item p-2 text-center">
                                    <CgProfile className="profile-icon" />
                                </div>
                                <ul className="authentication-list">
                                    <li className="auth-item p-3">
                                        <span className="icon me-2">
                                            <CgProfile />
                                        </span>
                                        My Profile
                                    </li>
                                    {headerData.authenticationData.map((authInfo, index) => (
                                        <li className="auth-item p-3" key={index}>
                                            <Link className="auth-link" href={authInfo.route}>
                                                <span className="icon me-2">{authInfo.icon}</span>
                                                {authInfo.pageTitle}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="auth-item p-3">
                                        <span className="icon me-2">
                                            <GoSignOut />
                                        </span>
                                        Sign Out
                                    </li>
                                </ul>
                            </li>
                            <li className="search-icon-item">
                                <FcSearch className="search-icon" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;