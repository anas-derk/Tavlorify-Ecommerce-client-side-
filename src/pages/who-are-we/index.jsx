import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Footer from "@/components/Footer";
import WhoAreWeImage1 from "../../../public/images/WhoAreWe/1.webp";
import InspirationImage1ForImageToImage from "@/../public/images/Inspiration/ImageToImagePage/1.webp";
import InspirationImage2ForImageToImage from "@/../public/images/Inspiration/ImageToImagePage/2.webp";
import InspirationImage3ForFaceSwap from "@/../public/images/Inspiration/FaceSwapPage/1.webp";

export default function CookiePolicy() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);

    return (
        <div className="who-are-we policy-page">
            <Head>
                <title>Tavlorify - Om Oss</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Om Oss</h1>
                        <div className="who-are-we-image-box text-center mb-5">
                            <img src={WhoAreWeImage1.src} alt="who-are-we-image-one" className="mw-100" width="448" height="256" />
                        </div>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-2 fw-bold">Vår Berättelse: Från Vision till Verklighet</h6>
                            <p className="mb-3">Välkommen till vår värld där konst och teknik möts för att skapa något alldeles speciellt. Vår resa började med en enkel men kraftfull idé: att göra konstskapande tillgängligt för alla med hjälp av avancerad AI-teknologi.</p>
                            <h6 className="mb-2 fw-bold">Hur Idén Föddes</h6>
                            <p className="mb-3">Idén till vår plattform föddes i ett litet konstgalleri i Stockholm. Det var en livlig diskussion bland en grupp kreativa entreprenörer – konstnärer, teknologer och designers – som alla delade en gemensam vision. De hade en djup kärlek till konst och en fascination för de möjligheter som AI-teknologi kunde erbjuda. Deras samtal kretsade kring en spännande idé: tänk om alla, oavsett erfarenhet eller konstnärlig bakgrund, kunde skapa fantastiska konstverk med bara några klick?</p>
                            <p className="mb-3">Det var denna vision som lade grunden till vår resa. De insåg att genom att förena sina kunskaper inom konst och teknik kunde de skapa en plattform som demokratiserade konstskapandet. En plattform där AI-teknologi gör det möjligt för alla att omvandla sina idéer till vackra konstverk, oavsett om det är från en enkel textbeskrivning eller en uppladdad bild. Med en passion för innovation och en vilja att bryta ner barriärerna inom konstvärlden, bestämde de sig för att förverkliga denna dröm.</p>
                            <h6 className="mb-2 fw-bold">Förverkligandet av Visionen</h6>
                            <p className="mb-3">Med en klar vision i sikte började teamet arbeta intensivt. Konstnärer, tekniker och designers samarbetade för att utveckla avancerade algoritmer och en användarvänlig plattform. Efter månader av forskning och utveckling lanserade vi vår plattform. Människor började snart använda den för att utforska sin kreativitet och skapa personliga konstverk. Funktionen att generera konstverk från text utökades snart till att omfatta bildomvandlingar och ansiktsbyten på selfies med konstnärliga porträtt.</p>
                            <h6 className="mb-2 fw-bold">En Plattform för Alla</h6>
                            <p className="mb-3">Vår plattform har växt och utvecklats. Den har blivit en ovärderlig resurs för konstnärer, skolor, kreativa själar och alla som vill uttrycka sig genom konst. Vi lyssnar ständigt på våra användare och förbättrar plattformen för att möta deras behov.</p>
                            <p className="mb-3">Vårt mål är att göra konstskapande enkelt och tillgängligt för alla. Varje konstverk vi skapar bär på en unik berättelse och bidrar till vårt gemensamma konstnärliga arv.</p>
                            <h6 className="mb-2 fw-bold">ack för att du är en del av vår resa</h6>
                            <p className="mb-3">Vi strävar efter att göra konstnärligt uttryck tillgängligt och enkelt för alla. Varje beställning är en unik resa, där varje bild bär med sig en berättelse och varje konstverk blir en del av vårt gemensamma konstnärliga arv.</p>
                            <p className="mb-3">Vi ser fram emot att skapa magiska konstverk tillsammans med dig. Välkommen till vår värld, där drömmar och teknik möts i en symfoni av färg och form.</p>
                            {/* Start Generated Images Examples Section */}
                            <section className="generated-images-examples pt-5 pb-5 text-center">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="example-image-box mb-4">
                                            <img
                                                src={InspirationImage1ForImageToImage.src}
                                                alt="Example Image ( Image 1 )"
                                                className="example-image mw-100"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="example-image-box mb-4">
                                            <img
                                                src={InspirationImage2ForImageToImage.src}
                                                alt="Example Image ( Image 1 )"
                                                className="example-image mw-100"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="example-image-box mb-4">
                                            <img
                                                src={InspirationImage3ForFaceSwap.src}
                                                alt="Example Image ( Image 1 )"
                                                className="example-image mw-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* End Generated Images Examples Section */}
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}