import Head from 'next/head';
import Header from '../components/Header';
import Footer from "@/components/Footer";
/* Start Import Room Images */
import roomImage1 from "../../public/images/MainPage/TextToImage/room.webp";
import roomImage2 from "../../public/images/MainPage/ImageToImage/room.webp";
import roomImage3 from "../../public/images/MainPage/FaceSwap/room.webp";
import roomImage4 from "../../public/images/MainPage/Rooms/1.webp";
import roomImage5 from "../../public/images/MainPage/Rooms/2.webp";
import roomImage6 from "../../public/images/MainPage/Rooms/3.webp";
import roomImage7 from "../../public/images/MainPage/Rooms/4.webp";
import roomImage8 from "../../public/images/MainPage/Rooms/5.webp";
import roomImage9 from "../../public/images/MainPage/Rooms/6.webp";
import roomImage10 from "../../public/images/MainPage/Rooms/7.webp";
import roomImage11 from "../../public/images/MainPage/Rooms/8.webp";
/* End Import Room Images */
/* Start Import Minimize Images */
import minimizeImage1 from "../../public/images/MainPage/TextToImage/1.webp";
import minimizeImage2 from "../../public/images/MainPage/TextToImage/2.webp";
import minimizeImage3 from "../../public/images/MainPage/TextToImage/3.webp";
import minimizeImage4 from "../../public/images/MainPage/ImageToImage/1.webp";
import minimizeImage5 from "../../public/images/MainPage/ImageToImage/2.webp";
import minimizeImage6 from "../../public/images/MainPage/ImageToImage/3.webp";
import minimizeImage7 from "../../public/images/MainPage/FaceSwap/1.webp";
import minimizeImage8 from "../../public/images/MainPage/FaceSwap/2.webp";
import minimizeImage9 from "../../public/images/MainPage/FaceSwap/3.webp";

/* End Import Minimize Images */

export default function Home() {

    const introductionSectionImagesList = [
        {
            roomImageSrc: roomImage1.src,
            roomImageHeading: "SKAPA UNIK AI-KONST",
            roomImageDescription: "Omvandla dina idéer till vackra konstverk med hjälp av AI.",
            minimizeImagesSrc: [minimizeImage1.src, minimizeImage2.src, minimizeImage3.src],
            minimizeImagesDescription: "SKAPA DIN EGEN AI-POSTER",
        },
        {
            roomImageSrc: roomImage2.src,
            roomImageHeading: "OMVANDLA DIN BILD TILL KONST",
            roomImageDescription: "Låt AI väcka dina bilder till liv med en unik konstnärlig touch - Upptäck magin idag!",
            minimizeImagesSrc: [minimizeImage4.src, minimizeImage5.src, minimizeImage6.src],
            minimizeImagesDescription: "SKAPA DIN EGEN FOTOPOSTER",
        },
        {
            roomImageSrc: roomImage3.src,
            roomImageHeading: "SKAPA DIN PERSONLIGA KONT",
            roomImageDescription: "Sätt ditt ansikte i varje tavla med vår unika ansiktsersättningsteknik!",
            minimizeImagesSrc: [minimizeImage7.src, minimizeImage8.src, minimizeImage9.src],
            minimizeImagesDescription: "SKAPA DIN EGEN PERSONLIGA POSTER",
        }
    ]

    return (
        <div className="home">
            <Head>
                <title>Tavlorify Store - Home</title>
            </Head>
            <Header />
            <div className="page-content text-center">
                <div className="container">
                    <h1 className="h4 mb-5 fw-bold">SKAPA DINA PERSONLIGA POSTERS</h1>
                    <p className="caption-message mb-5 fw-bold">Välkommen till en korsning av fantasi och teknologi, där dina idéer blir levande. På 'Kreativitetens Horisonter' erbjuder vi ett spektrum av AI-drivna verktyg designade för att förvandla dina ord till visuella mästerverk, omvandla dina ögonblicksbilder till konst och ge ditt ansikte nya uttryck. Upptäck en värld där konst och innovation möts.</p>
                    <section className="introduction mb-5">
                        <div className="row">
                            {introductionSectionImagesList.map((images, index) => (
                                <div className="col-md-4" key={index}>
                                    <img src={images.roomImageSrc} alt="Room Image 1" className="mw-100 mb-4" />
                                    <div className="explain-box mb-5">
                                        <h6 className="fw-bold">{images.roomImageHeading}</h6>
                                        <h6>{images.roomImageDescription}</h6>
                                    </div>
                                    <div className="row mb-5">
                                        {images.minimizeImagesSrc.map((minimizeImageSrc, minimizeImageIndex) => (
                                            <div className="col-md-4" key={minimizeImageIndex}>
                                                <img src={minimizeImageSrc} alt="Minimize Image 1 For Text To Image" className="mw-100" />
                                            </div>
                                        ))}
                                    </div>
                                    <h6 className="fw-bold">{images.minimizeImagesDescription}</h6>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}