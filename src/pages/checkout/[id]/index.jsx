import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const Checkout = () => {
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (id) {
            getKlarnaOrderDetails(id)
                .then((result) => {
                    renderKlarnaHtmlSnippetFromKlarnaCheckoutAPI(result.html_snippet);
                }).catch((err) => console.log(err));
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
    const renderKlarnaHtmlSnippetFromKlarnaCheckoutAPI = (htmlSnippet) => {
        try {
            let checkoutContainer = document.getElementById("my-checkout-container");
            checkoutContainer.innerHTML = htmlSnippet;
            let scriptsTags = checkoutContainer.getElementsByTagName("script");
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
        // Start Checkout Page
        <div className="checkout">
            <Head>
                <title>Tavlorify Store - Checkout</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container-fluid pt-4 pb-4">
                <h1 className="text-center mb-5 fw-bold welcome-msg mx-auto pb-3">Hello To You In Checkout Page</h1>
            </div>
            {/* End Container From Bootstrap */}
            <div id="my-checkout-container"></div>
        </div>
    );
}

export default Checkout;