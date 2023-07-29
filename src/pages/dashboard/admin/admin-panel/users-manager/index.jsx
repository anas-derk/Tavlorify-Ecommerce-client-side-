import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ControlPanelHeader from "@/components/ControlPanelHeader";

const UsersManager = () => {
    const router = useRouter();
    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);
    return (
        <div className="users-manager">
            <Head>
                <title>Tavlorify Store - Users Manager</title>
            </Head>
            {/* Start Control Panel Header */}
            <ControlPanelHeader />
            {/* End Control Panel Header */}
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-4 fw-bold pb-3">Hello To You In Users Manager</h1>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/users-manager/registered-users">Registered Users</Link>
                <Link className="btn btn-success manager-link w-25 mx-auto mb-4 p-2" href="/dashboard/admin/admin-panel/users-manager/users/guest-users">Guest Users</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default UsersManager;