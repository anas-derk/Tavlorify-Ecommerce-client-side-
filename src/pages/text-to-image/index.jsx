import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";
import Link from "next/link";
import image1 from "../../../public/images/backgrounds/1.jpg"
import { BiRightArrow } from "react-icons/bi";
import { Carousel } from "react-bootstrap";
import wallImage1 from "../../../public/images/backgrounds/wall1.jpg";
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

    const [dimentions, setDimentions] = useState({});

    const [dimentionsIndex, setDimentionsIndex] = useState(-1);

    const [getImgDimentionsMsg, setGetImgDimentionsMsg] = useState("");

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
        // if (styleSelectedIndex > -1 && imageType) {
        //     setDimentions({
        //         width: text_to_image_data.modelsDimentions[tempModelName][imageType][dimensionsIndex].inPixel.width,
        //         height: text_to_image_data.modelsDimentions[tempModelName][imageType][dimensionsIndex].inPixel.height,
        //     });
        // }
    }

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

    const handleSelectImageDimentions = (value) => {
        const imageSize = value.split("-");
        setImageType(imageSize[0]);
        const dimsIndex = text_to_image_data.modelsDimentions[modelName][imageSize[0]].findIndex((el) => el.inCm == imageSize[1]);
        setDimentions({
            width: text_to_image_data.modelsDimentions[modelName][imageSize[0]][dimsIndex].inPixel.width,
            height: text_to_image_data.modelsDimentions[modelName][imageSize[0]][dimsIndex].inPixel.height,
        });
        setDimentionsIndex(dimsIndex);
    }

    const closePopupScreen = () => {
        setIsDisplayPopupScreen(false);
    }

    const addToCart = async (e) => {
        e.preventDefault();
        setIsWaitAddToCart(true);
        let userId = localStorage.getItem("e-commerce-canvas-user-id");
        if (!userId) {
            try {
                const result = await Axios.post(`${process.env.BASE_API_URL}/download-created-image`, {
                    imageUrl: generatedImageURLs[0],
                    imageName: `${textPrompt}.png`,
                });
                const codeGenerator = new nodeCodeGenerator();
                let productInfoToCart = {
                    _id: codeGenerator.generateCodes("###**##########****###**")[0],
                    name: textPrompt,
                    type: paintingType,
                    frameColor: (paintingType === "canvas-prints" || paintingType === "poster") ? "none" : frameColor,
                    dimentions: text_to_image_data.modelsDimentions[modelName][imageType][dimentionsIndex].inCm,
                    price: 100,
                    imageSrc: result.data.imageUrl,
                    count: quantity,
                }
                let canvasEcommerceUserCart = JSON.parse(localStorage.getItem("canvas-ecommerce-user-cart"));
                if (canvasEcommerceUserCart) {
                    canvasEcommerceUserCart.push(productInfoToCart);
                    localStorage.setItem("canvas-ecommerce-user-cart", JSON.stringify(canvasEcommerceUserCart));
                    setTimeout(() => {
                        setIsWaitAddToCart(false);
                        router.push("/cart");
                    }, 1500);
                } else {
                    let canvasEcommerceUserCartList = [];
                    canvasEcommerceUserCartList.push(productInfoToCart);
                    localStorage.setItem("canvas-ecommerce-user-cart", JSON.stringify(canvasEcommerceUserCartList));
                    setTimeout(() => {
                        setIsWaitAddToCart(false);
                        router.push("/cart");
                    }, 1500);
                }
            }
            catch (err) {
                console.log(err);
                setErrorInAddToCart("Sorry, Something Went Wrong !!");
                setTimeout(() => {
                    setErrorInAddToCart("");
                }, 2000);
            }
        }
    }

    return (
        // Start Text To Image Service Page
        <div className="text-to-image-service">
            <Head>
                <title>Tavlorify Store - Text To Image</title>
            </Head>
            <Header />
            {/* Start Popup Box */}
            {generatedImageURLs[0] && isDisplayPopupScreen && <div className="popup-box">
                <div className="popup p-3">
                    <Carousel
                        indicators={false}
                        controls={true}
                        interval={null}
                    >
                        <Carousel.Item>
                            <Carousel.Caption>
                                {paintingType === "canvas-prints" && <img
                                    src={generatedImageURLs[0]}
                                    alt="Image"
                                    className="canvas-prints-image"
                                />}
                                {paintingType === "poster" && <img
                                    src={generatedImageURLs[0]}
                                    alt="Image"
                                    className="poster-image"
                                />}
                                {paintingType === "wooden-framed-poster" && <img
                                    src={generatedImageURLs[0]}
                                    alt="Image"
                                    className={`wooden-framed-poster-image ${frameColor}`}
                                />}
                                {paintingType === "poster-with-hangers" && <img
                                    src={generatedImageURLs[0]}
                                    alt="Image"
                                    className="poster-with-hangers-image"
                                />}
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Carousel.Caption className="caption-box-2">
                                <div className="image-in-room-wall-box">
                                    <img src={generatedImageURLs[0]} alt="Image" className="created-image" />
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <div className="options-buttons-box text-center mt-3 p-3">
                        <button className="btn btn-danger me-4" onClick={closePopupScreen}>Close Window</button>
                        <form className="add-to-cart-form" onSubmit={addToCart}>
                            <input
                                type="number"
                                className="form-control d-block mx-auto mt-3 mb-3 w-25"
                                onChange={(e) => setQuantity(e.target.value)}
                                defaultValue={quantity}
                                required
                            />
                            {!isWaitAddToCart && !errorInAddToCart && <button className="btn btn-success" type="submit">Add To Cart</button>}
                            {isWaitAddToCart && <button className="btn btn-success" type="submit" disabled>wating ...</button>}
                        </form>
                    </div>
                </div>
            </div>}
            {/* End Popup Box */}
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
                                    <input
                                        type="text"
                                        placeholder="a dog riding a bicycle"
                                        className="form-control mb-3"
                                        onChange={(e) => setTextPrompt(e.target.value)}
                                    />
                                    <h6 className="describe text-start">Describe what you want the AI to create .</h6>
                                    <hr />
                                    {/* Start Select Image Type Section */}
                                    {styleSelectedIndex > -1 && <>
                                        <h6 className="mb-3">Painting Type</h6>
                                        <select className="form-control" onChange={(e) => {
                                            setGetImgDimentionsMsg("Waiting ...");
                                            setTimeout(() => {
                                                setPaintingType(e.target.value);
                                                setDimentions({});
                                                setGetImgDimentionsMsg("");
                                            }, 1000);
                                        }}>
                                            <option defaultValue="" hidden>Select Painting Type</option>
                                            <option value="canvas-prints">Canvas</option>
                                            <option value="poster">Poster</option>
                                            <option value="wooden-framed-poster">Wooden Framed Poster</option>
                                            {/* <option value="poster-with-hangers">Poster With Hangers</option> */}
                                        </select>
                                        <hr />
                                    </>}
                                    {(paintingType === "wooden-framed-poster" || paintingType === "poster-with-hangers") && <>
                                        <h6 className="mb-3">Frame Color</h6>
                                        <select className="form-control" onChange={(e) => {
                                            setFrameColor(e.target.value);
                                        }}>
                                            <option defaultValue="" hidden>Select Frame Color</option>
                                            <option value="black-frame">Black</option>
                                            <option value="dark-wood-frame">Dark Wood</option>
                                            <option value="wood-frame">Wood</option>
                                            <option value="white-frame">White</option>
                                        </select>
                                        <hr />
                                    </>}
                                    {paintingType && <>
                                        <h6 className="mb-3">Image Size</h6>
                                        <select className="form-control" onChange={(e) => handleSelectImageDimentions(e.target.value)}>
                                            <option defaultValue="" hidden>Select Image Size</option>
                                            <optgroup label="Horizontal">
                                                {text_to_image_data.gelatoDimetions[paintingType]["horizontal"].map((dims, index) => (
                                                    <option value={`horizontal-${dims.inCm}`} key={index}>{dims.inCm} cm</option>
                                                ))}
                                            </optgroup>
                                            <optgroup label="Vertical">
                                                {text_to_image_data.gelatoDimetions[paintingType]["vertical"].map((dims, index) => (
                                                    <option value={`vertical-${dims.inCm}`} key={index}>{dims.inCm} cm</option>
                                                ))}
                                            </optgroup>
                                            <optgroup label="Square">
                                                {text_to_image_data.gelatoDimetions[paintingType]["square"].map((dims, index) => (
                                                    <option value={`square-${dims.inCm}`} key={index}>{dims.inCm} cm</option>
                                                ))}
                                            </optgroup>
                                        </select>
                                        <hr />
                                    </>}
                                    {/* End Select Image Type Section */}
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
                                        <div className="row mb-3">
                                            {/* Start Column */}
                                            {categoryStyles.map((style, index) => (
                                                <div className="col-md-4" key={index}>
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
                                    {categorySelectedIndex > -1 && styleSelectedIndex > -1 && textPrompt !== "" && imageType !== "" && dimentions.width !== undefined && dimentions.height !== undefined && !isWaitStatus && !errorMsg &&
                                        <button className="btn btn-danger w-50" onClick={textToImageGenerate}>Create</button>
                                    }
                                    {isWaitStatus && <button className="btn btn-danger w-50" disabled>Creating ...</button>}
                                    {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
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