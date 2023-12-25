import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import Footer from "@/components/Footer";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function Confirmation() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [newTotalProductsCount, setNewTotalProductsCount] = useState(null);

    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            getKlarnaOrderDetails(id)
                .then((result) => {
                    if (result.status === "checkout_complete") {
                        localStorage.removeItem("tavlorify-store-user-cart");
                        setNewTotalProductsCount(0);
                        setIsLoadingPage(false);
                        renderKlarnaConfirmationHtmlSnippetFromKlarnaCheckoutAPI(result.html_snippet);
                    }
                }).catch(() => {
                    setIsLoadingPage(false);
                    setIsErrorMsgOnLoadingThePage(true);
                });
        }
    }, [id]);

    const getKlarnaOrderDetails = async (orderId) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/orders/order-details-from-klarna/${orderId}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    const renderKlarnaConfirmationHtmlSnippetFromKlarnaCheckoutAPI = (htmlSnippet) => {
        try {
            let confirmationContainer = document.getElementById("my-confirmation-container");
            confirmationContainer.innerHTML = htmlSnippet;
            let scriptsTags = confirmationContainer.getElementsByTagName("script");
            for (let i = 0; i < scriptsTags.length; i++) {
                let parentNode = scriptsTags[i].parentNode;
                let newScriptTag = document.createElement("script");
                newScriptTag.type = "text/javascript";
                newScriptTag.text = scriptsTags[i].text;
                parentNode.removeChild(scriptsTags[i]);
                parentNode.appendChild(newScriptTag);
            }
        }
        catch (err) {
            throw Error(err);
        }
    }

    return (
        // Start Confirmation Page
        <div className="confirmation">
            <Head>
                <title>Tavlorify - Bekräftelse</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header newTotalProductsCount={newTotalProductsCount} />
                {/* Start Container From Bootstrap */}
                <div className="container-fluid pt-4 pb-4">
                    <h1 className="text-center mb-5 fw-bold welcome-msg mx-auto pb-3">Hej till dig på bekräftelsessidan</h1>
                </div>
                {/* End Container From Bootstrap */}
                <div id="my-confirmation-container"></div>
                <Footer />
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}