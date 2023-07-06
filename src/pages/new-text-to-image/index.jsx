import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";
import nodeCodeGenerator from "node-code-generator";
import { useRouter } from "next/router";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("");

    const [generatedImageURLs, setGeneratedImageURLs] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(-1);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(-1);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("");

    const [paintingType, setPaintingType] = useState("");

    const [frameColor, setFrameColor] = useState("");

    const [isDisplayImageDimetionsSelectBox, setIsDisplayImageDimetionsSelectBox] = useState(true);

    const [dimentions, setDimentions] = useState({});

    const [dimentionsIndex, setDimentionsIndex] = useState(-1);

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [isDisplayPopupScreen, setIsDisplayPopupScreen] = useState(false);

    const [isWaitAddToCart, setIsWaitAddToCart] = useState(false);

    const [errorInAddToCart, setErrorInAddToCart] = useState("");

    const [quantity, setQuantity] = useState(0);

    const router = useRouter();

    useEffect(() => {
        Axios.get(`${process.env.BASE_API_URL}/categories/all-categories-data`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    // console.log(result);
                } else {
                    // console.log(result)
                    setCategoriesData(result);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const textToImageGenerate = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsWaitStatus(true);
        Axios.get(
            `https://app-014daf9d-1451-4fe3-9e69-b2b35794407d.cleverapps.io/text-to-image-generate?textPrompt=${textPrompt}&prompt=${categoryStyles[styleSelectedIndex].prompt}&category=${categoriesData[categorySelectedIndex].name}&model_name=${modelName}&negative_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&width=${dimentions.width}&height=${dimentions.height}
        `)
            .then((res) => {
                let result = res.data;
                console.log(result);
                setIsWaitStatus(false);
                if (Array.isArray(result)) {
                    setGeneratedImageURLs(result);
                    setErrorMsg("");
                    setIsDisplayPopupScreen(true);
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
                <div className="container-fluid pt-4 pb-4">
                    <h1 className="text-center mb-5 welcome-msg pb-3">Welcome To You In Text To Image AI Service</h1>
                    {/* Start Grid System */}
                    <div className="row">
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Art Painting Section */}
                            <section className="art-painting">
                                image
                            </section>
                            {/* End Art Painting Section */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <section className="art-painting-options pe-3">
                                {/* Start Generating Image Options Section */}
                                <section className="generating-image-options">
                                    <h6 className="text-center mb-3 fw-bold">Your Text Prompt</h6>
                                    <textarea
                                        type="text"
                                        placeholder="a dog riding a bicycle"
                                        className="form-control mb-3 text-prompt"
                                        onChange={(e) => setTextPrompt(e.target.value)}
                                    ></textarea>
                                    <h6 className="describe text-start mb-0 text-end fw-bold">Describe what you want the AI to create .</h6>
                                    <hr />
                                    {/* Start Categories Section */}

                                    {/* End Categories Section */}
                                </section>
                                {/* Start Generating Image Options Section */}
                                {/* Start Art Name And Price Section */}
                                <section className="art-name-and-price">
                                    {/* Start Grid System */}
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h4 className="art-name fw-bold">Art Name: Poster</h4>
                                        </div>
                                        <div className="col-md-4 text-end price-box">
                                            <h4 className="price mb-0 fw-bold">341,10 kr</h4>
                                            <h6 className="discount fw-bold">229 kr</h6>
                                        </div>
                                    </div>
                                    {/* End Grid System */}
                                </section>
                                {/* End Art Name And Price Section */}
                                {/* Start Displaying Art Painting Options Section */}
                                <section className="displaying-art-painting-options">
                                    {/* Start Art Names List */}
                                    <ul className="art-names-list d-flex flex-wrap mb-4">
                                        <li className="p-2 pe-3 ps-3">Poster</li>
                                        <li className="p-2 pe-3 ps-3">Canvas</li>
                                    </ul>
                                    {/* EndArt Names List */}
                                    <h5>Positions</h5>
                                    {/* Start Positions List */}
                                    <ul className="positions-list mb-4 text-center">
                                        <li className="p-3">Vertical</li>
                                        <li className="p-3">Horizontal</li>
                                        <li className="p-3">Square</li>
                                    </ul>
                                    {/* End Positions List */}
                                    {/* <h5>Sizes</h5> */}
                                    {/* Start Sizes List */}
                                    {/* <ul className="sizes-list mb-4 text-center">
                                        <li className="p-3">Vertical</li>
                                    </ul> */}
                                    {/* End Sizes List */}
                                </section>
                                {/* End Displaying Art Painting Options Section */}
                            </section>
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System */}
                </div>
                {/* End Container */}
            </div>
            {/* End Page Content */}
        </div>
        // End Text To Image Service Page
    );
}

export default TextToImage;