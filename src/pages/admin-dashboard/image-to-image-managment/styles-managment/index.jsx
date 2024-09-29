import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAdminInfo } from "../../../../../public/global_functions/popular";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function ImageToImageStylesManager() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [errorMsgOnLoadingThePage, setErrorMsgOnLoadingThePage] = useState("");

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    } else {
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.replace("/admin-dashboard/login");
    }, []);

    return (
        <div className="image-to-image-styles-managment">
            <Head>
                <title>Tavlorify Store - Styles Managment For Image To Image</title>
            </Head>
            {!isLoadingPage && !errorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Image To Image Styles Managment Page</h1>
                    <Link href="/admin-dashboard/image-to-image-managment/styles-managment/add-new-style" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Add New Style</Link>
                    <Link href="/admin-dashboard/image-to-image-managment/styles-managment/update-and-delete-styles-info" className="btn btn-danger mb-3 d-block mx-auto w-25 manager-link">Update And Delete Styles Info</Link>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !errorMsgOnLoadingThePage && <LoaderPage />}
            {errorMsgOnLoadingThePage && <ErrorOnLoadingThePage errorMsg={errorMsgOnLoadingThePage} />}
        </div>
    );
}