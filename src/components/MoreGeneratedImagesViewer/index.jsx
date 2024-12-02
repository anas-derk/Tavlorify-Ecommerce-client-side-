import { GrFormClose } from "react-icons/gr"
import global_data from "../../../public/data/global"

export default function MoreGeneratedImagesViewer({
    generatedImagesData,
    setIsShowMoreGeneratedImages,
    displayPreviousGeneratedImageInsideArtPainting,
    selectedPreviousGeneratedImageIndex
}) {
    return (
        <div className="overlay">
            <div className="rest-generated-images-box d-flex flex-column align-items-center justify-content-center p-4">
                <GrFormClose className="close-overlay-icon" onClick={() => setIsShowMoreGeneratedImages(false)} />
                <h3 className="fw-bold border-bottom border-2 border-dark pb-2 mb-5">MIN KONST</h3>
                <ul className="generated-images-list w-100 p-4">
                    {generatedImagesData.map((generatedImageData, index) => (
                        index > 9 && <li
                            className="generated-images-item m-0"
                            key={generatedImageData._id}
                            onClick={() => {
                                displayPreviousGeneratedImageInsideArtPainting(generatedImageData, index);
                                setIsShowMoreGeneratedImages(false);
                            }}
                            style={{
                                width: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].width / 4}px`,
                                height: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].height / 4}px`
                            }}
                        >
                            <img
                                src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                alt="Generated Image !!"
                                className={`generated-image ${selectedPreviousGeneratedImageIndex === index ? "selected-image" : ""}`}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}