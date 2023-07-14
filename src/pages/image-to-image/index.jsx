import Head from "next/head";
import Header from "@/components/Header";
import testImage from "../../../public/images/test.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import text_to_image_data from "../../../public/data/text_to_image_data";
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

const ImageToImage = () => {

    const [paintingURL, setPaintingURL] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("square");

    const [frameColor, setFrameColor] = useState("natural-wood");

    const [dimentions, setDimentions] = useState({});

    const [dimentionsInCm, setDimentionsInCm] = useState("30x30");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

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
        Axios.get(`${process.env.BASE_API_URL}/text-to-image/categories/all-categories-data`)
            .then((res) => {
                let result = res.data;
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
                            setModelName(tempModelName);
                            const dimsIndex = text_to_image_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
                            setDimentions({
                                width: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                                height: text_to_image_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
                            });
                            setPaintingURL(generatedImage.src);
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }, []);

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
                                    <img
                                        src={testImage.src}
                                        alt="Generated Image"
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    />
                                    {/* {!isWaitStatus && !errorMsg && paintingURL && frameColor !== "none" && <img
                                        src={frameImages[tempImageType][frameColor][tempDimentionsInCm]}
                                        alt="Image"
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    />} */}
                                </div>
                                <div
                                    className="generated-image-box"
                                    style={{
                                        width: modelName !== "kandinsky-2" ? `${text_to_image_data.appearedImageSizes[imageType][dimentionsInCm].width}px` : `${text_to_image_data.kandinskyImageSizes[imageType][dimentionsInCm].width}px`,
                                        height: modelName !== "kandinsky-2" ? `${text_to_image_data.appearedImageSizes[imageType][dimentionsInCm].height}px` : `${text_to_image_data.kandinskyImageSizes[imageType][dimentionsInCm].height}px`,
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
                            {/* Start Downloaded Image Box */}
                            <div className="downloaded-image-box mx-auto">
                                <img
                                    src={testImage.src}
                                    alt="downloaded image !"
                                    className="downloaded-image"
                                />
                            </div>
                            {/* End Downloaded Image Box */}
                            <hr className="mb-2 mt-2"/>
                            {!isWaitStatus && !errorMsg &&
                                <button className="btn btn-dark w-50 mx-auto d-block" onClick={imageToImage}>Create</button>
                            }
                            {isWaitStatus && <button className="btn btn-dark w-50 mx-auto d-block" disabled>Creating ...</button>}
                            <hr className="mb-2 mt-2"/>
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