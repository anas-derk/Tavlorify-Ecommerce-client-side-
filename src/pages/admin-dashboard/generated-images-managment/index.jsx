import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import axios from "axios";
import { useEffect, useState } from "react";
import LoaderPage from "@/components/LoaderPage";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";
import { getAdminInfo, getDateFormated } from "../../../../public/global_functions/popular";
import PaginationBar from "@/components/PaginationBar";
import { useRouter } from "next/router";

export default function GeneratedImagesManagment({ pageName }) {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [allGeneratedImagesDataInsideThePage, setAllGeneratedImagesDataInsideThePage] = useState([]);

    const [isGetGeneratedImages, setIsGetGeneratedImages] = useState(false);

    const [selectedGeneratedImageIndex, setSelectedGeneratedImageIndex] = useState(-1);

    const [waitMsg, setWaitMsg] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPagesCount, setTotalPagesCount] = useState(0);

    const pageSize = 10;

    const router = useRouter();

    useEffect(() => {
        setIsLoadingPage(true);
        setAllGeneratedImagesDataInsideThePage([]);
        setTotalPagesCount(0);
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            getAdminInfo()
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    } else {
                        result = await getGeneratedImagesDataCount(pageName);
                        console.log((await getAllGeneratedImagesDataInsideThePage(pageName, 1, pageSize)).data)
                        if (result.data > 0) {
                            setAllGeneratedImagesDataInsideThePage((await getAllGeneratedImagesDataInsideThePage(pageName, 1, pageSize)).data);
                            setTotalPagesCount(Math.ceil(result.data / pageSize));
                        }
                        setIsLoadingPage(false);
                    }
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        await router.replace("/admin-dashboard/login");
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else router.replace("/admin-dashboard/login");
    }, [pageName]);

    const getGeneratedImagesDataCount = async (service) => {
        try {
            return (await axios.get(`${process.env.BASE_API_URL}/generated-images/generated-images-count?service=${service}`)).data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const getAllGeneratedImagesDataInsideThePage = async (pageName, pageNumber, pageSize) => {
        try {
            return (await axios.get(`${process.env.BASE_API_URL}/generated-images/all-generated-images-inside-the-page?service=${pageName}&pageNumber=${pageNumber}&pageSize=${pageSize}`)).data;
        }
        catch (err) {
            throw Error(err);
        }
    }

    const downloadImage = async (URL, imageType, selectedGeneratedImageIndex) => {
        try {
            setSelectedGeneratedImageIndex(selectedGeneratedImageIndex);
            if (imageType === "uploaded-image") setWaitMsg("Downloading Uploaded Image ...");
            else setWaitMsg("Downloading Generated Image Now ...");
            const res = await axios.get(URL, { responseType: "blob" });
            const imageAsBlob = res.data;
            const localURL = window.URL.createObjectURL(imageAsBlob);
            const tempAnchorLink = document.createElement("a");
            tempAnchorLink.href = localURL;
            tempAnchorLink.download = "generated-image.png";
            tempAnchorLink.click();
            setWaitMsg("");
            setSelectedGeneratedImageIndex(-1);
        } catch (err) {
            if (imageType === "uploaded-image") setWaitMsg("");
            else setWaitMsg("");
            setSelectedGeneratedImageIndex(-1);
        }
    }

    const deleteGeneratedImageData = async (selectedGeneratedImageIndex) => {
        try {
            setWaitMsg("Please Wait Deleting ...");
            setSelectedGeneratedImageIndex(selectedGeneratedImageIndex);
            const res = await axios.delete(`${process.env.BASE_API_URL}/generated-images/generated-image-data/${generatedImagesData[selectedGeneratedImageIndex]._id}`);
            let result = res.data;
            setWaitMsg("");
            setSelectedGeneratedImageIndex(-1);
            result = await getGeneratedImagesDataCount(pageName);
            if (result.data > 0) {
                setAllGeneratedImagesDataInsideThePage((await getAllGeneratedImagesDataInsideThePage(pageName, 1, pageSize)).data);
                setTotalPagesCount(Math.ceil(result.data / pageSize));
            }
        }
        catch (err) {
            if (err?.response?.data?.msg === "Unauthorized Error") {
                localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                await router.push("/admin-dashboard/login");
                return;
            }
            setWaitMsg("");
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again !!");
            let errorTimeout = setTimeout(() => {
                setErrorMsg("");
                setSelectedGeneratedImageIndex(-1);
                clearTimeout(errorTimeout);
            }, 2000);
        }
    }

    const getPreviousPage = async () => {
        setIsGetGeneratedImages(true);
        const newCurrentPage = currentPage - 1;
        setAllGeneratedImagesDataInsideThePage((await getAllGeneratedImagesDataInsideThePage(pageName, newCurrentPage, pageSize)).data);
        setCurrentPage(newCurrentPage);
        setIsGetGeneratedImages(false);
    }

    const getNextPage = async () => {
        setIsGetGeneratedImages(true);
        const newCurrentPage = currentPage + 1;
        setAllGeneratedImagesDataInsideThePage((await getAllGeneratedImagesDataInsideThePage(pageName, newCurrentPage, pageSize)).data);
        setCurrentPage(newCurrentPage);
        setIsGetGeneratedImages(false);
    }

    const getSpecificPage = async (pageNumber) => {
        setIsGetGeneratedImages(true);
        setAllGeneratedImagesDataInsideThePage((await getAllGeneratedImagesDataInsideThePage(pageName, pageNumber, pageSize)).data);
        setCurrentPage(pageNumber);
        setIsGetGeneratedImages(false);
    }

    return (
        <div className="generated-images-managment">
            <Head>
                <title>Tavlorify Store - {pageName} Generated Images Data Managment</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <ControlPanelHeader />
                <div className="content text-center pt-4 pb-4">
                    <div className="container-fluid">
                        <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Generated Images Data Managment For {pageName} Page</h1>
                        {allGeneratedImagesDataInsideThePage.length && !isGetGeneratedImages && <div className="generated-images-data-box p-3 mb-2 data-box">
                            <table className="generated-images-data-tabel data-table">
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
                                    {allGeneratedImagesDataInsideThePage.map((generatedImageData, generatedImageIndex) => (
                                        <tr key={generatedImageIndex}>
                                            <td className="fw-bold">{pageSize * (currentPage - 1) + generatedImageIndex + 1}</td>
                                            {pageName === "image-to-image" && <td className="uploaded-image-cell">
                                                <img
                                                    src={generatedImageData.uploadedImageURL}
                                                    alt="Generated Image !!"
                                                    width="100"
                                                    height="100"
                                                    className="d-block mx-auto mb-3"
                                                />
                                                {selectedGeneratedImageIndex !== generatedImageIndex && <button
                                                    className="btn btn-success"
                                                    onClick={() => downloadImage(generatedImageData.uploadedImageURL, "uploaded-image", generatedImageIndex)}
                                                >
                                                    Download
                                                </button>}
                                                {selectedGeneratedImageIndex === generatedImageIndex && waitMsg === "Downloading Uploaded Image ..." && <button
                                                    className="btn btn-info"
                                                    disabled
                                                >
                                                    {waitMsg}
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
                                                    src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImagePath}`}
                                                    alt="Generated Image !!"
                                                    width="100"
                                                    height="100"
                                                    className="d-block mx-auto mb-3"
                                                />
                                                {selectedGeneratedImageIndex !== generatedImageIndex && <button
                                                    className="btn btn-success d-block mx-auto mb-3"
                                                    onClick={() => downloadImage(`${process.env.BASE_API_URL}/${generatedImageData.generatedImagePath}`, "generated-image", generatedImageIndex)}
                                                >
                                                    Download
                                                </button>}
                                                {selectedGeneratedImageIndex === generatedImageIndex && waitMsg === "Downloading Generated Image Now ..." && <button
                                                    className="btn btn-info d-block mx-auto mb-3"
                                                    disabled
                                                >
                                                    {waitMsg}
                                                </button>}
                                                {selectedGeneratedImageIndex !== generatedImageIndex && <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteGeneratedImageData(generatedImageIndex)}
                                                >
                                                    Delete
                                                </button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                        {allGeneratedImagesDataInsideThePage.length == 0 && <p className="alert alert-danger">Sorry, Can't Find Any Generated Images !!</p>}
                        {isGetGeneratedImages && <div className="loader-table-box d-flex flex-column align-items-center justify-content-center">
                            <span className="loader-table-data"></span>
                        </div>}
                        {totalPagesCount > 1 && !isGetGeneratedImages &&
                            <PaginationBar
                                totalPagesCount={totalPagesCount}
                                currentPage={currentPage}
                                getPreviousPage={getPreviousPage}
                                getNextPage={getNextPage}
                                getSpecificPage={getSpecificPage}
                            />
                        }
                    </div>
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
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