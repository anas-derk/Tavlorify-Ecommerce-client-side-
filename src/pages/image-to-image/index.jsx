import Head from "next/head";
import Header from "@/components/Header";
import testImage from "../../../public/images/previewImageForPoster.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import global_data from "../../../public/data/global";
/* Start Import Frame Corner Images */
import blackFrameCornerImage from "../../../public/images/frames/frameCorners/black.png";
import whiteFrameCornerImage from "../../../public/images/frames/frameCorners/white.png";
import woodFrameCornerImage from "../../../public/images/frames/frameCorners/wood.png";
import darkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/dark-wood.png";
/* End Import Frame Corner Images */
/* Start Import Square Frame Images */
import blackFrame_30_30_Image from "../../../public/images/frames/black/S/30_30.png";
import blackFrame_50_50_Image from "../../../public/images/frames/black/S/50_50.png";
import blackFrame_70_70_Image from "../../../public/images/frames/black/S/70_70.png";
import whiteFrame_30_30_Image from "../../../public/images/frames/white/S/30_30.png";
import whiteFrame_50_50_Image from "../../../public/images/frames/white/S/50_50.png";
import whiteFrame_70_70_Image from "../../../public/images/frames/white/S/70_70.png";
import woodFrame_30_30_Image from "../../../public/images/frames/wood/S/30_30.png";
import woodFrame_50_50_Image from "../../../public/images/frames/wood/S/50_50.png";
import woodFrame_70_70_Image from "../../../public/images/frames/wood/S/70_70.png";
import darkWoodFrame_30_30_Image from "../../../public/images/frames/darkWood/S/30_30.png";
import darkWoodFrame_50_50_Image from "../../../public/images/frames/darkWood/S/50_50.png";
import darkWoodFrame_70_70_Image from "../../../public/images/frames/darkWood/S/70_70.png";
/* End Import Square Frame Images */
/* Start Import Vertical Frame Images */
import blackFrame_21_30_Image from "../../../public/images/frames/black/V/21_30.png";
import blackFrame_30_40_Image from "../../../public/images/frames/black/V/30_40.png";
import blackFrame_50_70_Image from "../../../public/images/frames/black/V/50_70.png";
import blackFrame_70_100_Image from "../../../public/images/frames/black/V/70_100.png";
import whiteFrame_21_30_Image from "../../../public/images/frames/white/V/21_30.png";
import whiteFrame_30_40_Image from "../../../public/images/frames/white/V/30_40.png";
import whiteFrame_50_70_Image from "../../../public/images/frames/white/V/50_70.png";
import whiteFrame_70_100_Image from "../../../public/images/frames/white/V/70_100.png";
import woodFrame_21_30_Image from "../../../public/images/frames/wood/V/21_30.png";
import woodFrame_30_40_Image from "../../../public/images/frames/wood/V/30_40.png";
import woodFrame_50_70_Image from "../../../public/images/frames/wood/V/50_70.png";
import woodFrame_70_100_Image from "../../../public/images/frames/wood/V/70_100.png";
import darkWoodFrame_21_30_Image from "../../../public/images/frames/darkWood/V/21_30.png";
import darkWoodFrame_30_40_Image from "../../../public/images/frames/darkWood/V/30_40.png";
import darkWoodFrame_50_70_Image from "../../../public/images/frames/darkWood/V/50_70.png";
import darkWoodFrame_70_100_Image from "../../../public/images/frames/darkWood/V/70_100.png";
/* End Import Vertical Frame Images */
/* Start Import Horizontal Frame Images */
import blackFrame_30_21_Image from "../../../public/images/frames/black/H/30_21.png";
import blackFrame_40_30_Image from "../../../public/images/frames/black/H/40_30.png";
import blackFrame_70_50_Image from "../../../public/images/frames/black/H/70_50.png";
import blackFrame_100_70_Image from "../../../public/images/frames/black/H/100_70.png";
import whiteFrame_30_21_Image from "../../../public/images/frames/white/H/30_21.png";
import whiteFrame_40_30_Image from "../../../public/images/frames/white/H/40_30.png";
import whiteFrame_70_50_Image from "../../../public/images/frames/white/H/70_50.png";
import whiteFrame_100_70_Image from "../../../public/images/frames/white/H/100_70.png";
import woodFrame_30_21_Image from "../../../public/images/frames/wood/H/30_21.png";
import woodFrame_40_30_Image from "../../../public/images/frames/wood/H/40_30.png";
import woodFrame_70_50_Image from "../../../public/images/frames/wood/H/70_50.png";
import woodFrame_100_70_Image from "../../../public/images/frames/wood/H/100_70.png";
import darkWoodFrame_30_21_Image from "../../../public/images/frames/darkWood/H/30_21.png";
import darkWoodFrame_40_30_Image from "../../../public/images/frames/darkWood/H/40_30.png";
import darkWoodFrame_70_50_Image from "../../../public/images/frames/darkWood/H/70_50.png";
import darkWoodFrame_100_70_Image from "../../../public/images/frames/darkWood/H/100_70.png";
/* End Import Horizontal Frame Images */
import { BsCloudUpload } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import globalData from "../../../public/data/global";

const ImageToImage = () => {

    const [paintingURL, setPaintingURL] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("square");

    const [paintingType, setPaintingType] = useState("poster");

    const [frameColor, setFrameColor] = useState("natural-wood");

    const [dimentions, setDimentions] = useState({});

    const [dimentionsInCm, setDimentionsInCm] = useState("30x30");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [imageFile, setImageFile] = useState({});

    const [imageLink, setImageLink] = useState("");

    const frameImages = {
        "square": {
            "natural-wood": {
                "30x30": woodFrame_30_30_Image.src,
                "50x50": woodFrame_50_50_Image.src,
                "70x70": woodFrame_70_70_Image.src,
            },
            "black": {
                "30x30": blackFrame_30_30_Image.src,
                "50x50": blackFrame_50_50_Image.src,
                "70x70": blackFrame_70_70_Image.src,
            },
            "white": {
                "30x30": whiteFrame_30_30_Image.src,
                "50x50": whiteFrame_50_50_Image.src,
                "70x70": whiteFrame_70_70_Image.src,
            },
            "dark-wood": {
                "30x30": darkWoodFrame_30_30_Image.src,
                "50x50": darkWoodFrame_50_50_Image.src,
                "70x70": darkWoodFrame_70_70_Image.src,
            },
        },
        "vertical": {
            "natural-wood": {
                "21x29,7": woodFrame_21_30_Image.src,
                "30x40": woodFrame_30_40_Image.src,
                "50x70": woodFrame_50_70_Image.src,
                "70x100": woodFrame_70_100_Image.src,
            },
            "black": {
                "21x29,7": blackFrame_21_30_Image.src,
                "30x40": blackFrame_30_40_Image.src,
                "50x70": blackFrame_50_70_Image.src,
                "70x100": blackFrame_70_100_Image.src,
            },
            "white": {
                "21x29,7": whiteFrame_21_30_Image.src,
                "30x40": whiteFrame_30_40_Image.src,
                "50x70": whiteFrame_50_70_Image.src,
                "70x100": whiteFrame_70_100_Image.src,
            },
            "dark-wood": {
                "21x29,7": darkWoodFrame_21_30_Image.src,
                "30x40": darkWoodFrame_30_40_Image.src,
                "50x70": darkWoodFrame_50_70_Image.src,
                "70x100": darkWoodFrame_70_100_Image.src,
            },
        },
        "horizontal": {
            "natural-wood": {
                "29,7x21": woodFrame_30_21_Image.src,
                "40x30": woodFrame_40_30_Image.src,
                "70x50": woodFrame_70_50_Image.src,
                "100x70": woodFrame_100_70_Image.src,
            },
            "black": {
                "29,7x21": blackFrame_30_21_Image.src,
                "40x30": blackFrame_40_30_Image.src,
                "70x50": blackFrame_70_50_Image.src,
                "100x70": blackFrame_100_70_Image.src,
            },
            "white": {
                "29,7x21": whiteFrame_30_21_Image.src,
                "40x30": whiteFrame_40_30_Image.src,
                "70x50": whiteFrame_70_50_Image.src,
                "100x70": whiteFrame_100_70_Image.src,
            },
            "dark-wood": {
                "29,7x21": darkWoodFrame_30_21_Image.src,
                "40x30": darkWoodFrame_40_30_Image.src,
                "70x50": darkWoodFrame_70_50_Image.src,
                "100x70": darkWoodFrame_100_70_Image.src,
            },
        }
    }

    useEffect(() => {
        Axios.get(`${process.env.BASE_API_URL}/image-to-image/categories/all-categories-data`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    // console.log(result);
                } else {
                    // console.log(result)
                    setCategoriesData(result);
                    Axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${result[0].name}`)
                        .then((res) => {
                            const categoryStylesTemp = res.data;
                            setCategoryStyles(categoryStylesTemp);
                            const tempModelName = categoryStylesTemp[0].modelName;
                            setModelName(tempModelName);
                            const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                            setDimentions({
                                width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                                height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                            });
                            setPaintingURL(testImage.src);
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectImageFile = (file) => {
        setImageLink(URL.createObjectURL(file));
        setImageFile(file);
    }

    const removeImage = () => {
        setImageLink("");
        setImageFile({});
    }

    const handleSelectCategory = (index) => {
        setCategorySelectedIndex(index);
        Axios.get(`${process.env.BASE_API_URL}/styles/category-styles-data?categoryName=${categoriesData[index].name}`)
            .then((res) => {
                setCategoryStyles(res.data);
                setStyleSelectedIndex(0);
                const tempModelName = res.data[0].modelName;
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

    const handleSelectFrame = (frameColor) => {
        setFrameColor(frameColor);
    }

    const imageToImage = (e) => {

    }

    return (
        // Start Image To Image Page
        <div className="image-to-image-service">
            <Head>
                <title>Tavlorify Store - Image To Image</title>
            </Head>
            <Header />
            {/* Start Page Content */}
            <div className="page-content">
                {/* Start Container */}
                <div className="container-fluid pt-4 pb-4">
                    <h1 className="text-center mb-3 welcome-msg pb-3">Welcome To You In Image To Image AI Service</h1>
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
                                        src={frameImages[imageType][frameColor][dimentionsInCm]}
                                        alt="Image"
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    />}
                                </div>
                                {!isWaitStatus && !errorMsg && paintingURL && <div
                                    className="generated-image-box"
                                    style={{
                                        position: frameColor === "none" ? "static" : "absolute",
                                        zIndex: "-1",
                                        width: globalData.framesDimentions[imageType][dimentionsInCm].width,
                                        height: globalData.framesDimentions[imageType][dimentionsInCm].height,
                                        backgroundImage: `url(${testImage.src})`
                                    }}
                                ></div>}
                                {isWaitStatus && !errorMsg && <span className="loader"></span>}
                                {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
                            </section>
                            {/* End Art Painting Section */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            <div className="image-before-processing-box">
                                {/* Start Downloaded Image Box */}
                                {imageLink && <div className="downloaded-image-box mx-auto">
                                    <img
                                        src={imageLink}
                                        alt="downloaded image !"
                                        className="downloaded-image"
                                    />
                                    <AiFillCloseCircle
                                        className="close-icon"
                                        onClick={removeImage}
                                    />
                                </div>}
                                {/* End Downloaded Image Box */}
                                {/* Start Select Image Box */}
                                {!imageLink && <div className="select-image-box text-center">
                                    <label
                                        htmlFor="image-file"
                                        className="file-label d-flex align-items-center justify-content-center flex-column"
                                    >
                                        <h6 className="fw-bold">Upload Image</h6>
                                        <BsCloudUpload className="upload-image-icon" />
                                    </label>
                                    <input
                                        type="file"
                                        className="image-file-input"
                                        id="image-file"
                                        onChange={(e) => handleSelectImageFile(e.target.files[0])}
                                    />
                                </div>}
                                {/* End Select Image Box */}
                            </div>
                            <hr className="mb-2 mt-2" />
                            {!isWaitStatus && !errorMsg &&
                                <button className="btn btn-dark w-50 mx-auto d-block" onClick={imageToImage}>Create</button>
                            }
                            {isWaitStatus && <button className="btn btn-dark w-50 mx-auto d-block" disabled>Creating ...</button>}
                            <hr className="mb-2 mt-2" />
                            {/* Start Art Painting Options Section */}
                            <section className="art-painting-options">
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
                                </section>
                                {/* End Displaying Art Painting Options Section */}
                            </section>
                            {/* End Art Painting Options Section */}
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System */}
                </div>
                {/* End Container */}
            </div>
            {/* End Page Content */}
        </div>
        // End Image To Image Page
    )
}

export default ImageToImage;