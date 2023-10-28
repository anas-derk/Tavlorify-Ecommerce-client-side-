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
import { CgArrowsHAlt, CgArrowsVAlt } from "react-icons/cg";
import validations from "../../../public/global_functions/validations";
import { v4 as generateUniqueID } from "uuid";
import room1Image from "@/../../public/images/Rooms/room1.jpg";
import room2Image from "@/../../public/images/Rooms/room2.jpg";

const ImageToImage = ({
    generatedImagePathInMyServerAsQuery,
    paintingTypeAsQuery,
    positionAsQuery,
    sizeAsQuery,
    isExistWhiteBorderAsQuery,
    frameColorAsQuery,
}) => {

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

    const [imageFile, setImageFile] = useState({});

    const [imageLink, setImageLink] = useState("");

    const [isWillTheImageBeMoved, setIsWillTheImageBeMoved] = useState(false);

    const [theDirectionOfImageDisplacement, setTheDirectionOfImageDisplacement] = useState("");

    const [backgroundPosition, setBackgroundPosition] = useState({ x: 50, y: 50 });

    const [isDraggable, setIsDraggable] = useState(false);

    const [initialOffsetValue, setInitialOffsetValue] = useState({ x: 0, y: 0 });

    const [isSaveGeneratedImageAndInfo, setIsSaveGeneratedImageAndInfo] = useState(false);

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
    }

    const [isMouseDownActivate, setIsMouseDownActivate] = useState(false);

    const [generatedImagesData, setGeneratedImagesData] = useState([]);

    const [newTotalProductsCount, setNewTotalProductsCount] = useState(0);

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

    useEffect(() => {
        getAllImage2ImageCategoriesData()
            .then(async (categoriesData) => {
                setCategoriesData(categoriesData);
                const categoryStylesTemp = await getAllImage2ImageCategoryStylesData(categoriesData, 0);
                setCategoryStyles(categoryStylesTemp);
                setModelName(categoryStylesTemp[0].modelName);
                setPaintingType(paintingTypeAsQuery);
                setImageType(positionAsQuery);
                setDimentionsInCm(sizeAsQuery);
                setIsExistWhiteBorderWithPoster(isExistWhiteBorderAsQuery);
                setFrameColor(frameColorAsQuery);
                let image = new Image();
                image.src = `${process.env.BASE_API_URL}/${generatedImagePathInMyServerAsQuery}`;
                image.onload = function () {
                    const tempPaintingWidth = this.naturalWidth,
                        tempPaintingHeight = this.naturalHeight;
                    setPaintingWidth(tempPaintingWidth);
                    setPaintingHeight(tempPaintingHeight);
                    determine_is_will_the_image_be_moved_and_the_direction_of_displacement(tempPaintingWidth, tempPaintingHeight, positionAsQuery);
                }
                setGeneratedImagePathInMyServer(generatedImagePathInMyServerAsQuery);
                setGeneratedImageURL(`${process.env.BASE_API_URL}/${generatedImagePathInMyServerAsQuery}`);
                await getProductPrice(paintingTypeAsQuery, positionAsQuery, sizeAsQuery);
                setGeneratedImagesData(JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-image-to-image")));
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSelectImageFile = (file) => {
        let imageToImageData = new FormData();
        imageToImageData.append("imageFile", file);
        Axios.post(`https://newapi.tavlorify.se/image-to-image/upload-image-and-processing`, imageToImageData)
            .then((res) => {
                setImageLink(res.data.imageLink);
                const tempImageType = res.data.imageType;
                setImageType(tempImageType);
                if (tempImageType === "vertical") setDimentionsInCm("50x70");
                else if (tempImageType === "horizontal") setDimentionsInCm("70x50");
                else setDimentionsInCm("30x30");
            }).catch((err) => {
                console.log(err);
            });

    }

    const removeImage = () => {
        setImageLink("");
        setImageFile({});
    }

    const handleSelectCategory = (index) => {
        if (!isWaitStatus) {
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
    }

    const handleSelectStyle = (index) => {
        if (!isWaitStatus) {
            setStyleSelectedIndex(index);
            let tempModelName = categoryStyles[index].modelName;
            setModelName(tempModelName);
        }
    }

    const handleSelectPaintingType = async (paintingType) => {
        if (!isWaitStatus) {
            if (paintingType === "canvas") {
                setIsExistWhiteBorderWithPoster("without-border");
                setFrameColor("none");
                switch (imageType) {
                    case "vertical": {
                        let tempDimentionsInCm = "50x70";
                        setDimentionsInCm(tempDimentionsInCm);
                        await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                        break;
                    }
                    case "horizontal": {
                        let tempDimentionsInCm = "70x50";
                        setDimentionsInCm(tempDimentionsInCm);
                        await getProductPrice(paintingType, imageType, tempDimentionsInCm);
                        break;
                    }
                    case "square": {
                        let tempDimentionsInCm = "30x30";
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

    const imageToImageGenerateByAI = async () => {
        setErrorMsg("");
        setGeneratedImageURL("");
        setPaintingWidth(null);
        setPaintingHeight(null);
        setIsWillTheImageBeMoved(false);
        setTheDirectionOfImageDisplacement("");
        setBackgroundPosition({ x: 50, y: 50 });
        setInitialOffsetValue({ x: 0, y: 0 });
        setIsMouseDownActivate(false);
        setIsWaitStatus(true);
        try {
            const res = await Axios.get(`https://newapi.tavlorify.se/image-to-image/generate-image?imageLink=${imageLink}&prompt=${categoryStyles[styleSelectedIndex].prompt}&n_prompt=${categoryStyles[styleSelectedIndex].negative_prompt}&image_resolution=896&preprocessor_resolution=896&modelName=${modelName}&ddim_steps=${categoryStyles[styleSelectedIndex].ddim_steps}&strength=${categoryStyles[styleSelectedIndex].strength}`);
            const result = await res.data;
            if (Array.isArray(result) && result.length > 0) {
                setGeneratedImageURL(result[1]);
                setIsWaitStatus(false);
                let image = new Image();
                image.src = result[1];
                image.onload = async function () {
                    const naturalWidthTemp = this.naturalWidth;
                    const naturalHeightTemp = this.naturalHeight;
                    setPaintingWidth(naturalWidthTemp);
                    setPaintingHeight(naturalHeightTemp);
                    determine_is_will_the_image_be_moved_and_the_direction_of_displacement(naturalWidthTemp, naturalHeightTemp, imageType);
                    const tempGeneratedImageData = {
                        uploadedImageURL: imageLink,
                        categoryName: categoriesData[categorySelectedIndex].name,
                        styleName: categoryStyles[styleSelectedIndex].name,
                        paintingType: paintingType,
                        position: imageType,
                        size: dimentionsInCm,
                        isExistWhiteBorder: isExistWhiteBorderWithPoster,
                        width: naturalWidthTemp,
                        height: naturalHeightTemp,
                        frameColor: frameColor,
                        generatedImageURL: result[1],
                    }
                    setIsSaveGeneratedImageAndInfo(true);
                    const generatedImageData = await saveNewGeneratedImageData(tempGeneratedImageData);
                    setIsSaveGeneratedImageAndInfo(false);
                    setGeneratedImagePathInMyServer(generatedImageData.generatedImageURL);
                    saveNewGeneratedImageDataInLocalStorage(generatedImageData);
                }
            } else {
                setErrorMsg("Sorry, Something Went Wrong !!");
            }
        }
        catch (err) {
            console.log(err);
            setErrorMsg("Sorry, Something Went Wrong !!");
        }
    }

    const saveNewGeneratedImageData = async (generatedImageData) => {
        const res = await Axios.post(`${process.env.BASE_API_URL}/generated-images/save-new-generated-image-data`, {
            service: "image-to-image",
            uploadedImageURL: generatedImageData.uploadedImageURL,
            categoryName: generatedImageData.categoryName,
            styleName: generatedImageData.styleName,
            paintingType: generatedImageData.paintingType,
            position: generatedImageData.position,
            size: generatedImageData.size,
            isExistWhiteBorder: generatedImageData.isExistWhiteBorder,
            width: generatedImageData.width,
            height: generatedImageData.height,
            frameColor: generatedImageData.frameColor,
            generatedImageURL: generatedImageData.generatedImageURL,
        });
        const result = await res.data;
        return result;
    }

    const saveNewGeneratedImageDataInLocalStorage = (generatedImageData) => {
        let tavlorifyStoreUserGeneratedImagesDataForTextToImage = JSON.parse(localStorage.getItem("tavlorify-store-user-generated-images-data-image-to-image"));
        if (tavlorifyStoreUserGeneratedImagesDataForTextToImage) {
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.push(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-image-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        } else {
            let tavlorifyStoreUserGeneratedImagesDataForTextToImage = [];
            tavlorifyStoreUserGeneratedImagesDataForTextToImage.push(generatedImageData);
            localStorage.setItem("tavlorify-store-user-generated-images-data-image-to-image", JSON.stringify(tavlorifyStoreUserGeneratedImagesDataForTextToImage));
            setGeneratedImagesData(tavlorifyStoreUserGeneratedImagesDataForTextToImage);
        }
    }

    const displayPreviousGeneratedImageInsideArtPainting = async (generatedImageData) => {
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
        setGeneratedImagePathInMyServer(generatedImageData.generatedImageURL);
        await getProductPrice(tempPaintingType, tempPosition, tempImageSize);
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
                        onDragStart={(e) => e.preventDefault()}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            width: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${global_data.framesDimentions[paintingType][imageType][dimentionsInCm].width / 3}px` : `${global_data.framesDimentions[paintingType][imageType][dimentionsInCm].width}px`
                            ) : `${global_data.framesDimentions[paintingType][imageType][dimentionsInCm].width / 10}px`,
                            height: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${global_data.framesDimentions[paintingType][imageType][dimentionsInCm].height / 3}px` : `${global_data.framesDimentions[paintingType][imageType][dimentionsInCm].height}px`
                            ) : `${global_data.framesDimentions[paintingType][imageType][dimentionsInCm].height / 10}px`,
                            cursor: isWillTheImageBeMoved ? "grab" : "",
                        }}
                    >
                        {!isWaitStatus && !errorMsg && generatedImageURL && frameColor !== "none" && <img
                            src={frameImages[paintingType][imageType][frameColor][dimentionsInCm]}
                            alt="Image"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                        />}
                    </div>
                    <div
                        className="image-box d-flex align-items-center justify-content-center"
                        style={{
                            position: "absolute",
                            zIndex: "-1",
                            width: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${(global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].width - 5) / 3}px` : `${global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].width}px`
                            ) : `${(global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].width - 5) / 10}px`,
                            height: !isRoomImageMinimize ? (
                                imageSize === "minimize-image" ? `${global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].height / 3}px` : `${global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].height}px`
                            ) : `${global_data.appearedImageSizesForImageToImage[paintingType]["without-border"][imageType][dimentionsInCm].height / 10}px`,
                            backgroundColor: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "#FFF" : "",
                            boxShadow: isExistWhiteBorderWithPoster === "with-border" && generatedImageURL ? "1px 1px 2px #000, -1px -1px 2px #000" : "",
                            maxWidth: "95%",
                            maxHeight: "97.5%",
                        }}
                    >
                        {isWillTheImageBeMoved && !isMouseDownActivate && imageSize !== "minimize-image" && !isImageInsideRoom && <div
                            className="displacement-icons-box d-flex align-items-center justify-content-center"
                        >
                            {theDirectionOfImageDisplacement === "horizontal" && <CgArrowsHAlt className="displacement-icon" />}
                            {theDirectionOfImageDisplacement === "vertical" && <CgArrowsVAlt className="displacement-icon" />}
                        </div>}
                        <div
                            className="generated-image-box"
                            style={{
                                width: width,
                                height: height,
                                backgroundImage: `url(${generatedImageURL})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
                                backgroundSize: "cover",
                                cursor: isWillTheImageBeMoved ? "grap" : "",
                                maxWidth: "100%",
                                maxHeight: "100%",
                            }}
                        ></div>
                    </div>
                </>}
                {paintingType === "canvas" && <div
                    className={`
                        image-box d-flex align-items-center justify-content-center
                        ${!isImageInsideRoom ? (
                            imageSize !== "minimize-image" ? "canvas-image" : "minimize-canvas-image"
                        ) : ""}
                    `}
                    style={{
                        width: width,
                        height: height,
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
                        style={{
                            width: width,
                            height: height,
                            backgroundImage: `url(${generatedImageURL})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: `${backgroundPosition.x}% ${backgroundPosition.y}%`,
                            backgroundSize: "cover",
                            cursor: isWillTheImageBeMoved ? "grap" : "",
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                    ></div>
                    {isWillTheImageBeMoved && !isMouseDownActivate && imageSize !== "minimize-image" && !isImageInsideRoom && <div
                        className="displacement-icons-box d-flex align-items-center justify-content-center"
                    >
                        {theDirectionOfImageDisplacement === "horizontal" && <CgArrowsHAlt className="displacement-icon" />}
                        {theDirectionOfImageDisplacement === "vertical" && <CgArrowsVAlt className="displacement-icon" />}
                    </div>}
                </div>}
                {isWaitStatus && !errorMsg && <span className="loader"></span>}
                {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
            </div>
        );
    }

    const getImageInsideRoomBox = (roomNumber, imageSize) => {
        return (
            (imageMode === `image-inside-room${roomNumber}` || imageSize === "minimize-room-image") && !isWaitStatus && !errorMsg && generatedImageURL && <div
                className={`room${roomNumber}-image-box room-image-box mx-auto border border-2 border-dark mb-4`}
                onClick={() => handleDisplayImageMode(`image-inside-room${roomNumber}`)}
                style={
                    {
                        backgroundColor: isWaitStatus ? "#989492" : "",
                        cursor: !isWaitStatus && imageSize === "minimize-room-image" ? "pointer" : "",
                    }
                }
            >
                {roomNumber === 1 && <img src={room1Image.src} alt="Room Image1 !!" />}
                {roomNumber === 2 && <img src={room2Image.src} alt="Room Image2 !!" />}
                {getArtPaintingBox(
                    imageSize === "minimize-room-image" ? `${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width / 10}px` : `${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width / 3}px`,
                    imageSize === "minimize-room-image" ? `${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height / 10}px` : `${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height / 3}px`,
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
            setProductPriceAfterDiscount(result.priceBeforeDiscount);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        // Start Image To Image Page
        <div className="image-to-image-service">
            <Head>
                <title>Tavlorify Store - Image To Image</title>
            </Head>
            <Header newTotalProductsCount={newTotalProductsCount} />
            {/* Start Page Content */}
            <div className="page-content">
                {/* Start Container */}
                <div className="container-fluid pt-4 pb-4">
                    <h1 className="text-center mb-4 welcome-msg pb-3">Welcome To You In Image To Image AI Service</h1>
                    {/* Start Grid System */}
                    <div className="row align-items-center">
                        {/* Start Column */}
                        <div className="col-xl-2">
                            {/* Start Art Painting Box */}
                            {getArtPaintingBox(`${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width / 3}px`, `${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height / 3}px`, "minimize-image", false)}
                            {/* End Art Painting Box */}
                            {getImageInsideRoomBox(1, "minimize-room-image")}
                            {getImageInsideRoomBox(2, "minimize-room-image")}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-xl-5">
                            {/* Start Art Painting Section */}
                            {getArtPaintingBox(`${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].width}px`, `${global_data.appearedImageSizesForImageToImage[paintingType][isExistWhiteBorderWithPoster][imageType][dimentionsInCm].height}px`, undefined, false)}
                            {/* End Art Painting Section */}
                            {getImageInsideRoomBox(1, undefined)}
                            {getImageInsideRoomBox(2, undefined)}
                            {isSaveGeneratedImageAndInfo && !errorMsg && <p className="alert alert-danger mt-5 text-center">Saving Generated Image Now ...</p>}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-xl-5">
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
                                <button className="btn btn-dark w-50 mx-auto d-block" onClick={imageToImageGenerateByAI}>Create</button>
                            }
                            {isWaitStatus && <button className="btn btn-dark w-50 mx-auto d-block" disabled>Creating ...</button>}
                            <hr className="mb-2 mt-2" />
                            {/* Start Art Painting Options Section */}
                            <section className="art-painting-options pe-3 mb-3">
                                <h6 className="mb-3 fw-bold option-section-name">Please Select Category</h6>
                                {/* Start Categories Section */}
                                <section className="categories mb-4">
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
                                <h6 className="mb-3 fw-bold option-section-name">Please Select Style</h6>
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
                                                        alt="aa"
                                                        className="mb-2 style-image"
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
                                    <h6 className="fw-bold option-section-name">Positions</h6>
                                    {/* Start Positions List */}
                                    <ul className="positions-list mb-4 text-center">
                                        <li
                                            className="p-3"
                                            style={
                                                {
                                                    border: imageType === "vertical" ? "4px solid #000" : "",
                                                    fontWeight: imageType === "vertical" ? "bold" : "",
                                                    textDecoration: imageType !== "vertical" ? "line-through" : "",
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
                                                    textDecoration: imageType !== "horizontal" ? "line-through" : "",
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
                                                    textDecoration: imageType !== "square" ? "line-through" : "",
                                                }
                                            }
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
                                    {(paintingType === "poster" || paintingType === "poster-with-wooden-frame" || paintingType === "poster-with-hangers") && <h6 className="fw-bold">Frames</h6>}
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
                                            <img src={blackFrameCornerImage.src} alt="Black Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "white" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "white")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">White</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "natural-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Wood</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "dark-wood" && paintingType === "poster-with-wooden-frame") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-wooden-frame", "dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Dark Wood</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "black" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "black")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Black With Hangers</span>
                                            <img src={blackFrameCornerImage.src} alt="Black Frame With Hangers Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "white" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "white")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">White With Hangers</span>
                                            <img src={whiteFrameCornerImage.src} alt="White Frame With Hangers Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "natural-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "natural-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Wood With Hangers</span>
                                            <img src={woodFrameCornerImage.src} alt="Wood Frame With Hangers Image" width="50" />
                                        </li>
                                        <li
                                            className="p-2"
                                            style={(frameColor === "dark-wood" && paintingType === "poster-with-hangers") ? { border: "4px solid #000", fontWeight: "bold" } : {}}
                                            onClick={() => handleSelectFrame("poster-with-hangers", "dark-wood")}
                                        >
                                            <span className="frame-color d-block fw-bold mb-2">Dark Wood With Hangers</span>
                                            <img src={darkWoodFrameCornerImage.src} alt="Dark Wood Frame With Hangers Image" width="50" />
                                        </li>
                                    </ul>}
                                    {/* End Frames List */}
                                </section>
                                {/* End Displaying Art Painting Options Section */}
                            </section>
                            {/* End Art Painting Options Section */}
                            {/* Start Add To Cart Managment */}
                            <div className="add-to-cart-box">
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
                            </div>
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
                            {generatedImagesData ? <ul className="generated-images-list text-center d-flex p-4">
                                {generatedImagesData.map((generatedImageData) => (
                                    <li
                                        className="generated-images-item m-0 me-4"
                                        key={generatedImageData._id}
                                        onClick={() => displayPreviousGeneratedImageInsideArtPainting(generatedImageData)}
                                    >
                                        <img
                                            src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                            alt="Generated Image !!"
                                            className="generated-image"
                                        />
                                    </li>
                                ))}
                            </ul> : <p className="alert alert-danger m-0">Sorry, Can't Find Any Generated Images From You !!</p>}
                        </div>
                    </section>
                    {/* Start Generated Images Section */}
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