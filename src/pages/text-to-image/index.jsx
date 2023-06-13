import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";
import Link from "next/link";
import image1 from "../../../public/images/backgrounds/1.jpg"
import { BiRightArrow } from "react-icons/bi";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("");

    const [generatedImageURLs, setGeneratedImageURLs] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(-1);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(-1);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("");

    const [dimensions, setDimentions] = useState({});

    const [dimensionsIndex, setDimentionsIndex] = useState(-1);

    const [getImgDimentionsMsg, setGetImgDimentionsMsg] = useState("");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    useEffect(() => {
        Axios.get(`${process.env.BASE_API_URL}/categories/all-categories-data`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    console.log(result);
                } else {
                    console.log(result)
                    setCategoriesData(result);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectCategory = (index) => {
        setCategorySelectedIndex(index);
        setStyleSelectedIndex(-1);
        setImageType("");
        setDimentions({});
        Axios.get(`${process.env.BASE_API_URL}/styles/category-styles-data?categoryName=${categoriesData[index].name}`)
            .then((res) => {
                setCategoryStyles(res.data);
            })
            .catch((err) => console.log(err));
    }

    const handleSelectStyle = (index) => {
        setStyleSelectedIndex(index);
        let tempModelName = categoryStyles[index].modelName;
        setModelName(tempModelName);
        if (styleSelectedIndex > -1 && imageType) {
            setDimentions({
                width: text_to_image_data.modelsDimentions[tempModelName][imageType][dimensionsIndex].inPixel.width,
                height: text_to_image_data.modelsDimentions[tempModelName][imageType][dimensionsIndex].inPixel.height,
            });
        }
    }

    const textToImageGenerate = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsWaitStatus(true);
        Axios.get(
            `https://e-commerce-canvas-new.cleverapps.io/text-to-image-generate?textPrompt=${textPrompt}&prompt=${categoryStyles[styleSelectedIndex].prompt}&category=${categoriesData[categorySelectedIndex].name}&model_name=${modelName}&negative_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&width=${dimensions.width}&height=${dimensions.height}
        `)
            .then((res) => {
                let result = res.data;
                console.log(result);
                setIsWaitStatus(false);
                if (Array.isArray(result)) {
                    setGeneratedImageURLs(result);
                    setErrorMsg("");
                } else {
                    setErrorMsg("Something Went Wrong !!");
                    setGeneratedImageURLs([]);
                }
            })
            .catch((err) => setErrorMsg("Sorry, Something Went Wrong !!"));
    }

    return (
        // Start Text To Image Service Page
        <div className="text-to-image-service">
            <Head>
                <title>Tavlorify Store - Text To Image</title>
            </Head>
            <Header />
            {/* Start Page Content */}
            <div className="page-content">
                {/* Start Container */}
                <div className="container pt-4 pb-4">
                    <h1 className="text-center mb-5 welcome-msg pb-3">Welcome To You In Text To Image AI Service</h1>
                    {/* Start Text To Image Box */}
                    <section className="text-to-image-box p-4 mb-4">
                        {/* Start Grid System */}
                        <section className="row">
                            {/* Start Column */}
                            <div className="col-md-5">
                                {/* Start Options Box */}
                                <div className="options-box p-3 pt-2">
                                    <h6 className="mb-2 text-center option-heading pb-2">Options Box</h6>
                                    <h6 className="text-center mb-3 mt-3">Your Text Prompt</h6>
                                    <form
                                        className="generate-images-from-text-form text-center mb-4"
                                        onSubmit={textToImageGenerate}
                                    >
                                        <input
                                            type="text"
                                            placeholder="a dog riding a bicycle"
                                            className="form-control mb-3"
                                            required
                                            onChange={(e) => setTextPrompt(e.target.value)}
                                        />
                                        <h6 className="describe text-start">Describe what you want the AI to create .</h6>
                                        {/* End Select Category Box */}
                                        {/* <button type="submit" className="btn search-btn">
                                            <IoSearchCircleSharp className="search-icon" />
                                        </button> */}
                                    </form>
                                    <hr />
                                    <h6 className="mb-3">Category</h6>
                                    {/* Start Categories Section */}
                                    <section className="categories p-2">
                                        {categoriesData.map((category, index) => (
                                            /* Start Category Box */
                                            <div
                                                className="category-box mb-3 p-2"
                                                key={category._id}
                                                onClick={() => handleSelectCategory(index)}
                                                style={index === categorySelectedIndex ? { backgroundColor: "rgb(12, 126, 193)" } : {}}
                                            >
                                                {/* Start Grid System */}
                                                <div className="row align-items-center">
                                                    {/* Start Column */}
                                                    <div className="col-md-3">
                                                        <img src={`${process.env.BASE_API_URL}/${category.imgSrc}`} alt="aa" className="category-image mw-100" />
                                                    </div>
                                                    {/* End Column */}
                                                    {/* Start Column */}
                                                    <div className="col-md-7">
                                                        {category.name}
                                                    </div>
                                                    {/* End Column */}
                                                    {/* Start Column */}
                                                    <div className="col-md-2 text-center">
                                                        <BiRightArrow />
                                                    </div>
                                                    {/* End Column */}
                                                </div>
                                                {/* End Grid System */}
                                            </div>
                                            /* End Category Box */
                                        ))}
                                    </section>
                                    {/* End Categories Section */}
                                    <hr />
                                </div>
                                {/* End Options Box */}
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-7">
                                {/* Start Display Box */}
                                <div className="display-box p-3 h-100 d-flex align-items-center justify-content-center flex-column">
                                    {categorySelectedIndex == -1 && <p className="description-msg">Please Select Any Category In Category Options Box</p>}
                                    {categorySelectedIndex > -1 && <h6>Please Select Style</h6>}
                                    {/* Start Styles Box */}
                                    {categorySelectedIndex > -1 && <div className="styles-box">
                                        {/* Start Grid System */}
                                        <div className="row">
                                            {/* Start Column */}
                                            {categoryStyles.map((style, index) => (
                                                <div className="col-md-4">
                                                    {/* Start Style Box */}
                                                    <div
                                                        className="style-box p-2"
                                                        onClick={() => handleSelectStyle(index)}
                                                        style={index === styleSelectedIndex ? { backgroundColor: "rgb(12, 126, 193)" } : {}}
                                                    >
                                                        <img src={`${process.env.BASE_API_URL}/${style.imgSrc}`} alt="aa" className="mw-100 mb-2 style-image" />
                                                        <p className="style-name m-0 text-center">{style.name}</p>
                                                    </div>
                                                    {/* End Style Box */}
                                                </div>
                                            ))}
                                            {/* End Column */}
                                        </div>
                                        {/* End Grid System */}
                                    </div>}
                                    {/* End Styles Box */}
                                </div>
                                {/* End Display Box */}
                            </div>
                            {/* End Column */}
                        </section>
                        {/* End Grid System */}
                    </section>
                    {/* End Text To Image Box */}
                </div>
                {/* End Container */}
            </div>
            {/* End Page Content */}
        </div>
        // End Text To Image Page
    );
}

export default TextToImage;