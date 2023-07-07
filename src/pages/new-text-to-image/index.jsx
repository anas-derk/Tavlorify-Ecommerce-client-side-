import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";
import nodeCodeGenerator from "node-code-generator";
import { useRouter } from "next/router";
import generatedImage from "../../../public/images/test.png";
import blackFrameImage from "../../../public/images/Framed/black.png";
import whiteFrameImage from "../../../public/images/Framed/white.png";
import woodFrameImage from "../../../public/images/Framed/wood.png";
import darkWoodFrameImage from "../../../public/images/Framed/dark-wood.png";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("a dog");

    const [generatedImageURL, setGeneratedImageURL] = useState("");

    const [paintingURL, setPaintingURL] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("square");

    const [paintingType, setPaintingType] = useState("poster");

    const [frameColor, setFrameColor] = useState("none");

    const [dimentions, setDimentions] = useState({});

    const [dimentionsInCm, setDimentionsInCm] = useState("30x30");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [isDisplayPopupScreen, setIsDisplayPopupScreen] = useState(false);

    const [isWaitAddToCart, setIsWaitAddToCart] = useState(false);

    const [errorInAddToCart, setErrorInAddToCart] = useState("");

    const [quantity, setQuantity] = useState(0);

    const ref1 = useRef(null);

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
                    Axios.get(`${process.env.BASE_API_URL}/styles/category-styles-data?categoryName=${result[0].name}`)
                        .then((res) => {
                            const categoryStylesTemp = res.data;
                            setCategoryStyles(categoryStylesTemp);
                            const tempModelName = categoryStylesTemp[0].modelName;
                            setModelName(tempModelName);
                            const dimsIndex = text_to_image_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                            setDimentions({
                                width: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                                height: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                            });
                            setGeneratedImageURL(generatedImage.src);
                            setPaintingURL(generatedImage.src);
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectCategory = (index) => {
        setCategorySelectedIndex(index);
        Axios.get(`${process.env.BASE_API_URL}/styles/category-styles-data?categoryName=${categoriesData[index].name}`)
            .then((res) => {
                setCategoryStyles(res.data);
                setStyleSelectedIndex(0);
                const tempModelName = res.data[0].modelName;
                setModelName(tempModelName);
                const dimsIndex = text_to_image_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                setDimentions({
                    width: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                    height: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                });
            })
            .catch((err) => console.log(err));
    }

    const handleSelectStyle = (index) => {
        setStyleSelectedIndex(index);
        let tempModelName = categoryStyles[index].modelName;
        setModelName(tempModelName);
        const dimsIndex = text_to_image_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
        setDimentions({
            width: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
            height: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
        });
    }

    const handleSelectImageType = (imgType) => {
        setImageType(imgType);
        if (imgType === "horizontal" || imgType === "vertical") {
            const dimsIndex = text_to_image_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == dimentionsInCm);
            if (dimsIndex == -1) {
                const dimsIndex = text_to_image_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == "50x70");
                setDimentionsInCm("50x70");
                setDimentions({
                    width: text_to_image_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                    height: text_to_image_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                });
            } else {
                setDimentions({
                    width: text_to_image_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                    height: text_to_image_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                });
            }
        } else {
            setDimentionsInCm("30x30");
            const dimsIndex = text_to_image_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == "30x30");
            setDimentions({
                width: text_to_image_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                height: text_to_image_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
            });
        }
    }

    const handleSelectImageDimentions = (inCm) => {
        const dimsIndex = text_to_image_data.modelsDimentions[modelName][imageType].findIndex((el) => el.inCm == inCm);
        setDimentionsInCm(inCm);
        setDimentions({
            width: text_to_image_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.width,
            height: text_to_image_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.height,
        });
    }

    const textToImageGenerate = (e) => {
        e.preventDefault();
        // const image = ref1.current;
        // const canvas = document.createElement("canvas");
        // canvas.width = 512;
        // canvas.height = 512;
        // const ctx = canvas.getContext("2d");
        // ctx.drawImage(image, 0, 0);
        // const dataURL = canvas.toDataURL(undefined, 1.0);
        // setPaintingURL(dataURL);
        setErrorMsg("");
        setGeneratedImageURL("");
        setIsWaitStatus(true);
        Axios.get(
            `https://app-014daf9d-1451-4fe3-9e69-b2b35794407d.cleverapps.io/text-to-image-generate?textPrompt=${textPrompt}&prompt=${categoryStyles[styleSelectedIndex].prompt}&category=${categoriesData[categorySelectedIndex].name}&model_name=${modelName}&negative_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&width=${dimentions.width}&height=${dimentions.height}
        `)
            .then((res) => {
                let result = res.data;
                console.log(result);
                setIsWaitStatus(false);
                if (Array.isArray(result)) {
                    setGeneratedImageURL(result[0]);
                    setPaintingURL(result[0]);
                    setErrorMsg("");
                } else {
                    setErrorMsg("Something Went Wrong !!");
                    setGeneratedImageURL("");
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg("Sorry, Something Went Wrong !!");
            });
    }

    const handleSelectFrame = (frameColor) => {
        setFrameColor(frameColor);
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
                            <section
                                className="art-painting d-flex justify-content-center align-items-center"
                                style={isWaitStatus ? { backgroundColor: "#989492", height: "100%" } : {}}
                            >
                                {/* {!isWaitStatus && !errorMsg && generatedImageURL && <canvas className="generated-image-container mw-100" width="512" height="512" ref={ref1}></canvas>} */}
                                {!isWaitStatus && !errorMsg && generatedImageURL && <img
                                    src={paintingURL}
                                    className="mw-100"
                                    alt="Generated Image !!"
                                    ref={ref1}
                                />}
                                {isWaitStatus && !errorMsg && <span className="loader"></span>}
                                {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
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
                                        defaultValue={textPrompt}
                                    ></textarea>
                                    <div className="row align-items-center">
                                        <div className="col-md-7">
                                            <h6 className="describe text-start mb-0 fw-bold">Describe what you want the AI to create .</h6>
                                        </div>
                                        <div className="col-md-5 text-end">
                                            {!isWaitStatus && !errorMsg &&
                                                <button className="btn btn-dark w-100" onClick={textToImageGenerate}>Create</button>
                                            }
                                            {isWaitStatus && <button className="btn btn-dark w-50" disabled>Creating ...</button>}
                                        </div>
                                    </div>
                                    <hr />
                                    <h6 className="mb-4 fw-bold">Please Select Category</h6>
                                    {/* Start Categories Section */}
                                    <section className="categories mb-4">
                                        <div className="row">
                                            {categoriesData.map((category, index) => (
                                                <div className="col-md-2" key={category._id}>
                                                    {/* Start Category Box */}
                                                    <div
                                                        className="category-box text-center"
                                                        onClick={() => handleSelectCategory(index)}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${category.imgSrc}`}
                                                            alt="aa"
                                                            className="category-image mb-2"
                                                            style={index === categorySelectedIndex ? { border: "4px solid #000" } : {}}
                                                        />
                                                        <h6 className="category-name text-center">{category.name}</h6>
                                                    </div>
                                                    {/* End Category Box */}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    {/* End Categories Section */}
                                    <hr />
                                    <h6 className="mb-4 fw-bold">Please Select Style</h6>
                                    {/* Start Styles Section */}
                                    <section className="styles mb-3">
                                        {/* Start Grid System */}
                                        <div className="row">
                                            {/* Start Column */}
                                            {categoryStyles.map((style, index) => (
                                                <div className="col-md-2" key={index}>
                                                    {/* Start Style Box */}
                                                    <div
                                                        className="style-box p-2 text-center"
                                                        onClick={() => handleSelectStyle(index)}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${style.imgSrc}`}
                                                            alt="aa" className="mb-2 style-image"
                                                            style={index === styleSelectedIndex ? { border: "4px solid #000" } : {}}
                                                        />
                                                        <p className="style-name m-0 text-center">{style.name}</p>
                                                    </div>
                                                    {/* End Style Box */}
                                                </div>
                                            ))}
                                            {/* End Column */}
                                        </div>
                                        {/* End Grid System */}
                                    </section>
                                    {/* End Styles Box */}
                                </section>
                                {/* Start Generating Image Options Section */}
                                {/* Start Art Name And Price Section */}
                                <section className="art-name-and-price">
                                    {/* Start Grid System */}
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h4 className="art-name fw-bold">Art Name: {paintingType}</h4>
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
                                        <li
                                            className="p-2 pe-3 ps-3"
                                            onClick={() => setPaintingType("poster")}
                                            style={paintingType === "poster" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                        >
                                            Poster
                                        </li>
                                        <li
                                            className="p-2 pe-3 ps-3"
                                            onClick={() => setPaintingType("canvas")}
                                            style={paintingType === "canvas" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                        >
                                            Canvas
                                        </li>
                                    </ul>
                                    {/* EndArt Names List */}
                                    <h5 className="fw-bold">Positions</h5>
                                    {/* Start Positions List */}
                                    <ul className="positions-list mb-4 text-center">
                                        <li
                                            className="p-3"
                                            style={imageType === "vertical" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectImageType("vertical")}
                                        >
                                            Vertical
                                        </li>
                                        <li
                                            className="p-3"
                                            style={imageType === "horizontal" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectImageType("horizontal")}
                                        >
                                            Horizontal
                                        </li>
                                        <li
                                            className="p-3"
                                            style={imageType === "square" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectImageType("square")}
                                        >
                                            Square
                                        </li>
                                    </ul>
                                    {/* End Positions List */}
                                    <h5 className="fw-bold">Sizes</h5>
                                    {/* Start Sizes List */}
                                    <ul className="sizes-list mb-4 text-center">
                                        {text_to_image_data.gelatoDimetions[paintingType][imageType].map((dims, index) => (
                                            <li
                                                key={index}
                                                className="p-3"
                                                onClick={() => handleSelectImageDimentions(dims.inCm)}
                                                style={dims.inCm === dimentionsInCm ? { border: "4px solid #000", fontWeight: "bold" } : { lineHeight: "57px" }}
                                            >
                                                {(dims.inCm === "50x70" || dims.inCm === "30x30") && <h6 className="fw-bold">Popular</h6>}
                                                {dims.inCm}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* End Sizes List */}
                                    {paintingType === "poster" && <h5 className="fw-bold">Framed</h5>}
                                    {/* Start Frames List */}
                                    {paintingType === "poster" && <ul className="framed-list mb-4 text-center pb-3">
                                        <li
                                            style={frameColor === "none" ? { border: "4px solid #000", fontWeight: "bold" } : { }}
                                            onClick={() => handleSelectFrame("none")}
                                        >
                                            none
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "black" ? { border: "4px solid #000", fontWeight: "bold" } : { }}
                                            onClick={() => handleSelectFrame("black")}
                                        >
                                            <span className="frame-color d-block fw-bold">Black</span>
                                            <img src={blackFrameImage.src} alt="Black Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "white" ? { border: "4px solid #000", fontWeight: "bold" } : { }}
                                            onClick={() => handleSelectFrame("white")}
                                        >
                                            <span className="frame-color d-block fw-bold">White</span>
                                            <img src={whiteFrameImage.src} alt="White Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "natural-wood" ? { border: "4px solid #000", fontWeight: "bold" } : { }}
                                            onClick={() => handleSelectFrame("natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Wood</span>
                                            <img src={woodFrameImage.src} alt="Wood Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "dark-wood" ? { border: "4px solid #000", fontWeight: "bold" } : { }}
                                            onClick={() => handleSelectFrame("dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Dark Wood</span>
                                            <img src={darkWoodFrameImage.src} alt="Dark Wood Frame Image" width="50" />
                                        </li>
                                    </ul>}
                                    {/* End Frames List */}
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