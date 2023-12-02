import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";
import { useEffect, useState } from "react";
import { BsArrowLeftSquare, BsArrowRightSquare } from "react-icons/bs";

export default function GeneratedImagesManagment({ pageName }) {
    const [allGeneratedImagesData, setAllGeneratedImagesData] = useState([]);
    const [selectedImageIndexForDownload, setSelectedImageIndexForDownload] = useState(-1);
    const [isDownloadUploadedImage, setIsDownloadUploadedImage] = useState(false);
    const [isDownloadGeneratedImage, setIsDownloadGeneratedImage] = useState(false);
    const [selectedGeneratedImageDataIndexForDelete, setSelectedGeneratedImageDataIndexForDelete] = useState(-1);
    const [isDeleteGeneratedImageData, setIsDeleteGeneratedImageData] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPagesCount, setTotalPagesCount] = useState(0);
    const [currentSliceFromGeneratedImageDataList, setCurrentSliceFromGeneratedImageDataList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const pageSize = 3;
    useEffect(() => {
        setAllGeneratedImagesData([]);
        setTotalPagesCount(0);
        setCurrentSliceFromGeneratedImageDataList([]);
        getAllGeneratedImagesData()
            .then((result) => {
                if (result.length > 0) {
                    setAllGeneratedImagesData(result);
                    setTotalPagesCount(Math.ceil(result.length / pageSize));
                    getCurrentSliceFromGeneratedImageDataList(currentPage, result);
                }
            });
    }, [pageName]);
    const getAllGeneratedImagesData = async () => {
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/generated-images/specific-generated-images-data?service=${pageName}`);
            const result = await res.data;
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }
    const getDateFormated = (generateDate) => {
        let generateDateInDateFormat = new Date(generateDate);
        const year = generateDateInDateFormat.getFullYear();
        const month = generateDateInDateFormat.getMonth() + 1;
        const day = generateDateInDateFormat.getDate();
        generateDateInDateFormat = `${year} / ${month} / ${day}`;
        return generateDateInDateFormat;
    }
    const downloadImage = async (URL, imageType, selectedImageIndexForDownload) => {
        try {
            setSelectedImageIndexForDownload(selectedImageIndexForDownload);
            if (imageType === "uploaded-image") setIsDownloadUploadedImage(true);
            else setIsDownloadGeneratedImage(true);
            const res = await Axios.get(URL, { responseType: "blob" });
            const imageAsBlob = await res.data;
            const localURL = window.URL.createObjectURL(imageAsBlob);
            const tempAnchorLink = document.createElement("a");
            tempAnchorLink.href = localURL;
            tempAnchorLink.download = "generated-image.png";
            tempAnchorLink.click();
            setIsDownloadUploadedImage(false);
            setSelectedImageIndexForDownload(-1);
        } catch (err) {
            if (imageType === "uploaded-image") setIsDownloadUploadedImage(false);
            else setIsDownloadGeneratedImage(false);
            setSelectedImageIndexForDownload(-1);
            console.log(err);
        }
    }
    const deleteGeneratedImageData = async (index) => {
        try {
            setIsDeleteGeneratedImageData(true);
            setSelectedGeneratedImageDataIndexForDelete(index);
            const res = await Axios.delete(`${process.env.BASE_API_URL}/generated-images/generated-image-data/${generatedImagesData[index]._id}`);
            const result = await res.data;
            console.log(result);
            setIsDeleteGeneratedImageData(false);
            setSelectedGeneratedImageDataIndexForDelete(-1);
            const allGeneratedImagesData = await getAllGeneratedImagesData();
            setAllGeneratedImagesData(allGeneratedImagesData);
            setTotalPagesCount(Math.ceil(allGeneratedImagesData.length / pageSize));
            getCurrentSliceFromGeneratedImageDataList(currentPage, allGeneratedImagesData);
        }
        catch (err) {
            setSelectedGeneratedImageDataIndexForDelete(-1);
            console.log(err);
        }
    }
    const getCurrentSliceFromGeneratedImageDataList = (currentPage, allGeneratedImagesData) => {
        setCurrentPage(currentPage);
        const startPageIndex = (currentPage - 1) * pageSize;
        const endPageIndex = startPageIndex + pageSize;
        setCurrentSliceFromGeneratedImageDataList(allGeneratedImagesData.slice(startPageIndex, endPageIndex));
    }
    const getPreviousPage = () => {
        const newCurrentPage = currentPage - 1;
        setCurrentPage(newCurrentPage);
        getCurrentSliceFromGeneratedImageDataList(newCurrentPage, allGeneratedImagesData);
    }
    const getNextPage = () => {
        const newCurrentPage = currentPage + 1;
        setCurrentPage(newCurrentPage);
        getCurrentSliceFromGeneratedImageDataList(newCurrentPage, allGeneratedImagesData);
    }
    const paginationBar = () => {
        const paginationButtons = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            if (i < 11) {
                paginationButtons.push(
                    <button
                        key={i}
                        className={`pagination-button me-3 p-2 ps-3 pe-3 ${currentPage === i ? "selection" : ""} ${i === 1 ? "ms-3" : ""}`}
                        onClick={() => getCurrentSliceFromGeneratedImageDataList(i, allGeneratedImagesData)}
                    >
                        {i}
                    </button>
                );
            }
        }
        if (totalPagesCount > 10) {
            paginationButtons.push(
                <span className="me-3 fw-bold" key={`${Math.random()}-${Date.now()}`}>...</span>
            );
            paginationButtons.push(
                <button
                    key={totalPagesCount}
                    className={`pagination-button me-3 p-2 ps-3 pe-3 ${currentPage === totalPagesCount ? "selection" : ""}`}
                    onClick={() => getCurrentSliceFromGeneratedImageDataList(totalPagesCount, allGeneratedImagesData)}
                >
                    {totalPagesCount}
                </button>
            );
        }
        return (
            <section className="pagination d-flex justify-content-center align-items-center">
                {currentPage !== 1 && <BsArrowLeftSquare
                    className="previous-page-icon pagination-icon"
                    onClick={getPreviousPage}
                />}
                {paginationButtons}
                {currentPage !== totalPagesCount && <BsArrowRightSquare
                    className="next-page-icon pagination-icon me-3"
                    onClick={getNextPage}
                />}
                <span className="current-page-number-and-count-of-pages p-3 bg-secondary text-white me-3">The Page { currentPage } of { totalPagesCount } Pages</span>
                <form
                    className="navigate-to-specific-page w-25"
                    onSubmit={(e) => {
                        e.preventDefault();
                        getCurrentSliceFromGeneratedImageDataList(pageNumber, allGeneratedImagesData);
                    }}
                >
                    <input
                        type="number"
                        className="form-control p-2"
                        placeholder="Enter Page Number"
                        min="1"
                        max={totalPagesCount}
                        onChange={(e) => setPageNumber(e.target.valueAsNumber)}
                    />
                </form>
            </section>
        );
    }

    return (
        <div className="generated-images-managment">
            <Head>
                <title>Tavlorify Store - Generated Images Data Managment</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Generated Images Data Managment For {pageName} Page</h1>
                    {currentSliceFromGeneratedImageDataList.length > 0 && <div className="generated-images-data-box p-3 mb-2">
                        <table className="generated-images-data-tabel">
                            <thead>
                                <tr>
                                    <th>Number</th>
                                    {pageName === "image-to-image" && <th>uploaded Image</th>}
                                    {pageName === "text-to-image" && <th>Text Prompt</th>}
                                    <th>Category Name</th>
                                    <th>Style Name</th>
                                    <th>Painting Type</th>
                                    <th>Is Exist White Border</th>
                                    <th>Generating Date</th>
                                    <th>Generated Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSliceFromGeneratedImageDataList.map((generatedImageData, index) => (
                                    <tr key={index}>
                                        <td className="fw-bold">{index + 1}</td>
                                        {pageName === "image-to-image" && <td className="uploaded-image-cell">
                                            <img
                                                src={generatedImageData.uploadedImageURL}
                                                alt="Generated Image !!"
                                                width="100"
                                                height="100"
                                                className="d-block mx-auto mb-3"
                                            />
                                            {selectedImageIndexForDownload !== index && <button
                                                className="btn btn-success"
                                                onClick={() => downloadImage(generatedImageData.uploadedImageURL, "uploaded-image", index)}
                                            >
                                                Download
                                            </button>}
                                            {selectedImageIndexForDownload === index && isDownloadUploadedImage && <button
                                                className="btn btn-info"
                                                disabled
                                            >
                                                Download Now ...
                                            </button>}
                                        </td>}
                                        {pageName === "text-to-image" && <td className="text-prompt-cell">{generatedImageData.textPrompt}</td>}
                                        <td className="category-name-cell">{generatedImageData.categoryName}</td>
                                        <td className="style-name-cell">{generatedImageData.styleName}</td>
                                        <td className="painting-type-cell">
                                            <h6>{generatedImageData.paintingType}</h6>
                                            <hr />
                                            <h6>{generatedImageData.position}</h6>
                                            <hr />
                                            <h6>{generatedImageData.size}</h6>
                                        </td>
                                        <td className="is-exist-white-border-cell">{generatedImageData.isExistWhiteBorder}</td>
                                        <td>{getDateFormated(generatedImageData.imageGenerationDate)}</td>
                                        <td>
                                            <img
                                                src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                                alt="Generated Image !!"
                                                width="100"
                                                height="100"
                                                className="d-block mx-auto mb-3"
                                            />
                                            {selectedImageIndexForDownload !== index && <button
                                                className="btn btn-success d-block mx-auto mb-3"
                                                onClick={() => downloadImage(`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`, "generated-image", index)}
                                            >
                                                Download
                                            </button>}
                                            {selectedImageIndexForDownload === index && isDownloadGeneratedImage && <button
                                                className="btn btn-info d-block mx-auto mb-3"
                                                disabled
                                            >
                                                Downloading Now ...
                                            </button>}
                                            {selectedGeneratedImageDataIndexForDelete !== index && <button
                                                className="btn btn-danger"
                                                onClick={() => deleteGeneratedImageData(index)}
                                            >
                                                Delete
                                            </button>}
                                            {selectedGeneratedImageDataIndexForDelete === index && isDeleteGeneratedImageData && <button
                                                className="btn btn-info"
                                                disabled
                                            >
                                                Deleting Now ...
                                            </button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                    {allGeneratedImagesData.length == 0 && <p className="alert alert-danger">Sorry, Can't Find Any Generated Images !!</p>}
                    {totalPagesCount > 0 && paginationBar()}
                </div>
            </div>
        </div>
    );
}

export function getServerSideProps(context) {
    return {
        props: {
            pageName: context.query.pageName
        }
    };
}