import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import { useState, useEffect } from "react";
import Axios from "axios";
import validations from "../../../../../../../public/global_functions/validations";
import { useRouter } from "next/router";
import { AiOutlinePlusSquare } from "react-icons/ai";

const AddReturedOrder = () => {

    const [orderNumber, setOrderNumber] = useState("");

    const [orderId, setOrderId] = useState("");

    const [klarnaOrderId, setKlarnaOrderId] = useState("");

    const [klarnaReference, setKlarnaReference] = useState("");
    
    const [customerFirstName, setCustomerFirstName] = useState("");

    const [customerLastName, setCustomerLastName] = useState("");

    const [customerEmail, setCustomerEmail] = useState("");

    const [customerPhone, setCustomerPhone] = useState("");

    const [orderLines, setOrderLines] = useState([]);

    const [isAddingStatus, setIsAddingStatus] = useState(false);

    const [isSuccessStatus, setIsSuccessStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        }
    }, []);

    const addNewReturnedOrder = async (e) => {
        e.preventDefault();
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "categoryType",
                value: categoryType,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
            {
                name: "categoryName",
                value: categoryName,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            setIsAddingStatus(true);
            try {
                const res = await Axios.post(`${process.env.BASE_API_URL}/categories/add-new-category/${categoryType}`, {
                    categoryName: categoryName,
                });
                const result = await res.data;
                setIsAddingStatus(false);
                if (result === "Congratulations, the category has been successfully added") {
                    setIsSuccessStatus(true);
                    let successTimeout = setTimeout(() => {
                        setIsSuccessStatus(false);
                        clearTimeout(successTimeout);
                    }, 2000);
                } else {
                    setErrorMsg(result);
                    let errorTimeout = setTimeout(() => {
                        setErrorMsg("");
                        clearTimeout(errorTimeout);
                    }, 2000);
                }
            }
            catch (err) {
                console.log(err);
                setIsAddingStatus(false);
                setErrorMsg("Sorry, Something Went Wrong");
                let errorTimeout = setTimeout(() => {
                    setErrorMsg("");
                    clearTimeout(errorTimeout);
                }, 2000);
            }
        }
    }

    const addNewProductDetails = () => {
        let tempOrderLines = [...orderLines];
        tempOrderLines.push({ reference: "", quantity: "", name: "", unit_price: 0, total_amount: 0, returned_reason: "" });
        setOrderLines(tempOrderLines);
    }

    const updateReturnedProductDetails = (productIndex, fieldName, newValue) => {
        let tempOrderLines = [...orderLines];
        tempOrderLines[productIndex][fieldName] = newValue;
        setOrderLines(tempOrderLines);
    }

    return (
        <div className="add-new-returned-order">
            <Head>
                <title>Tavlorify Store - Add New Returned Order</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Hello To You In Add New Returned Order Page</h1>
                    <form className="add-new-returned-order-form w-50 mx-auto mb-3" onSubmit={addNewReturnedOrder}>
                        <h5 className="mb-4 fw-bold">Order Details</h5>
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["orderNumber"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Order Number"
                            onChange={(e) => setOrderNumber(e.target.value.trim())}
                        />
                        {formValidationErrors["orderNumber"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["orderNumber"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["orderId"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Order Id"
                            onChange={(e) => setOrderId(e.target.value.trim())}
                        />
                        {formValidationErrors["orderId"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["orderId"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["klarnaOrderId"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Klarna Order Id"
                            onChange={(e) => setKlarnaOrderId(e.target.value.trim())}
                        />
                        {formValidationErrors["klarnaOrderId"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["klarnaOrderId"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["klarnaReference"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Klarna Reference"
                            onChange={(e) => setKlarnaReference(e.target.value.trim())}
                        />
                        {formValidationErrors["klarnaReference"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["klarnaReference"]}</p>}
                        <h5 className="mb-4 fw-bold">Customer Details</h5>
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["customerFirstName"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Cutomer First Name"
                            onChange={(e) => setCustomerFirstName(e.target.value.trim())}
                        />
                        {formValidationErrors["customerFirstName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["customerFirstName"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["customerLastName"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Cutomer Last Name"
                            onChange={(e) => setCustomerLastName(e.target.value.trim())}
                        />
                        {formValidationErrors["customerLastName"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["customerLastName"]}</p>}
                        <input
                            type="email"
                            className={`form-control p-2 ${formValidationErrors["customerEmail"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Cutomer Email"
                            onChange={(e) => setCustomerEmail(e.target.value.trim())}
                        />
                        {formValidationErrors["customerEmail"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["customerEmail"]}</p>}
                        <input
                            type="text"
                            className={`form-control p-2 ${formValidationErrors["customerPhone"] ? "border border-danger mb-2" : "mb-4"}`}
                            placeholder="Please Enter Cutomer Phone"
                            onChange={(e) => setCustomerPhone(e.target.value.trim())}
                        />
                        {formValidationErrors["customerPhone"] && <p className='error-msg text-danger mb-2'>{formValidationErrors["customerPhone"]}</p>}
                        {orderLines.length > 0 && <div className="returned-order-products-details p-3 border border-3 border-dark mb-3">
                            {orderLines.map((product, index) => (
                                <div className="product-details" key={index}>
                                    <h5 className="mb-4 fw-bold">Product Details</h5>
                                    <input
                                        type="text"
                                        className={`form-control p-2 ${formValidationErrors["productReference"] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Product Reference / Product Id"
                                        onChange={(e) => updateReturnedProductDetails(index, "reference", e.target.value.trim())}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className={`form-control p-2 ${formValidationErrors["productQuantity"] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Product Quantity"
                                        onChange={(e) => updateReturnedProductDetails(index, "quantity", e.target.valueAsNumber)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className={`form-control p-2 ${formValidationErrors["productName"] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Product Name"
                                        onChange={(e) => updateReturnedProductDetails(index, "name", e.target.value.trim())}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className={`form-control p-2 ${formValidationErrors["productUnitPrice"] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Product Unit Price"
                                        onChange={(e) => updateReturnedProductDetails(index, "unit_price", e.target.valueAsNumber)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className={`form-control p-2 ${formValidationErrors["total_amount"] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Total Price"
                                        onChange={(e) => updateReturnedProductDetails(index, "total_amount", e.target.valueAsNumber)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        className={`form-control p-2 ${formValidationErrors["productReturnReason"] ? "border border-danger mb-2" : "mb-4"}`}
                                        placeholder="Please Enter Product Return Reason"
                                        onChange={(e) => updateReturnedProductDetails(index, "returned_reason", e.target.value)}
                                        required
                                    />
                                    <hr />
                                </div>
                            ))}
                        </div>}
                        <div className="add-returned-product-icon-box mb-3">
                            <AiOutlinePlusSquare
                                className="add-returned-product-icon"
                                style={{ fontSize: "30px", cursor: "pointer" }}
                                onClick={() => addNewProductDetails()}
                            />
                        </div>
                        {!isAddingStatus && !errorMsg && !isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto">Add Now</button>}
                        {isAddingStatus && <button type="submit" className="btn btn-warning w-100 d-block mx-auto" disabled>Adding Now ...</button>}
                        {errorMsg && <button type="submit" className="btn btn-danger w-100 d-block mx-auto" disabled>{errorMsg}</button>}
                        {isSuccessStatus && <button type="submit" className="btn btn-success w-100 d-block mx-auto" disabled>Adding Process Is Successfuly !!</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddReturedOrder;