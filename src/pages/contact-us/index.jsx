import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Footer from "@/components/Footer";

export default function ContactUs() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);

    return (
        <div className="contact-us policy-page">
            <Head>
                <title>Tavlorify - KONTAKTA OSS</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">KONTAKTA OSS</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h5 className="mb-2 fw-bold">Kontakta oss</h5>
                            <p className="mb-3">Behöver du hjälp? Kika gärna på vår FAQ-sida och Kundservice-sida där vi besvarar de vanligaste frågorna. Om du har ytterligare frågor eller behöver personlig assistans, är du välkommen att kontakta oss:</p>
                            <h6 className="mb-2 fw-bold">Skicka ett mail</h6>
                            <p className="mb-3">E-post: info@tavlorify.se</p>
                            <p className="mb-3">Vi strävar efter att besvara alla mail så snabbt som möjligt. Du kan förvänta dig ett svar inom 24 timmar.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}