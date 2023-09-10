import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";
import Axios from "axios";

const GeneratedImages = ({ pageName, generatedImagesData }) => {
    return (
        <div className="generated-images-data">
            <Head>
                <title>Tavlorify Store - Generated Images</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Generated Images For { pageName } Page</h1>
                    {generatedImagesData.length > 0 && <div className="generated-images-data-box p-3">
                        <table className="generated-images-data-tabel">
                            <thead>
                                <tr>
                                    {pageName === "image-to-image" && <th>uploaded Image</th>}
                                    {pageName === "text-to-image" && <th>Text Prompt</th>}
                                    <th>Category Name</th>
                                    <th>Style Name</th>
                                    <th>Painting Type</th>
                                    <th>Position</th>
                                    <th>Size</th>
                                    <th>Is Exist White Border</th>
                                    <th>Width</th>
                                    <th>Height</th>
                                    <th>Frame</th>
                                    <th>Generated Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {generatedImagesData.map((generatedImageData, index) => (
                                    <tr key={index}>
                                        {pageName === "image-to-image" && <td className="uploaded-image-cell">
                                            <img
                                                src={generatedImageData.uploadedImageURL}
                                                alt="Generated Image !!"
                                                width="100"
                                                height="100"
                                                className="d-block mx-auto mb-3"
                                            />
                                            <a
                                                href={generatedImageData.uploadedImageURL}
                                                className="btn btn-success"
                                                download
                                            >
                                                Download
                                            </a>
                                        </td>}
                                        {pageName === "text-to-image" && <td className="text-prompt-cell">{generatedImageData.textPrompt}</td>}
                                        <td className="category-name-cell">{generatedImageData.categoryName}</td>
                                        <td className="style-name-cell">{generatedImageData.styleName}</td>
                                        <td className="painting-type-cell">{generatedImageData.paintingType}</td>
                                        <td className="position-cell">{generatedImageData.position}</td>
                                        <td className="size-cell">{generatedImageData.size}</td>
                                        <td className="is-exist-white-border-cell">{generatedImageData.isExistWhiteBorder}</td>
                                        <td className="width-cell">{generatedImageData.width}</td>
                                        <td className="height-cell">{generatedImageData.height}</td>
                                        <td className="frame-cell">{generatedImageData.frameColor}</td>
                                        <td>
                                            <img
                                                src={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                                alt="Generated Image !!"
                                                width="100"
                                                height="100"
                                                className="d-block mx-auto mb-3"
                                            />
                                            <a
                                                href={`${process.env.BASE_API_URL}/${generatedImageData.generatedImageURL}`}
                                                className="btn btn-success"
                                                download
                                            >
                                                Download
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                    {generatedImagesData.length == 0 && <p className="alert alert-danger">Sorry, Can't Find Any Generated Images !!</p>}
                </div>
            </div>
        </div>
    );
}

export default GeneratedImages;

export async function getServerSideProps(context) {
    try {
        const pageName = context.query.pageName;
        const res = await Axios.get(`${process.env.BASE_API_URL}/generated-images/specific-generated-images-data?service=${pageName}`);
        const result = await res.data;
        return {
            props: {
                pageName: pageName,
                generatedImagesData: result,
            }
        }
    }
    catch (err) {
        return {
            props: {
                pageName: pageName,
                generatedImagesData: [],
            }
        }
    }
}