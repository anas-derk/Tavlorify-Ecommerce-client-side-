import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";

export default function SellingPolicy() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    useEffect(() => {
        setIsLoadingPage(false);
    }, []);
    return (
        <div className="selling-policy">
            <Head>
                <title>Tavlorify Store - Selling Policy</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Welcome To You In Selling Policy Page</h1>
                    </div>
                </div>
            </> : <LoaderPage />}
        </div>
    );
}