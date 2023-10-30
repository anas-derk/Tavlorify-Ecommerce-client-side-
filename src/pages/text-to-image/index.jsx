import Head from "next/head";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import Axios from "axios";
import global_data from "../../../public/data/global";
import { v4 as generateUniqueID } from "uuid";
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
import validations from "../../../public/global_functions/validations";
import room1Image from "@/../../public/images/Rooms/room1.jpg";
import room2Image from "@/../../public/images/Rooms/room2.jpg";
import { BiError } from "react-icons/bi";

const TextToImage = ({
    generatedImagePathInMyServerAsQuery,
    paintingTypeAsQuery,
    positionAsQuery,
    sizeAsQuery,
    isExistWhiteBorderAsQuery,
    frameColorAsQuery,
}) => {

    const [textPrompt, setTextPrompt] = useState("a dog");

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

    const [isExistWhiteBorderWithPoster, setIsExistWhiteBorderWithPoster] = useState("without-border");

    const [frameColor, setFrameColor] = useState("none");

    const [dimentions, setDimentions] = useState({});

    const [dimentionsInCm, setDimentionsInCm] = useState("50x70");

    const [categoriesData, setCategoriesData] = useState([]);

    const [categoryStyles, setCategoryStyles] = useState([]);

    const [isWaitAddToCart, setIsWaitAddToCart] = useState(false);

    const [isSuccessAddToCart, setIsSuccessAddToCart] = useState(false);

    const [errorInAddToCart, setErrorInAddToCart] = useState("");

    const [quantity, setQuantity] = useState(1);

    const [tempImageType, setTempImageType] = useState("vertical");

    const [tempDimentionsInCm, setTempDimentionsInCm] = useState("50x70");

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
    }

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const [generatedImagesData, setGeneratedImagesData] = useState([]);

    const [newTotalProductsCount, setNewTotalProductsCount] = useState(0);

    const getAllText2ImageCategoriesData = async () => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/text-to-image/categories/all-categories-data`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    const getAllText2ImageCategoryStylesData = async (categoriesData, categorySelectedIndex) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/text-to-image/styles/category-styles-data?categoryName=${categoriesData[categorySelectedIndex].name}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            throw Error(err.response.data);
        }
    }

    useEffect(() => {
        getAllText2ImageCategoriesData()
            .then(async (categoriesData) => {
                setCategoriesData(categoriesData);
                const categoryStylesTemp = await getAllText2ImageCategoryStylesData(categoriesData, 0);
                setCategoryStyles(categoryStylesTemp);
                const tempModelName = categoryStylesTemp[0].modelName;
                setModelName(tempModelName);
                setPaintingType(paintingTypeAsQuery);
                setImageType(positionAsQuery);
                setDimentionsInCm(sizeAsQuery);
                const dimsIndex = global_data.modelsDimentions[tempModelName][positionAsQuery].findIndex((el) => el.inCm == sizeAsQuery);
                setDimentions({
                    width: global_data.modelsDimentions[tempModelName][positionAsQuery][dimsIndex].inPixel.width,
                    height: global_data.modelsDimentions[tempModelName][positionAsQuery][dimsIndex].inPixel.height,
                });
                setIsExistWhiteBorderWithPoster(isExistWhiteBorderAsQuery);
                setFrameColor(frameColorAsQuery);
                setGeneratedImagePathInMyServer(generatedImagePathInMyServerAsQuery);
                setTempImageType(positionAsQuery);
                setTempDimentionsInCm(sizeAsQuery);
                setGeneratedImageURL(`${process.env.BASE_API_URL}/${generatedImagePathInMyServerAsQuery}`);
                await getProductPrice(paintingTypeAsQuery, positionAsQuery, sizeAsQuery);
                setGeneratedImagesData(JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-text-to-image")));
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectCategory = async (categoryIndex) => {
        if (!isWaitStatus) {
            setCategorySelectedIndex(categoryIndex);
            const res = await Axios.get(`${process.env.BASE_API_URL}/text-to-image/styles/category-styles-data?categoryName=${categoriesData[categoryIndex].name}`)
            const result = await res.data;
            setCategoryStyles(result);
            setStyleSelectedIndex(0);
            const tempModelName = result[0].modelName;
            setModelName(tempModelName);
            const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
            setDimentions({
                width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
            });
        }
    }

    const handleSelectStyle = (styleIndex) => {
        if (!isWaitStatus) {
            let tempModelName = categoryStyles[styleIndex].modelName;
            setModelName(tempModelName);
            const dimsIndex = global_data.modelsDimentions[tempModelName][imageType].findIndex((el) => el.inCm == dimentionsInCm);
            setDimentions({
                width: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.width,
                height: global_data.modelsDimentions[tempModelName][imageType][dimsIndex].inPixel.height,
            });
            setStyleSelectedIndex(styleIndex);
        }
    }

    const handleSelectPaintingType = async (paintingType) => {
        if (!isWaitStatus) {
            if (paintingType === "canvas") {
                setIsExistWhiteBorderWithPoster("without-border");
                setFrameColor("none");
            };
            setPaintingType(paintingType);
            await getProductPrice(paintingType, imageType, dimentionsInCm);
        }
    }

    const handleSelectImageType = async (imgType) => {
        if (!isWaitStatus) {
            setImageType(imgType);
            switch (imgType) {
                case "horizontal": {
                    const tempDimentionsInCm = "70x50";
                    setDimentionsInCm(tempDimentionsInCm);
                    const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == tempDimentionsInCm);
                    setDimentions({
                        width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                        height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                    });
                    await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                    break;
                }
                case "vertical": {
                    const tempDimentionsInCm = "50x70";
                    setDimentionsInCm(tempDimentionsInCm);
                    const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == tempDimentionsInCm);
                    setDimentions({
                        width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                        height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                    });
                    await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                    break;
                }
                case "square": {
                    const tempDimentionsInCm = "30x30";
                    setDimentionsInCm(tempDimentionsInCm);
                    const dimsIndex = global_data.modelsDimentions[modelName][imgType].findIndex((el) => el.inCm == tempDimentionsInCm);
                    setDimentions({
                        width: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.width,
                        height: global_data.modelsDimentions[modelName][imgType][dimsIndex].inPixel.height,
                    });
                    await getProductPrice(paintingType, imgType, tempDimentionsInCm);
                    break;
                }
                default: {
                    console.log("error in select image position");
                }
            }
        }
    }

    const handleSelectImageDimentions = async (inCm) => {
        if (!isWaitStatus) {
            const dimsIndex = global_data.modelsDimentions[modelName][imageType].findIndex((el) => el.inCm == inCm);
            setDimentionsInCm(inCm);
            setDimentions({
                width: global_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.width,
                height: global_data.modelsDimentions[modelName][imageType][dimsIndex].inPixel.height,
            });
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

    const generatedImageWithAI = async (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        try {
            const res = await Axios.get(
                `${process.env.BASE_API_URL}/text-to-image/generate-image?service=text-to-image&textPrompt=${textPrompt}&prompt=${categoryStyles[styleSelectedIndex].prompt}&categoryName=${categoriesData[categorySelectedIndex].name}&styleName=${categoryStyles[styleSelectedIndex].name}&position=${imageType}&dimentionsInCm=${dimentionsInCm}&paintingType=${paintingType}&isExistWhiteBorder=${isExistWhiteBorderWithPoster}&frameColor=${frameColor}&model_name=${modelName}&negative_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&width=${dimentions.width}&height=${dimentions.height}
            `);
            const result = await res.data;
            const imageURL = `${process.env.BASE_API_URL}/${result}`;
            setTempImageType(imageType);
            setTempDimentionsInCm(dimentionsInCm);
            setIsWaitStatus(false);
            setGeneratedImageURL(imageURL);
            setGeneratedImagePathInMyServer(result);
            saveNewGeneratedImageDataInLocalStorage({
                uploadedImageURL: "",
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
            });
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
        let tavlorifyStoreUserGeneratedImagesDataForTextToImage = JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-text-to-image"));
        if (tavlorifyStoreUserGeneratedImagesDataForTextToImage) {
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.unshift(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-text-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        } else {
            let tavlorifyStoreUserGeneratedImagesDataForTextToImage = [];
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.unshift(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-text-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        }
    }

    const displayPreviousGeneratedImageInsideArtPainting = async (generatedImageData) => {
        setTextPrompt(generatedImageData.textPrompt);
        const tempPaintingType = generatedImageData.paintingType;
        setPaintingType(tempPaintingType);
        const tempPosition = generatedImageData.position;
        setImageType(tempPosition);
        const tempImageSize = generatedImageData.size;
        setDimentionsInCm(tempImageSize);
        setTempImageType(generatedImageData.position);
        setTempDimentionsInCm(tempImageSize);
        setDimentions({
            width: generatedImageData.width,
            height: generatedImageData.height,
        });
        setIsExistWhiteBorderWithPoster(generatedImageData.isExistWhiteBorder);
        setFrameColor(generatedImageData.frameColor);
        setGeneratedImageURL(`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`);
        setGeneratedImagePathInMyServer(generatedImageData.generatedImageURL);
        await getProductPrice(tempPaintingType, tempPosition, tempImageSize);
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
            if (tempImageType !== imageType) {
                setIsWaitAddToCart(false);
                setErrorInAddToCart(`Please Select ${tempImageType} Position`);
                let errorTimeoutInAddToCart = setTimeout(() => {
                    setErrorInAddToCart("");
                    clearTimeout(errorTimeoutInAddToCart);
                }, 1500);
            } else {
                const productInfoToCart = {
                    _id: generateUniqueID(),
                    paintingType,
                    isExistWhiteBorder: isExistWhiteBorderWithPoster,
                    frameColor,
                    position: tempImageType,
                    size: dimentionsInCm,
                    priceBeforeDiscount: productPriceBeforeDiscount,
                    priceAfterDiscount: productPriceAfterDiscount,
                    generatedImageURL: generatedImagePathInMyServer,
                    quantity: quantity,
                    service: "text-to-image",
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
                        clearTimeout(successAddToCartTimeout);
                    }, 1500);
                    setNewTotalProductsCount(allProductsData.length);
                }
            }
        }
    }

    const handleDisplayImageMode = (imageMode) => {
        if (imageMode === "minimize-image") {
            setImageMode("normal-size-image");
        }
        if (imageMode === "image-inside-room1") {
            setImageMode("image-inside-room1");
        }
        if (imageMode === "image-inside-room2") {
            setImageMode("image-inside-room2");
        }
    }

    const getArtPaintingBox = (width, height, imageSize, isImageInsideRoom, isRoomImageMinimize) => {
        return (
            (imageMode == "normal-size-image" || imageSize === "minimize-image") && <div
                className="art-painting d-flex justify-content-center align-items-center mb-4"
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
                        style={{
                            width: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].width / 3}px` : `${global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].width}px`
                            ) : `${global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].width / 10}px`,
                            height: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].height / 3}px` : `${global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].height}px`
                            ) : `${global_data.framesDimentions[paintingType][tempImageType][tempDimentionsInCm].height / 10}px`,
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && frameColor !== "none" && <img
                            src={frameImages[paintingType][tempImageType][frameColor][tempDimentionsInCm]}
                            alt="Image"
                            onDragStart={(e) => e.preventDefault()}
                        />}
                    </div>
                    <div
                        className="generated-image-box d-flex align-items-center justify-content-center"
                        style={{
                            width: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${(global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].width) / 3}px` : `${global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].width}px`
                            ) : `${(global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].width) / 10}px`,
                            height: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].height / 3}px` : `${global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].height}px`
                            ) : `${global_data.appearedImageSizesForTextToImage[paintingType]["without-border"][tempImageType][tempDimentionsInCm].height / 10}px`,
                            zIndex: -1,
                            boxShadow: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "1px 1px 2px #000, -1px -1px 2px #000" : "",
                            backgroundColor: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "#FFF" : "",
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && <img
                            src={generatedImageURL}
                            alt="Generated Image !!"
                            style={{
                                width: width,
                                height: height,
                            }}
                            onDragStart={(e) => e.preventDefault()}
                        />}
                    </div>
                </>}
                {paintingType === "canvas" && !isWaitStatus && !errorMsg && <div className="canvas-image-box">
                    <img
                        src={generatedImageURL}
                        className={
                            !isImageInsideRoom ? (
                                imageSize !== "minimize-image" ? "canvas-image" : "minimize-canvas-image"
                            ) : ""
                        }
                        alt="canvas image"
                        width={width}
                        height={height}
                        onDragStart={(e) => e.preventDefault()}
                    />
                </div>}
                {isWaitStatus && !errorMsg && <span className="loader"></span>}
            </div>
        );
    }

    const getImageInsideRoomBox = (roomNumber, imageSize) => {
        return (
            (imageMode === `image-inside-room${roomNumber}` || imageSize === "minimize-room-image") && !isWaitStatus && !errorMsg && generatedImageURL && <div
                className={`room${roomNumber}-image-box room-image-box border border-2 border-dark mb-4`}
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
                    imageSize === "minimize-room-image" ? `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width / 10}px` : `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width / 3}px`,
                    imageSize === "minimize-room-image" ? `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].height / 10}px` : `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].height / 3}px`,
                    "minimize-image",
                    true,
                    imageSize === "minimize-room-image" ? true : false,
                )}
            </div>
        );
    }

    const getProductPrice = async (paintingType, position, dimentions) => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/prices/prices-by-product-details?productName=${paintingType}&dimentions=${dimentions}&position=${position}`);
            const result = await res.data;
            setProductPriceBeforeDiscount(result.priceBeforeDiscount);
            setProductPriceAfterDiscount(result.priceAfterDiscount);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        // Start Text To Image Service Page
        <div className="text-to-image-service">
            <Head>
                <title>Tavlorify Store - Text To Image</title>
            </Head>
            <Header newTotalProductsCount={newTotalProductsCount} />
            {/* Start Page Content */}
            <div className="page-content">
                {/* Start Container */}
                <div className="container-fluid pt-2 pb-4">
                    <h1 className="text-center mb-4 welcome-msg pb-3">Welcome To You In Text To Image AI Service</h1>
                    {/* Start Grid System */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        {errorMsg && <div className="col-xl-7">
                            <div className="error-msg-box p-4 text-center">
                                <BiError className="error-icon mb-3" />
                                <h5 className="error-msg fw-bold">{errorMsg}</h5>
                            </div>
                        </div>}
                        {/* End Column */}
                        {!errorMsg && <>
                            {/* Start Column */}
                            <div className="col-xl-2">
                                {/* Start Art Painting Box */}
                                {getArtPaintingBox(`${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width / 3}px`, `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].height / 3}px`, "minimize-image", false)}
                                {/* End Art Painting Box */}
                                {getImageInsideRoomBox(1, "minimize-room-image")}
                                {getImageInsideRoomBox(2, "minimize-room-image")}
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-xl-5">
                                {getArtPaintingBox(`${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].width}px`, `${global_data.appearedImageSizesForTextToImage[paintingType][isExistWhiteBorderWithPoster][tempImageType][tempDimentionsInCm].height}px`, undefined, false)}
                                {getImageInsideRoomBox(1, undefined)}
                                {getImageInsideRoomBox(2, undefined)}
                            </div>
                            {/* End Column */}
                        </>}
                        {/* Start Column */}
                        <div className="col-xl-5">
                            <section className="art-painting-options pe-3 mb-3">
                                {/* Start Generating Image Options Section */}
                                <section className="generating-image-options">
                                    <h6 className="text-center mb-2 fw-bold option-section-name">Your Text Prompt</h6>
                                    <textarea
                                        type="text"
                                        placeholder="a dog riding a bicycle"
                                        className="form-control mb-3 text-prompt"
                                        onChange={(e) => setTextPrompt(e.target.value)}
                                        value={textPrompt}
                                    ></textarea>
                                    <div className="row align-items-center generate-image-btn-box">
                                        <div className="col-md-7">
                                            <h6 className="describe text-start mb-0 fw-bold">Describe what you want the AI to create</h6>
                                        </div>
                                        <div className="col-md-5 text-end">
                                            {!isWaitStatus && !errorMsg &&
                                                <button className="btn btn-dark w-100 generate-image-btn" onClick={generatedImageWithAI}>Create</button>
                                            }
                                            {isWaitStatus && <button className="btn btn-dark w-50" disabled>Creating ...</button>}
                                        </div>
                                    </div>
                                    <hr />
                                    <h6 className="mb-3 fw-bold option-section-name">Please Select Category</h6>
                                    {/* Start Categories Section */}
                                    <section className="categories mb-2">
                                        <div className="row">
                                            {categoriesData.map((category, index) => (
                                                <div className="col-md-3" key={category._id}>
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
                                                <div className="col-md-3" key={index}>
                                                    {/* Start Style Box */}
                                                    <div
                                                        className="style-box p-2 text-center"
                                                        onClick={() => handleSelectStyle(index)}
                                                    >
                                                        <img
                                                            src={`${process.env.BASE_API_URL}/${style.imgSrc}`}
                                                            alt={`${style.name} Image`} className="mb-2 style-image"
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
                                {/* Start Generating Image Options Section */}
                                {/* Start Art Name And Price Section */}
                                <section className="art-name-and-price">
                                    {/* Start Grid System */}
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5 className="art-name fw-bold">Art Name: {paintingType}</h5>
                                        </div>
                                        <div className="col-md-4 text-end price-box">
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
                                            style={(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") ? { fontWeight: "bold", borderBottom: "3px solid #000", backgroundColor: "#EEE" } : {}}
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
                                    <h6 className="fw-bold option-section-name">Positions</h6>
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
                                    <h6 className="fw-bold option-section-name">Sizes</h6>
                                    {/* Start Sizes List */}
                                    <ul className="sizes-list mb-4 text-center">
                                        {global_data.gelatoDimetions[paintingType][imageType].map((dims, index) => (
                                            <li
                                                key={index}
                                                className="p-3"
                                                onClick={() => handleSelectImageDimentions(dims.inCm)}
                                                style={dims.inCm === dimentionsInCm ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            >
                                                {(dims.inCm === "50x70" || dims.inCm === "70x50" || dims.inCm === "30x30") && <h6 className="fw-bold mb-0">Popular</h6>}
                                                {dims.inCm}
                                            </li>
                                        ))}
                                    </ul>
                                    {/* End Sizes List */}
                                    {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold option-section-name">Border</h6>}
                                    {/* Start White Border */}
                                    {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="white-borders-list mb-4 text-center">
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
                                    {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold option-section-name">Frames</h6>}
                                    {/* Start Frames List */}
                                    {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <ul className="framed-list mb-4 text-center pb-3">
                                        <li
                                            style={(frameColor === "none" && paintingType === "poster") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster", "none")}
                                        >
                                            none
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "black" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "black")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Black</span>
                                            <img src={blackFrameCornerImage.src} alt="Black Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "white" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "white")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">White</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "natural-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Wood</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "dark-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Dark Wood</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "black" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "black")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Black With Hangers</span>
                                            <img src={blackFrameCornerImage.src} alt="Black Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "white" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "white")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">White With Hangers</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "natural-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold">Wood With Hangers</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "dark-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Dark Wood With Hangers</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame With Hangers Image" width="50" onDragStart={(e) => e.preventDefault()} />
                                        </li>
                                    </ul>}
                                    {/* End Frames List */}
                                </section>
                                {/* End Displaying Art Painting Options Section */}
                            </section>
                            {/* Start Add To Cart Managment */}
                            {!isWaitStatus && !errorMsg && <div className="add-to-cart-box">
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
                        <div className="col-md-2 text-center">
                            <h6 className="m-0 fw-bold d-inline">Generated Images: ({generatedImagesData ? generatedImagesData.length : 0})</h6>
                        </div>
                        <div className="col-md-10">
                            {generatedImagesData ? <ul className="generated-images-list text-center p-4">
                                {generatedImagesData.map((generatedImageData, index) => (
                                    index < 10 && <li
                                        className="generated-images-item m-0"
                                        key={generatedImageData._id}
                                        onClick={() => displayPreviousGeneratedImageInsideArtPainting(generatedImageData)}
                                        style={{
                                            width: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].width / 4}px`,
                                            height: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].height / 4}px`
                                        }}
                                    >
                                        <img
                                            src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                            alt="Generated Image !!"
                                            className="generated-image"
                                            onDragStart={(e) => e.preventDefault()}
                                        />
                                    </li>
                                ))}
                                {generatedImagesData.length > 10 && <button className="show-more-generate-images-btn btn btn-dark">Show More</button>}
                            </ul> : <p className="alert alert-danger m-0 not-find-generated-images-for-you-err">Sorry, Can't Find Any Generated Images From You !!</p>}
                        </div>
                    </section>
                    {/* Start Generated Images Section */}
                </div>
                {/* End Container */}
            </div>
            {/* End Page Content */}
        </div>
        // End Text To Image Service Page
    );
}

export async function getServerSideProps(context) {
    const generatedImagePathInMyServerAsQuery = context.query.generatedImagePathInMyServerAsQuery,
        paintingTypeAsQuery = context.query.paintingTypeAsQuery,
        positionAsQuery = context.query.positionAsQuery,
        sizeAsQuery = context.query.sizeAsQuery,
        isExistWhiteBorderAsQuery = context.query.isExistWhiteBorderAsQuery,
        frameColorAsQuery = context.query.frameColorAsQuery;
    return {
        props: {
            generatedImagePathInMyServerAsQuery,
            paintingTypeAsQuery,
            positionAsQuery,
            sizeAsQuery,
            isExistWhiteBorderAsQuery,
            frameColorAsQuery,
        },
    }
}

export default TextToImage;