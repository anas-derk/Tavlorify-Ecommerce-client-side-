import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import LoaderPage from "@/components/LoaderPage";

export default function AdminDashboard() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        } else {
            setIsLoadingPage(false);
        }
    }, []);
    
    return (
        <div className="admin-panel">
            <Head>
                <title>Tavlorify Store - Admin Panel</title>
            </Head>
            {!isLoadingPage ? <>
                {/* Start Control Panel Header */}
                <ControlPanelHeader />
                {/* End Control Panel Header */}
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Admin Panel</h1>
                    <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel">Orders Manager</Link>
                    <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/text-to-image-managment">Text To Image Page Manager</Link>
                    <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/image-to-image-managment">Image To Image Page Manager</Link>
                </section>
                {/* End Content Section */}
            </> : <LoaderPage />}
        </div>
    );
}