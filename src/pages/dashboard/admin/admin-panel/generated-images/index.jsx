import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";

const GeneratedImages = ({ pageName, generatedImagesData }) => {
    return (
        <div className="generated-images">
            <Head>
                <title>Tavlorify Store - Generated Images</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Generated Images For Text To Image Page</h1>
                    
                </div>
            </div>
        </div>
    );
}

export default GeneratedImages;