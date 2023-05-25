import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import text_to_image_data from "../../../../../public/data/text_to_image_data";

const AdminPanel = () => {
    const router = useRouter();
    const [page, setPage] = useState("default");
    const [isWaitStatus, setIsWaitStatus] = useState(false);
    const [isGetCategorisAndStylesStatus, setIsGetCategorisAndStylesStatus] = useState(false);
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
                                    setPage("categories-and-styles-manager");
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
                {isWaitStatus && <span className="loader"></span>}
                {page === "categories-and-styles-manager" && !isWaitStatus &&
                    <section className="categories-and-styles-manger">
                        <h1 className="welcome-msg">Hello To You In Categories And Styles Manager Panel</h1>
                        <hr className="mb-3" />
                        {!isGetCategorisAndStylesStatus && <div className="categories-and-styles-box">
                            <h6 className="mb-4 text-center bg-info p-3">Category: Art</h6>
                            <table className="categories-and-styles-table">
                                <thead>
                                    <tr>
                                        <th>Style Name</th>
                                        <th>Prompt</th>
                                        <th>Negative Prompt</th>
                                        <th>Model Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {text_to_image_data.categoriesData[0].styles.map((style, index) => (
                                        <tr key={index}>
                                            <td>{style.name}</td>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>4</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                    </section>
                }
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default AdminPanel;