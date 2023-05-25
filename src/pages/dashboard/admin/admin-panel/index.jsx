import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminPanel = () => {
    const router = useRouter();
    const [page, setPage] = useState("default");
    const [isWaitStatus, setIsWaitStatus] = useState(false);
    useEffect(() => {
        let adminInfo = JSON.parse(localStorage.getItem("admin-info"));
        if (!adminInfo) {
            router.push("/dashboard/admin/login");
        }
    }, []);
    return (
        <div className="admin-panel">
            <Head>
                <title>Tavlorify Store - Admin Panel</title>
            </Head>
            <aside className="control-panel d-flex justify-content-center align-items-center pe-2 ps-2">
                <ul className="control-list">
                    <li className="mb-3 p-2">
                        <button
                            className="get-products-m btn btn-success"
                        >
                            Products Manager
                        </button>
                    </li>
                    <li className="mb-3 p-2">
                        <button
                            className="get-products-m btn btn-success"
                        >
                            Orders Manager
                        </button>
                    </li>
                    <li className="mb-3 p-2">
                        <button
                            className="get-products-m btn btn-success"
                            onClick={() => {
                                setIsWaitStatus(true);
                                setTimeout(() => {
                                    setIsWaitStatus(false);
                                    setPage("styles-manager");
                                }, 2000);
                            }}
                        >
                            Styles Manager
                        </button>
                    </li>
                </ul>
            </aside>
            {/* Start Content Section */}
            <section className="content p-2 d-flex justify-content-center align-items-center">
                {page === "default" && !isWaitStatus && <h1 className="welcome-msg">Hello To You In Admin Panel</h1>}
                {isWaitStatus && <span class="loader"></span>}
                {page === "styles-manager" &&
                    <section className="styles-manger">
                        <h1 className="welcome-msg">Hello To You In Styles Manager Panel</h1>
                    </section>
                }
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default AdminPanel;