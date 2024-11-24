import axios from "axios";

function getDateFormated(date) {
    let generateDateInDateFormat = new Date(date);
    const year = generateDateInDateFormat.getFullYear();
    const month = generateDateInDateFormat.getMonth() + 1;
    const day = generateDateInDateFormat.getDate();
    return `${generateDateInDateFormat.getFullYear()} / ${generateDateInDateFormat.getMonth() + 1} / ${generateDateInDateFormat.getDate()} - ( ${generateDateInDateFormat.getHours()}: ${generateDateInDateFormat.getMinutes()} )`;
}

async function getAllCategoriesForService(serviceName) {
    try{
        return serviceName === "face-swap" ? {
            msg: "Get All Categories Data For Face Swap Process Has Been Successfully !!",
            error: false,
            data: [{ name: "Man" }, { name: "Pojke" }, { name: "Kvinna" }, { name: "Flicka" }],
        } : (await axios.get(`${process.env.BASE_API_URL}/categories/all-categories-data?service=${serviceName}`)).data;
    }
    catch(err) {
        throw err;
    }
}

async function getAdminInfo() {
    try{
        return (await axios.get(`${process.env.BASE_API_URL}/admins/user-info`, {
            headers: {
                "Authorization": localStorage.getItem(process.env.adminTokenNameInLocalStorage),
            },
        })).data;
    }
    catch(err) {
        throw err;
    }
}

async function addNewCategoryToService(categoryData) {
    try{
        return (await axios.post(`${process.env.BASE_API_URL}/categories/add-new-category`, categoryData, {
            headers: {
                Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
            }
        })).data;
    }
    catch(err) {
        throw err;
    }
}

async function addNewStyleToCategoryInSpecificService(styleData) {
    try{
        return (await axios.post(`${process.env.BASE_API_URL}/styles/add-new-style`, styleData, {
            headers: {
                Authorization: localStorage.getItem(process.env.adminTokenNameInLocalStorage)
            }
        })).data;
    }
    catch(err) {
        throw err;
    }
}

const getStylesForCategoryInService = async (serviceName, categoryName) => {
    try {
        return (await axios.get(`${process.env.BASE_API_URL}/styles/all-styles-data?service=${serviceName}&categoryName=${categoryName}`)).data;
    }
    catch (err) {
        throw err;
    }
}

const handleUploadImage = async (imageData, handleUploadProgress) => {
    try{
        return (await axios.post(`${process.env.BASE_API_URL}/generated-images/upload-image-and-processing`, imageData, {
            onUploadProgress: handleUploadProgress,
        })).data;
    }
    catch(err) {
        throw err;
    }
}

const getAppearedSlidesCount = (windowInnerWidth, sectionName, count) => {
    if (sectionName === "generated-images") {
        if (windowInnerWidth < 322) return 1;
        if (windowInnerWidth >= 322 && windowInnerWidth < 360) return 1;
        if (windowInnerWidth >= 360 && windowInnerWidth < 500 && count >= 2) return 2;
        if (windowInnerWidth >= 500 && windowInnerWidth < 630 && count >= 3) return 3;
        if (windowInnerWidth >= 630 && windowInnerWidth < 900 && count >= 4) return 4;
        if (windowInnerWidth >= 900 && windowInnerWidth < 1000 && count >= 5) return 5;
        if (windowInnerWidth >= 1000 && windowInnerWidth < 1199 && count >= 6) return 6;
        if (windowInnerWidth >= 1199 && count >= 7) return 7;
        return count;
    } else if (sectionName === "categories" || sectionName === "styles") {
        if (windowInnerWidth < 322) return 1;
        if (windowInnerWidth >= 322 && windowInnerWidth < 400 && count >= 2) return 2;
        if (windowInnerWidth > 400 && windowInnerWidth < 500 && count >= 3) return 3;
        if (windowInnerWidth > 500 && count >= 5) return 5;
        return count;
    }
}

export {
    getDateFormated,
    getAllCategoriesForService,
    getAdminInfo,
    addNewCategoryToService,
    addNewStyleToCategoryInSpecificService,
    getStylesForCategoryInService,
    handleUploadImage,
    getAppearedSlidesCount
}