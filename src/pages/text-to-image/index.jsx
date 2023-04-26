import Head from "next/head";
import Header from "@/components/Header";
import { IoSearchCircleSharp } from "react-icons/io5";
import backImg1 from "../../../public/images/backgrounds/01.jpg";
import backImg2 from "../../../public/images/backgrounds/02.jpg";
import backImg3 from "../../../public/images/backgrounds/03.jpg";
import { useState } from "react";
import Axios from "axios";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("");

    const [generatedImageURLs, setGeneratedImageURLs] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const textToImageGenerate = (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        Axios.get(`http://localhost:4000/api/text-to-image-generate?textPrompt=${textPrompt}`)
        .then((res) => {
            let imageURLs = res.data;
            setIsWaitStatus(false);
            if (imageURLs.length > 0) {
                setGeneratedImageURLs(imageURLs);
            }
        })
        .catch((err) => setErrorMsg("Sorry, Something Went Wrong !!"));
    }

    return (
        // Start Text To Image Service Page
        <div className="text-to-image-service">
            <Head>
                <title>Tavlorify Store - Text To Image</title>
            </Head>
            <Header />
            {/* Start Custom Container */}
            <div className="custom-container pt-5 pb-4">
                <h3 className="text-center mb-5">Welcome To You In Text To Image AI Service</h3>
                {/* Start Text To Image Box */}
                <section className="text-to-image-box p-4 mb-4">
                    <h5 className="text-center mb-4">Enter a Text Prompt</h5>
                    <form
                        className="generate-images-from-text-form text-center"
                        onSubmit={textToImageGenerate}
                    >
                        <input
                            type="text"
                            placeholder="a dog riding a bicycle"
                            className="form-control p-2 mb-2"
                            required
                            onChange={(e) => setTextPrompt(e.target.value)}
                        />
                        <button type="submit" className="btn search-btn">
                            <IoSearchCircleSharp className="search-icon" />
                        </button>
                    </form>
                </section>
                {/* End Text To Image Box */}
                {/* Start Generate Wait Box */}
                {isWaitStatus && <section className="generate-wait-box text-center p-3">
                    <h6 className="wait-message mb-3">Generating The Required Images</h6>
                    <span className="loader max-auto"></span>
                </section>}
                {/* End Generate Wait Box */}
                {/* Start Generated Images Box */}
                {generatedImageURLs.length > 0 && !isWaitStatus && <section className="generated-images-box">
                    <h4 className="text-center mb-4">Generated Images</h4>
                    {/* Start Grid System */}
                    <div className="row">
                        {generatedImageURLs.map((url, index) => (
                            /* Start Column */
                            <div className="col-md-3" key={index}>
                                <div className="generated-image-box">
                                    <img src={url} alt="Generated Image" className="generated-image mb-2" />
                                    <h6 className="generated-image-name text-center">Image #{index + 1}</h6>
                                </div>
                            </div>
                            /* End Column */
                        ))}
                    </div>
                    {/* End Grid System */}
                </section>}
                {/* End Generated Images Box */}
                {errorMsg && <p className="alert alert-danger">Sorry, Can't Generating From This Text !</p>}
            </div>
            {/* End Custom Container */}
        </div>
        // End Text To Image Page
    );
}

export default TextToImage;