import Head from "next/head";
import Header from "@/components/Header";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import global_data from "../../../public/data/global";
/* Start Import Frame Corner Images */
import normalBlackFrameCornerImage from "../../../public/images/frames/frameCorners/normalBlack.jpg";
import normalWhiteFrameCornerImage from "../../../public/images/frames/frameCorners/normalWhite.jpg";
import normalWoodFrameCornerImage from "../../../public/images/frames/frameCorners/normalWood.jpg";
import normalDarkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/normalDarkWood.jpg";
import hangerBlackFrameCornerImage from "../../../public/images/frames/frameCorners/hangerBlack.jpg";
import hangerWhiteFrameCornerImage from "../../../public/images/frames/frameCorners/hangerWhite.jpg";
import hangerWoodFrameCornerImage from "../../../public/images/frames/frameCorners/hangerWood.jpg";
import hangerDarkWoodFrameCornerImage from "../../../public/images/frames/frameCorners/hangerDarkWood.jpg";
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
/* Start Import Frames Without Background Never Images */
import HorizontalframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/H/H.png";
import SquareframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/S/S.png";
import VerticalframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/V/V.png";
/* End Import Frames Without Background Never Images */
import { BsCloudUpload } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { CgArrowsHAlt, CgArrowsVAlt } from "react-icons/cg";
import { v4 as generateUniqueID } from "uuid";
import room1Image from "@/../../public/images/Rooms/room1.jpg";
import room2Image from "@/../../public/images/Rooms/room2.jpg";
import { BiError } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import LoaderPage from "@/components/LoaderPage";
import Carousel from "react-bootstrap/Carousel";
import howToUseImage1 from "../../../public/images/HowToUseExplain/Img2Img/1.jpg";
import howToUseImage2 from "../../../public/images/HowToUseExplain/Img2Img/2.jpg";
import howToUseImage3 from "../../../public/images/HowToUseExplain/Img2Img/3.jpg";
import PaintingDetails from "@/components/PaintingDetails";
import Footer from "@/components/Footer";
import Slider from "react-slick";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import Inspiration from "@/components/Inspiration";

export default function ImageToImage({
    generatedImageId,
    paintingTypeAsQuery,
}) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [windowInnerWidth, setWindowInnerWidth] = useState(149);

    const [generatedImageURL, setGeneratedImageURL] = useState("");

    const [generatedImagePathInMyServer, setGeneratedImagePathInMyServer] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const [modelName, setModelName] = useState("");

    const [productPriceBeforeDiscount, setProductPriceBeforeDiscount] = useState(0);

    const [productPriceAfterDiscount, setProductPriceAfterDiscount] = useState(0);

    const [imageType, setImageType] = useState("vertical");

    const [paintingType, setPaintingType] = useState("poster");

    const [paintingWidth, setPaintingWidth] = useState(null);

    const [paintingHeight, setPaintingHeight] = useState(null);

    const [isExistWhiteBorderWithPoster, setIsExistWhiteBorderWithPoster] = useState("without-border");

    const [frameColor, setFrameColor] = useState("none");

    const [dimentionsInCm, setDimentionsInCm] = useState("50x70");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [imageLink, setImageLink] = useState("");

    const [isWillTheImageBeMoved, setIsWillTheImageBeMoved] = useState(false);

    const [theDirectionOfImageDisplacement, setTheDirectionOfImageDisplacement] = useState("");

    const [backgroundPosition, setBackgroundPosition] = useState({ x: 50, y: 50 });

    const [isDraggable, setIsDraggable] = useState(false);

    const [initialOffsetValue, setInitialOffsetValue] = useState({ x: 0, y: 0 });

    const [isWaitAddToCart, setIsWaitAddToCart] = useState(false);

    const [isSuccessAddToCart, setIsSuccessAddToCart] = useState(false);

    const [errorInAddToCart, setErrorInAddToCart] = useState("");

    const [imageMode, setImageMode] = useState("normal-size-image");

    const frameImages = {
        "poster-with-wooden-frame": {
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
        "full-transparent": {
            "square": {
                "30x30": SquareframeImageWithFullTransparent.src,
                "50x50": SquareframeImageWithFullTransparent.src,
                "70x70": SquareframeImageWithFullTransparent.src,
            },
            "vertical": {
                "21x29,7": VerticalframeImageWithFullTransparent.src,
                "30x40": VerticalframeImageWithFullTransparent.src,
                "50x70": VerticalframeImageWithFullTransparent.src,
                "70x100": VerticalframeImageWithFullTransparent.src,
            },
            "horizontal": {
                "29,7x21": HorizontalframeImageWithFullTransparent.src,
                "40x30": HorizontalframeImageWithFullTransparent.src,
                "70x50": HorizontalframeImageWithFullTransparent.src,
                "100x70": HorizontalframeImageWithFullTransparent.src,
            },
        }
    }

    const [isMouseDownActivate, setIsMouseDownActivate] = useState(false);

    const [generatedImagesData, setGeneratedImagesData] = useState([]);

    const [newTotalProductsCount, setNewTotalProductsCount] = useState(0);

    const [isDragFile, setIsDragFile] = useState(false);

    const [isUplodingFile, setIsUplodingFile] = useState(false);

    const [uploadingProgress, setUploadingProgress] = useState(0);

    const [selectedPreviousGeneratedImageIndex, setSelectedPreviousGeneratedImageIndex] = useState(-1);

    const [isShowMoreGeneratedImages, setIsShowMoreGeneratedImages] = useState(false);

    const [appearedArtPaintingOptionSection, setAppearedArtPaintingOptionSection] = useState("style-options");

    useEffect(() => {
        getAllImage2ImageCategoriesData()
            .then(async (categoriesData) => {
                setCategoriesData(categoriesData);
                const categoryStylesTemp = await getAllImage2ImageCategoryStylesData(categoriesData, 0);
                setCategoryStyles(categoryStylesTemp);
                const tempModelName = categoryStylesTemp[0].modelName;
                setModelName(tempModelName);
                handleSelectGeneratedImageIdAndPaintingType(tempModelName);
                setGeneratedImagesData(JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-image-to-image")));
                setWindowInnerWidth(window.innerWidth);
                window.addEventListener("resize", function () {
                    setWindowInnerWidth(this.innerWidth);
                });
                setIsLoadingPage(false);
            })
            .catch(() => {
                setIsLoadingPage(false);
                setIsErrorMsgOnLoadingThePage(true);
            });
    }, []);

    const getAllImage2ImageCategoriesData = async () => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/image-to-image/categories/all-categories-data`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    const getAllImage2ImageCategoryStylesData = async (categoriesData, categorySelectedIndex) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[categorySelectedIndex].name}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    const handleSelectProduct = async (productData) => {
        try {
            setPaintingType(productData.paintingType);
            setImageType(productData.position);
            setDimentionsInCm(productData.size);
            setIsExistWhiteBorderWithPoster(productData.isExistWhiteBorder);
            setFrameColor(productData.frameColor);
            let image = new Image();
            image.src = `${process.env.BASE_API_URL}/${productData.generatedImageURL}`;
            image.onload = function () {
                const tempPaintingWidth = this.naturalWidth,
                    tempPaintingHeight = this.naturalHeight;
                setPaintingWidth(tempPaintingWidth);
                setPaintingHeight(tempPaintingHeight);
                determine_is_will_the_image_be_moved_and_the_direction_of_displacement(tempPaintingWidth, tempPaintingHeight, productData.position);
            }
            setGeneratedImagePathInMyServer(productData.generatedImageURL);
            setGeneratedImageURL(`${process.env.BASE_API_URL}/${productData.generatedImageURL}`);
            await getProductPrice(productData.paintingType, productData.position, productData.size);
        }
        catch (err) {
            throw Error(err);
        }
    }

    const handleSelectGeneratedImageIdAndPaintingType = async (modelName) => {
        try {
            if (generatedImageId) {
                let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
                if (Array.isArray(allProductsData)) {
                    if (allProductsData.length > 0) {
                        const productData = allProductsData.find((productData) => productData._id === generatedImageId && productData.service === "image-to-image");
                        if (productData) {
                            await handleSelectProduct({
                                modelName: modelName,
                                ...productData,
                            });
                        } else {
                            await handleSelectProduct({
                                modelName: modelName,
                                paintingType: "poster",
                                position: "vertical",
                                size: "50x70",
                                isExistWhiteBorder: "without-border",
                                frameColor: "none",
                                generatedImageURL: "assets/images/generatedImages/previewImageForPosterInImageToImage.png",
                            });
                        }
                    }
                } else {
                    await handleSelectProduct({
                        modelName: modelName,
                        paintingType: paintingTypeAsQuery,
                        position: "vertical",
                        size: "50x70",
                        isExistWhiteBorder: "without-border",
                        frameColor: "none",
                        generatedImageURL: paintingTypeAsQuery === "poster" ? "assets/images/generatedImages/previewImageForPosterInImageToImage.png" : "assets/images/generatedImages/previewImageForPosterInImageToImage.png",
                    });
                }
            } else {
                await handleSelectProduct({
                    modelName: modelName,
                    paintingType: paintingTypeAsQuery,
                    position: "vertical",
                    size: "50x70",
                    isExistWhiteBorder: "without-border",
                    frameColor: "none",
                    generatedImageURL: paintingTypeAsQuery === "poster" ? "assets/images/generatedImages/previewImageForPosterInImageToImage.png" : "assets/images/generatedImages/previewImageForPosterInImageToImage.png",
                });
            }
        }
        catch (err) {
            throw Error(err);
        }
    }

    const handleSelectImageFile = async (file) => {
        try {
            let imageToImageData = new FormData();
            imageToImageData.append("imageFile", file);
            setIsUplodingFile(true);
            const res = await axios.post(`${process.env.BASE_API_URL}/image-to-image/upload-image-and-processing`, imageToImageData, {
                onUploadProgress: (progressEvent) => {
                    setUploadingProgress(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2));
                }
            });
            setImageLink(`${process.env.BASE_API_URL}/${await res.data}`);
            setIsUplodingFile(false);
        }
        catch (err) {
            setErrorMsg("Sorry, Something Went Wrong, Please Repeate This Process !!");
            setIsUplodingFile(false);
            let errorMsgTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorMsgTimeout);
            }, 3000);
        }
    }

    const removeImage = () => {
        setImageLink("");
    }

    const handleSelectCategory = async (index) => {
        if (!isWaitStatus) {
            try {
                setCategorySelectedIndex(index);
                const res = await axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[index].name}`);
                const result = await res.data;
                setCategoryStyles(result);
                setStyleSelectedIndex(0);
                const tempModelName = result[0].modelName;
                setModelName(tempModelName);
            }
            catch (err) {
                throw Error(err);
            }
        }
    }

    const handleSelectStyle = (index) => {
        if (!isWaitStatus) {
            setStyleSelectedIndex(index);
            let tempModelName = categoryStyles[index].modelName;
            setModelName(tempModelName);
        }
    }

    const handleSelectImageType = async (imgType) => {
        if (!isWaitStatus) {
            setImageType(imgType);
            switch (imgType) {
                case "vertical": {
                    const tempDimentionsInCm = "50x70";
                    setDimentionsInCm(tempDimentionsInCm);
                    await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                    return tempDimentionsInCm;
                }
                case "horizontal": {
                    const tempDimentionsInCm = "70x50";
                    setDimentionsInCm(tempDimentionsInCm);
                    await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                    return tempDimentionsInCm;
                }
                case "square": {
                    const tempDimentionsInCm = "30x30";
                    setDimentionsInCm(tempDimentionsInCm);
                    await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                    return tempDimentionsInCm;
                }
                default: {
                    throw Error("Error In Select Painting Type !!");
                }
            }
        }
    }

    const handleSelectPaintingType = async (paintingType) => {
        try {
            if (!isWaitStatus) {
                if (paintingType === "canvas") {
                    setIsExistWhiteBorderWithPoster("without-border");
                    setFrameColor("none");
                    switch (imageType) {
                        case "vertical": {
                            const tempDimentionsInCm = "50x70";
                            setDimentionsInCm(tempDimentionsInCm);
                            await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                            break;
                        }
                        case "horizontal": {
                            const tempDimentionsInCm = "70x50";
                            setDimentionsInCm(tempDimentionsInCm);
                            await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                            break;
                        }
                        case "square": {
                            const tempDimentionsInCm = "30x30";
                            setDimentionsInCm(tempDimentionsInCm);
                            await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                            break;
                        }
                        default: {
                            console.log("Error In Select Painting Type !!");
                        }
                    }
                }
                else if (paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") {
                    await getProductPrice(paintingType, imageType, dimentionsInCm);
                }
                setPaintingType(paintingType);
            }
        }
        catch (err) {
            throw Error(err);
        }
    }

    const handleSelectImageDimentions = async (inCm) => {
        try {
            if (!isWaitStatus) {
                setDimentionsInCm(inCm);
                await getProductPrice(paintingType, imageType, inCm);
            }
        }
        catch (err) {
            throw Error(err);
        }
    }

    const handleIsExistWhiteBorderWithPoster = (isExistWhiteBorderWithPoster) => {
        if (!isWaitStatus) {
            setIsExistWhiteBorderWithPoster(isExistWhiteBorderWithPoster);
        }
    }

    const handleSelectFrame = async (paintingType, frameColor) => {
        try {
            if (!isWaitStatus) {
                setPaintingType(paintingType);
                setFrameColor(frameColor);
                await getProductPrice(paintingType, imageType, dimentionsInCm);
            }
        }
        catch (err) {
            throw Error(err);
        }
    }

    const determine_is_will_the_image_be_moved_and_the_direction_of_displacement = (generatedImageWidth, generatedImageHeight, imageType) => {
        switch (imageType) {
            case "vertical": {
                if ((generatedImageHeight / generatedImageWidth).toFixed(2) != 1.4) {
                    setIsWillTheImageBeMoved(true);
                    setTheDirectionOfImageDisplacement("vertical");
                }
                break;
            }
            case "horizontal": {
                if ((generatedImageWidth / generatedImageHeight).toFixed(2) != 1.4) {
                    setIsWillTheImageBeMoved(true);
                    setTheDirectionOfImageDisplacement("horizontal");
                }
                break;
            }
            case "square": {
                setTheDirectionOfImageDisplacement("square");
                break;
            }
            default: {
                throw Error("Error In Image Type !!");
            }
        }
    }

    const determine_image_orientation = (width, height) => {
        if (width < height) return "vertical";
        else if (width > height) return "horizontal";
        return "square";
    }

    const imageToImageGenerateByAI = async () => {
        try {
            setPaintingWidth(null);
            setPaintingHeight(null);
            setIsWillTheImageBeMoved(false);
            setTheDirectionOfImageDisplacement("");
            setBackgroundPosition({ x: 50, y: 50 });
            setInitialOffsetValue({ x: 0, y: 0 });
            setIsMouseDownActivate(false);
            setIsWaitStatus(true);
            const res = await axios.get(`${process.env.BASE_API_URL}/image-to-image/generate-image?imageLink=${imageLink}&prompt=${categoryStyles[styleSelectedIndex].prompt}&n_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&image_resolution=896&preprocessor_resolution=896&modelName=${modelName}&ddim_steps=${categoryStyles[styleSelectedIndex].ddim_steps}&strength=${categoryStyles[styleSelectedIndex].strength}&service=image-to-image&categoryName=${categoriesData[categorySelectedIndex].name}&styleName=${categoryStyles[styleSelectedIndex].name}&paintingType=${paintingType}&isExistWhiteBorder=${isExistWhiteBorderWithPoster}&frameColor=${frameColor}`);
            const result = await res.data;
            const imageURL = `${process.env.BASE_API_URL}/${result}`;
            let image = new Image();
            image.src = imageURL;
            image.onload = async function () {
                const naturalWidthTemp = this.naturalWidth;
                const naturalHeightTemp = this.naturalHeight;
                setPaintingWidth(naturalWidthTemp);
                setPaintingHeight(naturalHeightTemp);
                const imageOrientation = determine_image_orientation(naturalWidthTemp, naturalHeightTemp);
                determine_is_will_the_image_be_moved_and_the_direction_of_displacement(naturalWidthTemp, naturalHeightTemp, imageOrientation);
                const tempDimentionsInCm = await handleSelectImageType(imageOrientation);
                setGeneratedImageURL(imageURL);
                setIsWaitStatus(false);
                setGeneratedImagePathInMyServer(result);
                saveNewGeneratedImageDataInLocalStorage({
                    service: "image-to-image",
                    uploadedImageURL: imageLink,
                    categoryName: categoriesData[categorySelectedIndex].name,
                    styleName: categoryStyles[styleSelectedIndex].name,
                    paintingType: paintingType,
                    position: imageOrientation,
                    size: tempDimentionsInCm,
                    isExistWhiteBorder: isExistWhiteBorderWithPoster,
                    width: naturalWidthTemp,
                    height: naturalHeightTemp,
                    frameColor: frameColor,
                    generatedImageURL: result,
                    _id: generateUniqueID(),
                });
            }
        }
        catch (err) {
            console.log(err);
            setIsWaitStatus(false);
            setErrorMsg("Sorry, Something Went Wrong, Please Repeate This Process !!");
            let errorMsgTimeout = setTimeout(() => {
                setErrorMsg("");
                clearTimeout(errorMsgTimeout);
            }, 3000);
        }
    }

    const saveNewGeneratedImageDataInLocalStorage = (generatedImageData) => {
        let tavlorifyStoreUserGeneratedImagesDataForTextToImage = JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-image-to-image"));
        if (tavlorifyStoreUserGeneratedImagesDataForTextToImage) {
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.unshift(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-image-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        } else {
            let tavlorifyStoreUserGeneratedImagesDataForTextToImage = [];
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.unshift(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-image-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        }
    }

    const displayPreviousGeneratedImageInsideArtPainting = async (generatedImageData, selectedImageIndex) => {
        try {
            setIsWillTheImageBeMoved(false);
            setTheDirectionOfImageDisplacement("");
            setBackgroundPosition({ x: 50, y: 50 });
            setInitialOffsetValue({ x: 0, y: 0 });
            setIsMouseDownActivate(false);
            const tempPaintingType = generatedImageData.paintingType;
            setPaintingType(tempPaintingType);
            const tempPosition = generatedImageData.position;
            setImageType(tempPosition);
            const tempImageSize = generatedImageData.size;
            setDimentionsInCm(tempImageSize);
            const generatedImageWidth = generatedImageData.width,
                generatedImageHeight = generatedImageData.height;
            setPaintingWidth(generatedImageData.width);
            setPaintingHeight(generatedImageData.height);
            setIsExistWhiteBorderWithPoster(generatedImageData.isExistWhiteBorder);
            setFrameColor(generatedImageData.frameColor);
            determine_is_will_the_image_be_moved_and_the_direction_of_displacement(generatedImageWidth, generatedImageHeight, tempPosition);
            setGeneratedImageURL(`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`);
            setImageLink(generatedImageData.uploadedImageURL);
            setGeneratedImagePathInMyServer(generatedImageData.generatedImageURL);
            await getProductPrice(tempPaintingType, tempPosition, tempImageSize);
            setSelectedPreviousGeneratedImageIndex(selectedImageIndex);
        }
        catch (err) {
            throw Error(err);
        }
    }

    const handleMouseDown = (e) => {
        if (theDirectionOfImageDisplacement === "vertical") {
            setInitialOffsetValue({ ...initialOffsetValue, y: e.nativeEvent.offsetY });
        } else if (theDirectionOfImageDisplacement === "horizontal") {
            setInitialOffsetValue({ ...initialOffsetValue, x: e.nativeEvent.offsetX });
        }
        setIsDraggable(true);
        setIsMouseDownActivate(true);
    }

    const handleMouseUp = (e) => {
        if (theDirectionOfImageDisplacement === "vertical") {
            setInitialOffsetValue({ ...initialOffsetValue, y: e.nativeEvent.offsetY });
        } else if (theDirectionOfImageDisplacement === "horizontal") {
            setInitialOffsetValue({ ...initialOffsetValue, x: e.nativeEvent.offsetX });
        }
        setIsDraggable(false);
    }

    const handleMouseMove = (e) => {
        if (!isDraggable) return;
        if (theDirectionOfImageDisplacement === "vertical") {
            const newOffestY = e.nativeEvent.offsetY;
            const amountOfDisplacement = ((newOffestY - initialOffsetValue.y) / initialOffsetValue.y) * 100;
            if (amountOfDisplacement < 0) {
                setBackgroundPosition({ ...initialOffsetValue, y: backgroundPosition.y - amountOfDisplacement > 100 ? 100 : backgroundPosition.y - amountOfDisplacement });
            }
            if (amountOfDisplacement > 0) {
                setBackgroundPosition({ ...initialOffsetValue, y: backgroundPosition.y - amountOfDisplacement < 0 ? 0 : backgroundPosition.y - amountOfDisplacement });
            }
        } else if (theDirectionOfImageDisplacement === "horizontal") {
            const newOffestX = e.nativeEvent.offsetX;
            const amountOfDisplacement = ((newOffestX - initialOffsetValue.x) / initialOffsetValue.x) * 100;
            if (amountOfDisplacement < 0) {
                setBackgroundPosition({ ...initialOffsetValue, x: backgroundPosition.x - amountOfDisplacement > 100 ? 100 : backgroundPosition.x - amountOfDisplacement });
            }
            if (amountOfDisplacement > 0) {
                setBackgroundPosition({ ...initialOffsetValue, x: backgroundPosition.x - amountOfDisplacement < 0 ? 0 : backgroundPosition.x - amountOfDisplacement });
            }
        }
    }

    const handleTouchStart = (e) => {
        document.body.style.overflow = "hidden";
        if (theDirectionOfImageDisplacement === "vertical") {
            setInitialOffsetValue({ ...initialOffsetValue, y: e.touches[0].clientY });
        } else if (theDirectionOfImageDisplacement === "horizontal") {
            setInitialOffsetValue({ ...initialOffsetValue, x: e.touches[0].clientX });
        }
        setIsDraggable(true);
    }

    const handleTouchMove = (e) => {
        if (theDirectionOfImageDisplacement === "vertical") {
            const newPointPositionY = e.targetTouches[0].clientY;
            const amountOfDisplacement = ((newPointPositionY - initialOffsetValue.y) / initialOffsetValue.y) * 100;
            if (amountOfDisplacement < 0) {
                setBackgroundPosition({ ...initialOffsetValue, y: backgroundPosition.y - amountOfDisplacement > 100 ? 100 : backgroundPosition.y - amountOfDisplacement });
            }
            if (amountOfDisplacement > 0) {
                setBackgroundPosition({ ...initialOffsetValue, y: backgroundPosition.y - amountOfDisplacement < 0 ? 0 : backgroundPosition.y - amountOfDisplacement });
            }
        } else if (theDirectionOfImageDisplacement === "horizontal") {
            const newPointPositionX = e.targetTouches[0].clientX;
            const amountOfDisplacement = ((newPointPositionX - initialOffsetValue.x) / initialOffsetValue.x) * 100;
            if (amountOfDisplacement < 0) {
                setBackgroundPosition({ ...initialOffsetValue, x: backgroundPosition.x - amountOfDisplacement > 100 ? 100 : backgroundPosition.x - amountOfDisplacement });
            }
            if (amountOfDisplacement > 0) {
                setBackgroundPosition({ ...initialOffsetValue, x: backgroundPosition.x - amountOfDisplacement < 0 ? 0 : backgroundPosition.x - amountOfDisplacement });
            }
        }
    }

    const handleTouchEnd = () => {
        document.body.style.overflow = "auto";
    }

    const addToCart = async () => {
        setIsWaitAddToCart(true);
        let theRatioBetweenTheHeightAndTheWidth;
        let newWidth;
        let newHeight;
        let left;
        let top;
        let width;
        let height;
        if (isWillTheImageBeMoved) {
            switch (theDirectionOfImageDisplacement) {
                case "vertical": {
                    theRatioBetweenTheHeightAndTheWidth = paintingHeight / paintingWidth;
                    newWidth = 417;
                    newHeight = theRatioBetweenTheHeightAndTheWidth * newWidth;
                    left = 0;
                    top = Math.floor((newHeight - 1.4 * newWidth) * (backgroundPosition.y / 100));
                    width = newWidth;
                    height = top + 585 > newHeight ? Math.floor(newHeight) - top : 585;
                    break;
                }
                case "horizontal": {
                    theRatioBetweenTheHeightAndTheWidth = paintingWidth / paintingHeight;
                    newHeight = 417;
                    newWidth = theRatioBetweenTheHeightAndTheWidth * newHeight;
                    left = Math.floor((newWidth - 1.4 * newHeight) * (backgroundPosition.x / 100));
                    top = 0;
                    width = left + 585 > newWidth ? Math.floor(newWidth) - left : 585;
                    height = newHeight;
                    break;
                }
                default: {
                    return "Error In Image Type !!";
                }
            }
            try {
                const res = await axios.post(`${process.env.BASE_API_URL}/generated-images/crop-image`, {
                    imagePath: generatedImagePathInMyServer,
                    left: left,
                    top: top,
                    width: width,
                    height: height,
                });
                const result = await res.data;
                const productInfoToCart = {
                    _id: generateUniqueID(),
                    paintingType: paintingType,
                    isExistWhiteBorder: isExistWhiteBorderWithPoster,
                    frameColor: frameColor,
                    position: imageType,
                    size: dimentionsInCm,
                    priceBeforeDiscount: productPriceBeforeDiscount,
                    priceAfterDiscount: productPriceAfterDiscount,
                    generatedImageURL: result,
                    quantity: 1,
                    service: "image-to-image",
                }
                let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
                if (allProductsData) {
                    allProductsData.push(productInfoToCart);
                    localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
                    setIsWaitAddToCart(false);
                    setIsSuccessAddToCart(true);
                    let successAddToCartTimeout = setTimeout(() => {
                        setIsSuccessAddToCart(false);
                        clearTimeout(successAddToCartTimeout);
                    }, 1500);
                    setNewTotalProductsCount(allProductsData.length);
                } else {
                    let allProductsData = [];
                    allProductsData.push(productInfoToCart);
                    localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
                    setIsWaitAddToCart(false);
                    setIsSuccessAddToCart(true);
                    let successAddToCartTimeout = setTimeout(() => {
                        setIsSuccessAddToCart(false);
                        setNewTotalProductsCount(allProductsData.length);
                        clearTimeout(successAddToCartTimeout);
                    }, 1500);
                }
            }
            catch (err) {
                setIsWaitAddToCart(false);
                setErrorInAddToCart("Sorry, Something Went Wrong !!");
                let errorInAddToCartTimeout = setTimeout(() => {
                    setErrorInAddToCart("");
                    clearTimeout(errorInAddToCartTimeout);
                }, 2000);
            }
        }
        else {
            const productInfoToCart = {
                _id: generateUniqueID(),
                paintingType: paintingType,
                isExistWhiteBorder: isExistWhiteBorderWithPoster,
                frameColor: frameColor,
                position: imageType,
                size: dimentionsInCm,
                priceBeforeDiscount: productPriceBeforeDiscount,
                priceAfterDiscount: productPriceAfterDiscount,
                generatedImageURL: generatedImagePathInMyServer,
                quantity: 1,
                service: "image-to-image",
            }
            let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
            if (allProductsData) {
                allProductsData.push(productInfoToCart);
                localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
                setIsWaitAddToCart(false);
                setIsSuccessAddToCart(true);
                let successAddToCartTimeout = setTimeout(() => {
                    setIsSuccessAddToCart(false);
                    setNewTotalProductsCount(allProductsData.length);
                    clearTimeout(successAddToCartTimeout);
                }, 1500);
            } else {
                let allProductsData = [];
                allProductsData.push(productInfoToCart);
                localStorage.setItem("tavlorify-store-user-cart", JSON.stringify(allProductsData));
                setIsWaitAddToCart(false);
                setIsSuccessAddToCart(true);
                let successAddToCartTimeout = setTimeout(() => {
                    setIsSuccessAddToCart(false);
                    setNewTotalProductsCount(allProductsData.length);
                    clearTimeout(successAddToCartTimeout);
                }, 1500);
            }
        }
    }

    const handleDisplayImageMode = (imageMode) => {
        if (imageMode === "minimize-image" && windowInnerWidth >= 991) {
            setImageMode("normal-size-image");
        }
        if (imageMode === "image-inside-room1" && windowInnerWidth >= 991) {
            setImageMode("image-inside-room1");
        }
        if (imageMode === "image-inside-room2" && windowInnerWidth >= 991) {
            setImageMode("image-inside-room2");
        }
    }

    const getImageBeforeProcessingBox = () => {
        return (
            <div className="image-before-processing-box">
                {/* Start Downloaded Image Box */}
                {imageLink && <div className="downloaded-image-box mx-auto">
                    <img
                        src={imageLink}
                        alt="downloaded image !"
                        className="downloaded-image"
                        onDragStart={(e) => e.preventDefault()}
                    />
                    <AiFillCloseCircle
                        className="close-icon"
                        onClick={removeImage}
                    />
                </div>}
                {/* End Downloaded Image Box */}
                {/* Start Select Image Box */}
                {!imageLink &&
                    <div
                        className="select-image-box text-center mb-3"
                        onDragOver={handleDragFileOver}
                        onDragLeave={() => setIsDragFile(false)}
                        onDrop={handleDropFile}
                    >
                        {!isDragFile && !isUplodingFile && <>
                            <label
                                htmlFor="image-file"
                                className="file-label d-flex align-items-center justify-content-center flex-column"
                            >
                                <h6 className="fw-bold">Ladda upp bild</h6>
                                <BsCloudUpload className="upload-image-icon" />
                            </label>
                            <input
                                type="file"
                                className="image-file-input"
                                id="image-file"
                                onChange={(e) => handleSelectImageFile(e.target.files[0])}
                            />
                        </>}
                        {isDragFile && !isUplodingFile && <div className="drop-file-box d-flex flex-column align-items-center justify-content-center">
                            <h5 className="drag-msg fw-bold mb-0">Var god släpp filen här</h5>
                        </div>}
                    </div>}
                {/* End Select Image Box */}
                {isUplodingFile && <div className="uploading-box mb-4 p-3 border border-2 border-secondary">
                    <div className="progress mb-2" style={{ height: "30px" }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${uploadingProgress}%`, height: "30px" }} aria-valuenow={uploadingProgress} aria-valuemin="0" aria-valuemax="100">{uploadingProgress} %</div>
                    </div>
                    <h6 className="m-0 fw-bold">Laddar upp bild nu ...</h6>
                </div>}
                <hr className="mb-2 mt-2" />
            </div>
        );
    }

    const getSuitableWidthAndHeightForPainting = (dimention, imageSize, isRoomImageMinimize, windowInnerWidth) => {
        if (!isRoomImageMinimize) {
            if (imageSize === "minimize-image") {
                if (windowInnerWidth > 320 && windowInnerWidth < 400) return dimention / 5;
                if (windowInnerWidth >= 400 && windowInnerWidth < 650) return dimention / 4.1;
                if (windowInnerWidth >= 550 && windowInnerWidth < 650) return dimention / 2.7;
                if (windowInnerWidth >= 650 && windowInnerWidth < 991) return dimention / 2.3;
                return dimention / 3;
            } else return windowInnerWidth < 767 ? dimention / 1.3 : dimention;
        } else {
            if (windowInnerWidth < 991) {
                if (windowInnerWidth > 320 && windowInnerWidth < 400) return dimention / 5;
                if (windowInnerWidth >= 400 && windowInnerWidth < 500) return dimention / 4.1;
                if (windowInnerWidth >= 550 && windowInnerWidth < 650) return dimention / 2.7;
                if (windowInnerWidth >= 650 && windowInnerWidth < 991) return dimention / 2.3;
                return dimention / 3;
            }
            return dimention / 10;
        }
    }

    const getArtPaintingBox = (width, height, imageSize, isImageInsideRoom, isRoomImageMinimize) => {
        return (
            (imageMode == "normal-size-image" || imageSize === "minimize-image") && <div
                className={`art-painting d-flex justify-content-center align-items-center mb-4 ${imageSize === "minimize-image" ? "minimize-art-painting" : ""}`}
                onClick={() => handleDisplayImageMode(imageSize)}
                style={
                    {
                        backgroundColor: isWaitStatus ? "#989492" : "",
                        cursor: !isWaitStatus && imageSize === "minimize-image" && !isImageInsideRoom ? "pointer" : "",
                        position: !imageSize ? "sticky" : "",
                        top: !imageSize ? "90px" : "",
                    }
                }
            >
                {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <>
                    <div
                        className="frame-image-box"
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            width: getSuitableWidthAndHeightForPainting(global_data.framesDimentions[paintingType][imageType][dimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                            maxHeight: getSuitableWidthAndHeightForPainting(global_data.framesDimentions[paintingType][imageType][dimentionsInCm].height, imageSize, isRoomImageMinimize, windowInnerWidth),
                            cursor: isWillTheImageBeMoved ? "grab" : "",
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && <img
                            src={frameColor !== "none" ? frameImages[paintingType][imageType][frameColor][dimentionsInCm] : frameImages["full-transparent"][imageType][dimentionsInCm]}
                            alt="Image"
                            onDragStart={(e) => e.preventDefault()}
                        />}
                    </div>
                    <div
                        className="image-box d-flex align-items-center justify-content-center"
                        style={{
                            width: getSuitableWidthAndHeightForPainting(global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                            height: getSuitableWidthAndHeightForPainting(global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].height, imageSize, isRoomImageMinimize, windowInnerWidth),
                            backgroundColor: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "#FFF" : "",
                            boxShadow: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "1px 1px 2px #000, -1px -1px 2px #000" : "",
                            maxWidth: "97.5%",
                            maxHeight: "97.5%",
                        }}
                    >
                        {isWillTheImageBeMoved && !isMouseDownActivate && imageSize !== "minimize-image" && !isImageInsideRoom && <div
                            className="displacement-icons-box d-flex align-items-center justify-content-center"
                        >
                            {theDirectionOfImageDisplacement === "horizontal" && <CgArrowsHAlt className="displacement-icon displacement-horizontal" />}
                            {theDirectionOfImageDisplacement === "vertical" && <CgArrowsVAlt className="displacement-icon displacement-vertical" />}
                        </div>}
                        <div
                            className="generated-image-box"
                            style={{
                                width: getSuitableWidthAndHeightForPainting(width, imageSize, isRoomImageMinimize, windowInnerWidth),
                                height: getSuitableWidthAndHeightForPainting(height, imageSize, isRoomImageMinimize, windowInnerWidth),
                                backgroundImage: `url(${generatedImageURL})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
                                backgroundSize: "cover",
                                cursor: isWillTheImageBeMoved ? "grap" : "",
                                maxWidth: isExistWhiteBorderWithPoster === "with-border" ? "89.7%" : "100%",
                                maxHeight: isExistWhiteBorderWithPoster === "with-border" ? "89.7%" : "100%",
                            }}
                        ></div>
                    </div>
                </>}
                {paintingType === "canvas" && !isWaitStatus && !errorMsg && <div
                    className="canvas-box"
                    style={{
                        cursor: isWillTheImageBeMoved ? "grab" : "",
                    }}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="frame-image-box mx-auto"
                        style={{
                            width: getSuitableWidthAndHeightForPainting(global_data.framesDimentions["poster"][imageType][dimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                            maxHeight: getSuitableWidthAndHeightForPainting(global_data.framesDimentions["poster"][imageType][dimentionsInCm].height, imageSize, isRoomImageMinimize, windowInnerWidth),
                            cursor: isWillTheImageBeMoved ? "grab" : "",
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && <img
                            src={frameImages["full-transparent"][imageType][dimentionsInCm]}
                            alt="Image"
                            onDragStart={(e) => e.preventDefault()}
                        />}
                    </div>
                    <div
                        className={`canvas-image-box ${!isImageInsideRoom ? (
                            imageSize !== "minimize-image" ? "canvas-image" : "minimize-canvas-image"
                        ) : ""}`}
                        style={{
                            width: getSuitableWidthAndHeightForPainting(global_data.framesDimentions["poster"][imageType][dimentionsInCm].width, imageSize, isRoomImageMinimize, windowInnerWidth),
                            height: getSuitableWidthAndHeightForPainting(global_data.framesDimentions["poster"][imageType][dimentionsInCm].height, imageSize, isRoomImageMinimize, windowInnerWidth),
                            backgroundImage: `url(${generatedImageURL})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
                            cursor: isWillTheImageBeMoved ? "grap" : "",
                        }}
                    ></div>
                    {isWillTheImageBeMoved && !isMouseDownActivate && imageSize !== "minimize-image" && !isImageInsideRoom && <div
                        className="displacement-icons-box d-flex align-items-center justify-content-center"
                    >
                        {theDirectionOfImageDisplacement === "horizontal" && <CgArrowsHAlt className="displacement-icon displacement-horizontal" />}
                        {theDirectionOfImageDisplacement === "vertical" && <CgArrowsVAlt className="displacement-icon displacement-vertical" />}
                    </div>}
                </div>}
                {isWaitStatus && !errorMsg && <span className="loader"></span>}
                {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
            </div>
        );
    }

    const getImageInsideRoomBox = (roomNumber, imageSize) => {
        return (
            (imageMode === `image-inside-room${roomNumber}` || imageSize === "minimize-room-image" || imageSize === "room-image-to-mobiles-and-tablets") && !isWaitStatus && !errorMsg && generatedImageURL && <div
                className={`room${roomNumber}-image-box room-image-box mx-auto border border-2 border-dark mb-4`}
                onClick={() => handleDisplayImageMode(`image-inside-room${roomNumber}`)}
                style={
                    {
                        backgroundColor: isWaitStatus ? "#989492" : "",
                        cursor: !isWaitStatus && imageSize === "minimize-room-image" ? "pointer" : "",
                    }
                }
            >
                {roomNumber === 1 && <img src={room1Image.src} alt="Room Image1 !!" onDragStart={(e) => e.preventDefault()} />}
                {roomNumber === 2 && <img src={room2Image.src} alt="Room Image2 !!" onDragStart={(e) => e.preventDefault()} />}
                {getArtPaintingBox(
                    global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width,
                    global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height,
                    "minimize-image",
                    true,
                    imageSize === "minimize-room-image" ? true : false,
                )}
            </div>
        );
    }

    const getGeneratedImageGallery = () => {
        return (
            <div className="generated-image-gallery mb-4 border-bottom border-3 pb-3">
                {/* Start Carousel Component From Bootstrap */}
                <Carousel indicators={true}>
                    {/* Start Carousel Item */}
                    <Carousel.Item>
                        {getArtPaintingBox(global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width, global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height, undefined, false)}
                    </Carousel.Item>
                    {/* End Carousel Item */}
                    {/* Start Carousel Item */}
                    <Carousel.Item>
                        {getImageInsideRoomBox(1, "room-image-to-mobiles-and-tablets")}
                    </Carousel.Item>
                    {/* End Carousel Item */}
                    {/* Start Carousel Item */}
                    <Carousel.Item>
                        {getImageInsideRoomBox(2, "room-image-to-mobiles-and-tablets")}
                    </Carousel.Item>
                    {/* End Carousel Item */}
                </Carousel>
                {/* End Carousel Component From Bootstrap */}
            </div>
        )
    }

    const getProductPrice = async (paintingType, position, dimentions) => {
        try {
            const res = await axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-details?productName=${paintingType}&dimentions=${dimentions}&position=${position}`);
            const result = await res.data;
            setProductPriceBeforeDiscount(result.priceBeforeDiscount);
            setProductPriceAfterDiscount(result.priceAfterDiscount);
        }
        catch (err) {
            throw Error(err);
        }
    }

    const handleDragFileOver = (e) => {
        e.preventDefault();
        setIsDragFile(true);
    }

    const handleDropFile = (e) => {
        e.preventDefault();
        setIsDragFile(false);
        handleSelectImageFile(e.dataTransfer.files[0]);
    }

    const getAppearedSlidesCount = (windowInnerWidth, sectionName) => {
        if (sectionName === "generated-images") {
            if (windowInnerWidth < 322) return 1;
            if (windowInnerWidth >= 322 && windowInnerWidth < 360) return 1;
            if (windowInnerWidth > 360 && windowInnerWidth < 500) return 2;
            if (windowInnerWidth >= 500 && windowInnerWidth < 630) return 3;
            if (windowInnerWidth >= 630 && windowInnerWidth < 900) return 4;
            if (windowInnerWidth > 900 && windowInnerWidth < 1000) return 5;
            if (windowInnerWidth > 1000 && windowInnerWidth < 1199) return 6;
            if (windowInnerWidth > 1199) return 7;
        } else if (sectionName === "categories" || sectionName === "styles") {
            if (windowInnerWidth < 322) return 1;
            if (windowInnerWidth >= 322 && windowInnerWidth < 400) return 2;
            if (windowInnerWidth > 400 && windowInnerWidth < 500) return 3;
            if (windowInnerWidth > 500) return 5;
        }
    }

    return (
        // Start Image To Image Page
        <div className="image-to-image-service">
            <Head>
                <title>Tavlorify - förvandla foton till konstverk</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <Header newTotalProductsCount={newTotalProductsCount} />
                {/* Start Overlay */}
                {isShowMoreGeneratedImages && <div className="overlay">
                    <div className="rest-generated-images-box d-flex flex-column align-items-center justify-content-center p-4">
                        <GrFormClose className="close-overlay-icon" onClick={() => setIsShowMoreGeneratedImages(false)} />
                        <h3 className="fw-bold border-bottom border-2 border-dark pb-2 mb-3">Mer genererade bilder</h3>
                        <h6 className="fw-bold mb-5">Vänligen välj bild</h6>
                        <ul className="generated-images-list w-100 p-4">
                            {generatedImagesData.map((generatedImageData, index) => (
                                index > 10 && <Fragment key={generatedImageData._id}>
                                    <li
                                        className={`generated-images-item m-0 ${selectedPreviousGeneratedImageIndex === index ? "selected-image" : ""}`}
                                        onClick={() => displayPreviousGeneratedImageInsideArtPainting(generatedImageData, index)}
                                        style={{
                                            width: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].width / 4}px`,
                                            height: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].height / 4}px`,
                                            backgroundImage: `url(${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL})`,
                                        }}
                                        onDragStart={(e) => e.preventDefault()}
                                    ></li>
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </div>}
                {/* End Overlay */}
                {/* Start Page Content */}
                <div className="page-content pb-4">
                    {/* Start Container */}
                    <div className="container-fluid">
                        <h1 className="text-center mb-5 welcome-msg pb-2">Välkommen till dig i bild-till-bild AI-tjänsten</h1>
                        {/* Start Grid System */}
                        <div className="row">
                            {/* Start Column */}
                            {errorMsg && <div className="col-lg-7">
                                <div className="error-msg-box p-4 text-center">
                                    <BiError className="error-icon mb-3" />
                                    <h5 className="error-msg fw-bold">{errorMsg}</h5>
                                </div>
                            </div>}
                            {/* End Column */}
                            {!errorMsg && <>
                                {!isWaitStatus && windowInnerWidth < 991 && <div className="col-lg-12">
                                    {getImageBeforeProcessingBox()}
                                </div>}
                                {/* Start Column */}
                                {windowInnerWidth >= 991 && <div className="col-lg-2">
                                    <div className="minimize-images">
                                        {/* Start Art Painting Box */}
                                        {getArtPaintingBox(global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width, global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height, "minimize-image", false)}
                                        {/* End Art Painting Box */}
                                        {getImageInsideRoomBox(1, "minimize-room-image")}
                                        {getImageInsideRoomBox(2, "minimize-room-image")}
                                    </div>
                                </div>}
                                {/* End Column */}
                                {/* Start Column */}
                                <div className="col-lg-5">
                                    {/* Start Art Painting Section */}
                                    {windowInnerWidth >= 991 && getArtPaintingBox(global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width, global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height, undefined, false)}
                                    {/* End Art Painting Section */}
                                    {getImageInsideRoomBox(1, undefined)}
                                    {getImageInsideRoomBox(2, undefined)}
                                    {windowInnerWidth < 991 && getGeneratedImageGallery()}
                                </div>
                                {/* End Column */}
                            </>}
                            {/* Start Column */}
                            <div className="col-lg-5">
                                {!errorMsg && !isWaitStatus && windowInnerWidth >= 991 && getImageBeforeProcessingBox()}
                                {/* Start Art Painting Options Section */}
                                <section className="art-painting-options pe-3 mb-4">
                                    <section className="generating-image-options">
                                        {/* Start Categories Section */}
                                        <section className="categories mb-0">
                                            <div
                                                className="section-name-and-control-arrows d-flex justify-content-between align-items-center mb-0"
                                                onClick={() => setAppearedArtPaintingOptionSection(value => value === "category-options" ? "" : "category-options")}
                                            >
                                                <h6 className="m-0 fw-bold option-section-name">Vilken kategori tillhör den ?</h6>
                                                {appearedArtPaintingOptionSection !== "category-options" && <IoIosArrowRoundDown className="arrow-icon" />}
                                                {appearedArtPaintingOptionSection === "category-options" && <IoIosArrowRoundUp className="arrow-icon" />}
                                            </div>
                                            <hr className="mb-3 mt-2" />
                                            {appearedArtPaintingOptionSection === "category-options" && <Slider
                                                slidesToShow={getAppearedSlidesCount(windowInnerWidth, "categories")}
                                                slidesToScroll={1}
                                                arrows={true}
                                                className="mb-2"
                                            >
                                                {/* Start Category Box */}
                                                {categoriesData.map((category, index) => (
                                                    <div
                                                        className="category-box p-2 text-center"
                                                        onClick={() => handleSelectCategory(index)}
                                                        key={index}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${category.imgSrc}`}
                                                            alt={`${category.name} Image`} className="mb-2 category-image d-block mx-auto"
                                                            style={index === categorySelectedIndex ? { border: "4px solid #000" } : {}}
                                                            onDragStart={(e) => e.preventDefault()}
                                                        />
                                                        <p className="category-name m-0 text-center">{category.name}</p>
                                                    </div>
                                                ))}
                                                {/* End Category Box */}
                                            </Slider>}
                                        </section>
                                        {/* End Categories Section */}
                                        <hr className="mb-2 mt-1" />
                                        {/* Start Styles Section */}
                                        <section className="styles mb-3">
                                            <div
                                                className="section-name-and-control-arrows d-flex justify-content-between align-items-center mb-0"
                                                onClick={() => setAppearedArtPaintingOptionSection(value => value === "style-options" ? "" : "style-options")}
                                            >
                                                <h6 className="m-0 fw-bold option-section-name">Vilken stil vill du använda ?</h6>
                                                {appearedArtPaintingOptionSection !== "style-options" && <IoIosArrowRoundDown className="arrow-icon" />}
                                                {appearedArtPaintingOptionSection === "style-options" && <IoIosArrowRoundUp className="arrow-icon" />}
                                            </div>
                                            <hr className="mb-3 mt-2" />
                                            {appearedArtPaintingOptionSection === "style-options" && <Slider
                                                slidesToShow={getAppearedSlidesCount(windowInnerWidth, "styles")}
                                                slidesToScroll={1}
                                                arrows={true}
                                                className="mb-2"
                                            >
                                                {/* Start Style Box */}
                                                {categoryStyles.map((style, index) => (
                                                    <div
                                                        className="style-box p-2 text-center"
                                                        onClick={() => handleSelectStyle(index)}
                                                        key={index}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${style.imgSrc}`}
                                                            alt={`${style.name} Image`} className="mb-2 style-image d-block mx-auto"
                                                            style={index === styleSelectedIndex ? { border: "4px solid #000" } : {}}
                                                            onDragStart={(e) => e.preventDefault()}
                                                        />
                                                        <p className="style-name m-0 text-center">{style.name}</p>
                                                    </div>
                                                ))}
                                                {/* End Style Box */}
                                            </Slider>}
                                        </section>
                                        {/* End Styles Section */}
                                    </section>
                                    {/* Start Displaying Art Painting Options Section */}
                                    <section className="displaying-art-painting-options">
                                        {imageLink && !isWaitStatus && <button className="btn btn-dark w-50 mx-auto d-block managment-create-image-btn mb-3" onClick={imageToImageGenerateByAI}>SKAPA DIN KONST</button>}
                                        {!imageLink && <button className="btn btn-dark w-50 mx-auto d-block managment-create-image-btn mb-3" disabled>SKAPA DIN KONST</button>}
                                        {isWaitStatus && <button className="btn btn-dark w-50 mx-auto d-block managment-create-image-btn mb-3" disabled>skapar ...</button>}
                                        {/* Start Art Names List */}
                                        <ul className="art-names-list d-flex flex-wrap mb-3">
                                            <li
                                                className="p-2 pe-3 ps-3"
                                                onClick={() => handleSelectPaintingType("poster")}
                                                style={paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                            >
                                                POSTERS
                                            </li>
                                            <li
                                                className="p-2 pe-3 ps-3"
                                                onClick={() => handleSelectPaintingType("canvas")}
                                                style={paintingType === "canvas" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                            >
                                                CANVASTAVLOR
                                            </li>
                                        </ul>
                                        {/* End Art Names List */}
                                        <h6 className="fw-bold option-section-name">STORLEK</h6>
                                        {/* Start Sizes List */}
                                        <ul className="sizes-list text-center pb-3 art-painting-options-list">
                                            {global_data.gelatoDimetions[paintingType][imageType].map((dims, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleSelectImageDimentions(dims.inCm)}
                                                >
                                                    <span
                                                        style={dims.inCm === dimentionsInCm ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                    >
                                                        {(dims.inCm === "50x70" || dims.inCm === "70x50" || dims.inCm === "30x30") && <h6 className="fw-bold mb-0 popular-box">Populär</h6>}
                                                        {dims.inCm}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* End Sizes List */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold option-section-name">KANT</h6>}
                                        {/* Start White Border */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="white-borders-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleIsExistWhiteBorderWithPoster("without-border")}
                                            >
                                                <span
                                                    style={isExistWhiteBorderWithPoster === "without-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    Ingen kant
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleIsExistWhiteBorderWithPoster("with-border")}
                                            >
                                                <span
                                                    style={isExistWhiteBorderWithPoster === "with-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    Vit kant
                                                </span>
                                            </li>
                                        </ul>}
                                        {/* Start White Border */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold">RAM</h6>}
                                        {/* Start Frames List */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="frames-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleSelectFrame("poster", "none")}
                                            >
                                                <span
                                                    style={(frameColor === "none" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    UTAN RAM
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "black")}
                                            >
                                                <span
                                                    style={(frameColor === "black" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalBlackFrameCornerImage.src} alt="Black Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM SVART</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "white")}
                                            >
                                                <span
                                                    style={(frameColor === "white" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalWhiteFrameCornerImage.src} alt="White Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM VIT</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "natural-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "natural-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalWoodFrameCornerImage.src} alt="Wood Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM NATURLIG</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "dark-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "dark-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={normalDarkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">TRÄRAM MÖRK</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "black")}
                                            >
                                                <span
                                                    style={(frameColor === "black" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerBlackFrameCornerImage.src} alt="Black Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">POSTERHÄNGARE SVART</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "white")}
                                            >
                                                <span
                                                    style={(frameColor === "white" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerWhiteFrameCornerImage.src} alt="White Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">POSTERHÄNGARE VIT</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "natural-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "natural-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerWoodFrameCornerImage.src} alt="Wood Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold">POSTERHÄNGARE NATURLIGT TRÄ</h6>
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "dark-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "dark-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <img src={hangerDarkWoodFrameCornerImage.src} alt="Dark Wood Frame With Hangers Image" onDragStart={(e) => e.preventDefault()} />
                                                    <h6 className="frame-color d-block fw-bold mb-2">POSTERHÄNGARE MÖRK</h6>
                                                </span>
                                            </li>
                                        </ul>}
                                        {/* End Frames List */}
                                    </section>
                                    {/* End Displaying Art Painting Options Section */}
                                </section>
                                {/* End Art Painting Options Section */}
                                {/* Start Add To Cart Managment */}
                                {!isWaitStatus && !errorMsg && <div className="add-to-cart-box">
                                    {!isWaitAddToCart && !errorInAddToCart && !isSuccessAddToCart && <button
                                        className="btn btn-dark w-100 p-2 add-to-cart-managment-btn mb-3"
                                        onClick={addToCart}
                                    >
                                        <span className="me-2">Lägg i varukorgen |</span>
                                        <span className="me-2">{productPriceAfterDiscount} Kr</span>
                                        {productPriceBeforeDiscount != productPriceAfterDiscount && <span className="text-decoration-line-through me-2">{productPriceBeforeDiscount} </span>}
                                        {productPriceBeforeDiscount != productPriceAfterDiscount && <span>kr</span>}
                                    </button>}
                                    {isWaitAddToCart && <button className="btn btn-dark w-100 p-2 add-to-cart-managment-btn mb-3" disabled>Väntar ...</button>}
                                    {isSuccessAddToCart && <button className="btn btn-success w-100 p-2 add-to-cart-managment-btn mb-3" disabled>Lyckad tillsättning i varukorgen ...</button>}
                                    {errorInAddToCart && <button className="btn btn-danger w-100 p-2 add-to-cart-managment-btn mb-3" disabled>{errorInAddToCart}</button>}
                                    <p className="m-0 fw-bold text-center">3-5 dagars leverans • Alltid fri frakt</p>
                                </div>}
                                {/* End Add To Cart Managment */}
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                        <hr />
                        {/* Start Generated Images Section */}
                        <section className={`row align-items-center generated-images ${generatedImagesData ? "" : "p-4"}`}>
                            <div className="col-lg-2 text-center">
                                <h6 className="m-0 fw-bold d-inline">MIN KONST</h6>
                            </div>
                            <div className="col-md-10">
                                {generatedImagesData && !isWaitStatus ?
                                    <Slider
                                        slidesToShow={getAppearedSlidesCount(windowInnerWidth, "generated-images")}
                                        slidesToScroll={1}
                                        arrows={true}
                                        className="mb-2"
                                    >
                                        {generatedImagesData.map((generatedImageData, index) => (
                                            index < 10 && <Fragment key={generatedImageData._id}>
                                                <div
                                                    className={`generated-images-item mx-auto generated-image ${selectedPreviousGeneratedImageIndex === index ? "selected-image" : ""}`}
                                                    onClick={() => displayPreviousGeneratedImageInsideArtPainting(generatedImageData, index)}
                                                    style={{
                                                        width: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].width / 4}px`,
                                                        height: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].height / 4}px`,
                                                        backgroundImage: `url(https://newapi.tavlorify.se/${generatedImageData.generatedImageURL})`
                                                    }}
                                                    onDragStart={(e) => e.preventDefault()}
                                                ></div>
                                            </Fragment>
                                        ))}
                                        {generatedImagesData.length > 10 && !isShowMoreGeneratedImages && <button className="show-more-generate-images-btn btn btn-dark" onClick={() => setIsShowMoreGeneratedImages(true)}>Visa mer</button>}
                                    </Slider>
                                    : <p className="alert alert-danger m-0 not-find-generated-images-for-you-err">Tyvärr, kan inte hitta några genererade bilder från dig !!</p>}
                            </div>
                        </section>
                        {/* Start Generated Images Section */}
                        {/* Start How To Use Service Section */}
                        <section className="how-to-use-service pt-5 pb-5 text-center">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="explain-image-box mb-4">
                                        <img
                                            src={howToUseImage1.src}
                                            alt="How To Use Image To Image Page ( Image 1 )"
                                            className="explain-image mw-100"
                                        />
                                    </div>
                                    <div className="explain-box">
                                        <h6 className="fw-bold">1. Ladda upp</h6>
                                        <p>Ladda upp en bild från din kamerarulle</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="explain-image-box mb-4">
                                        <img
                                            src={howToUseImage2.src}
                                            alt="How To Use Image To Image Page ( Image 2 )"
                                            className="explain-image mw-100"
                                        />
                                    </div>
                                    <div className="explain-box">
                                        <h6 className="fw-bold">2. Skapa bild</h6>
                                        <p>Välj mellan eleganta filter, ram, text och storlek</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="explain-image-box mb-4">
                                        <img
                                            src={howToUseImage3.src}
                                            alt="How To Use Image To Image Page ( Image 3 )"
                                            className="explain-image mw-100"
                                        />
                                    </div>
                                    <div className="explain-box">
                                        <h6 className="fw-bold">3. Beställning</h6>
                                        <p>Slutför köp och betala, få din affisch inom 3-5 dagar</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* End How To Use Service Section */}
                        {/* Start Painting Details Section */}
                        <PaintingDetails windowInnerWidth={windowInnerWidth} serviceName="image-to-image" />
                        {/* End Painting Details Section */}
                        {/* Start Inspiration */}
                        <Inspiration />
                        {/* End Inspiration */}
                    </div>
                    {/* End Container */}
                </div>
                {/* End Page Content */}
                <Footer />
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
        // End Image To Image Page
    );
}

export async function getServerSideProps(context) {
    if ((!context.query.paintingTypeAsQuery && !context.query.generatedImageId) || (context.query.paintingTypeAsQuery && context.query.paintingTypeAsQuery !== "canvas" && context.query.paintingTypeAsQuery !== "poster")) {
        return {
            redirect: {
                permanent: false,
                destination: "/image-to-image?paintingTypeAsQuery=poster",
            },
            props: {
                paintingTypeAsQuery: "poster",
            },
        }
    } else if (!context.query.paintingTypeAsQuery) {
        return {
            props: {
                paintingTypeAsQuery: "",
                generatedImageId: context.query.generatedImageId,
            },
        }
    } else if (!context.query.generatedImageId) {
        return {
            props: {
                paintingTypeAsQuery: context.query.paintingTypeAsQuery,
                generatedImageId: "",
            },
        }
    }
}