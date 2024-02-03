import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function FaceSwapStylesManager() {

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        }
    }, []);

    return (
        <div className="face-swap-styles-managment">
            <Head>
                <title>Tavlorify Store - Styles Managment For Face Swap</title>
            </Head>
            <ControlPanelHeader />
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Face Swap Styles Managment Page</h1>
                <Link href="/admin-dashboard/image-to-image-managment/styles-managment/add-new-style" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Add New Style</Link>
                <Link href="/admin-dashboard/image-to-image-managment/styles-managment/update-and-delete-styles-info" className="btn btn-danger mb-3 d-block mx-auto w-25 manager-link">Update And Delete Styles Info</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}