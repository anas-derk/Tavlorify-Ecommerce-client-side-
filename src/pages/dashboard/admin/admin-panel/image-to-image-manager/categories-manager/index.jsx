import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect } from "react";

const ImageToImageCategoriesManager = () => {

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    return (
        <div className="image-to-image-categories-manager">
            <Head>
                <title>Tavlorify Store - Categories Manager For Image To Image</title>
            </Head>
            <ControlPanelHeader />
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-4 fw-bold pb-3">Hello To You In Image To Image Categories Manager Page</h1>
                <Link href="/dashboard/admin/admin-panel/image-to-image-manager/categories-manager/add-new-category" className="btn btn-success mb-3 d-block mx-auto w-25">Add New Category</Link>
                <Link href="/dashboard/admin/admin-panel/image-to-image-manager/categories-manager/update-and-delete-category-info" className="btn btn-danger mb-3 d-block mx-auto w-25">Update And Delete Category Info</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}

export default ImageToImageCategoriesManager;