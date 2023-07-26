import Link from "next/link";
import { GoSignOut } from "react-icons/go";
import { useState } from "react";
import { useRouter } from "next/router.js";

const ControlPanelHeader = () => {
    const router = useRouter();
    const signOut = () => {
        localStorage.removeItem("tavlorify-store-admin-id");
        router.push("/dashboard/admin/login");
    }
    return (
        <header className="control-panel-header">
            {/* <ul className="control-list">
                <li className="p-4">
                    <Link
                        className="products-manager-link"
                        href="/dashboard/admin/admin-panel/products-manager"
                    >
                        Products Manager
                    </Link>
                </li>
                <li className="p-4">
                    <Link
                        className="orders-manager-link"
                        href="/dashboard/admin/admin-panel"
                    >
                        Orders Manager
                    </Link>
                </li>
                <li className="p-4">
                    <Link
                        className="categories-and-styles-manager-link"
                        href="/dashboard/admin/admin-panel/categories-and-styles-manager"
                    >
                        Categories And Styles Manager
                    </Link>
                </li>
            </ul> */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" href="/dashboard/admin/admin-panel">Tavlorify Store</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li
                                className="nav-item ms-3 bg-danger text-white sign-out-btn d-flex align-items-center p-2"
                                onClick={signOut}
                            >
                                <GoSignOut />
                                <span className="ms-2">Sign Out</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default ControlPanelHeader;