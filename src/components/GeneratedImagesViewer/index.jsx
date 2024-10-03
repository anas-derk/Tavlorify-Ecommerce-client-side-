import { getAppearedSlidesCount } from "../../../public/global_functions/popular";
import global_data from "../../../public/data/global";
import Slider from "react-slick";
import { Fragment } from "react";
import { TiDeleteOutline } from "react-icons/ti";

export default function GeneratedImagesViewer({
    generatedImagesData,
    windowInnerWidth,
    displayPreviousGeneratedImageInsideArtPainting,
    setGeneratedImagesData,
    setIsShowMoreGeneratedImages,
    selectedPreviousGeneratedImageIndex,
    serviceName
}) {

    const deleteGeneratedImageData = (generatedImageDataIndex) => {
        let newTavlorifyStoreUserGeneratedImagesDataForTextToImage = JSON.parse(localStorage.getItem(`tavlorify-store-user-generated-images-data-${serviceName}`)).filter((generatedImageData, index) => index !== generatedImageDataIndex);
        localStorage.setItem(`tavlorify-store-user-generated-images-data-${serviceName}`, JSON.stringify(newTavlorifyStoreUserGeneratedImagesDataForTextToImage));
        setGeneratedImagesData(newTavlorifyStoreUserGeneratedImagesDataForTextToImage);
    }

    return (
        <section className="row align-items-center generated-images mb-5">
            <div className="col-md-2 text-center">
                <h6 className="m-0 fw-bold d-inline">MIN KONST ({generatedImagesData ? generatedImagesData.length : 0})</h6>
            </div>
            <div className="col-md-10">
                <Slider
                    slidesToShow={getAppearedSlidesCount(windowInnerWidth, "generated-images", generatedImagesData.length)}
                    slidesToScroll={getAppearedSlidesCount(windowInnerWidth, "generated-images", generatedImagesData.length)}
                    infinite={false}
                    arrows={true}
                    className="mb-2"
                >
                    {generatedImagesData.map((generatedImageData, index) => (
                        index < 10 && <Fragment key={generatedImageData._id}>
                            <div
                                className="generated-images-item mx-auto mb-5 mt-3"
                                style={{
                                    width: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].width / 4}px`,
                                    height: `${global_data.appearedImageSizesForTextToImage[generatedImageData.paintingType][generatedImageData.isExistWhiteBorder][generatedImageData.position][generatedImageData.size].height / 4}px`
                                }}
                            >
                                <TiDeleteOutline className="delete-icon" onClick={() => deleteGeneratedImageData(index)} />
                                <img
                                    src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                    alt="Generated Image !!"
                                    className={`generated-image ${selectedPreviousGeneratedImageIndex === index ? "selected-image" : ""}`}
                                    onDragStart={(e) => e.preventDefault()}
                                    onClick={() => displayPreviousGeneratedImageInsideArtPainting(generatedImageData, index)}
                                />
                            </div>
                        </Fragment>
                    ))}
                    {generatedImagesData.length > 10 && <button className="show-more-generate-images-btn btn btn-dark" onClick={() => setIsShowMoreGeneratedImages(true)}>Visa mer</button>}
                </Slider>
            </div>
        </section>
    );
}