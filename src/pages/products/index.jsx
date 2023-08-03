import Header from "@/components/Header";
import Head from "next/head";
import { BiBox, BiSearch } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Link from "next/link";
import Axios from "axios";
import { MdOutlinePlayArrow } from "react-icons/md"

const Products = () => {
    const [subjects, setSubjects] = useState([]);
    const [styles, setStyles] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [colors, setColors] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [inputsChecked, setInputsChecked] = useState([]);
    const [productName, setProductName] = useState("");
    const [isWaitStatus, setIsWaitStatus] = useState(false);
    const getProductsByProductName = (productName) => {
        return productsData.filter(product => product.name === productName);
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
        setErrorMsg("");
        setIsWaitStatus(true);
        setTimeout(() => {
            if (value === "") {
                setProductsData(allProducts);
                setIsWaitStatus(false);
            } else {
                let productsByName = getProductsByProductName(value);
                if (productsByName.length > 0) setProductsData(productsByName);
                else setErrorMsg("Sorry Not Found Any Products Now !");
                setIsWaitStatus(false);
            }
        }, 1500);
    }
    const handleResetBtn = (e) => {
        setProductName("");
        setIsWaitStatus(true);
        setTimeout(() => {
            setProductsData(allProducts);
            setIsWaitStatus(false);
        }, 1500);
    }
    useEffect(() => {
        setIsWaitStatus(true);
        async function fetchAllCategories() {
            try {
                const res = await Axios.get(`${process.env.BASE_API_URL}/categories/all-categories`);
                const result = await res.data;
                console.log(res.data);
                const subjects = result.filter((category) => category.categoryType === "subjects");
                const styles = result.filter((category) => category.categoryType === "styles");
                const rooms = result.filter((category) => category.categoryType === "rooms");
                const colors = result.filter((category) => category.categoryType === "colors");
                setSubjects(subjects);
                setStyles(styles);
                setRooms(rooms);
                setColors(colors);
            }
            catch (err) {
                console.log(err);
                setErrorMsg("Sorry, Something Went Wrong");
            }
        }
        async function fetchAllProducts() {
            try {
                const res = await Axios.get(`${process.env.BASE_API_URL}/products/all-products`);
                const result = await res.data;
                setAllProducts(result);
                setProductsData(result);
            }
            catch (err) {
                console.log(err);
                setErrorMsg("Sorry, Something Went Wrong");
            }
        }
        fetchAllCategories().then(() => fetchAllProducts());
    }, []);
    return (
        <div className="products">
            <Head>
                <title>Tavlorify Store - Products</title>
            </Head>
            <Header />
            {/* Start Container */}
            <div className="container-fluid">
                {/* Start Grid System */}
                <div className="row pt-3 pb-3">
                    {/* Start Column */}
                    <div className="col-md-5">
                        <h5 className="text-center">Product Category</h5>
                        <hr />
                        <form className="select-category-form">
                            <div className="row">
                                <div className="col-md-3">
                                    {/* Start Input Box */}
                                    <div className="input-box">
                                        <input
                                            type="checkbox"
                                            id="subject-input"
                                            className="me-2"
                                            value="subject"
                                            onChange={handleInputsCheckedChange}
                                        />
                                        <label htmlFor="subject-input">Subject</label>
                                        <MdOutlinePlayArrow />
                                    </div>
                                    {/* End Input Box */}
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"></div>
                                <div className="col-md-3"></div>
                            </div>
                            {subjects.map((subject, subjectIndex) => (
                                <div className="row mb-2" key={subject._id}>
                                    <div className="col-md-3"></div>
                                    <div className="col-md-3">
                                        {/* Start Input Box */}
                                        <div className="input-box">
                                            <input
                                                type="checkbox"
                                                id="canvas-input"
                                                className="me-2"
                                                value="subject"
                                                onChange={handleInputsCheckedChange}
                                            />
                                            <label htmlFor="canvas-input">Subject</label>
                                            <MdOutlinePlayArrow />
                                        </div>
                                        {/* End Input Box */}
                                    </div>
                                    <div className="col-md-3"></div>
                                    <div className="col-md-3"></div>
                                </div>
                            ))}
                        </form>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-7">
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
                                    <p className="alert alert-danger not-found-products-err">{errorMsg}</p>
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