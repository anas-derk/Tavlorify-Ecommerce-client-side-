function getDateFormated(date) {
    let generateDateInDateFormat = new Date(date);
    const year = generateDateInDateFormat.getFullYear();
    const month = generateDateInDateFormat.getMonth() + 1;
    const day = generateDateInDateFormat.getDate();
    generateDateInDateFormat = `${year} / ${month} / ${day}`;
    return `${year} / ${month} / ${day}`;
}

export {
    getDateFormated,
}