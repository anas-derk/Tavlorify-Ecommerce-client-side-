import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Footer from "@/components/Footer";

export default function QuestionsAndAnswers() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);

    return (
        <div className="questions-and-answers policy-page">
            <Head>
                <title>Tavlorify - Frågor & Svar</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Frågor & Svar</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-2 fw-bold">Hur lång tid tar leveransen?</h6>
                            <p className="mb-3">Normalt tar leveransen 3-5 arbetsdagar. Under perioder med hög efterfrågan, som Black Friday eller jul, kan leveranstiderna bli längre.</p>
                            <h6 className="mb-2 fw-bold">Hur skickas era posters?</h6>
                            <p className="mb-3">Våra posters skickas ihoprullade i ett papprör via DHL, Postnord, Bring eller Fedex. Om du köper en ram, packas den i en kartong anpassad till ramens storlek.</p>
                            <h6 className="mb-2 fw-bold">Var kan jag hämta ut min beställning om jag väljer leverans till ombud?</h6>
                            <p className="mb-3">Paketet levereras till ditt närmaste utlämningsställe. När din beställning har lämnat vår produktion får du en spårningslänk så att du kan följa ditt paket.</p>
                            <h6 className="mb-2 fw-bold">Hur vet jag att min beställning är framme?</h6>
                            <p className="mb-3">Du får en SMS-avisering till det mobilnummer du angav vid beställningen när paketet är framme.</p>
                            <h6 className="mb-2 fw-bold">Skickar ni utanför Sverige?</h6>
                            <p className="mb-3">För närvarande levererar vi endast inom Sverige.</p>
                            <h6 className="mb-2 fw-bold">Kan jag spåra mitt paket?</h6>
                            <p className="mb-3">Ja, du kan spåra ditt paket med hjälp av ditt försändelse-id. Du kan också använda avsändarens logistikkundnummer och referens, eller spåra med hjälp av sms-nummer och aviseringskod.</p>
                            <h6 className="mb-2 fw-bold">Vad gör jag om min leverans är sen?</h6>
                            <p className="mb-3">Om ditt försändelse-id visar att paketet mottagits av fraktbolaget kan du kontakta dem för att få information om förseningen. Om ditt paket inte har mottagits av fraktbolaget eller om du inte har fått ett försändelse-id, vänligen maila oss på info@tavlorify.se så hjälper vi dig vidare.</p>
                            <h6 className="mb-2 fw-bold">Hur vet jag att ni har tagit emot min beställning?</h6>
                            <p className="mb-3">Vi skickar en orderbekräftelse via mejl så fort beställningen är genomförd. Om du inte får en bekräftelse, kontakta oss gärna på info@tavlorify.se.</p>
                            <h6 className="mb-2 fw-bold">Spårning av paket</h6>
                            <p className="mb-3">Du får ett spårningsnummer via e-post när din beställning har skickats från vårt tryckeri.</p>
                            <h6 className="mb-2 fw-bold">Vad kostar leveransen?</h6>
                            <p className="mb-3">Vi erbjuder fri frakt på alla beställningar.</p>
                            <h6 className="mb-2 fw-bold">Hur betalar jag för min beställning?</h6>
                            <p className="mb-3">Vi erbjuder betalning via Klarna, inklusive:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Faktura</li>
                                <li className="mb-2">Bankkonto</li>
                                <li className="mb-2">Kredit- och betalkort</li>
                                <li className="mb-2">Lokala betalningsalternativ (t.ex. Swish i Sverige)</li>
                            </ul>
                            <h6 className="mb-2 fw-bold">Har jag ångerrätt?</h6>
                            <p className="mb-3">Eftersom våra posters är specialtillverkade gäller inte ångerrätten.</p>
                            <h6 className="mb-2 fw-bold">Vad gör jag om min beställning är skadad?</h6>
                            <p className="mb-3">Maila vår kundservice på info@tavlorify.se och bifoga gärna en bild på skadan så hjälper vi dig.</p>
                            <h6 className="mb-2 fw-bold">Vad gör jag om jag är missnöjd?</h6>
                            <p className="mb-3">Om postern inte motsvarar dina förväntningar, skicka följande information till info@tavlorify.se:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Vad som inte motsvarade dina förväntningar</li>
                                <li className="mb-2">Ordernummer</li>
                                <li className="mb-2">Bild på postern</li>
                            </ul>
                            <p className="mb-3">Vi återkommer så snart som möjligt för att hitta en lösning.</p>
                            <h6 className="mb-2 fw-bold">Vad använder ni för papper till era posters?</h6>
                            <p className="mb-3">Vi använder papper av utmärkt kvalitet med en tjocklek på 200 g/m².</p>
                            <h6 className="mb-2 fw-bold">Kan jag beställa prints i andra storlekar än dem som finns på hemsidan?</h6>
                            <p className="mb-3">Nej, vi printar endast i de storlekar som finns tillgängliga som valalternativ för ett visst motiv.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}