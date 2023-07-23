import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";

const TextToImageStylesManager = () => {
    return (
        <div className="text-to-image-styles-manager">
            <Head>
                <title>Tavlorify Store - Styles Manager For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Text To Image Styles Manager Page</h1>
            <hr className="mb-3" />
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager/add-new-style" className="btn btn-success mb-3 d-block mx-auto w-25">Add New Style</Link>
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager/update-styles-info" className="btn btn-danger mb-3 d-block mx-auto w-25">Update Styles Info</Link>
        </div>
    );
}

export default TextToImageStylesManager;