import Head from "next/head";
import Header from "@/components/Header";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";
import Link from "next/link";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("");

    const [generatedImageURLs, setGeneratedImageURLs] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [getImgTypeMsg, setGetImgTypeMsg] = useState("");

    const [getImgDimentionsMsg, setGetImgDimentionsMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(-1);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(-1);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("");

    const [dimensions, setDimentions] = useState({});

    const textToImageGenerate = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setIsWaitStatus(true);
        Axios.get(
            `${process.env.BASE_API_URL}/text-to-image-generate?textPrompt=${textPrompt}&prompt=${text_to_image_data.categoriesData[categorySelectedIndex].styles[styleSelectedIndex].prompt}&category=${text_to_image_data.categoriesData[categorySelectedIndex].name}&model_name=${modelName}&negative_prompt=${text_to_image_data.categoriesData[categorySelectedIndex].styles[styleSelectedIndex].negative_prompt}&width=${dimensions.width}&height=${dimensions.height}
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
                                        onClick={() => {
                                            setCategorySelectedIndex(index);
                                            setStyleSelectedIndex(-1);
                                            setImageType("");
                                            setDimentions({});
                                        }}
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
                            {categorySelectedIndex > -1 && <h6 className="mb-2">Style</h6>}
                            {categorySelectedIndex > -1 && <section className="styles mb-4 d-flex flex-wrap">
                                {text_to_image_data.categoriesData[categorySelectedIndex].styles.map((category, index) => (
                                    /* Start Style Box */
                                    <div
                                        className="style-box text-center"
                                        key={index}
                                        onClick={() => {
                                            setGetImgTypeMsg("waiting ...");
                                            setStyleSelectedIndex(index);
                                            setTimeout(() => {
                                                setGetImgTypeMsg("");
                                                setModelName(text_to_image_data.categoriesData[categorySelectedIndex].styles[index].modelName);
                                                setImageType("");
                                                setDimentions({});
                                            }, 1000);
                                        }}
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
                            </section>}
                            {/* End Styles */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Generate Wait Box */}
                            {isWaitStatus && <section className="generate-wait-box text-center p-3">
                                <h6 className="wait-message mb-3">Generating The Required Images</h6>
                                <span className="loader max-auto"></span>
                            </section>}
                            {/* End Generate Wait Box */}
                            {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
                            {/* Start Generated Images Box */}
                            {generatedImageURLs.length > 0 && !isWaitStatus && <section className="generated-images-box">
                                <h4 className="text-center mb-4">Generated Images</h4>
                                {/* Start Grid System */}
                                <div className="row">
                                    {generatedImageURLs.map((url, index) => (
                                        <Link href={{
                                            pathname: "/available-products",
                                            query: {
                                                url: url,
                                            },
                                        }}
                                            key={index}
                                        >
                                            <img src={url} alt="Image" className="created-image" />
                                        </Link>
                                    ))}
                                </div>
                                {/* End Grid System */}
                            </section>}
                            {/* End Generated Images Box */}
                        </div>
                        {/* End Column */}
                    </section>
                    {/* End Grid System */}
                    {getImgTypeMsg && <p className="alert alert-warning">{getImgTypeMsg}</p>}
                    {/* Start Select Image Type Section */}
                    {styleSelectedIndex > -1 && !getImgTypeMsg && <>
                        <h6 className="mb-3">Image Type</h6>
                        <select className="form-control w-50" onChange={(e) => {
                            setGetImgDimentionsMsg("waiting ...");
                            setTimeout(() => {
                                setGetImgDimentionsMsg("");
                                setImageType(e.target.value);
                            }, 1000);
                        }}>
                            <option defaultValue="" hidden>Select Image Type</option>
                            <option value="horizontal">Horizontal</option>
                            <option value="vertical">Vertical</option>
                            <option value="square">Square</option>
                        </select>
                    </>}
                    {/* End Select Image Type Section */}
                    <hr />
                    {getImgDimentionsMsg && <p className="alert alert-warning">{getImgDimentionsMsg}</p>}
                    {/* Start Select Image Dimensions Section */}
                    {modelName && imageType && !getImgDimentionsMsg && <h6 className="mb-3">Image Dimensions</h6>}
                    {modelName && imageType && !getImgDimentionsMsg && <select className="form-control w-50" onChange={(e) => {
                        setDimentions({
                            width: text_to_image_data.modelsDimentions[modelName][imageType][e.target.value].inPixel.width,
                            height: text_to_image_data.modelsDimentions[modelName][imageType][e.target.value].inPixel.height,
                        })
                    }}>
                        <option defaultValue="" hidden>Select Image Dimensions</option>
                        {text_to_image_data.modelsDimentions[modelName][imageType].map((dimensions, index) => (
                            <option value={index} key={index}>{dimensions.inCm} cm</option>
                        ))}
                    </select>}
                    {/* End Select Image Dimensions Section */}
                </section>
                {/* End Text To Image Box */}
            </div>
            {/* End Custom Container */}
        </div>
        // End Text To Image Page
    );
}

export default TextToImage;