import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from "axios";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { v4 as generateUniqueID } from "uuid";
import global_data from "../../../public/data/global";
import Link from "next/link";

const Checkout = ({ orderId }) => {
    const [allProductsData, setAllProductsData] = useState([]);
    const [newTotalProductsCount, setNewTotalProductsCount] = useState(0);
    const [klarnaOrderId, setKlarnaOrderId] = useState("");
    const [pricesDetailsSummary, setPricesDetailsSummary] = useState({
        totalPriceBeforeDiscount: 0,
        totalDiscount: 0,
        totalPriceAfterDiscount: 0,
    });
    useEffect(() => {
        let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (Array.isArray(allProductsData)) {
            if (allProductsData.length > 0) {
                let totalPriceBeforeDiscount = calcTotalOrderPriceBeforeDiscount(allProductsData);
                let totalDiscount = calcTotalOrderDiscount(allProductsData);
                let totalPriceAfterDiscount = calcTotalOrderPriceAfterDiscount(totalPriceBeforeDiscount, totalDiscount);
                setPricesDetailsSummary({
                    ...pricesDetailsSummary,
                    totalPriceBeforeDiscount,
                    totalDiscount,
                    totalPriceAfterDiscount,
                });
                setAllProductsData(allProductsData);
                orderAllProducts(orderId)
                    .then(async (result) => {
                        setKlarnaOrderId(result.order_id);
                        await updateOrder(orderId, result.order_id);
                        renderKlarnaCheckoutHtmlSnippetFromKlarnaCheckoutAPI(result.html_snippet);
                    }).catch((err) => console.log(err));
            }
        }
    }, []);
    const calcTotalOrderPriceBeforeDiscount = (allProductsData) => {
        let tempTotalPriceBeforeDiscount = 0;
        allProductsData.forEach((product) => {
            tempTotalPriceBeforeDiscount += product.priceBeforeDiscount * product.quantity;
        });
        return tempTotalPriceBeforeDiscount;
    }
    const calcTotalOrderDiscount = (allProductsData) => {
        let tempTotalDiscount = 0;
        allProductsData.forEach((product) => {
            tempTotalDiscount += (product.priceBeforeDiscount - product.priceAfterDiscount) * product.quantity;
        });
        return tempTotalDiscount;
    }
    const calcTotalOrderPriceAfterDiscount = (totalPriceBeforeDiscount, totalDiscount) => {
        return totalPriceBeforeDiscount - totalDiscount;
    }
    const calcTotalProductPriceDiscountForKlarnaCheckoutAPI = (priceBeforeDiscount, priceAfterDiscount, quantity) => {
        return (priceBeforeDiscount - priceAfterDiscount) * quantity;
    }
    const calcTotalProductPriceIncludedDiscountForKlarnaCheckoutAPI = (priceAfterDiscount, quantity) => {
        return priceAfterDiscount * quantity;
    }
    const calcTotalOrderTaxAmountForKlarnaCheckoutAPI = (totalAmount) => {
        return totalAmount - totalAmount * 10000 / (10000 + 2500);
    }
    const getOrderLinesForKlarnaCheckoutAPI = (allProductsData) => {
        let order_lines = [];
        allProductsData.forEach((product) => {
            const tempTotalAmount = calcTotalProductPriceIncludedDiscountForKlarnaCheckoutAPI(product.priceAfterDiscount, product.quantity);
            order_lines.push({
                type: "physical",
                reference: product._id,
                name: `${product.paintingType}, ${product.frameColor} Frame, ${product.isExistWhiteBorder}, ${product.position}, ${product.size} Cm`,
                quantity: product.quantity,
                quantity_unit: "pcs",
                unit_price: product.priceBeforeDiscount * 100,
                tax_rate: 2500,
                total_amount: tempTotalAmount * 100,
                total_discount_amount: calcTotalProductPriceDiscountForKlarnaCheckoutAPI(product.priceBeforeDiscount, product.priceAfterDiscount, product.quantity) * 100,
                total_tax_amount: calcTotalOrderTaxAmountForKlarnaCheckoutAPI(tempTotalAmount * 100),
                image_url: `${process.env.BASE_API_URL}/${product.generatedImageURL}`,
            });
        });
        return order_lines;
    }
    const orderAllProducts = async (orderId) => {
        const tempAllProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
        if (Array.isArray(tempAllProductsData)) {
            if (tempAllProductsData.length > 0) {
                const orderDetails = {
                    purchase_country: "SE",
                    purchase_currency: "SEK",
                    locale: "sv-SE",
                    order_amount: calcTotalOrderPriceAfterDiscount(calcTotalOrderPriceBeforeDiscount(tempAllProductsData), calcTotalOrderDiscount(tempAllProductsData)) * 100,
                    order_tax_amount: calcTotalOrderPriceAfterDiscount(calcTotalOrderPriceBeforeDiscount(tempAllProductsData), calcTotalOrderDiscount(tempAllProductsData)) * 100 * 0.20,
                    order_lines: getOrderLinesForKlarnaCheckoutAPI(tempAllProductsData),
                    merchant_urls: {
                        terms: `https://tavlorify.se/terms`,
                        checkout: `https://tavlorify.se/checkout/{checkout.order.id}`,
                        confirmation: `https://tavlorify.se/confirmation/{checkout.order.id}`,
                        push: `${process.env.BASE_API_URL}/orders/handle-klarna-checkout-complete/{checkout.order.id}`,
                    },
                    merchant_reference1: orderId,
                    merchant_reference2: orderId,
                    options: {
                        allow_separate_shipping_address: true,
                    },
                    shipping_options: [
                        {
                            id: "4db52f01-67e4-4d70-af73-1913792f0bfe",
                            name: "Tavlorify",
                            description: "EXPRESS 1-2 Days",
                            preselected: true,
                            shipping_method: "Own",
                            price: 0,
                            tax_amount: 0,
                            tax_rate: 0,
                            tms_reference: generateUniqueID(),
                        }
                    ]
                }
                try {
                    const res = await Axios.post(`${process.env.BASE_API_URL}/orders/send-order-to-klarna`, orderDetails);
                    const result = await res.data;
                    return result;
                }
                catch (err) {
                    console.log(err.response.data);
                }
            }
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
    const updateProductQuantity = (allProductsData, productId, operation) => {
        switch (operation) {
            case "increase-product-quantity": {
                allProductsData.forEach((product) => {
                    if (product._id === productId && product.quantity < 50) product.quantity++;
                });
                return allProductsData;
            }
            case "decrease-product-quantity": {
                allProductsData.forEach((product) => {
                    if (product._id === productId && product.quantity > 1) product.quantity--;
                });
                return allProductsData;
            }
            default: {
                console.log("Error, Wrong Operation !!");
            }
        }
    }
    const updateKlarnaOrder = async (productId, operation, orderId) => {
        let newProductsData = [];
        if (operation === "increase-product-quantity" || operation === "decrease-product-quantity") {
            newProductsData = updateProductQuantity(allProductsData, productId, operation);
        } else if (operation === "delete-product") {
            newProductsData = deleteProduct(productId);
        }
        const orderDetails = {
            order_amount: calcTotalOrderPriceAfterDiscount(calcTotalOrderPriceBeforeDiscount(newProductsData), calcTotalOrderDiscount(newProductsData)) * 100,
            order_tax_amount: calcTotalOrderPriceAfterDiscount(calcTotalOrderPriceBeforeDiscount(newProductsData), calcTotalOrderDiscount(newProductsData)) * 100 * 0.20,
            order_lines: getOrderLinesForKlarnaCheckoutAPI(newProductsData),
        }
        try {
            const res = await Axios.put(`${process.env.BASE_API_URL}/orders/update-klarna-order/${orderId}`, orderDetails);
            const result = await res.data;
            localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(newProductsData));
            setAllProductsData(newProductsData);
            setNewTotalProductsCount(newProductsData.length);
            let totalPriceBeforeDiscount = calcTotalOrderPriceBeforeDiscount(newProductsData);
            let totalDiscount = calcTotalOrderDiscount(newProductsData);
            let totalPriceAfterDiscount = calcTotalOrderPriceAfterDiscount(totalPriceBeforeDiscount, totalDiscount);
            setPricesDetailsSummary({
                ...pricesDetailsSummary,
                totalPriceBeforeDiscount,
                totalDiscount,
                totalPriceAfterDiscount,
            });
            renderKlarnaCheckoutHtmlSnippetFromKlarnaCheckoutAPI(result.html_snippet);
        }
        catch (err) {
            console.log(err.response.data);
        }
    }
    const deleteProduct = (productId) => {
        return allProductsData.filter((product) => product._id != productId);
    }
    const updateOrder = async (orderId, klarnaOrderId) => {
        try{
            const res = await Axios.put(`${process.env.BASE_API_URL}/orders/update-order/${orderId}`, {
                klarnaOrderId: klarnaOrderId,
            });
            const result = await res.data;
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        // Start Checkout Page
        <div className="checkout">
            <Head>
                <title>Tavlorify Store - Checkout</title>
            </Head>
            <Header newTotalProductsCount={newTotalProductsCount} />
            <section className="page-content pt-4 pb-4">
                {/* Start Container From Bootstrap */}
                <div className="container-fluid">
                    <h1 className="text-center mb-5 fw-bold welcome-msg mx-auto pb-3">Hello To You In Checkout Page</h1>
                    {allProductsData.length > 0 ? allProductsData.map((productData) => (
                        <div className="row w-75 mx-auto bg-white border border-2 align-items-center" key={productData._id}>
                            <div className="col-md-2 p-3 text-center">
                                <Link href={{
                                    pathname: `/${productData.service}`,
                                    query: {
                                        generatedImagePathInMyServerAsQuery: productData.generatedImageURL,
                                        textPromptAsQuery: productData.textPrompt,
                                        paintingTypeAsQuery: productData.paintingType,
                                        positionAsQuery: productData.position,
                                        sizeAsQuery: productData.size,
                                        isExistWhiteBorderAsQuery: productData.isExistWhiteBorder,
                                        frameColorAsQuery: productData.frameColor,
                                    }
                                }}>
                                    <img
                                        src={`${process.env.BASE_API_URL}/${productData.generatedImageURL}`}
                                        alt="product Image !!"
                                        className="product-image"
                                        width={`${global_data.appearedImageSizesForTextToImage[productData.paintingType][productData.isExistWhiteBorder][productData.position][productData.size].width / 4}`}
                                        height={`${global_data.appearedImageSizesForTextToImage[productData.paintingType][productData.isExistWhiteBorder][productData.position][productData.size].height / 4}`}
                                    />
                                </Link>
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
                                <AiOutlineMinus
                                    className="quantity-control-icon me-2"
                                    onClick={() => updateOrder(productData._id, "decrease-product-quantity", klarnaOrderId)}
                                />
                                <span className="fw-bold me-2">{productData.quantity}</span>
                                <AiOutlinePlus
                                    className="quantity-control-icon"
                                    onClick={() => updateKlarnaOrder(productData._id, "increase-product-quantity", klarnaOrderId)}
                                />
                            </div>
                            <div className="col-md-2 p-3 text-end">
                                <h6 className="fw-bold price-after-discount">{productData.priceAfterDiscount * productData.quantity} kr</h6>
                                {productData.priceBeforeDiscount != productData.priceAfterDiscount && <h6 className="fw-bold price-before-discount text-decoration-line-through">{productData.priceBeforeDiscount * productData.quantity} kr</h6>}
                            </div>
                            <div className="col-md-1 text-center">
                                <BsTrash
                                    className="trash-icon"
                                    onClick={() => updateKlarnaOrder(productData._id, "delete-product", klarnaOrderId)}
                                />
                            </div>
                        </div>
                    )) : <div className="not-found-any-products-alert-box fw-bold text-center d-flex flex-column align-items-center justify-content-center">
                        <BsCart2 className="cart-icon mb-4" />
                        <h4 className="fw-bold">Sorry, Your Cart Is Empty !!</h4>
                    </div>}
                    {allProductsData.length > 0 && <div className="row w-75 mx-auto bg-white border border-2 align-items-center text-center">
                        <div className="col-md-6 p-3">
                            <h6 className="fw-bold">Summary</h6>
                        </div>
                        <div className="col-md-6 p-3 fw-bold">
                            <div className="row mb-3">
                                <div className="col-md-9 text-start">Total Price Before Discount</div>
                                <div className="col-md-3 text-end">{pricesDetailsSummary.totalPriceBeforeDiscount} kr</div>
                            </div>
                            {pricesDetailsSummary.totalDiscount > 0 && <div className="row mb-3">
                                <div className="col-md-9 text-start">Total Discount</div>
                                <div className="col-md-3 text-danger text-end">-{pricesDetailsSummary.totalDiscount} kr</div>
                            </div>}
                            <div className="row">
                                <div className="col-md-9 text-start">Shipping</div>
                                <div className="col-md-3 text-end">0 kr</div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-9 text-start">Total Price After Discount</div>
                                <div className="col-md-3 text-end">{pricesDetailsSummary.totalPriceAfterDiscount} kr</div>
                            </div>
                        </div>
                    </div>}
                </div>
                {/* End Container From Bootstrap */}
                {allProductsData.length > 0 && <div id="my-checkout-container" className="mx-auto mt-4"></div>}
            </section>
        </div >
        // End Checkout Page
    );
}

export default Checkout;

export async function getServerSideProps(context) {
    const orderId = context.query.orderId;
    return {
        props: {
            orderId
        },
    }
}