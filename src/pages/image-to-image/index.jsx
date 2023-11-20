import Head from "next/head";
import Header from "@/components/Header";
import { Fragment, useEffect, useState } from "react";
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
/* Start Import Frames Without Background Never Images */
import HorizontalframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/H/H.png";
import SquareframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/S/S.png";
import VerticalframeImageWithFullTransparent from "../../../public/images/frames/withFullTransparent/V/V.png";
/* End Import Frames Without Background Never Images */
import { BsCloudUpload } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { CgArrowsHAlt, CgArrowsVAlt } from "react-icons/cg";
import validations from "../../../public/global_functions/validations";
import { v4 as generateUniqueID } from "uuid";
import room1Image from "@/../../public/images/Rooms/room1.jpg";
import room2Image from "@/../../public/images/Rooms/room2.jpg";
import { BiError } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import LoaderPage from "@/components/LoaderPage";
import Carousel from 'react-bootstrap/Carousel';
import howToUseImage1 from "../../../public/images/HowToUseExplain/Img2Img/1.jpg";
import howToUseImage2 from "../../../public/images/HowToUseExplain/Img2Img/2.jpg";
import howToUseImage3 from "../../../public/images/HowToUseExplain/Img2Img/3.jpg";
import inspirationImage1 from "../../../public/images/Inspiration/1.jpg";
import inspirationImage2 from "../../../public/images/Inspiration/2.jpg";
import inspirationImage3 from "../../../public/images/Inspiration/3.jpg";
import inspirationImage4 from "../../../public/images/Inspiration/4.jpg";

export default function ImageToImage({
    generatedImageId,
    paintingTypeAsQuery,
}) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

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

    const [quantity, setQuantity] = useState(1);

    const [formValidationErrors, setFormValidationErrors] = useState({});

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

    const [appearedPaintingDetailsList, setAppearedPaintingDetailsList] = useState(["summary"]);

    const getAllImage2ImageCategoriesData = async () => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/image-to-image/categories/all-categories-data`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    const getAllImage2ImageCategoryStylesData = async (categoriesData, categorySelectedIndex) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[categorySelectedIndex].name}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    const handleSelectProduct = async (productData) => {
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

    const handleSelectGeneratedImageIdAndPaintingType = (modelName) => {
        if (generatedImageId) {
            let allProductsData = JSON.parse(localStorage.getItem("tavlorify-store-user-cart"));
            if (Array.isArray(allProductsData)) {
                if (allProductsData.length > 0) {
                    const productData = allProductsData.find((productData) => productData._id === generatedImageId && productData.service === "image-to-image");
                    if (productData) {
                        handleSelectProduct({
                            modelName: modelName,
                            ...productData,
                        });
                    } else {
                        handleSelectProduct({
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
                handleSelectProduct({
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
            handleSelectProduct({
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
            .catch((err) => console.log(err));
    }, []);

    const handleSelectImageFile = async (file) => {
        let imageToImageData = new FormData();
        imageToImageData.append("imageFile", file);
        setIsUplodingFile(true);
        try {
            const res = await Axios.post(`${process.env.BASE_API_URL}/image-to-image/upload-image-and-processing`, imageToImageData, {
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
                const res = await Axios.get(`${process.env.BASE_API_URL}/image-to-image/styles/category-styles-data?categoryName=${categoriesData[index].name}`);
                const result = await res.data;
                setCategoryStyles(res.data);
                setStyleSelectedIndex(0);
                const tempModelName = res.data[0].modelName;
                setModelName(tempModelName);
            }
            catch (err) {
                console.log(err);
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
                    await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                    return tempDimentionsInCm;
                }
                case "horizontal": {
                    const tempDimentionsInCm = "70x50";
                    setDimentionsInCm(tempDimentionsInCm);
                    await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                    return tempDimentionsInCm;
                }
                case "square": {
                    const tempDimentionsInCm = "30x30";
                    setDimentionsInCm(tempDimentionsInCm);
                    await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                    return tempDimentionsInCm;
                }
                default: {
                    console.log("Error In Select Painting Type !!");
                }
            }
        }
    }

    const handleSelectPaintingType = async (paintingType) => {
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

    const handleSelectImageDimentions = async (inCm) => {
        if (!isWaitStatus) {
            setDimentionsInCm(inCm);
            await getProductPrice(paintingType, imageType, inCm);
        }
    }

    const handleIsExistWhiteBorderWithPoster = (isExistWhiteBorderWithPoster) => {
        if (!isWaitStatus) {
            setIsExistWhiteBorderWithPoster(isExistWhiteBorderWithPoster);
        }
    }

    const handleSelectFrame = async (paintingType, frameColor) => {
        if (!isWaitStatus) {
            setPaintingType(paintingType);
            setFrameColor(frameColor);
            await getProductPrice(paintingType, imageType, dimentionsInCm);
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
            default: {
                console.log("Error !!!");
            }
        }
    }

    const determine_image_orientation = (width, height) => {
        if (width < height) return "vertical";
        else if (width > height) return "horizontal";
        return "square";
    }

    const imageToImageGenerateByAI = async () => {
        setPaintingWidth(null);
        setPaintingHeight(null);
        setIsWillTheImageBeMoved(false);
        setTheDirectionOfImageDisplacement("");
        setBackgroundPosition({ x: 50, y: 50 });
        setInitialOffsetValue({ x: 0, y: 0 });
        setIsMouseDownActivate(false);
        setIsWaitStatus(true);
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/image-to-image/generate-image?imageLink=${imageLink}&prompt=${categoryStyles[styleSelectedIndex].prompt}&n_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&image_resolution=896&preprocessor_resolution=896&modelName=${modelName}&ddim_steps=${categoryStyles[styleSelectedIndex].ddim_steps}&strength=${categoryStyles[styleSelectedIndex].strength}&service=image-to-image&categoryName=${categoriesData[categorySelectedIndex].name}&styleName=${categoryStyles[styleSelectedIndex].name}&paintingType=${paintingType}&isExistWhiteBorder=${isExistWhiteBorderWithPoster}&frameColor=${frameColor}`);
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
        if (Object.keys(errorsObject).length == 0) {
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
                        console.log("Error !!");
                    }
                }
                try {
                    const res = await Axios.post(`${process.env.BASE_API_URL}/users/crop-image`, {
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
                        quantity: quantity,
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
                    console.log(err);
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
                    quantity: quantity,
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
    }

    const handleDisplayImageMode = (imageMode) => {
        if (imageMode === "minimize-image" && windowInnerWidth > 991) {
            setImageMode("normal-size-image");
        }
        if (imageMode === "image-inside-room1" && windowInnerWidth > 991) {
            setImageMode("image-inside-room1");
        }
        if (imageMode === "image-inside-room2" && windowInnerWidth > 991) {
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
                                <h6 className="fw-bold">Upload Image</h6>
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
                            <h5 className="drag-msg fw-bold mb-0">Please Drop This File Here</h5>
                        </div>}
                    </div>}
                {/* End Select Image Box */}
                {isUplodingFile && <div className="uploading-box mb-4 p-3 border border-2 border-secondary">
                    <div className="progress mb-2" style={{ height: "30px" }}>
                        <div className="progress-bar" role="progressbar" style={{ width: `${uploadingProgress}%`, height: "30px" }} aria-valuenow={uploadingProgress} aria-valuemin="0" aria-valuemax="100">{uploadingProgress} %</div>
                    </div>
                    <h6 className="m-0 fw-bold">Uploading Image Now ...</h6>
                </div>}
                <hr className="mb-2 mt-2" />
                {imageLink && <button className="btn btn-dark w-50 mx-auto d-block managment-create-image-btn" onClick={imageToImageGenerateByAI}>Create</button>}
                {!imageLink && <button className="btn btn-dark w-50 mx-auto d-block managment-create-image-btn" disabled>Create</button>}
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
                            width: width,
                            height: height,
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
            const res = await Axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-details?productName=${paintingType}&dimentions=${dimentions}&position=${position}`);
            const result = await res.data;
            setProductPriceBeforeDiscount(result.priceBeforeDiscount);
            setProductPriceAfterDiscount(result.priceBeforeDiscount);
        }
        catch (err) {
            console.log(err);
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

    return (
        // Start Image To Image Page
        <div className="image-to-image-service">
            <Head>
                <title>Tavlorify Store - Image To Image</title>
            </Head>
            {!isLoadingPage ? <>
                <Header newTotalProductsCount={newTotalProductsCount} />
                {/* Start Overlay */}
                {isShowMoreGeneratedImages && <div className="overlay">
                    <div className="rest-generated-images-box d-flex flex-column align-items-center justify-content-center p-4">
                        <GrFormClose className="close-overlay-icon" onClick={() => setIsShowMoreGeneratedImages(false)} />
                        <h3 className="fw-bold border-bottom border-2 border-dark pb-2 mb-3">More Gererated Images</h3>
                        <h6 className="fw-bold mb-5">Please Select Image</h6>
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
                        <h1 className="text-center mb-4 welcome-msg pb-3">Welcome To You In Image To Image AI Service</h1>
                        {/* Start Grid System */}
                        <div className="row align-items-center">
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
                                {windowInnerWidth > 991 && <div className="col-lg-2">
                                    {/* Start Art Painting Box */}
                                    {getArtPaintingBox(global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width, global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height, "minimize-image", false)}
                                    {/* End Art Painting Box */}
                                    {getImageInsideRoomBox(1, "minimize-room-image")}
                                    {getImageInsideRoomBox(2, "minimize-room-image")}
                                </div>}
                                {/* End Column */}
                                {/* Start Column */}
                                <div className="col-lg-5">
                                    {/* Start Art Painting Section */}
                                    {windowInnerWidth > 991 && getArtPaintingBox(global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width, global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height, undefined, false)}
                                    {/* End Art Painting Section */}
                                    {getImageInsideRoomBox(1, undefined)}
                                    {getImageInsideRoomBox(2, undefined)}
                                    {windowInnerWidth < 991 && getGeneratedImageGallery()}
                                </div>
                                {/* End Column */}
                            </>}
                            {/* Start Column */}
                            <div className="col-lg-5">
                                {!errorMsg && !isWaitStatus && windowInnerWidth > 991 && getImageBeforeProcessingBox()}
                                {isWaitStatus && <button className="btn btn-dark w-50 mx-auto d-block managment-create-image-btn" disabled>Creating ...</button>}
                                {/* Start Art Painting Options Section */}
                                <section className="art-painting-options pe-3 mb-4">
                                    <section className="generating-image-options">
                                        <h6 className="mb-2 fw-bold option-section-name">Please Select Category</h6>
                                        {/* Start Categories Section */}
                                        <section className="categories mb-3">
                                            <div className="row">
                                                {categoriesData.map((category, index) => (
                                                    <div className="col-sm-2 col-3 col-md-3" key={category._id}>
                                                        {/* Start Category Box */}
                                                        <div
                                                            className="category-box text-center"
                                                            onClick={() => handleSelectCategory(index)}
                                                        >
                                                            <img
                                                                src={`${process.env.BASE_API_URL}/${category.imgSrc}`}
                                                                alt={`${category.name} Image`}
                                                                className="category-image mb-2"
                                                                style={index === categorySelectedIndex ? { border: "4px solid #000" } : {}}
                                                                onDragStart={(e) => e.preventDefault()}
                                                            />
                                                            <h6 className="category-name text-center">{category.name}</h6>
                                                        </div>
                                                        {/* End Category Box */}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                        {/* End Categories Section */}
                                        <h6 className="mb-2 fw-bold option-section-name">Please Select Style</h6>
                                        {/* Start Styles Section */}
                                        <section className="styles mb-3">
                                            {/* Start Grid System */}
                                            <div className="row">
                                                {/* Start Column */}
                                                {categoryStyles.map((style, index) => (
                                                    <div className="col-sm-2 col-3 col-md-3" key={index}>
                                                        {/* Start Style Box */}
                                                        <div
                                                            className="style-box p-2 text-center"
                                                            onClick={() => handleSelectStyle(index)}
                                                        >
                                                            <img
                                                                src={`${process.env.BASE_API_URL}/${style.imgSrc}`}
                                                                alt={`${style.name} Image`}
                                                                className="mb-2 style-image"
                                                                style={index === styleSelectedIndex ? { border: "4px solid #000" } : {}}
                                                                onDragStart={(e) => e.preventDefault()}
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
                                    {/* Start Art Name And Price Section */}
                                    <section className="art-name-and-price mb-2">
                                        {/* Start Grid System */}
                                        <div className="row align-items-center">
                                            <div className="col-8">
                                                <h5 className="art-name mb-0 fw-bold">Art Name: {paintingType}</h5>
                                            </div>
                                            <div className="col-4 text-end price-box">
                                                <h5 className="price mb-0 fw-bold">{productPriceAfterDiscount} kr</h5>
                                                {productPriceBeforeDiscount != productPriceAfterDiscount && <h6 className="discount fw-bold">{productPriceBeforeDiscount} kr</h6>}
                                            </div>
                                        </div>
                                        {/* End Grid System */}
                                    </section>
                                    {/* End Art Name And Price Section */}
                                    {/* Start Displaying Art Painting Options Section */}
                                    <section className="displaying-art-painting-options">
                                        {/* Start Art Names List */}
                                        <ul className="art-names-list d-flex flex-wrap mb-3">
                                            <li
                                                className="p-2 pe-3 ps-3"
                                                onClick={() => handleSelectPaintingType("poster")}
                                                style={paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                            >
                                                Poster
                                            </li>
                                            <li
                                                className="p-2 pe-3 ps-3"
                                                onClick={() => handleSelectPaintingType("canvas")}
                                                style={paintingType === "canvas" ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
                                            >
                                                Canvas
                                            </li>
                                        </ul>
                                        {/* EndArt Names List */}
                                        {windowInnerWidth > 767 && <h6 className="fw-bold option-section-name">Positions</h6>}
                                        {/* Start Positions List */}
                                        <ul className="positions-list text-center pb-3 art-painting-options-list">
                                            <li>
                                                <span
                                                    style={
                                                        {
                                                            border: imageType === "vertical" ? "4px solid #000" : "",
                                                            fontWeight: imageType === "vertical" ? "bold" : "",
                                                            textDecoration: imageType !== "vertical" ? "line-through" : "",
                                                        }
                                                    }
                                                >Vertical</span>
                                            </li>
                                            <li>
                                                <span
                                                    style={
                                                        {
                                                            border: imageType === "horizontal" ? "4px solid #000" : "",
                                                            fontWeight: imageType === "horizontal" ? "bold" : "",
                                                            textDecoration: imageType !== "horizontal" ? "line-through" : "",
                                                        }
                                                    }
                                                >Horizontal</span>
                                            </li>
                                            <li>
                                                <span
                                                    style={
                                                        {
                                                            border: imageType === "square" ? "4px solid #000" : "",
                                                            fontWeight: imageType === "square" ? "bold" : "",
                                                            textDecoration: imageType !== "square" ? "line-through" : "",
                                                        }
                                                    }
                                                >Square</span>
                                            </li>
                                        </ul>
                                        {/* End Positions List */}
                                        <h6 className="fw-bold option-section-name">Sizes</h6>
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
                                                        {(dims.inCm === "50x70" || dims.inCm === "70x50" || dims.inCm === "30x30") && <h6 className="fw-bold mb-0">Popular</h6>}
                                                        {dims.inCm}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        {/* End Sizes List */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold option-section-name">Border</h6>}
                                        {/* Start White Border */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="white-borders-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleIsExistWhiteBorderWithPoster("without-border")}
                                            >
                                                <span
                                                    style={isExistWhiteBorderWithPoster === "without-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    none
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleIsExistWhiteBorderWithPoster("with-border")}
                                            >
                                                <span
                                                    style={isExistWhiteBorderWithPoster === "with-border" ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    With Border
                                                </span>
                                            </li>
                                        </ul>}
                                        {/* Start White Border */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold">Frames</h6>}
                                        {/* Start Frames List */}
                                        {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="frames-list text-center pb-3 art-painting-options-list">
                                            <li
                                                onClick={() => handleSelectFrame("poster", "none")}
                                            >
                                                <span
                                                    style={(frameColor === "none" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    none
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "black")}
                                            >
                                                <span
                                                    style={(frameColor === "black" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">Black</h6>
                                                    <img src={blackFrameCornerImage.src} alt="Black Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "white")}
                                            >
                                                <span
                                                    style={(frameColor === "white" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">White</h6>
                                                    <img src={whiteFrameCornerImage.src} alt="White Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "natural-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "natural-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">Wood</h6>
                                                    <img src={woodFrameCornerImage.src} alt="Wood Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-wooden-frame", "dark-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "dark-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">Dark Wood</h6>
                                                    <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "black")}
                                            >
                                                <span
                                                    style={(frameColor === "black" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">Black With Hangers</h6>
                                                    <img src={blackFrameCornerImage.src} alt="Black Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "white")}
                                            >
                                                <span
                                                    style={(frameColor === "white" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">White With Hangers</h6>
                                                    <img src={whiteFrameCornerImage.src} alt="White Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "natural-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "natural-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold">Wood With Hangers</h6>
                                                    <img src={woodFrameCornerImage.src} alt="Wood Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                                </span>
                                            </li>
                                            <li
                                                onClick={() => handleSelectFrame("poster-with-hangers", "dark-wood")}
                                            >
                                                <span
                                                    style={(frameColor === "dark-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                                >
                                                    <h6 className="frame-color d-block fw-bold mb-2">Dark Wood With Hangers</h6>
                                                    <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                placeholder="Quantity"
                                                className={`quantity form-control border-2 mb-3 ${formValidationErrors["quantity"] ? "border-danger" : "border-dark"}`}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                defaultValue={quantity}
                                            />
                                            {formValidationErrors["quantity"] && <p className='error-msg text-danger'>{formValidationErrors["quantity"]}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            {!isWaitAddToCart && !errorInAddToCart && !isSuccessAddToCart && <button
                                                className="btn btn-dark w-100 p-2 add-to-cart-managment-btn"
                                                onClick={addToCart}
                                            >
                                                Add To Cart
                                            </button>}
                                            {isWaitAddToCart && <button className="btn btn-dark w-100 p-1 add-to-cart-managment-btn" disabled>Waiting ...</button>}
                                            {isSuccessAddToCart && <button className="btn btn-success w-100 p-2 add-to-cart-managment-btn" disabled>Success Is Adding To Cart ...</button>}
                                            {errorInAddToCart && <button className="btn btn-danger w-100 p-2 add-to-cart-managment-btn" disabled>{errorInAddToCart}</button>}
                                        </div>
                                    </div>
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
                                <h6 className="m-0 fw-bold d-inline">Generated Images: ({generatedImagesData ? generatedImagesData.length : 0})</h6>
                            </div>
                            <div className="col-lg-10">
                                {generatedImagesData && !isWaitStatus && <ul className="generated-images-list text-center p-4">
                                    {generatedImagesData.map((generatedImageData, index) => (
                                        index < 10 && <Fragment key={generatedImageData._id}>
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
                                    {generatedImagesData.length > 10 && !isShowMoreGeneratedImages && <button className="show-more-generate-images-btn btn btn-dark" onClick={() => setIsShowMoreGeneratedImages(true)}>Show More</button>}
                                </ul>}
                                {generatedImagesData.length === 0 && <p className="alert alert-danger m-0 not-find-generated-images-for-you-err">Sorry, Can't Find Any Generated Images From You !!</p>}
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
                                        <h6 className="fw-bold">1. Upload</h6>
                                        <p>Upload an Image from your camera roll</p>
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
                                        <h6 className="fw-bold">2. Create Image</h6>
                                        <p>Choose Between Stylish Filters, Border, Text, And Size</p>
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
                                        <h6 className="fw-bold">3. Order</h6>
                                        <p>Checkout And Pay, Receive Your Poster Within 3 - 5 Days</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* End How To Use Service Section */}
                        {/* Start Painting Details Section */}
                        <section className="painting-details">
                            {windowInnerWidth >= 767 && <>
                                <ul className="painting-details-buttons-list row text-center m-0">
                                    <li
                                        className={`painting-details-button-item col-md-3 p-3 fw-bold ${appearedPaintingDetailsList.includes("summary") ? "selected" : ""}`}
                                        onClick={() => setAppearedPaintingDetailsList(["summary"])}
                                    >
                                        Summary
                                    </li>
                                    <li
                                        className={`painting-details-button-item col-md-3 p-3 fw-bold ${appearedPaintingDetailsList.includes("product-information") ? "selected" : ""}`}
                                        onClick={() => setAppearedPaintingDetailsList(["product-information"])}
                                    >
                                        Product Information
                                    </li>
                                    <li
                                        className={`painting-details-button-item col-md-3 p-3 fw-bold ${appearedPaintingDetailsList.includes("shipping-and-delivery") ? "selected" : ""}`}
                                        onClick={() => setAppearedPaintingDetailsList(["shipping-and-delivery"])}
                                    >
                                        Shipping And Delivery
                                    </li>
                                    <li
                                        className={`painting-details-button-item col-md-3 p-3 fw-bold ${appearedPaintingDetailsList.includes("other-questions") ? "selected" : ""}`}
                                        onClick={() => setAppearedPaintingDetailsList(["other-questions"])}
                                    >
                                        Other Questions
                                    </li>
                                </ul>
                                {appearedPaintingDetailsList.includes("summary") && <div className="summary-box p-3 pb-4 pt-4">
                                    <p className="mb-4 content">Design a unique and stylish poster from your own image or photo with our designer. Upload your photo and choose filter, border, text and size – and review everything straight on the screen. Our designer has been created together with experienced photographers and photo editors from Scandinavia and your poster is printed on 200gsm matte premium paper.</p>
                                    <p className="mb-4 content">You get a unique and beautiful decoration that matches perfectly with the colours of your interior or as a gift for your friend, partner or child. Cherish a meaningful memory and give a custom poster as a wonderful gift on Valentine’s Day, Mother’s Day, Father’s Day, a Graduation, Wedding or as a Christmas gift. Delivered in 3-5 working days and always with free shipping.</p>
                                    <p className="m-0">Questions? Please e-mail us at care@wallpoet.com and we’ll get back to you as soon as possible!</p>
                                </div>}
                                {appearedPaintingDetailsList.includes("product-information") && <div className="product-information-box p-3 pb-4 pt-4">
                                    <p className="mb-4 content"><span className="fw-bold">Filters</span>: Our filters are created by experienced photographers and photo editors and they look great on print. Choose between classic photo art filters such as Brooklyn and Fade, to vivid color combinations such as Mocca, Palma or Air. Which filter suits your photo the best?</p>
                                    <p className="mb-4 content"><span className="fw-bold">Text</span>: The text on your poster comes with a classic and stylish font that automatically gets a color that matches with your chosen filter.</p>
                                    <p className="mb-4 content"><span className="fw-bold">Paper quality</span>: Matte 200 gsm premium paper.</p>
                                    <p className="mb-4 content"><span className="fw-bold">Frame</span>: Add a beautiful matching frame here.</p>
                                    <p className="mb-0"><span className="fw-bold">Payment</span>: Klarna.</p>
                                </div>}
                                {appearedPaintingDetailsList.includes("shipping-and-delivery") && <div className="shipping-and-delivery-box p-3 pb-4 pt-4">
                                    <p className="mb-4 content"><span className="fw-bold">Shipping countries</span>: We ship to Austria, Belgium, Denmark, Finland, France, Germany, Netherlands, Norway, Spain, Sweden & United States (US). We are planning to start shipping to more countries in the near future.</p>
                                    <p className="mb-4 content"><span className="fw-bold">Shipping time</span>: 3-5 working days.</p>
                                    <p className="mb-4 content"><span className="fw-bold">Shipping costs</span>: Free.</p>
                                    <p className="m-0"><span className="fw-bold">Distributor</span>: Delivered by DHL (within EU), Bring (Norway)..</p>
                                </div>}
                                {appearedPaintingDetailsList.includes("other-questions") && <div className="other-questions-box p-3 pb-4 pt-4">
                                    <p className="mb-4 content"><span className="fw-bold">When uploading</span>: It’s important that you upload the original image straight from the camera roll, and that the photo has good resolution, sharpness and brightness.</p>
                                    <p className="m-0">Once you have selected your image, you will be given a preliminary evaluation of how good the resolution is (1-5 stars). Once the image is uploaded to the designer, you can click on the tab with the star to see a more thorough evaluation of the quality including resolution, sharpness and brightness.</p>
                                </div>}
                            </>}
                            {windowInnerWidth < 767 && <>
                                {/* Start Accordion Component From Bootstrap */}
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Summary
                                            </button>
                                        </h2>
                                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p className="mb-4 content">Design a unique and stylish poster from your own image or photo with our designer. Upload your photo and choose filter, border, text and size – and review everything straight on the screen. Our designer has been created together with experienced photographers and photo editors from Scandinavia and your poster is printed on 200gsm matte premium paper.</p>
                                                <p className="mb-4 content">You get a unique and beautiful decoration that matches perfectly with the colours of your interior or as a gift for your friend, partner or child. Cherish a meaningful memory and give a custom poster as a wonderful gift on Valentine’s Day, Mother’s Day, Father’s Day, a Graduation, Wedding or as a Christmas gift. Delivered in 3-5 working days and always with free shipping.</p>
                                                <p className="m-0">Questions? Please e-mail us at care@wallpoet.com and we’ll get back to you as soon as possible!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Product Information
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p className="mb-4 content"><span className="fw-bold">Filters</span>: Our filters are created by experienced photographers and photo editors and they look great on print. Choose between classic photo art filters such as Brooklyn and Fade, to vivid color combinations such as Mocca, Palma or Air. Which filter suits your photo the best?</p>
                                                <p className="mb-4 content"><span className="fw-bold">Text</span>: The text on your poster comes with a classic and stylish font that automatically gets a color that matches with your chosen filter.</p>
                                                <p className="mb-4 content"><span className="fw-bold">Paper quality</span>: Matte 200 gsm premium paper.</p>
                                                <p className="mb-4 content"><span className="fw-bold">Frame</span>: Add a beautiful matching frame here.</p>
                                                <p className="mb-0"><span className="fw-bold">Payment</span>: Klarna.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Shipping And Delivery
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p className="mb-4 content"><span className="fw-bold">Shipping countries</span>: We ship to Austria, Belgium, Denmark, Finland, France, Germany, Netherlands, Norway, Spain, Sweden & United States (US). We are planning to start shipping to more countries in the near future.</p>
                                                <p className="mb-4 content"><span className="fw-bold">Shipping time</span>: 3-5 working days.</p>
                                                <p className="mb-4 content"><span className="fw-bold">Shipping costs</span>: Free.</p>
                                                <p className="m-0"><span className="fw-bold">Distributor</span>: Delivered by DHL (within EU), Bring (Norway)..</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                Other Questions
                                            </button>
                                        </h2>
                                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p className="mb-4 content"><span className="fw-bold">When uploading</span>: It’s important that you upload the original image straight from the camera roll, and that the photo has good resolution, sharpness and brightness.</p>
                                                <p className="m-0">Once you have selected your image, you will be given a preliminary evaluation of how good the resolution is (1-5 stars). Once the image is uploaded to the designer, you can click on the tab with the star to see a more thorough evaluation of the quality including resolution, sharpness and brightness.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Accordion Component From Bootstrap */}
                            </>}
                        </section>
                        {/* End Painting Details Section */}
                        {/* Start Inspiration */}
                        <section className="inspiration p-3 text-center">
                            <h3 className="fw-bold">Inspiration</h3>
                            <h6 className="mb-3">EXAMPLES FROM US AND OUR CUSTOMERS</h6>
                            {/* Start Carousel Component From Bootstrap */}
                            <Carousel indicators={false}>
                                {/* Start Carousel Item */}
                                <Carousel.Item>
                                    <Carousel.Caption>
                                        <div className="inspiration-image-box">
                                            <img
                                                src={inspirationImage1.src}
                                                alt="Inspiration Image 1"
                                            />
                                        </div>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                {/* End Carousel Item */}
                            </Carousel>
                            {/* End Carousel Component From Bootstrap */}
                        </section>
                        {/* End Inspiration */}
                    </div>
                    {/* End Container */}
                </div>
                {/* End Page Content */}
            </> : <LoaderPage />}
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