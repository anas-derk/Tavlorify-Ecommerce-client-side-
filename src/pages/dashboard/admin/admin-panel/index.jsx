import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ControlPanelHeader from "@/components/ControlPanelHeader";

const AdminPanel = () => {
    const router = useRouter();
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);
    return (
        <div className="admin-panel">
            <Head>
                <title>Tavlorify Store - Admin Panel</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-4 fw-bold pb-3">Hello To You In Admin Panel</h1>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/categories-manager">Categories Manager</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/products-manager">Products Manager</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel">Orders Manager</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/text-to-image-manager">Text To Image Page Manager</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto p-2" href="/dashboard/admin/admin-panel/image-to-image-manager">Image To Image Page Manager</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default AdminPanel;