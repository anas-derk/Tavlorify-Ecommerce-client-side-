import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect } from "react";

const TextToImageCategoriesManager = () => {

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    return (
        <div className="text-to-image-categories-manager">
            <Head>
                <title>Tavlorify Store - Categories Manager For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Text To Image Categories Manager Page</h1>
            <hr className="mb-3" />
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager/add-new-category" className="btn btn-success mb-3 d-block mx-auto w-25">Add New Category</Link>
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager/update-and-delete-category-info" className="btn btn-danger mb-3 d-block mx-auto w-25">Update And Delete Category Info</Link>
        </div>
    );
}

export default TextToImageCategoriesManager;