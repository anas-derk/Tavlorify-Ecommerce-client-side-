import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ImageToImageManager = () => {

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    return (
        <div className="image-to-image-manager text-center">
            <Head>
                <title>Tavlorify Store - Image To Image Manager</title>
            </Head>
            <ControlPanelHeader />
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-4 fw-bold pb-3">Hello To You In Image To Image Manager Page</h1>
                <Link href="/dashboard/admin/admin-panel/image-to-image-manager/categories-manager" className="btn btn-success mb-3 d-block mx-auto w-25">Categories Manager</Link>
                <Link href="/dashboard/admin/admin-panel/image-to-image-manager/styles-manager" className="btn btn-success mb-3 d-block mx-auto w-25">Styles Manager</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default ImageToImageManager;