import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function CookiePolicy() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);
    
    return (
        <div className="cookie-policy policy-page">
            <Head>
                <title>Tavlorify - Cookiepolicy</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Cookiepolicy</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-2 fw-bold">VAD ÄR COOKIES ?</h6>
                            <p className="mb-3">En cookie är en liten textfil som sparas på din dator när du besöker en hemsida. Tavlorify använder cookies för att underlätta och förbättra användarupplevelsen för dig som besökare, samt för att mäta trafiken på vår hemsida och för att samla in information om hur vår hemsida används</p>
                            <h6 className="mb-2 fw-bold">VILKA OLIKA TYPER AV COOKIES FINNS DET ?</h6>
                            <p className="mb-3">Det finns i huvudsak två typer av cookies: förstapartcookies och tredjepartscookies.</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Förstapartscookies är cookies satta av Tavlorify på vår egna hemsida</li>
                                <li>Tredjepartscookies är analyscookies som tillhör Tavlorifys <br />marknadsföringspartners. Dessa analyscookies tillhandahåller övergripande analytisk information avseende din användning av våra tjänster.</li>
                            </ul>
                            <p className="mb-3">Båda dessa kan vara antingen permanenta cookies eller temporära cookies (sessionscookies)</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Permanenta cookies lagras som en fil på din dator eller mobil under en viss tid tills du själv eller servern som sänt dem, raderar dem</li>
                                <li>Sessionscookies lagras tillfälligt och försvinner när du stänger din webbläsare.</li>
                            </ul>
                            <h6 className="mb-2 fw-bold">VAD ANVÄNDER VI COOKIES TILL?</h6>
                            <p className="mb-3">Vi använder förstapartscookies på vår hemsida för att kunna ge dig som besökare en bättre upplevelse och bättre service. När någon besöker vår hemsida skapas sessionscookies vilka är nödvändiga för att kunna använda vissa delar av hemsidan. Dessa cookies innehåller ingen identifierbar information om dig som användare och sparas enbart temporärt</p>
                            <h6 className="mb-2 fw-bold">COOKIES FÖR WEBBANALYS</h6>
                            <p className="mb-3">Vi använder tredjepartscookies för att samla statistik om antalet besökare på hemsidan, om besökarna och för att mäta hur besökare interagerar med hemsidan. Detta gör vi för att bättre kunna förstå de behov besökarna har och hur vi kan förbättra och utveckla hemsidan. Vi använder följande verktyg för detta:</p>
                            <p className="mb-3"><span className="fw-bold">Google Analytics</span> Statistikverktyget Google Analytics placerar en cookie på din dator som samlar in information om hur du surfar runt på vår hemsida. Vi använder informationen för att se vilket innehåll som är populärt samt att förbättra hemsidan. Cookien innehåller ingen information om vem du är. Läs mer om hur Googles använder data samt information om hur du kan blockera cookies från Google Analytics här: <Link href="https://policies.google.com/privacy?gl">https://policies.google.com/privacy?gl</Link></p>
                            <p className="mb-3"><span className="fw-bold">Crazy Egg</span> Samlar visuell information om hur du rör dig på vår hemsida, vilket används för att förbättra hemsidan. Cookien innehåller ingen information om vem du är</p>
                            <p className="mb-3"><span className="fw-bold">Facebook</span> Det sociala nätverket Facebook placerar cookies på din dator för bland annat autentisering mot ditt Facebook-konto, annonsering och statistik. Du kan läsa mer om hur Facebook använder cookies här: <a href="https://sv-se.facebook.com/policies/cookies/">https://sv-se.facebook.com/policies/cookies/</a></p>
                            <h6 className="mb-2 fw-bold">COOKIES I MARKNADSFÖRINGSSYFTE</h6>
                            <p className="mb-3">För att kunna förbättra vår annonsering och erbjuda våra besökare mer relevanta erbjudanden använder vi även cookies och pixeltaggar från Google Ads och Facebook. Pixeltaggar är en teknik som kan känna igen cookies och andra identifierare och som gör det möjligt att bestämma vilka annonser som ska visas i din webbläsare. Dessa tekniker används för att kunna utvärdera och effektivisera vår marknadsföring online</p>
                            <h6 className="mb-2 fw-bold">ÖVRIGA TREDJEPARTSCOOKIES</h6>
                            <p className="mb-3">Om du vill göra ändringar till ditt köp innan den skickats till tryck/redigeringen av din bild påbörjats så hör av dig omgående på <a href="mailto:Info@tavlorify.se">Info@tavlorify.se</a>. Vi kan dock inte garantera att detta är möjligt. Tredjepartscookies är cookies som en annan part, dvs inte Tavlorify, placerar i din enhet via våra hemsidor. När du besöker en webbsida med inbäddat innehåll eller använder en delningsknapp, t.ex. från Facebook eller Youtube, kan du få cookies från dessa hemsidor. Tavlorify styr inte över dessa cookies, utan rekommenderar att du besöker de enskilda hemsidor från tredje part för mer information om hur dessa hanteras</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Facebook</li>
                                <li className="mb-2">Instagram</li>
                                <li className="mb-2">Twitter</li>
                                <li className="mb-2">Vimeo</li>
                                <li className="mb-2">Snapchat</li>
                                <li>LinkedIn</li>
                            </ul>
                            <h6 className="mb-2 fw-bold">OM ATT LÄMNA ELLER TA TILLBAKA DITT SAMTYCKE</h6>
                            <p className="mb-3">När du godkänner cookies i vår cookiebanner har du lämnat ditt samtycke att vi placerar cookies på din dator. Du kan ta tillbaka ditt samtycke genom att ändra inställningar i webbläsaren</p>
                            <h6 className="mb-2 fw-bold">KAN JAG RADERA ELLER STÄNGA AV COOKIES</h6>
                            <p className="mb-3">Du kan välja att stänga av cookies helt, eller att få ett meddelande varje gång en ny cookie skickas till din dator eller mobil. Stänger du av cookies kan du uppleva att hemsidan inte fungerar tillfredställande. Nedan finner du länkar till hur du kan ställa in hantering av cookies i din webbläsare :</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">
                                    <a href="https://support.google.com/chrome/answer/95647?hl=en-GB">Google Chrome</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac">Safari</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://support.apple.com/en-gb/HT201265">Safari för iPhone och iPad</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://support.microsoft.com/en-gb/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d">Microsoft Internet Explorer</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://support.microsoft.com/en-gb/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">Microsoft Edge</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US">Mozilla Firefox</a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac">Opera</a>
                                </li>
                            </ul>
                            <h6 className="mb-2 fw-bold long-heading">HUR KAN JAG KONTROLLERA VILKEN INFORMATION SOM DELAS MED ANNONSÖRER ?</h6>
                            <p className="mb-3">Om du vill begränsa informationen som delas med annonsörer kan du ladda ner en så kallad opt-out cookie från olika annonseringsaktörer eller använda andra lösningar, exempelvis youronlinechoices.com. Observera att du måste genomföra samma procedur i alla olika enheter du använder och för varje webbläsare du använder</p>
                            <p>Denna cookiepolicy uppdaterades 2023-05-25.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}