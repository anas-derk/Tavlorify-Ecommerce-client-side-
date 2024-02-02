import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ImageToImageManager() {

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        }
    }, []);

    return (
        <div className="image-to-image-managment text-center">
            <Head>
                <title>Tavlorify Store - Image To Image Managment</title>
            </Head>
            <ControlPanelHeader />
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Image To Image Manager Page</h1>
                <Link href="/admin-dashboard/image-to-image-managment/categories-managment" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Categories Manager</Link>
                <Link href="/admin-dashboard/image-to-image-managment/styles-managment" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Styles Manager</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}