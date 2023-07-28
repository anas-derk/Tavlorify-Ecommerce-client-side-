import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const CategoriesManager = () => {
    const router = useRouter();
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);
    return (
        // Start Categories Manager
        <div className="categories-manager">
            <Head>
                <title>Tavlorify Store - Categories Manager</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-4 fw-bold pb-3">Hello To You In Categories Manager Page</h1>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/categories-manager/add-new-category">Add Category</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/categories-manager/add-new-sub-category">Add New Sub Category</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/categories-manager/add-new-sub-category-from-sub-category">Add New Sub Category From Sub Category</Link>
                <Link className="btn btn-danger manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel/categories-manager/update-and-delete-categories">Update And Delete Categories</Link>
            </section>
            {/* End Content Section */}
        </div>
        // End Categories Manager
    );
}

export default CategoriesManager;