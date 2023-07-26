import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useRouter } from "next/router";

const TextToImageStylesManager = () => {

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    return (
        <div className="text-to-image-styles-manager">
            <Head>
                <title>Tavlorify Store - Styles Manager For Text To Image</title>
            </Head>
            <ControlPanelHeader />
            <h1 className="welcome-msg mt-3 text-center">Hello To You In Text To Image Styles Manager Page</h1>
            <hr className="mb-3" />
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager/add-new-style" className="btn btn-success mb-3 d-block mx-auto w-25">Add New Style</Link>
            <Link href="/dashboard/admin/admin-panel/text-to-image-manager/styles-manager/update-and-delete-styles-info" className="btn btn-danger mb-3 d-block mx-auto w-25">Update And Delete Styles Info</Link>
        </div>
    );
}

export default TextToImageStylesManager;