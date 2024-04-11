import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import validations from "../../../../public/global_functions/validations";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function ImageToImageManager() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem("tavlorify-store-admin-user-token");
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    } else {
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem("tavlorify-store-admin-user-token");
                        await router.push("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.push("/admin-dashboard/login");
    }, []);

    return (
        <div className="face-swap-managment text-center">
            <Head>
                <title>Tavlorify Store - Image To Image Managment</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Image To Image Manager Page</h1>
                    <Link href="/admin-dashboard/face-swap-managment/styles-managment" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Styles Manager</Link>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}