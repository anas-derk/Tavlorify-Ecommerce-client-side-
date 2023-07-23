import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";

const TextToImageManager = () => {

    return (
        <div className="text-to-image-manger text-center">
            <Head>
                <title>Tavlorify Store - Text To Image Manager</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3">Hello To You In Text To Image Manager Page</h1>
            <hr className="mb-3" />
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/categories-manager" className="btn btn-success mb-3 d-block mx-auto w-25">Categories Manager</Link>
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager" className="btn btn-success mb-3 d-block mx-auto w-25">Styles Manager</Link>
        </div>
    );
}

export default TextToImageManager;