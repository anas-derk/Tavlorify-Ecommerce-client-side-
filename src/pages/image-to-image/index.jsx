import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import global_data from "../../../public/data/global";
/* Start Import Frame Corner Images */
import blackFrameCornerImage from "../../../public/images/frames/frameCorners/black.png";
import whiteFrameCornerImage from "../../../public/images/frames/frameCorners/white.png";
import woodFrameCornerImage from "../../../public/images/frames/frameCorners/wood.png";
import darkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/dark-wood.png";
/* End Import Frame Corner Images */
/* Start Import Normal Frame Images */
import normalPosterBlackFrameImageHorizontal from "../../../public/images/frames/normalPoster/black/H/600.png";
import normalPosterBlackFrameImageSquare from "../../../public/images/frames/normalPoster/black/S/600q.png";
import normalPosterBlackFrameImageVertical from "../../../public/images/frames/normalPoster/black/V/600v.png";
import normalPosterWhiteFrameImageHorizontal from "../../../public/images/frames/normalPoster/white/H/600.png";
import normalPosterWhiteFrameImageSquare from "../../../public/images/frames/normalPoster/white/S/600q.png";
import normalPosterWhiteFrameImageVertical from "../../../public/images/frames/normalPoster/white/V/600v.png";
import normalPosterWoodFrameImageHorizontal from "../../../public/images/frames/normalPoster/wood/H/600.png";
import normalPosterWoodFrameImageSquare from "../../../public/images/frames/normalPoster/wood/S/600q.png";
import normalPosterWoodFrameImageVertical from "../../../public/images/frames/normalPoster/wood/V/600v.png";
import normalPosterDarkWoodFrameImageHorizontal from "../../../public/images/frames/normalPoster/darkWood/H/600.png";
import normalPosterDarkWoodFrameImageSquare from "../../../public/images/frames/normalPoster/darkWood/S/600q.png";
import normalPosterDarkWoodFrameImageVertical from "../../../public/images/frames/normalPoster/darkWood/V/600v.png";
/* End Import normalPoster Frame Images */
/* Start Import Frame With Hangers Images */
import posterWithHangersBlackFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/black/H/600.png";
import posterWithHangersBlackFrameImageSquare from "../../../public/images/frames/posterWithHangers/black/S//600.png";
import posterWithHangersBlackFrameImageVertical from "../../../public/images/frames/posterWithHangers/black/V/600.png";
import posterWithHangersWhiteFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/white/H/600.png";
import posterWithHangersWhiteFrameImageSquare from "../../../public/images/frames/posterWithHangers/white/S/600.png";
import posterWithHangersWhiteFrameImageVertical from "../../../public/images/frames/posterWithHangers/white/V/600.png";
import posterWithHangersWoodFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/wood/H/600.png";
import posterWithHangersWoodFrameImageSquare from "../../../public/images/frames/posterWithHangers/wood/S/600.png";
import posterWithHangersWoodFrameImageVertical from "../../../public/images/frames/posterWithHangers/wood/V/600.png";
import posterWithHangersDarkWoodFrameImageHorizontal from "../../../public/images/frames/posterWithHangers/darkWood/H/600.png";
import posterWithHangersDarkWoodFrameImageSquare from "../../../public/images/frames/posterWithHangers/darkWood/S/600.png";
import posterWithHangersDarkWoodFrameImageVertical from "../../../public/images/frames/posterWithHangers/darkWood/V/600.png";
/* End Import Frame With Hangers Images */
import { BsCloudUpload } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import globalData from "../../../public/data/global";

const ImageToImage = ({ printsName }) => {

    const [paintingURL, setPaintingURL] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [imageType, setImageType] = useState("vertical");

    const [paintingType, setPaintingType] = useState(printsName);

    const [paintingWidth, setPaintingWidth] = useState(null);

    const [paintingHeight, setPaintingHeight] = useState(null);

    const [isExistWhiteBorderWithPoster, setIsExistWhiteBorderWithPoster] = useState("without-border");

    const [frameColor, setFrameColor] = useState("natural-wood");

    const [dimentionsInCm, setDimentionsInCm] = useState(printsName === "poster" ? "21x29,7" : "30x40");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [imageFile, setImageFile] = useState({});

    const [imageLink, setImageLink] = useState("");

    const [orientationNumber, setOrientationNumber] = useState("");

    const frameImages = {
        "poster": {
            "square": {
                "natural-wood": {
                    "30x30": normalPosterWoodFrameImageSquare.src,
                    "50x50": normalPosterWoodFrameImageSquare.src,
                    "70x70": normalPosterWoodFrameImageSquare.src,
                },
                "black": {
                    "30x30": normalPosterBlackFrameImageSquare.src,
                    "50x50": normalPosterBlackFrameImageSquare.src,
                    "70x70": normalPosterBlackFrameImageSquare.src,
                },
                "white": {
                    "30x30": normalPosterWhiteFrameImageSquare.src,
                    "50x50": normalPosterWhiteFrameImageSquare.src,
                    "70x70": normalPosterWhiteFrameImageSquare.src,
                },
                "dark-wood": {
                    "30x30": normalPosterDarkWoodFrameImageSquare.src,
                    "50x50": normalPosterDarkWoodFrameImageSquare.src,
                    "70x70": normalPosterDarkWoodFrameImageSquare.src,
                },
            },
            "vertical": {
                "natural-wood": {
                    "21x29,7": normalPosterWoodFrameImageVertical.src,
                    "30x40": normalPosterWoodFrameImageVertical.src,
                    "50x70": normalPosterWoodFrameImageVertical.src,
                    "70x100": normalPosterWoodFrameImageVertical.src,
                },
                "black": {
                    "21x29,7": normalPosterBlackFrameImageVertical.src,
                    "30x40": normalPosterBlackFrameImageVertical.src,
                    "50x70": normalPosterBlackFrameImageVertical.src,
                    "70x100": normalPosterBlackFrameImageVertical.src,
                },
                "white": {
                    "21x29,7": normalPosterWhiteFrameImageVertical.src,
                    "30x40": normalPosterWhiteFrameImageVertical.src,
                    "50x70": normalPosterWhiteFrameImageVertical.src,
                    "70x100": normalPosterWhiteFrameImageVertical.src,
                },
                "dark-wood": {
                    "21x29,7": normalPosterDarkWoodFrameImageVertical.src,
                    "30x40": normalPosterDarkWoodFrameImageVertical.src,
                    "50x70": normalPosterDarkWoodFrameImageVertical.src,
                    "70x100": normalPosterDarkWoodFrameImageVertical.src,
                },
            },
            "horizontal": {
                "natural-wood": {
                    "29,7x21": normalPosterWoodFrameImageHorizontal.src,
                    "40x30": normalPosterWoodFrameImageHorizontal.src,
                    "70x50": normalPosterWoodFrameImageHorizontal.src,
                    "100x70": normalPosterWoodFrameImageHorizontal.src,
                },
                "black": {
                    "29,7x21": normalPosterBlackFrameImageHorizontal.src,
                    "40x30": normalPosterBlackFrameImageHorizontal.src,
                    "70x50": normalPosterBlackFrameImageHorizontal.src,
                    "100x70": normalPosterBlackFrameImageHorizontal.src,
                },
                "white": {
                    "29,7x21": normalPosterWhiteFrameImageHorizontal.src,
                    "40x30": normalPosterWhiteFrameImageHorizontal.src,
                    "70x50": normalPosterWhiteFrameImageHorizontal.src,
                    "100x70": normalPosterWhiteFrameImageHorizontal.src,
                },
                "dark-wood": {
                    "29,7x21": normalPosterDarkWoodFrameImageHorizontal.src,
                    "40x30": normalPosterDarkWoodFrameImageHorizontal.src,
                    "70x50": normalPosterDarkWoodFrameImageHorizontal.src,
                    "100x70": normalPosterDarkWoodFrameImageHorizontal.src,
                },
            }
        },
        "poster-with-hangers": {
            "square": {
                "natural-wood": {
                    "30x30": posterWithHangersWoodFrameImageSquare.src,
                    "50x50": posterWithHangersWoodFrameImageSquare.src,
                    "70x70": posterWithHangersWoodFrameImageSquare.src,
                },
                "black": {
                    "30x30": posterWithHangersBlackFrameImageSquare.src,
                    "50x50": posterWithHangersBlackFrameImageSquare.src,
                    "70x70": posterWithHangersBlackFrameImageSquare.src,
                },
                "white": {
                    "30x30": posterWithHangersWhiteFrameImageSquare.src,
                    "50x50": posterWithHangersWhiteFrameImageSquare.src,
                    "70x70": posterWithHangersWhiteFrameImageSquare.src,
                },
                "dark-wood": {
                    "30x30": posterWithHangersDarkWoodFrameImageSquare.src,
                    "50x50": posterWithHangersDarkWoodFrameImageSquare.src,
                    "70x70": posterWithHangersDarkWoodFrameImageSquare.src,
                },
            },
            "vertical": {
                "natural-wood": {
                    "21x29,7": posterWithHangersWoodFrameImageVertical.src,
                    "30x40": posterWithHangersWoodFrameImageVertical.src,
                    "50x70": posterWithHangersWoodFrameImageVertical.src,
                    "70x100": posterWithHangersWoodFrameImageVertical.src,
                },
                "black": {
                    "21x29,7": posterWithHangersBlackFrameImageVertical.src,
                    "30x40": posterWithHangersBlackFrameImageVertical.src,
                    "50x70": posterWithHangersBlackFrameImageVertical.src,
                    "70x100": posterWithHangersBlackFrameImageVertical.src,
                },
                "white": {
                    "21x29,7": posterWithHangersWhiteFrameImageVertical.src,
                    "30x40": posterWithHangersWhiteFrameImageVertical.src,
                    "50x70": posterWithHangersWhiteFrameImageVertical.src,
                    "70x100": posterWithHangersWhiteFrameImageVertical.src,
                },
                "dark-wood": {
                    "21x29,7": posterWithHangersDarkWoodFrameImageVertical.src,
                    "30x40": posterWithHangersDarkWoodFrameImageVertical.src,
                    "50x70": posterWithHangersDarkWoodFrameImageVertical.src,
                    "70x100": posterWithHangersDarkWoodFrameImageVertical.src,
                },
            },
            "horizontal": {
                "natural-wood": {
                    "29,7x21": posterWithHangersWoodFrameImageHorizontal.src,
                    "40x30": posterWithHangersWoodFrameImageHorizontal.src,
                    "70x50": posterWithHangersWoodFrameImageHorizontal.src,
                    "100x70": posterWithHangersWoodFrameImageHorizontal.src,
                },
                "black": {
                    "29,7x21": posterWithHangersBlackFrameImageHorizontal.src,
                    "40x30": posterWithHangersBlackFrameImageHorizontal.src,
                    "70x50": posterWithHangersBlackFrameImageHorizontal.src,
                    "100x70": posterWithHangersBlackFrameImageHorizontal.src,
                },
                "white": {
                    "29,7x21": posterWithHangersWhiteFrameImageHorizontal.src,
                    "40x30": posterWithHangersWhiteFrameImageHorizontal.src,
                    "70x50": posterWithHangersWhiteFrameImageHorizontal.src,
                    "100x70": posterWithHangersWhiteFrameImageHorizontal.src,
                },
                "dark-wood": {
                    "29,7x21": posterWithHangersDarkWoodFrameImageHorizontal.src,
                    "40x30": posterWithHangersDarkWoodFrameImageHorizontal.src,
                    "70x50": posterWithHangersDarkWoodFrameImageHorizontal.src,
                    "100x70": posterWithHangersDarkWoodFrameImageHorizontal.src,
                },
            }
        },
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
                            setModelName(categoryStylesTemp[0].modelName);
                            if (printsName === "poster" || printsName === "poster-with-hangers") {
                                setPaintingURL(`${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForPosterInImageToImage.png`);
                                let image = new Image();
                                image.src = `${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForPosterInImageToImage.png`;
                                image.onload = function () {
                                    setPaintingWidth(this.width);
                                    setPaintingHeight(this.height);
                                }
                            } else if (printsName === "canvas") {
                                setPaintingURL(`${process.env.BASE_API_URL}/assets/images/generatedImages/previewImageForPosterInImageToImage.png`);
                            }
                        })
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectImageFile = (file) => {
        let imageToImageData = new FormData();
        imageToImageData.append("imageFile", file);
        Axios.post(`${process.env.BASE_API_URL}/image-to-image/upload-image-and-processing`, imageToImageData)
            .then((res) => {
                setImageLink(res.data.imageLink);
                setOrientationNumber(res.data.orientationNumber);
            }).catch((err) => {
                console.log(err);
            });

    }

    const removeImage = () => {
        setImageLink("");
        setImageFile({});
    }

    const handleSelectCategory = (index) => {
        setCategorySelectedIndex(index);
        Axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[index].name}`)
            .then((res) => {
                setCategoryStyles(res.data);
                setStyleSelectedIndex(0);
                const tempModelName = res.data[0].modelName;
                setModelName(tempModelName);
            })
            .catch((err) => console.log(err));
    }

    const handleSelectStyle = (index) => {
        setStyleSelectedIndex(index);
        let tempModelName = categoryStyles[index].modelName;
        setModelName(tempModelName);
    }

    const handleSelectImageDimentions = (inCm) => {
        setDimentionsInCm(inCm);
    }

    const handleIsExistWhiteBorderWithPoster = (isExistWhiteBorderWithPoster) => {
        setIsExistWhiteBorderWithPoster(isExistWhiteBorderWithPoster);
    }

    const handleSelectFrame = (paintingType, frameColor) => {
        setPaintingType(paintingType);
        setFrameColor(frameColor);
    }

    const imageToImage = () => {
        setErrorMsg("");
        setPaintingURL("");
        setIsWaitStatus(true);
        Axios.get(`${process.env.BASE_API_URL}/image-to-image/generate-image?imageLink=${imageLink}&prompt=${categoryStyles[styleSelectedIndex].prompt}&n_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&image_resolution=896&preprocessor_resolution=896&modelName=${modelName}&ddim_steps=${categoryStyles[styleSelectedIndex].ddim_steps}&strength=${categoryStyles[styleSelectedIndex].strength}`)
            .then((res) => {
                const result = res.data;
                console.log(result);
                setIsWaitStatus(false);
                if(Array.isArray(result)) {
                    const generatedImage = new Image();
                    generatedImage.src = result[1];
                    generatedImage.onload = function () {
                        const generatedImageWidth = this.width;
                        const generatedImageHeight = this.height;
                        setPaintingWidth(generatedImageWidth);
                        setPaintingHeight(generatedImageHeight);
                        if (generatedImageWidth > generatedImageHeight) {
                            setImageType("horizontal");
                            setDimentionsInCm("70x50");
                            setPaintingURL(result[1]);
                        } else if (generatedImageWidth < generatedImageHeight) {
                            setImageType("vertical");
                            setDimentionsInCm("50x70");
                            setPaintingURL(result[1]);
                        } else {
                            setImageType("square");
                            setDimentionsInCm("30x30");
                            setPaintingURL(result[1]);
                        }
                    }
                } else {
                    setErrorMsg("Sorry, Something Went Wrong !!");
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg("Sorry, Something Went Wrong !!");
            });
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
                    <div className="row align-items-center">
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
                                        src={frameImages[paintingType][imageType][frameColor][dimentionsInCm]}
                                        alt="Image"
                                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                                    />}
                                </div>
                                {!isWaitStatus && !errorMsg && paintingURL && <div
                                    className="generated-image-box"
                                    style={{
                                        position: frameColor === "none" ? "static" : "absolute",
                                        zIndex: "-1",
                                        width: globalData.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width,
                                        height: globalData.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height,
                                        backgroundImage: `url(${paintingURL})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "0 0",
                                        backgroundSize: "cover",
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
                                    <h4 className="fw-bold">Orientation Number: {orientationNumber}</h4>
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
                                            style={paintingType === "poster" || paintingType === "poster-with-hangers" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
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
                                            style={
                                                {
                                                    border: imageType === "vertical" ? "4px solid #000" : "",
                                                    fontWeight: imageType === "vertical" ? "bold" : "",
                                                    textDecoration: (paintingWidth > paintingHeight || paintingWidth === paintingHeight) ? "line-through" : "",
                                                }
                                            }
                                        >
                                            Vertical
                                        </li>
                                        <li
                                            className="p-3"
                                            style={
                                                {
                                                    border: imageType === "horizontal" ? "4px solid #000" : "",
                                                    fontWeight: imageType === "horizontal" ? "bold" : "",
                                                    textDecoration: (paintingWidth < paintingHeight || paintingWidth === paintingHeight) ? "line-through" : "",
                                                }
                                            }
                                        >
                                            Horizontal
                                        </li>
                                        <li
                                            className="p-3"
                                            style={
                                                {
                                                    border: imageType === "square" ? "4px solid #000" : "",
                                                    fontWeight: imageType === "square" ? "bold" : "",
                                                    textDecoration: (paintingWidth < paintingHeight || paintingWidth > paintingHeight) ? "line-through" : "",
                                                }
                                            }
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
                                    {(paintingType === "poster" || paintingType === "poster-with-hangers") && <h5 className="fw-bold">Border</h5>}
                                    {/* Start White Border */}
                                    {(paintingType === "poster" || paintingType === "poster-with-hangers") && <ul className="white-borders-list mb-4 text-center">
                                        <li
                                            onClick={() => handleIsExistWhiteBorderWithPoster("without-border")}
                                            style={isExistWhiteBorderWithPoster === "without-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                        >
                                            none
                                        </li>
                                        <li
                                            onClick={() => handleIsExistWhiteBorderWithPoster("with-border")}
                                            style={isExistWhiteBorderWithPoster === "with-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                        >
                                            With Border
                                        </li>
                                    </ul>}
                                    {/* Start White Border */}
                                    {(paintingType === "poster" || paintingType === "poster-with-hangers") && <h5 className="fw-bold">Frames</h5>}
                                    {/* Start Frames List */}
                                    {(paintingType === "poster" || paintingType === "poster-with-hangers") && <ul className="framed-list mb-4 text-center pb-3">
                                        <li
                                            style={(frameColor === "none" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster", "none")}
                                        >
                                            none
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "black" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster", "black")}
                                        >
                                            <span className="frame-color d-block fw-bold">Black</span>
                                            <img src={blackFrameCornerImage.src} alt="Black Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "white" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster", "white")}
                                        >
                                            <span className="frame-color d-block fw-bold">White</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "natural-wood" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster", "natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Wood</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "dark-wood" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster", "dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Dark Wood</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "black" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "black")}
                                        >
                                            <span className="frame-color d-block fw-bold">Black With Hangers</span>
                                            <img src={blackFrameCornerImage.src} alt="Black Frame With Hangers Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "white" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "white")}
                                        >
                                            <span className="frame-color d-block fw-bold">White With Hangers</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame With Hangers Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "natural-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Wood With Hangers</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame With Hangers Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "dark-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Dark Wood With Hangers</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame With Hangers Image" width="50" />
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
    );
}

export default ImageToImage;

export async function getServerSideProps(context) {
    const printsName = context.query.printsName;
    return {
        props: {
            printsName,
        },
    }
}