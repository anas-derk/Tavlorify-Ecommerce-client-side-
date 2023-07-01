import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import global_functions from "../../../public/global_functions/validations";
import Axios from "axios";
import nodeCodeGenerator from "node-code-generator";

const Cart = () => {
    const [canvasEcommerceProductsList, setCanvasEcommerceProductsList] = useState([]);
    const [total, setTotal] = useState(0);
    const [isWaitOrdering, setIsWaitOrdering] = useState(false);
    const [isWaitOrderingAllProducts, setIsWaitOrderingAllProducts] = useState(false);
    const [orderedProductInfo, setOrderedProductInfo] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("");
    const [email, setEmail] = useState("");
    const [isAppearedOrderFormPopup, setIsAppearedOrderFormPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    useEffect(() => {
        let canvasEcommerceProducts = JSON.parse(localStorage.getItem("canvas-ecommerce-user-cart"));
        if (canvasEcommerceProducts) {
            setCanvasEcommerceProductsList(canvasEcommerceProducts);
            let total = 0;
            canvasEcommerceProducts.forEach((product) => {
                total += product.price * product.count;
            });
            setTotal(total);
        }
    }, []);
    const deleteProduct = (id) => {
        let canvasEcommerceUserCart = JSON.parse(localStorage.getItem("canvas-ecommerce-user-cart"));
        canvasEcommerceUserCart = canvasEcommerceUserCart.filter((product) => product._id != id);
        localStorage.setItem("canvas-ecommerce-user-cart", JSON.stringify(canvasEcommerceUserCart));
        setCanvasEcommerceProductsList(canvasEcommerceUserCart);
    }
    const orderProduct = async (e) => {
        e.preventDefault();
        setErrors({});
        // const errorsObject = global_functions.inputValuesValidation([
        //     {
        //         name: "firstName",
        //         value: firstName,
        //         rules: {
        //             isRequired: {
        //                 msg: "Sorry, Can't be This Field Is Empty !!",
        //             },
        //             maxLength: {
        //                 value: 30,
        //                 msg: "Sorry, Must Be Characters Count At Most 30",
        //             }
        //         },
        //     },
        //     {
        //         name: "lastName",
        //         value: lastName,
        //         rules: {
        //             isRequired: {
        //                 msg: "Sorry, Can't be This Field Is Empty !!",
        //             },
        //             maxLength: {
        //                 value: 30,
        //                 msg: "Sorry, Must Be Characters Count At Most 30",
        //             }
        //         },
        //     },
        //     {
        //         name: "addressLine1",
        //         value: addressLine1,
        //         rules: {
        //             isRequired: {
        //                 msg: "Sorry, Can't be This Field Is Empty !!",
        //             },
        //         },
        //     },
        //     {
        //         name: "city",
        //         value: city,
        //         rules: {
        //             isRequired: {
        //                 msg: "Sorry, Can't be This Field Is Empty !!",
        //             },
        //         },
        //     },
        //     {
        //         name: "postCode",
        //         value: postCode,
        //         rules: {
        //             isRequired: {
        //                 msg: "Sorry, Can't be This Field Is Empty !!",
        //             },
        //             maxLength: {
        //                 value: 5,
        //                 msg: "Sorry, Must Be Numbers Count At Most 5",
        //             },
        //         },
        //     },
        //     {
        //         name: "email",
        //         value: email,
        //         rules: {
        //             isRequired: {
        //                 msg: "Sorry, Can't be This Field Is Empty !!",
        //             },
        //             isEmail: {
        //                 msg: "Sorry, The Email Is Not Valid !!",
        //             },
        //         },
        //     },
        // ]);
        // setErrors(errorsObject);
        if (Object.keys(errors).length == 0) {
            setIsWaitOrdering(true);
            const codeGenerator = new nodeCodeGenerator();
            try {
                const res = await Axios.post(`${process.env.BASE_API_URL}/orders/send-order-to-gelato`,
                {
                    orderType: "order",
                    orderReferenceId: codeGenerator.generateCodes("###**#####**###****###**")[0],
                    customerReferenceId: codeGenerator.generateCodes("###**##########****###**")[0],
                    currency: "SEK",
                    items: [
                        {
                            itemReferenceId: orderedProductInfo._id,
                            productUid: "canvas_200x200-mm-8x8-inch_canvas_wood-fsc-slim_4-0_hor",
                            files: [
                                {
                                    type: "default",
                                    url: `${process.env.BASE_API_URL}/${orderedProductInfo.imageSrc}`
                                }
                            ],
                            quantity: parseInt(orderedProductInfo.count),
                        }
                    ],
                    shippingAddress: {
                        firstName: "anas",
                        lastName: "derk",
                        addressLine1: "antakia street",
                        city: "Mjölby",
                        postCode: "595 30",
                        country: "SE",
                        email: "tavlorify@gmail.com"
                    }
                });
                const result = await res.data;
                console.log(result);
            }
            catch (err) {
                console.log(err);
            }
        }
        // let productIndex = canvasEcommerceProductsList.findIndex((product) => product._id == productId);
        // let productInfo = canvasEcommerceProductsList[productIndex];
        // let canvasEcommerceUserOrders = JSON.parse(localStorage.getItem("canvas-ecommerce-user-orders"));
        // if (canvasEcommerceUserOrders) {
        //     canvasEcommerceUserOrders.push(productInfo);
        //     localStorage.setItem("canvas-ecommerce-user-orders", JSON.stringify(canvasEcommerceUserOrders));
        //     setTimeout(() => {
        //         setIsWaitOrdering(false);
        //         deleteProduct(productId);
        //         router.push("/orders");
        //     }, 1500);
        // } else {
        //     let canvasEcommerceUserOrders = [];
        //     canvasEcommerceUserOrders.push(productInfo);
        //     localStorage.setItem("canvas-ecommerce-user-orders", JSON.stringify(canvasEcommerceUserOrders));
        //     setTimeout(() => {
        //         setIsWaitOrdering(false);
        //         deleteProduct(productId);
        //         router.push("/orders");
        //     }, 1500);
        // }
    }
    const deleteAllProductsFromCart = () => {
        localStorage.removeItem("canvas-ecommerce-user-cart");
        setCanvasEcommerceProductsList([]);
    }
    const orderAllProductsFromCart = () => {
        setIsWaitOrderingAllProducts(true);
        localStorage.setItem("canvas-ecommerce-user-orders", JSON.stringify(canvasEcommerceProductsList));
        deleteAllProductsFromCart();
        setTimeout(() => {
            router.push("/orders");
        }, 1500);
    }
    const openOrderFormPopup = (orderInfo) => {
        setIsAppearedOrderFormPopup(true);
        setOrderedProductInfo(orderInfo);
    }
    const closeOrderPopup = () => {
        setIsAppearedOrderFormPopup(false);
    }
    return (
        // Start Cart Page
        <div className="cart">
            <Head>
                <title>Tavlorify Store - Cart</title>
            </Head>
            <Header />
            {/* Start Popup Box */}
            {isAppearedOrderFormPopup && <div className="popup-box">
                <div className="popup p-4">
                    <form className="order-form">
                        <h3 className="mb-3 text-center">Please Write Shipping Address Info</h3>
                        <input
                            type="text"
                            className="form-control first-name-input mb-4 p-3"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors["firstName"] && <p className="bg-danger p-3">{errors["firstName"]}</p>}
                        <input
                            type="text"
                            className="form-control first-name-input mb-4 p-3"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors["lastName"] && <p className="bg-danger p-3">{errors["lastName"]}</p>}
                        <input
                            type="text"
                            className="form-control address-input mb-4 p-3"
                            placeholder="Address"
                            onChange={(e) => setAddressLine1(e.target.value)}
                        />
                        {errors["addressLine1"] && <p className="bg-danger p-3">{errors["addressLine1"]}</p>}
                        <input
                            type="text"
                            className="form-control city-input mb-4 p-3"
                            placeholder="City"
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {errors["city"] && <p className="bg-danger p-3">{errors["city"]}</p>}
                        <input
                            type="text"
                            className="form-control post-code-input mb-4 p-3"
                            placeholder="Post Code"
                            onChange={(e) => setPostCode(e.target.value)}
                        />
                        {errors["postCode"] && <p className="bg-danger p-3">{errors["postCode"]}</p>}
                        <input
                            type="email"
                            className="form-control email-input mb-4 p-3"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors["email"] && <p className="bg-danger p-3">{errors["email"]}</p>}
                        <div className="process-buttons d-flex justify-content-center align-items-center">
                            {!isWaitOrdering && <button
                                type="submit"
                                className="btn btn-success"
                                onClick={(e) => orderProduct(e)}
                            >
                                Order
                            </button>}
                            {isWaitOrdering && <button
                                className="btn btn-warning"
                                disabled
                            >
                                Wait Ordering ...
                            </button>}
                            <button
                                className="btn btn-danger"
                                onClick={closeOrderPopup}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
            {/* End Popup Box */}
            {/* Start Container From Bootstrap */}
            <div className="container pt-4 pb-4">
                <h1 className="text-center mb-4">Hello To You In Cart Page</h1>
                {canvasEcommerceProductsList.length > 0 ? <table className="products-table mb-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>dimentions</th>
                            <th>price</th>
                            <th>Image</th>
                            <th>Count</th>
                            <th>Total Price</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        {canvasEcommerceProductsList.map((productInfo, index) => (
                            <tr key={index}>
                                <td className="product-name-cell">
                                    {productInfo.name}
                                </td>
                                <td>
                                    {productInfo.type}
                                </td>
                                <td>
                                    {productInfo.dimentions} cm
                                </td>
                                <td className="product-price-cell">
                                    {productInfo.price}
                                </td>
                                <td className="product-image-cell">
                                    <img src={`${process.env.BASE_API_URL}/${productInfo.imageSrc}`} alt={`${productInfo.name}`} width="100" height="100" />
                                </td>
                                <td className="product-count-cell">
                                    {productInfo.count}
                                </td>
                                <td className="total-price-cell">
                                    {productInfo.price * productInfo.count}
                                </td>
                                <td className="proceses-cell">
                                    <button
                                        className="btn btn-danger d-block mx-auto mb-3"
                                        onClick={() => deleteProduct(productInfo._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => openOrderFormPopup(productInfo)}
                                    >
                                        Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {canvasEcommerceProductsList.length >= 2 && <tr>
                            <td colSpan={7}>
                                total: {total}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger d-block mx-auto mb-3"
                                    onClick={deleteAllProductsFromCart}
                                >
                                    Delete All
                                </button>
                                {!isWaitOrderingAllProducts && <button
                                    className="btn btn-success"
                                    onClick={orderAllProductsFromCart}
                                >
                                    Order All
                                </button>}
                                {isWaitOrderingAllProducts && <button
                                    className="btn btn-warning"
                                >
                                    Wait Ordering All
                                </button>}
                            </td>
                        </tr>}
                    </tbody>
                </table> : <p className="alert alert-danger">Sorry, Not Found Any Products Added To Your Cart !!</p>}
            </div>
            {/* End Container From Bootstrap */}
        </div >
        // End Cart Page
    );
}

export default Cart;