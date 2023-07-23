import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";

const TextToImageCategoriesManager = () => {
    return (
        <div className="text-to-image-categories-manager">
            <Head>
                <title>Tavlorify Store - Categories Manager For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Text To Image Categories Manager Page</h1>
            <hr className="mb-3" />
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager/add-new-category" className="btn btn-success mb-3 d-block mx-auto w-25">Add New Category</Link>
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager/update-categories-info" className="btn btn-danger mb-3 d-block mx-auto w-25">Update Category Info</Link>
        </div>
    );
}

export default TextToImageCategoriesManager;