import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const Checkout = () => {
    const [allProductsData, setAllProductsData] = useState([]);
    const [isWaitOrdering, setIsWaitOrdering] = useState(false);
    const [productOrderedID, setProductOrderedID] = useState("");
    const [pricesDetailsSummary, setPricesDetailsSummary] = useState({
        regularPrice: 0,
        totalDiscount: 0,
        totalPrice: 0
    });
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (allProductsData) {
            setAllProductsData(allProductsData);
            let totalPrice = 0;
            allProductsData.forEach((product) => {
                totalPrice += product.priceAfterDiscount * product.quantity;
            });
            setPricesDetailsSummary({ ...pricesDetailsSummary, totalPrice: totalPrice });
        }
        // if (id) {
        //     getKlarnaOrderDetails(id)
        //         .then((result) => {
        //             renderKlarnaCheckoutHtmlSnippetFromKlarnaCheckoutAPI(result.html_snippet);
        //         }).catch((err) => console.log(err));
        // }
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
    const renderKlarnaCheckoutHtmlSnippetFromKlarnaCheckoutAPI = (htmlSnippet) => {
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
    const deleteProduct = (id) => {
        let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        allProductsData = allProductsData.filter((product) => product._id != id);
        localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
        setAllProductsData(allProductsData);
    }
    const deleteAllProductsFromCart = () => {
        localStorage.removeItem("tavlorify-store-user-cart");
        setCanvasEcommerceProductsList([]);
    }
    return (
        // Start Checkout Page
        <div className="checkout">
            <Head>
                <title>Tavlorify Store - Checkout</title>
            </Head>
            <Header />
            <section className="page-content">
                {/* Start Container From Bootstrap */}
                <div className="container-fluid pt-4 pb-4">
                    <h1 className="text-center mb-5 fw-bold welcome-msg mx-auto pb-3">Hello To You In Checkout Page</h1>
                    {allProductsData.map((productData) => (
                        <div className="row w-50 mx-auto bg-white border border-2 align-items-center" key={productData._id}>
                            <div className="col-md-2 p-3 text-center">
                                <img
                                    src={productData.generatedImageURL}
                                    alt="product Image !!"
                                    className="product-image"
                                    width="100"
                                    height="100"
                                />
                            </div>
                            <div className="col-md-4 p-3">
                                <h6 className="fw-bold">{productData.paintingType}</h6>
                                <h6>Frame: {productData.frameColor}</h6>
                                <h6>{productData.isExistWhiteBorder}</h6>
                                <h6>{productData.position}</h6>
                                <h6>{productData.size} Cm</h6>
                            </div>
                            <div className="col-md-3 p-3">
                                <span>Quantity: </span>
                                <AiOutlineMinus className="quantity-control-icon me-2" />
                                <span className="fw-bold me-2">{productData.quantity}</span>
                                <AiOutlinePlus className="quantity-control-icon" />
                            </div>
                            <div className="col-md-2 p-3 text-end">
                                <h6 className="fw-bold price-after-discount">{productData.priceAfterDiscount} kr</h6>
                                {productData.priceBeforeDiscount != productData.priceAfterDiscount && <h6 className="fw-bold price-before-discount text-decoration-line-through">{productData.priceBeforeDiscount} kr</h6>}
                            </div>
                            <div className="col-md-1">
                                <BsTrash
                                    className="trash-icon"
                                    onClick={() => deleteProduct(productData._id)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="row w-50 mx-auto bg-white border border-2 align-items-center text-center">
                        <div className="col-md-6 p-3">
                            <h6 className="fw-bold">Summary</h6>
                        </div>
                        <div className="col-md-6 p-3 fw-bold">
                            <div className="row mb-3">
                                <div className="col-md-9 text-start">Regular Price</div>
                                <div className="col-md-3 text-end">{ pricesDetailsSummary.regularPrice } kr</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-9 text-start">Discount</div>
                                <div className="col-md-3 text-danger text-end">-{ pricesDetailsSummary.totalDiscount } kr</div>
                            </div>
                            <div className="row">
                                <div className="col-md-9 text-start">Shipping</div>
                                <div className="col-md-3 text-end">0 kr</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-9 text-start">Total</div>
                                <div className="col-md-3 text-end">{ pricesDetailsSummary.totalPrice } kr</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Container From Bootstrap */}
                <div id="my-checkout-container"></div>
            </section>
        </div >
        // End Checkout Page
    );
}

export default Checkout;