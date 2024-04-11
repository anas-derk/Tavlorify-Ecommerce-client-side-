import axios from "axios";

function getDateFormated(date) {
    let generateDateInDateFormat = new Date(date);
    const year = generateDateInDateFormat.getFullYear();
    const month = generateDateInDateFormat.getMonth() + 1;
    const day = generateDateInDateFormat.getDate();
    generateDateInDateFormat = `${year} / ${month} / ${day}`;
    return `${year} / ${month} / ${day}`;
}

async function getAllImageToImageCategories() {
    try{
        const res = await axios.get(`${process.env.BASE_API_URL}/image-to-image/categories/all-categories-data`);
        return res.data;
    }
    catch(err) {
        throw Error(err);
    }
}

export {
    getDateFormated,
    getAllImageToImageCategories,
}