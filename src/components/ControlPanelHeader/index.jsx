import Link from "next/link";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/router.js";

const ControlPanelHeader = () => {
    const router = useRouter();
    const signOut = () => {
        localStorage.removeItem("tavlorify-store-admin-id");
        router.push("/dashboard/admin/login");
    }
    return (
        <header className="control-panel-header">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/dashboard/admin/admin-panel">Tavlorify Dashboard</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Orders
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/orders-manager">All Orders</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/returned-orders-manager">Returned</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/returned-orders-manager/add-new-order">Add New Order</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Prices
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/dashboard/admin/admin-panel/prices-manager",
                                            query: {
                                                productName: "poster",
                                            }
                                        }}>Poster</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/dashboard/admin/admin-panel/prices-manager",
                                            query: {
                                                productName: "wooden-frame",
                                            }
                                        }}>Wooden Frames</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/dashboard/admin/admin-panel/prices-manager",
                                            query: {
                                                productName: "hanger",
                                            }
                                        }}>Hangers</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/dashboard/admin/admin-panel/prices-manager",
                                            query: {
                                                productName: "canvas",
                                            }
                                        }}>Canvas</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Text To Image
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager/add-new-category">Add New Category</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager/update-and-delete-category-info">Update And Delete Category</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager/add-new-style">Add New Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager/update-and-delete-styles-info">Update And Delete Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/dashboard/admin/admin-panel/generated-images",
                                            query: {
                                                pageName: "text-to-image",
                                            }
                                        }}>Generated Images</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Image To Image
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/image-to-image-manager/categories-manager/add-new-category">Add New Category</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/image-to-image-manager/categories-manager/update-and-delete-category-info">Update And Delete Category</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/image-to-image-manager/styles-manager/add-new-style">Add New Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/dashboard/admin/admin-panel/image-to-image-manager/styles-manager/update-and-delete-styles-info">Update And Delete Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/dashboard/admin/admin-panel/generated-images",
                                            query: {
                                                pageName: "image-to-image",
                                            }
                                        }}>Generated Images</Link>
                                    </li>
                                </ul>
                            </li>
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