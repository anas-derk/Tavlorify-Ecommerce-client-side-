import Link from "next/link";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/router.js";

export default function ControlPanelHeader() {

    const router = useRouter();

    const signOut = async () => {
        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
        await router.push("/admin-dashboard/login");
    }

    return (
        <header className="control-panel-header">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/admin-dashboard">Tavlorify Dashboard</Link>
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
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/orders-managment",
                                            query: {
                                                ordersType: "normal",
                                            }
                                        }}>Orders</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/orders-managment",
                                            query: {
                                                ordersType: "returned",
                                            }
                                        }}>Returned Orders</Link>
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
                                            pathname: "/admin-dashboard/prices-managment",
                                            query: {
                                                productName: "poster",
                                            }
                                        }}>Poster</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/prices-managment",
                                            query: {
                                                productName: "wooden-frame",
                                            }
                                        }}>Wooden Frames</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/prices-managment",
                                            query: {
                                                productName: "hanger",
                                            }
                                        }}>Hangers</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/prices-managment",
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
                                        <Link className="dropdown-item" href="/admin-dashboard/text-to-image-managment/categories-managment/add-new-category">Add New Category</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/categories-managment/update-and-delete-category-info",
                                            query: {
                                                pageName: "text-to-image",
                                            }
                                        }}>Update And Delete Categories</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/admin-dashboard/text-to-image-managment/styles-managment/add-new-style">Add New Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/styles-managment/update-and-delete-style-info",
                                            query: {
                                                pageName: "text-to-image",
                                            }
                                        }}>Update And Delete Styles</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/generated-images-managment",
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
                                        <Link className="dropdown-item" href="/admin-dashboard/image-to-image-managment/categories-managment/add-new-category">Add New Category</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/categories-managment/update-and-delete-category-info",
                                            query: {
                                                pageName: "image-to-image",
                                            }
                                        }}>Update And Delete Categories</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href="/admin-dashboard/image-to-image-managment/styles-managment/add-new-style">Add New Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/styles-managment/update-and-delete-style-info",
                                            query: {
                                                pageName: "image-to-image",
                                            }
                                        }}>Update And Delete Styles</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/generated-images-managment",
                                            query: {
                                                pageName: "image-to-image",
                                            }
                                        }}>Generated Images</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Face Swap
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link className="dropdown-item" href="/admin-dashboard/face-swap-managment/styles-managment/add-new-style">Add New Style</Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/styles-managment/update-and-delete-style-info",
                                            query: {
                                                pageName: "face-swap",
                                            }
                                        }}>Update And Delete Styles</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" href={{
                                            pathname: "/admin-dashboard/generated-images-managment",
                                            query: {
                                                pageName: "face-swap",
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