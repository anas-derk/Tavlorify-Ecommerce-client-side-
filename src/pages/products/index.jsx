import Header from "@/components/Header";
import Head from "next/head";
import { BiBox, BiSearch } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Link from "next/link";
import Axios from "axios";

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [inputsChecked, setInputsChecked] = useState([]);
    const [productName, setProductName] = useState("");
    const [isWaitStatus, setIsWaitStatus] = useState(false);
    const getProductInfoByProductName = (productName) => {
        console.log(productsData)
        return productsData.filter(product => product.name === productName);
    }
    const getProductsByType = async (type) => {
        
    }
    const handleInputsCheckedChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setInputsChecked([...inputsChecked, value]);
        } else {
            setInputsChecked(inputsCheckedList =>
                inputsCheckedList.filter((inputValue) => inputValue !== value)
            );
        }
        setIsWaitStatus(true);
    }
    const handleProductNameChange = (e) => {
        const { value } = e.target;
        setProductName(value);
        setIsWaitStatus(true);
        setTimeout(() => {
            let productByName = getProductInfoByProductName(value);
            setProductsData([...productByName]);
            setIsWaitStatus(false);
        }, 1500);
    }
    const handleResetBtn = (e) => {
        setProductName("");
        setProductsData([]);
    }
    useEffect(() => {
        Axios.get(`${process.env.BASE_API_URL}/products/all-products`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    setErrorMsg(result);
                } else {
                    setProductsData(result);
                }
            })
            .catch((err) => setErrorMsg(err));
    }, []);
    return (
        <div className="products">
            <Head>
                <title>Tavlorify Store - Products</title>
            </Head>
            <Header />
            {/* Start Container */}
            <div className="container">
                {/* Start Grid System */}
                <div className="row pt-3 pb-3">
                    {/* Start Column */}
                    <div className="col-md-3">
                        <h5 className="text-center">Product Category</h5>
                        <hr />
                        <form className="select-category-form">
                            {/* Start Input Box */}
                            <div className="input-box mb-3">
                                <input
                                    type="checkbox"
                                    id="canvas-input"
                                    className="me-2"
                                    value="canvas-prints"
                                    name="product-types"
                                    onChange={handleInputsCheckedChange}
                                />
                                <label htmlFor="canvas-input">Canvas Prints</label>
                            </div>
                            {/* End Input Box */}
                            {/* Start Input Box */}
                            <div className="input-box">
                                <input
                                    type="checkbox"
                                    id="framed-input"
                                    className="me-2"
                                    value="framed-prints"
                                    name="product-types"
                                    onChange={handleInputsCheckedChange}
                                />
                                <label htmlFor="framed-input">Framed Prints</label>
                            </div>
                            {/* End Input Box */}
                        </form>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-9">
                        {/* Start Grid System */}
                        <div className="row">
                            {/* Start Column */}
                            <div className="col-md-6">
                                <h4 className="mb-0">Print on demand products</h4>
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-6">
                                <form className="product-search-form">
                                    <div className="search-input-box">
                                        <BiSearch className="search-icon" />
                                        <input
                                            type="text"
                                            className="form-control product-search-input p-2"
                                            placeholder="Please Enter Product Name"
                                            onChange={handleProductNameChange}
                                            value={productName}
                                        />
                                        {productName && <IoIosClose
                                            className="reset-btn-icon"
                                            onClick={handleResetBtn}
                                        />}
                                    </div>
                                </form>
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                        <hr />
                        {/* Start Required Products Section */}
                        <section className="required-products">
                            {/* Start Grid System */}
                            <div className="row text-center">
                                {productsData.length > 0 && !isWaitStatus && !errorMsg && productsData.map((productInfo, index) => (
                                    /* Start Column */
                                    <div className="col-md-4" key={index}>
                                        <div className="product-box p-3">
                                            <Link href={`/products/${productInfo.name}/${productInfo._id}`}>
                                                <img
                                                    src={`${process.env.BASE_API_URL}/${productInfo.imageSrc}`}
                                                    alt={productInfo.name}
                                                    // className="product-image mb-3 canvas-prints-image prints-image"
                                                    className="product-image mb-3"
                                                />
                                            </Link>
                                            <h6 className="product-name">{productInfo.name}</h6>
                                            <h6 className="product-type">{productInfo.type}</h6>
                                        </div>
                                    </div>
                                    /* End Column */
                                ))}
                                {errorMsg && <div className="not-found-products-err-box d-flex flex-column align-items-center justify-content-center" >
                                    <p className="alert alert-danger not-found-products-err">Sorry Not Found Any Products Now !</p>
                                </div>}
                                {isWaitStatus && <div className="wait-msg-box d-flex flex-column align-items-center justify-content-center">
                                    <span className="wait-loader"></span>
                                </div>}
                            </div>
                            {/* End Grid System */}
                        </section>
                        {/* End Required Products Section */}
                    </div>
                    {/* End Column */}
                </div>
                {/* End Grid System */}
            </div>
            {/* End Container */}
        </div>
    )
}

export default Products;