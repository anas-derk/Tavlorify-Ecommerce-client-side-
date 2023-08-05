import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import global_data from "../../../public/data/global";
import nodeCodeGenerator from "node-code-generator";
import { useRouter } from "next/router";
/* Start Import Frame Corner Images */
import blackFrameCornerImage from "../../../public/images/frames/frameCorners/black.png";
import whiteFrameCornerImage from "../../../public/images/frames/frameCorners/white.png";
import woodFrameCornerImage from "../../../public/images/frames/frameCorners/wood.png";
import darkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/dark-wood.png";
/* End Import Frame Corner Images */
/* Start Import Normal Frame Images */
import normalBlackFrameImageHorizontal from "../../../public/images/frames/black/H/600.png";
import normalBlackFrameImageSquare from "../../../public/images/frames/black/S/600q.png";
import normalBlackFrameImageVertical from "../../../public/images/frames/black/V/600v.png";
import normalWhiteFrameImageHorizontal from "../../../public/images/frames/white/H/600.png";
import normalWhiteFrameImageSquare from "../../../public/images/frames/white/S/600q.png";
import normalWhiteFrameImageVertical from "../../../public/images/frames/white/V/600v.png";
import normalWoodFrameImageHorizontal from "../../../public/images/frames/wood/H/600.png";
import normalWoodFrameImageSquare from "../../../public/images/frames/wood/S/600q.png";
import normalWoodFrameImageVertical from "../../../public/images/frames/wood/V/600v.png";
import normalDarkWoodFrameImageHorizontal from "../../../public/images/frames/darkWood/H/600.png";
import normalDarkWoodFrameImageSquare from "../../../public/images/frames/darkWood/S/600q.png";
import normalDarkWoodFrameImageVertical from "../../../public/images/frames/darkWood/V/600v.png";
/* End Import Normal Frame Images */
import validations from "../../../public/global_functions/validations";
import { GrFormClose } from "react-icons/gr";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";

const TextToImage = ({ printsName }) => {

    const [textPrompt, setTextPrompt] = useState("a dog");

    const [generatedImageURL, setGeneratedImageURL] = useState("");

    const [paintingURL, setPaintingURL] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("vertical");

    const [paintingType, setPaintingType] = useState(printsName);

    const [frameColor, setFrameColor] = useState("none");

    const [dimentions, setDimentions] = useState({});

    const [dimentionsInCm, setDimentionsInCm] = useState(printsName === "poster" ? "21x29,7" : "30x40");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [isDisplayPopupScreen, setIsDisplayPopupScreen] = useState(false);

    const [isWaitAddToCart, setIsWaitAddToCart] = useState(false);

    const [errorInAddToCart, setErrorInAddToCart] = useState("");

    const [quantity, setQuantity] = useState(1);

    const router = useRouter();

    const [tempModelName, setTempModelName] = useState("");

    const [tempDimentionsInCm, setTempDimentionsInCm] = useState(printsName === "poster" ? "21x29,7" : "30x40");

    const [tempImageType, setTempImageType] = useState("vertical");

    const frameImages = {
        "square": {
            "natural-wood": {
                "30x30": normalWoodFrameImageSquare.src,
                "50x50": normalWoodFrameImageSquare.src,
                "70x70": normalWoodFrameImageSquare.src,
            },
            "black": {
                "30x30": normalBlackFrameImageSquare.src,
                "50x50": normalBlackFrameImageSquare.src,
                "70x70": normalBlackFrameImageSquare.src,
            },
            "white": {
                "30x30": normalWhiteFrameImageSquare.src,
                "50x50": normalWhiteFrameImageSquare.src,
                "70x70": normalWhiteFrameImageSquare.src,
            },
            "dark-wood": {
                "30x30": normalDarkWoodFrameImageSquare.src,
                "50x50": normalDarkWoodFrameImageSquare.src,
                "70x70": normalDarkWoodFrameImageSquare.src,
            },
        },
        "vertical": {
            "natural-wood": {
                "21x29,7": normalWoodFrameImageVertical.src,
                "30x40": normalWoodFrameImageVertical.src,
                "50x70": normalWoodFrameImageVertical.src,
                "70x100": normalWoodFrameImageVertical.src,
            },
            "black": {
                "21x29,7": normalBlackFrameImageVertical.src,
                "30x40": normalBlackFrameImageVertical.src,
                "50x70": normalBlackFrameImageVertical.src,
                "70x100": normalBlackFrameImageVertical.src,
            },
            "white": {
                "21x29,7": normalWhiteFrameImageVertical.src,
                "30x40": normalWhiteFrameImageVertical.src,
                "50x70": normalWhiteFrameImageVertical.src,
                "70x100": normalWhiteFrameImageVertical.src,
            },
            "dark-wood": {
                "21x29,7": normalDarkWoodFrameImageVertical.src,
                "30x40": normalDarkWoodFrameImageVertical.src,
                "50x70": normalDarkWoodFrameImageVertical.src,
                "70x100": normalDarkWoodFrameImageVertical.src,
            },
        },
        "horizontal": {
            "natural-wood": {
                "29,7x21": normalWoodFrameImageHorizontal.src,
                "40x30": normalWoodFrameImageHorizontal.src,
                "70x50": normalWoodFrameImageHorizontal.src,
                "100x70": normalWoodFrameImageHorizontal.src,
            },
            "black": {
                "29,7x21": normalBlackFrameImageHorizontal.src,
                "40x30": normalBlackFrameImageHorizontal.src,
                "70x50": normalBlackFrameImageHorizontal.src,
                "100x70": normalBlackFrameImageHorizontal.src,
            },
            "white": {
                "29,7x21": normalWhiteFrameImageHorizontal.src,
                "40x30": normalWhiteFrameImageHorizontal.src,
                "70x50": normalWhiteFrameImageHorizontal.src,
                "100x70": normalWhiteFrameImageHorizontal.src,
            },
            "dark-wood": {
                "29,7x21": normalDarkWoodFrameImageHorizontal.src,
                "40x30": normalDarkWoodFrameImageHorizontal.src,
                "70x50": normalDarkWoodFrameImageHorizontal.src,
                "100x70": normalDarkWoodFrameImageHorizontal.src,
            },
        }
    }

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const [isOpenCartPopupBox, setIsOpenCartPopupBox] = useState(false);

    useEffect(() => {
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/categories/all-categories-data`)
            .then((res) => {
                const result = res.data;
                if (typeof result === "string") {
                    // console.log(result);
                } else {
                    // console.log(result)
                    setCategoriesData(result);
                    Axios.get(`${process.env.BASE_API_URL}/text-to-image/styles/category-styles-data?categoryName=${result[0].name}`)
                        .then((res) => {
                            const categoryStylesTemp = res.data;
                            setCategoryStyles(categoryStylesTemp);
                            const tempModelName = categoryStylesTemp[0].modelName;
                            setTempModelName(tempModelName);
                            setModelName(tempModelName);
                            const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                            setDimentions({
                                width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                                height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                            });
                            if (printsName === "poster") {
                                setGeneratedImageURL(`${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForPoster.png`);
                                setPaintingURL(`${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForPoster.png`);
                            } else if (printsName === "canvas") {
                                setGeneratedImageURL(`${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForCanvas.png`);
                                setPaintingURL(`${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForCanvas.png`);
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectCategory = (index) => {
        setCategorySelectedIndex(index);
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/styles/category-styles-data?categoryName=${categoriesData[index].name}`)
            .then((res) => {
                setCategoryStyles(res.data);
                setStyleSelectedIndex(0);
                const tempModelName = res.data[0].modelName;
                setTempModelName(tempModelName);
                setModelName(tempModelName);
                const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                setDimentions({
                    width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                });
            })
            .catch((err) => console.log(err));
    }

    const handleSelectStyle = (index) => {
        setStyleSelectedIndex(index);
        let tempModelName = categoryStyles[index].modelName;
        setModelName(tempModelName);
        const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
        setDimentions({
            width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
            height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
        });
    }

    const handleSelectImageType = (imgType) => {
        setImageType(imgType);
        switch (imgType) {
            case "horizontal": {
                setDimentionsInCm("70x50");
                const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == "70x50");
                setDimentions({
                    width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                });
                break;
            }
            case "vertical": {
                setDimentionsInCm("50x70");
                const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == "50x70");
                setDimentions({
                    width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                });
                break;
            }
            case "square": {
                setDimentionsInCm("30x30");
                const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == "30x30");
                setDimentions({
                    width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                });
                break;
            }
            default: {
                console.log("error in select image position");
            }
        }
    }

    const handleSelectImageDimentions = (inCm) => {
        const dimsIndex = global_data.modelsDimentions[modelName][imageType].findIndex((el) => el.inCm == inCm);
        setDimentionsInCm(inCm);
        setDimentions({
            width: global_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.width,
            height: global_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.height,
        });
    }

    const generatedImageWithAI = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setGeneratedImageURL("");
        setIsWaitStatus(true);
        Axios.get(
            `https://api1.outcircle2023.com/text-to-image/generate-image?textPrompt=${textPrompt}&prompt=${categoryStyles[styleSelectedIndex].prompt}&category=${categoriesData[categorySelectedIndex].name}&model_name=${modelName}&negative_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&width=${dimentions.width}&height=${dimentions.height}
        `)
            .then((res) => {
                let result = res.data;
                console.log(result)
                setIsWaitStatus(false);
                if (Array.isArray(result)) {
                    setTempModelName(modelName);
                    setGeneratedImageURL(result[0]);
                    setPaintingURL(result[0]);
                    setTempImageType(imageType);
                    setTempDimentionsInCm(dimentionsInCm);
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

    const addToCart = async () => {
        setFormValidationErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "quantity",
                value: quantity,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    minNumber: {
                        value: 1,
                        msg: "Sorry, Can't Be Quantity Less Than One !!",
                    }
                },
            },
        ]);
        setFormValidationErrors(errorsObject);
        console.log(errorsObject)
        if (Object.keys(errorsObject).length == 0) {
            setIsWaitAddToCart(true);
            const userId = localStorage.getItem("tavlorify-store-user-id");
            try {
                const result = await Axios.post(`${process.env.BASE_API_URL}/download-created-image`, {
                    imageUrl: generatedImageURL,
                    imageName: `${textPrompt}.png`,
                });
                const codeGenerator = new nodeCodeGenerator();
                const productInfoToCart = {
                    _id: codeGenerator.generateCodes("###**##########****###**")[0],
                    name: textPrompt,
                    type: paintingType,
                    frameColor: frameColor,
                    dimentions: dimentionsInCm,
                    price: 100,
                    imageSrc: result.data.imageUrl,
                    count: quantity,
                }
                let canvasEcommerceUserCart = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
                if (canvasEcommerceUserCart) {
                    canvasEcommerceUserCart.push(productInfoToCart);
                    localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(canvasEcommerceUserCart));
                    setTimeout(() => {
                        setIsWaitAddToCart(false);
                        openCartPopupBox();
                    }, 1500);
                } else {
                    let canvasEcommerceUserCartList = [];
                    canvasEcommerceUserCartList.push(productInfoToCart);
                    localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(canvasEcommerceUserCartList));
                    setTimeout(() => {
                        setIsWaitAddToCart(false);
                        openCartPopupBox();
                    }, 1500);
                }
            }
            catch (err) {
                console.log(err);
                setIsWaitAddToCart(false);
                setErrorInAddToCart("Sorry, Something Went Wrong !!");
                setTimeout(() => {
                    setErrorInAddToCart("");
                }, 2000);
            }
        }
    }

    const openCartPopupBox = () => {
        setIsOpenCartPopupBox(true);
    }

    const closeCartPopupBox = () => {
        setIsOpenCartPopupBox(false);
    }

    return (
        // Start Text To Image Service Page
        <div className="text-to-image-service">
            <Head>
                <title>Tavlorify Store - Text To Image</title>
            </Head>
            <Header />
            {/* Start Overlay Box */}
            {isOpenCartPopupBox && <div className="overlay">
                <aside className="cart-popup-box p-3">
                    <div className="row align-items-center border border-2 border-dark p-2 mb-4">
                        <div className="col-md-4">
                            <BsCart2 className="cart-icon" />
                        </div>
                        <div className="col-md-4 text-center fw-bold">
                            Cart
                        </div>
                        <div className="col-md-4 text-end" onClick={closeCartPopupBox}>
                            <GrFormClose className="close-overlay-icon" />
                        </div>
                    </div>
                    <hr />
                    <div className="options-box">
                        <button
                            className="btn btn-dark w-100 d-block text-center mb-4"
                            onClick={closeCartPopupBox}
                        >
                            Return To Text To Image
                        </button>
                        <Link
                            className="btn btn-success w-100 d-block text-center"
                            href="/cart"
                        >
                            Open Cart Page
                        </Link>
                    </div>
                </aside>
            </div>}
            {/* End Overlay Box */}
            <div className="open-cart-popup-box" onClick={openCartPopupBox}>
                <BsCart2 className="cart-icon" />
            </div>
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
                                style={isWaitStatus ? { backgroundColor: "#989492" } : {}}
                            >
                                <div
                                    className="frame-image-box"
                                >
                                    {!isWaitStatus && !errorMsg && paintingURL && frameColor !== "none" && <img
                                        src={frameImages[tempImageType][frameColor][tempDimentionsInCm]}
                                        alt="Image"
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    />}
                                </div>
                                <div
                                    className="generated-image-box"
                                    style={{
                                        width: `${global_data.appearedImageSizes[tempImageType][tempDimentionsInCm].width}px`,
                                        height: `${global_data.appearedImageSizes[tempImageType][tempDimentionsInCm].height}px`,
                                        position: frameColor === "none" ? "static" : "absolute",
                                    }}
                                >
                                    {!isWaitStatus && !errorMsg && paintingURL && <img
                                        src={paintingURL}
                                        className="mw-100 mh-100"
                                        alt="Generated Image !!"
                                    />}
                                </div>
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
                                                <button className="btn btn-dark w-100" onClick={generatedImageWithAI}>Create</button>
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
                                    {/* End Styles Section */}
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
                                        {global_data.gelatoDimetions[paintingType][imageType].map((dims, index) => (
                                            <li
                                                key={index}
                                                className="p-3"
                                                onClick={() => handleSelectImageDimentions(dims.inCm)}
                                                style={dims.inCm === dimentionsInCm ? { border: "4px solid #000", fontWeight: "bold" } : { lineHeight: "57px" }}
                                            >
                                                {(dims.inCm === "50x70" || dims.inCm === "70x50" || dims.inCm === "30x30") && <h6 className="fw-bold">Popular</h6>}
                                                {dims.inCm}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* End Sizes List */}
                                    {paintingType === "poster" && <h5 className="fw-bold">Frames</h5>}
                                    {/* Start Frames List */}
                                    {paintingType === "poster" && <ul className="framed-list mb-4 text-center pb-3">
                                        <li
                                            style={frameColor === "none" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("none")}
                                        >
                                            none
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "black" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("black")}
                                        >
                                            <span className="frame-color d-block fw-bold">Black</span>
                                            <img src={blackFrameCornerImage.src} alt="Black Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "white" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("white")}
                                        >
                                            <span className="frame-color d-block fw-bold">White</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "natural-wood" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Wood</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={frameColor === "dark-wood" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Dark Wood</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" width="50" />
                                        </li>
                                    </ul>}
                                    {/* End Frames List */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                className={`quantity form-control border-2 ${formValidationErrors["quantity"] ? "border-danger" : "border-dark"}`}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                defaultValue={quantity}
                                            />
                                            {formValidationErrors["quantity"] && <p className='error-msg text-danger'>{formValidationErrors["quantity"]}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            {!isWaitAddToCart && !errorInAddToCart && <button
                                                className="btn btn-dark w-100 p-2"
                                                onClick={addToCart}
                                            >
                                                Add To Cart
                                            </button>}
                                            {isWaitAddToCart && <button className="btn btn-dark w-100 p-2" disabled >wating ...</button>}
                                            {errorInAddToCart && <button className="btn btn-dark w-100 p-2" disabled >{errorInAddToCart}</button>}
                                        </div>
                                    </div>
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

export async function getServerSideProps(context) {
    let printsName = context.query.printsName;
    return {
        props: {
            printsName,
        },
    }
}

export default TextToImage;