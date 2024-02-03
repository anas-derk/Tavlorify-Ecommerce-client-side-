import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ImageToImageCategoriesManager() {

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/admin-dashboard/login");
        }
    }, []);

    return (
        <div className="image-to-image-categories-managment">
            <Head>
                <title>Tavlorify Store - Categories Managment For Image To Image</title>
            </Head>
            <ControlPanelHeader />
            {/* Start Content Section */}
            <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Image To Image Categories Managment Page</h1>
                <Link href="/admin-dashboard/image-to-image-managment/categories-managment/add-new-category" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Add New Category</Link>
                <Link href="/admin-dashboard/image-to-image-managment/categories-managment/update-and-delete-category-info" className="btn btn-danger mb-3 d-block mx-auto w-25 manager-link">Update And Delete Category Info</Link>
            </section>
            {/* End Content Section */}
        </div>
    );
}