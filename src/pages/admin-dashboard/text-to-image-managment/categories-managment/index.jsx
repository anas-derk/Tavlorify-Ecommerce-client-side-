import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo } from "../../../../../public/global_functions/popular";
import { useRouter } from "next/router";

export default function TextToImageCategoriesManager() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

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
        <div className="text-to-image-categories-managment">
            <Head>
                <title>Tavlorify Store - Categories Managment For Text To Image</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                {/* Start Content Section */}
                <section className="content d-flex justify-content-center align-items-center flex-column text-center">
                    <h1 className="welcome-msg mb-5 fw-bold pb-3">Hello To You In Text To Image Categories Managment Page</h1>
                    <Link href="/admin-dashboard/text-to-image-managment/categories-managment/add-new-category" className="btn btn-success mb-3 d-block mx-auto w-25 manager-link">Add New Category</Link>
                    <Link href="/admin-dashboard/text-to-image-managment/categories-managment/update-and-delete-category-info" className="btn btn-danger mb-3 d-block mx-auto w-25 manager-link">Update And Delete Category Info</Link>
                </section>
                {/* End Content Section */}
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}