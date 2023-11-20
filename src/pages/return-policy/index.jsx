import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";

export default function ReturnPolicy() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    useEffect(() => {
        setIsLoadingPage(false);
    }, []);
    return (
        <div className="return-policy">
            <Head>
                <title>Tavlorify Store - Return Policy</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Welcome To You In Return Policy Page</h1>
                    </div>
                </div>
            </> : <LoaderPage />}
        </div>
    );
}