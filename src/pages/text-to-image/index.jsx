import Head from "next/head";
import Header from "@/components/Header";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("");

    const [generatedImageURLs, setGeneratedImageURLs] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const textToImageGenerate = (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        Axios.get(
            `${process.env.BASE_API_URL}/text-to-image-generate?textPrompt=${textPrompt}&prompt=${text_to_image_data.categoriesData[categorySelectedIndex].styles[styleSelectedIndex].prompt}
            &category=${text_to_image_data.categoriesData[categorySelectedIndex].name}
        `)
            .then((res) => {
                let imageURLs = res.data;
                console.log(imageURLs);
                setIsWaitStatus(false);
                if (imageURLs.length > 0) {
                    setGeneratedImageURLs(imageURLs);
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
            {/* Start Custom Container */}
            <div className="custom-container pt-5 pb-4">
                <h3 className="text-center mb-5">Welcome To You In Text To Image AI Service</h3>
                {/* Start Text To Image Box */}
                <section className="text-to-image-box p-4 mb-4">
                    <h5 className="text-center mb-4">Enter a Text Prompt</h5>
                    <form
                        className="generate-images-from-text-form text-center"
                        onSubmit={textToImageGenerate}
                    >
                        <input
                            type="text"
                            placeholder="a dog riding a bicycle"
                            className="form-control p-2 mb-2"
                            required
                            onChange={(e) => setTextPrompt(e.target.value)}
                        />
                        <button type="submit" className="btn search-btn">
                            <IoSearchCircleSharp className="search-icon" />
                        </button>
                    </form>
                    {/* Start Grid System */}
                    <section className="row">
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Category */}
                            <h6 className="mb-3">Category</h6>
                            <div className="categories mb-4 d-flex flex-wrap">
                                {text_to_image_data.categoriesData.map((category, index) => (
                                    /* Start Category Box */
                                    <div
                                        className="category-box text-center"
                                        key={index}
                                        onClick={() => setCategorySelectedIndex(index)}
                                    >
                                        <img
                                            src={category.imgSrc}
                                            alt="Anime Img"
                                            width="75"
                                            height="75"
                                            className="mb-2 category-img"
                                            style={index === categorySelectedIndex ? { border: "2px solid #F00" } : {}}
                                        />
                                        <span className="d-block">{category.name}</span>
                                    </div>
                                    /* End Category Box */
                                ))}
                            </div>
                            {/* End Category */}
                            <hr />
                            {/* Start Styles */}
                            <h6 className="mb-2">Style</h6>
                            <section className="styles mb-4 d-flex flex-wrap">
                                {text_to_image_data.categoriesData[categorySelectedIndex].styles.map((category, index) => (
                                    /* Start Style Box */
                                    <div
                                        className="style-box text-center"
                                        key={index}
                                        onClick={() => setStyleSelectedIndex(index)}
                                    >
                                        <img
                                            src={category.imgSrc}
                                            alt="Anime Img"
                                            width="75"
                                            height="75"
                                            className="mb-2 category-img"
                                            style={index === styleSelectedIndex ? { border: "2px solid #F00" } : {}}
                                        />
                                        <span className="d-block">{category.name}</span>
                                    </div>
                                    /* End Style Box */
                                ))}
                            </section>
                            {/* End Styles */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Generated Images Box */}
                            {generatedImageURLs.length > 0 && !isWaitStatus && <section className="generated-images-box">
                                <h4 className="text-center mb-4">Generated Images</h4>
                                {/* Start Grid System */}
                                <div className="row">
                                    {generatedImageURLs.map((url, index) => (
                                        <img src={url} alt="Image" className="created-image" key={index} />
                                    ))}
                                </div>
                                {/* End Grid System */}
                            </section>}
                            {/* End Generated Images Box */}
                        </div>
                        {/* End Column */}
                    </section>
                    {/* End Grid System */}
                    <hr />
                    {/* Start Image Numbers */}
                    <h6 className="mb-3">Number Of Images</h6>
                    <div className="number-of-images mb-4 d-flex select-box">
                        <div className="number-box p-2 text-center">2</div>
                        <div className="number-box p-2 text-center">4</div>
                    </div>
                    {/* End Image Numbers */}
                    <hr />
                    {/* Start Image Dimensions */}
                    <h6 className="mb-3">Image Dimensions</h6>
                    <div className="image-dimensions mb-4 d-flex select-box">
                        <div className="number-box p-2 text-center">640 X 1024</div>
                        <div className="number-box p-2 text-center">640 X 1024</div>
                    </div>
                    {/* End Image Dimensions */}
                </section>
                {/* End Text To Image Box */}
                {/* Start Generate Wait Box */}
                {isWaitStatus && <section className="generate-wait-box text-center p-3">
                    <h6 className="wait-message mb-3">Generating The Required Images</h6>
                    <span className="loader max-auto"></span>
                </section>}
                {/* End Generate Wait Box */}
                {errorMsg && <p className="alert alert-danger">Sorry, Can't Generating From This Text !</p>}
            </div>
            {/* End Custom Container */}
        </div>
        // End Text To Image Page
    );
}

export default TextToImage;