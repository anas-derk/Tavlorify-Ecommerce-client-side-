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
/* Start Import Services Section Images */
import textToImageServiceExplainImage from "../../public/images/MainPage/Services/textToImage.webp";
import imageToImageServiceExplainImage from "../../public/images/MainPage/Services/imageToImage.webp";
import faceSwapServiceExplainImage from "../../public/images/MainPage/Services/faceSwap.webp";
/* End Import Services Section Images */
import { MdOutlineLocalShipping } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import Link from 'next/link';

export default function Home() {

    const introductionSectionImagesList = [
        {
            roomImageSrc: roomImage1.src,
            roomImageHeading: "SKAPA UNIK AI-KONST",
            roomImageDescription: "Omvandla dina idéer till vackra konstverk med hjälp av AI.",
            minimizeImagesSrc: [minimizeImage1.src, minimizeImage2.src, minimizeImage3.src],
            minimizeImagesDescription: "SKAPA DIN EGEN AI-POSTER",
            serviceName: "Text To Image",
            pagePath: "/text-to-image?paintingTypeAsQuery=poster"
        },
        {
            roomImageSrc: roomImage2.src,
            roomImageHeading: "OMVANDLA DIN BILD TILL KONST",
            roomImageDescription: "Låt AI väcka dina bilder till liv med en unik konstnärlig touch - Upptäck magin idag!",
            minimizeImagesSrc: [minimizeImage4.src, minimizeImage5.src, minimizeImage6.src],
            minimizeImagesDescription: "SKAPA DIN EGEN FOTOPOSTER",
            serviceName: "Image To Image",
            pagePath: "/image-to-image?paintingTypeAsQuery=poster"
        },
        {
            roomImageSrc: roomImage3.src,
            roomImageHeading: "SKAPA DIN PERSONLIGA KONT",
            roomImageDescription: "Sätt ditt ansikte i varje tavla med vår unika ansiktsersättningsteknik!",
            minimizeImagesSrc: [minimizeImage7.src, minimizeImage8.src, minimizeImage9.src],
            minimizeImagesDescription: "SKAPA DIN EGEN PERSONLIGA POSTER",
            serviceName: "Face Swap",
            pagePath: "/face-swap-image?paintingTypeAsQuery=poster"
        }
    ];

    const servicesSectionImagesList = [
        {
            serviceName: "Text To Image",
            serviceExplainImage: textToImageServiceExplainImage.src,
            serviceTitle: "SKAPA UNIK AI-KONST",
            serviceExplain: "Välkommen till en värld där din kreativitet möter artificiell intelligens för att skapa unik konst. Här på Tavlorify kan du enkelt omvandla dina idéer till vackra konstverk med hjälp av AI. Processen är enkel och tillgänglig för alla, oavsett konstnärlig erfarenhet.",
            pagePath: "/text-to-image?paintingTypeAsQuery=poster",
            buttonContent: "SKAPA DIN POSTER"
        },
        {
            serviceName: "Image To Image",
            serviceExplainImage: imageToImageServiceExplainImage.src,
            serviceTitle: "OMVANDLA DIN BILD TILL KONST",
            serviceExplain: "Förvandla dina minnen till mästerverk: Upptäck hur vår AI-teknologi andas liv i dina bilder, skapar personliga konstverk och förvandlar varje ögonblick till evigt konstnärligt arv. Gör ditt hem till en galleri med unika berättelser.",
            pagePath: "/image-to-image?paintingTypeAsQuery=poster",
            buttonContent: "SKAPA DIN TAVLA"
        },
        {
            serviceName: "Face Swap",
            serviceExplainImage: faceSwapServiceExplainImage.src,
            serviceTitle: "Sätt ditt ansikte i varje tavla",
            serviceExplain: "Byt ansikte på sekunder med hjälp av AI: Ladda upp din selfie, Välj bland stilfulla förinställningar – kändisar, anime, konst, tecknat, och mer. Skapa och se magin!",
            pagePath: "/face-swap-image?paintingTypeAsQuery=poster",
            buttonContent: "SKAPA MIN TAVLA"
        },
    ];

    const roomImagesSrc = [
        roomImage4.src,
        roomImage5.src,
        roomImage6.src,
        roomImage7.src,
        roomImage8.src,
        roomImage9.src,
        roomImage10.src,
        roomImage11.src,
    ];

    return (
        <div className="home">
            <Head>
                <title>Tavlorify Store - Home</title>
            </Head>
            <Header />
            <div className="page-content text-center">
                {/* Start Introduction Section */}
                <section className="introduction mb-5 pt-5 pb-5">
                    <h1 className="h4 mb-5 fw-bold">SKAPA DINA PERSONLIGA POSTERS</h1>
                    <p className="caption-message mb-5 fw-bold">Välkommen till en korsning av fantasi och teknologi, där dina idéer blir levande. På 'Kreativitetens Horisonter' erbjuder vi ett spektrum av AI-drivna verktyg designade för att förvandla dina ord till visuella mästerverk, omvandla dina ögonblicksbilder till konst och ge ditt ansikte nya uttryck. Upptäck en värld där konst och innovation möts.</p>
                    <div className="container">
                        <div className="row">
                            {introductionSectionImagesList.map((images, index) => (
                                <div className="col-lg-4 pe-5" key={index}>
                                    <Link href={images.pagePath}>
                                        <img src={images.roomImageSrc} alt={`Room Image ${index + 1}`} className="mw-100 mb-4" onDragStart={(e) => e.preventDefault()} />
                                    </Link>
                                    <div className="explain-box mb-5">
                                        <h6 className="fw-bold">{images.roomImageHeading}</h6>
                                        <h6>{images.roomImageDescription}</h6>
                                    </div>
                                    <div className="row mb-5">
                                        {images.minimizeImagesSrc.map((minimizeImageSrc, minimizeImageIndex) => (
                                            <div className="col-4" key={minimizeImageIndex}>
                                                <Link href={images.pagePath}>
                                                    <img src={minimizeImageSrc} alt={`Minimize Image ${minimizeImageIndex + 1} For `} className="mw-100" onDragStart={(e) => e.preventDefault()} />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href={images.pagePath} className="fw-bold text-dark text-decoration-underline">{images.minimizeImagesDescription}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* End Introduction Section */}
                {/* Start Services Explain Section */}
                <section className="services-explain mb-5 pt-5 pb-5">
                    <div className="container">
                        <div className="row">
                            {servicesSectionImagesList.map((service, index) => (
                                index % 2 !== 0 ? <>
                                    <div className="col-lg-6 pe-5" key={index}>
                                        <h3 className="service-title mb-4 text-start">{service.serviceTitle}</h3>
                                        <p className="service-explain mb-4 text-start">{service.serviceExplain}</p>
                                    </div>
                                    <div className="col-lg-6" key={index}>
                                        <Link href={service.pagePath}>
                                            <img src={service.serviceExplainImage} alt={`${service.serviceName} Service Image`} className="mw-100" onDragStart={(e) => e.preventDefault()} />
                                        </Link>
                                    </div>
                                </> : <>
                                    <div className="col-lg-6 pe-5" key={index}>
                                        <Link href={service.pagePath}>
                                            <img src={service.serviceExplainImage} alt={`${service.serviceName} Service Image`} className="mw-100" onDragStart={(e) => e.preventDefault()} />
                                        </Link>
                                    </div>
                                    <div className="col-lg-6" key={index}>
                                        <h3 className="service-title mb-4 text-start">{service.serviceTitle}</h3>
                                        <p className="service-explain mb-4 text-start">{service.serviceExplain}</p>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </section>
                {/* End Services Explain Section */}
                {/* Start Room Images Section */}
                <section className="room-images pb-5">
                    <div className="container">
                        <h2 className="section-name fw-bold mb-3">Inspiration</h2>
                        <h5 className="mb-5">EXEMPEL FRÅN OSS OCH VÅRA KUNDER</h5>
                        <div className="row">
                            {roomImagesSrc.map((roomImageSrc, index) => (
                                <div className={`col-md-3 ${index !== roomImagesSrc.length && "pe-5"}`} key={index}>
                                    <img src={roomImageSrc} alt={`Room Image ${index + 1}`} className="mw-100 mb-4" onDragStart={(e) => e.preventDefault()} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* End Room Images Section */}
                {/* Start More Details */}
                <section className="more-details pt-4 pb-4 text-center mb-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <MdOutlineLocalShipping className="icon shipping-icon mb-4 d-block mx-auto" />
                                <h6>SNABBA LEVERANSER</h6>
                                <span>3-5 arbetsdagar</span>
                            </div>
                            <div className="col-md-4">
                                <CiDeliveryTruck className="icon delivery-icon mb-4 d-block mx-auto" />
                                <h6>FRI FRAKT</h6>
                            </div>
                            <div className="col-md-4">
                                <RiSecurePaymentLine className="icon secure-payment-icon mb-4 d-block mx-auto" />
                                <h6>SÄKRA BETALNINGAR</h6>
                                <span>Snabbt och säkert med kort eller faktura</span>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End More Details */}
            </div>
            <Footer />
        </div>
    );
}