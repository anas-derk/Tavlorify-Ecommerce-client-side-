import Link from "next/link";
import headerData from "./header_data.jsx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { FcSearch } from "react-icons/fc";

const Header = () => {
    return (
        <header className="header bg-success">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <span className="navbar-brand fw-bold">Tavlorify Store</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <HiOutlineBars3 />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-center">
                            {headerData.map((data, index) =>
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link color-black" href={data.route}>
                                        <span className={`icon me-2`}>{ data.icon }</span>
                                        {data.pageTitle}
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
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