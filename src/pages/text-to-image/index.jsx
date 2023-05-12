import Head from "next/head";
import Header from "@/components/Header";
import { IoSearchCircleSharp } from "react-icons/io5";
import { useState } from "react";
import Axios from "axios";
import animeImg from "../../../public/images/categories/anime.webp";

const TextToImage = () => {

    const [textPrompt, setTextPrompt] = useState("");

    const [generatedImageURLs, setGeneratedImageURLs] = useState([]);

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    const [categorySelectedIndex, setCategorySelectedIndex] = useState(0);

    const [styleSelectedIndex, setStyleSelectedIndex] = useState(0);

    const categoriesData = [
        {
            imgSrc: animeImg.src,
            name: "Art",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Epic Origami",
                    prompt: "Origami paper folds papercraft, made of paper, stationery, 8K resolution 64 megapixels soft focus",
                    negative_prompt: "dubbing, Double, compact car, Ugly car, idle car, bad car, Two cars combined, camera, canon, multiple breasts,(mutated hands and fingers:1.5),(long body:1.3),(mutation, poorly drawn:1.2),black-white, bad anatomy, liquid body, liquid tongue, disfigured, malformed, mutated, anatomical nonsense, text font ui, error, malformed hands, long neck, blurred, lowers, bad anatomy, bad proportions, bad shadow, uncoordinated body, unnatural body, fused breasts, bad breasts, huge breasts, poorly drawn breasts, extra breasts, liquid breasts, heavy breasts, missing breasts, huge haunch, huge thighs, huge calf, bad hands, fused hand, missing hand, disappearing arms, disappearing thigh, disappearing calf, disappearing legs, fused ears, bad ears, poorly drawn ears, extra ears, liquid ears, heavy ears, missing ears, fused animal ears, bad animal ears, poorly drawn animal ears, extra animal ears, liquid animal ears, heavy animal ears, missing animal ears, text, ui, error, missing fingers, missing limb, fused fingers, one hand with more than 5 fingers, one hand with less than 5 fingers, one hand with more than 5 digit, one hand with less than 5 digit, extra digit, fewer digits, fused digit, missing digit, bad digit, liquid digit, colorful tongue, black tongue, cropped, watermark, username, blurry, malformed feet, extra feet, bad feet, poorly drawn feet, fused feet, missing feet, extra shoes, bad shoes, fused shoes, more than two shoes, poorly drawn shoes, bad gloves, poorly drawn gloves, fused gloves, bad cum, poorly drawn cum, fused cum, bad hairs, poorly drawn hairs, fused hairs, big muscles, ugly, bad face, fused face, poorly drawn face, cloned face, big face, long face, bad eyes, fused eyes poorly drawn eyes, extra eyes, malformed limbs, more than 2 nipples, missing nipples, different nipples, fused nipples, bad nipples, poorly drawn nipples, black nipples, colorful nipples, gross proportions. short arm, (((missing arms))), missing thighs, missing calf, missing legs, mutation, duplicate, morbid, mutilated, poorly drawn hands, more than 1 left hand, more than 1 right hand, deformed,(blurry), disfigured, missing legs, extra arms, extra thighs, more than 2 thighs, extra calf, fused calf, extra legs, bad knee, extra knee, more than 2 legs, bad tails, bad mouth, fused mouth, poorly drawn mouth, bad tongue, tongue within mouth, too long tongue, black tongue, big mouth, cracked mouth, bad mouth, dirty face, dirty teeth, dirty pantie, fused pantie, poorly drawn pantie, fused cloth, poorly drawn cloth, bad pantie, yellow teeth, thick lips, bad cameltoe, colorful cameltoe, bad asshole, poorly drawn asshole, fused asshole, missing asshole, bad anus, bad pussy, bad crotch, bad crotch seam, fused anus, fused pussy, fused anus, fused crotch, poorly drawn crotch, fused seam, poorly drawn anus, poorly drawn pussy, poorly drawn crotch, poorly drawn crotch seam, bad thigh gap, missing thigh gap, fused thigh gap, liquid thigh gap ,poorly drawn thigh gap, poorly drawn anus, bad collarbone, fused collarbone, missing collarbone, liquid collarbone, strong girl, obesity, worst quality, low quality, normal quality, liquid tentacles, bad tentacles, poorly drawn tentacles, split tentacles, fused tentacles, missing clit, bad clit, fused clit, colorful clit, black clit, liquid clit, ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, bad anatomy, watermark, signature, cut off, low contrast, underexposed, overexposed, bad art, beginner, amateur, distorted face",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Epic Origami",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Color Painting",
                },
                {
                    imgSrc: animeImg.src,
                    name: "abstract art",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Abstract Curves",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Cubist v2",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Cubist",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Detailed Gouache",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Neo Impressionist",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Pop Art",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Candy art",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Oil Painting",
                },
            ],
        },
        {
            imgSrc: animeImg.src,
            name: "Animals",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Cubist v2",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Cubist",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Neo Impressionist",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Pop Art",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Pet Portrait",
                },
            ],
        },
        {
            imgSrc: animeImg.src,
            name: "Photography",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Photo",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Classic Cars Photography",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Pet Portrait",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Food Photography",
                },
            ],
        },
        {
            imgSrc: animeImg.src,
            name: "People",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Artistic Portrait",
                },
                {
                    imgSrc: animeImg.src,
                    name: "B&W Portrait",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Color Portrait",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Striking",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Hyperreal",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Vibrant",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Neo Impressionist",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Pop Art",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Street Pop Art 2",
                },
                {
                    imgSrc: animeImg.src,
                    name: "fauvist portrait painting",
                },
            ],
        },
        {
            imgSrc: animeImg.src,
            name: "Landscape & Nature",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Epic1",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Epic2",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Epic3",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Detailed Gouache",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Neo Impressionist",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Oil Painting",
                },
            ],
        },
        {
            imgSrc: animeImg.src,
            name: "Vehicles",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Sunset Synthwave",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Classic Cars Photography",
                },
            ],
        },
        {
            imgSrc: animeImg.src,
            name: "characters & Anime",
            styles: [
                {
                    imgSrc: animeImg.src,
                    name: "Anime",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Anime v2",
                },
                {
                    imgSrc: animeImg.src,
                    name: "colorful Fantasy",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Dark Fantasy",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Animation Character",
                },
                {
                    imgSrc: animeImg.src,
                    name: "CGI Character",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Animation Character",
                },
                {
                    imgSrc: animeImg.src,
                    name: "Anime portrait",
                },
            ],
        },
    ];

    const textToImageGenerate = (e) => {
        e.preventDefault();
        setIsWaitStatus(true);
        Axios.get(
            `${process.env.BASE_API_URL}/text-to-image-generate?textPrompt=${textPrompt}&prompt=${categoriesData[categorySelectedIndex].styles[styleSelectedIndex].prompt}
            &category=${categoriesData[categorySelectedIndex].name}
        `)
            .then((res) => {
                let imageURLs = res.data;
                console.log(imageURLs);
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
                    {/* Start Grid System */}
                    <section className="row">
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Category */}
                            <h6 className="mb-3">Category</h6>
                            <div className="categories mb-4 d-flex flex-wrap">
                                {categoriesData.map((category, index) => (
                                    /* Start Category Box */
                                    <div
                                        className="category-box text-center"
                                        key={index}
                                        onClick={() => setCategorySelectedIndex(index)}
                                    >
                                        <img
                                            src={category.imgSrc}
                                            alt="Anime Img"
                                            width="75"
                                            height="75"
                                            className="mb-2 category-img"
                                            style={index === categorySelectedIndex ? { border: "2px solid #F00" } : {}}
                                        />
                                        <span className="d-block">{category.name}</span>
                                    </div>
                                    /* End Category Box */
                                ))}
                            </div>
                            {/* End Category */}
                            <hr />
                            {/* Start Styles */}
                            <h6 className="mb-2">Style</h6>
                            <section className="styles mb-4 d-flex flex-wrap">
                                {categoriesData[categorySelectedIndex].styles.map((category, index) => (
                                    /* Start Style Box */
                                    <div
                                        className="style-box text-center"
                                        key={index}
                                        onClick={() => setStyleSelectedIndex(index)}
                                    >
                                        <img
                                            src={category.imgSrc}
                                            alt="Anime Img"
                                            width="75"
                                            height="75"
                                            className="mb-2 category-img"
                                            style={index === styleSelectedIndex ? { border: "2px solid #F00" } : {}}
                                        />
                                        <span className="d-block">{category.name}</span>
                                    </div>
                                    /* End Style Box */
                                ))}
                            </section>
                            {/* End Styles */}
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-6">
                            {/* Start Generated Images Box */}
                            {generatedImageURLs.length > 0 && !isWaitStatus && <section className="generated-images-box">
                                <h4 className="text-center mb-4">Generated Images</h4>
                                {/* Start Grid System */}
                                <div className="row">
                                    {generatedImageURLs.map((url, index) => (
                                        <img src={url} alt="Image" className="created-image" key={index} />
                                    ))}
                                </div>
                                {/* End Grid System */}
                            </section>}
                            {/* End Generated Images Box */}
                        </div>
                        {/* End Column */}
                    </section>
                    {/* End Grid System */}
                    <hr />
                    {/* Start Image Numbers */}
                    <h6 className="mb-3">Number Of Images</h6>
                    <div className="number-of-images mb-4 d-flex select-box">
                        <div className="number-box p-2 text-center">2</div>
                        <div className="number-box p-2 text-center">4</div>
                    </div>
                    {/* End Image Numbers */}
                    <hr />
                    {/* Start Image Dimensions */}
                    <h6 className="mb-3">Image Dimensions</h6>
                    <div className="image-dimensions mb-4 d-flex select-box">
                        <div className="number-box p-2 text-center">640 X 1024</div>
                        <div className="number-box p-2 text-center">640 X 1024</div>
                    </div>
                    {/* End Image Dimensions */}
                </section>
                {/* End Text To Image Box */}
                {/* Start Generate Wait Box */}
                {isWaitStatus && <section className="generate-wait-box text-center p-3">
                    <h6 className="wait-message mb-3">Generating The Required Images</h6>
                    <span className="loader max-auto"></span>
                </section>}
                {/* End Generate Wait Box */}
                {errorMsg && <p className="alert alert-danger">Sorry, Can't Generating From This Text !</p>}
            </div>
            {/* End Custom Container */}
        </div>
        // End Text To Image Page
    );
}

export default TextToImage;