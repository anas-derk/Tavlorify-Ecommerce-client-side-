import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ControlPanelHeader from "@/components/ControlPanelHeader";

const AdminPanel = () => {
    const router = useRouter();
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
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-4">Hello To You In Admin Panel</h1>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel">Products Manager</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4" href="/dashboard/admin/admin-panel">Orders Manager</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto" href="/dashboard/admin/admin-panel/categories-and-styles-manager">Categories And Styles Manager</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default AdminPanel;