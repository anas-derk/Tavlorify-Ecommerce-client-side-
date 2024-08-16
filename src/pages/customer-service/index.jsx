import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Footer from "@/components/Footer";

export default function CustomerService() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);

    return (
        <div className="customer-service policy-page">
            <Head>
                <title>Tavlorify - Kundservice</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">KUNDSERVICE</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h5 className="mb-2 fw-bold">Beställningsvillkor</h5>
                            <h6 className="mb-2 fw-bold">Åldersgräns</h6>
                            <p className="mb-3">För att genomföra en beställning på Tavlorify måste du vara minst 18 år gammal. Genom att beställa accepterar du våra köpvillkor.</p>
                            <h6 className="mb-2 fw-bold">Upphovsrätt</h6>
                            <p className="mb-3">Du ansvarar själv för att det material du laddar upp inte bryter mot lagar, moral eller andras upphovsrätt. Om ditt material skulle leda till rättsliga åtgärder mot Tavlorify, är du ansvarig för alla kostnader och eventuella skadestånd.</p>
                            <h6 className="mb-2 fw-bold">Orderbekräftelse</h6>
                            <p className="mb-3">Har du inte mottagit någon orderbekräftelse via e-post? Kontrollera att du angett rätt e-postadress och att köpet har genomförts korrekt. Om problemet kvarstår, kontakta oss på info@tavlorify.se innan du gör en ny beställning.</p>
                            <h6 className="mb-2 fw-bold">Spåra ditt paket</h6>
                            <p className="mb-3">När din beställning har bearbetats, tryckts och skickats, får du ett e-postmeddelande med en spårningslänk. Kontrollera även din skräppostmapp.</p>
                            <h6 className="mb-2 fw-bold">Ändra eller ångra köp</h6>
                            <p className="mb-3">Ändringar kan göras upp till 6 timmar efter att du har lagt din beställning. Efter detta påbörjas produktionsprocessen och inga ytterligare ändringar kan göras. För att ändra din beställning, kontakta oss på info@tavlorify.se med detaljer om vad du vill ändra.</p>
                            <h5 className="mb-2 fw-bold">Leverans och frakt</h5>
                            <h6 className="mb-2 fw-bold">Fraktkostnader</h6>
                            <p className="mb-3">Vi erbjuder fri frakt på alla beställningar.</p>
                            <h6 className="mb-2 fw-bold">Fraktmetod</h6>
                            <p className="mb-3">Din beställning paketeras noggrant. Posters lindas i silkespapper och skickas i en skyddande, robust papperstub.</p>
                            <h6 className="mb-2 fw-bold">Leveranstid</h6>
                            <p className="mb-3">Normalt tar leveransen 3-5 arbetsdagar.</p>
                            <h6 className="mb-2 fw-bold">Spårning av paket</h6>
                            <p className="mb-3">Du får ett spårningsnummer via e-post när din beställning har skickats från vårt tryckeri.</p>
                            <h6 className="mb-2 fw-bold">Avisering om leverans</h6>
                            <p className="mb-3">När ditt paket anländer till ditt utlämningsställe eller är redo att levereras får du en avisering via SMS.</p>
                            <h6 className="mb-2 fw-bold">Problem med avisering</h6>
                            <p className="mb-3">Om du inte fått någon avisering, kontrollera att du angett rätt telefonnummer. Om du fortfarande inte har fått någon avisering inom 10 arbetsdagar, kontakta oss på info@tavlorify.se.</p>
                            <h6 className="mb-2 fw-bold">Outlöst paket</h6>
                            <p className="mb-3">Det är ditt ansvar att hämta ut paketet inom 14 dagar. Om paketet returneras till oss på grund av att det inte har hämtats ut debiterar vi en avgift på 200 kr för extra fraktkostnader och administration.</p>
                            <h6 className="mb-2 fw-bold">Internationella leveranser</h6>
                            <p className="mb-3">För närvarande levererar vi endast inom Sverige.</p>
                            <h5 className="mb-2 fw-bold">Retur och reklamation</h5>
                            <h6 className="mb-2 fw-bold">Ångerrätt</h6>
                            <p className="mb-3">Eftersom våra posters är specialtillverkade efter dina specifikationer gäller inte ångerrätten. Om du vill returnera en ram, kontakta oss på info@tavlorify.se. Vi debiterar 150 kr för returfrakt.</p>
                            <h6 className="mb-2 fw-bold">Missnöjd med produkten?</h6>
                            <p className="mb-3">Om postern inte motsvarar dina förväntningar, skicka följande information till info@tavlorify.se:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Vad som inte motsvarade dina förväntningar</li>
                                <li className="mb-2">Ordernummer</li>
                                <li className="mb-2">Bild på postern</li>
                            </ul>
                            <p className="mb-3">Vi återkommer så snart som möjligt för att hitta en lösning.</p>
                            <h6 className="mb-2 fw-bold">Skadad produkt</h6>
                            <p className="mb-3">Om din poster är skadad, skicka följande information till info@tavlorify.se:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Beskrivning av skadan</li>
                                <li className="mb-2">Ordernummer</li>
                                <li className="mb-2">Bild på postern</li>
                            </ul>
                            <p className="mb-3">Vi återkommer så snart som möjligt.</p>
                            <h5 className="mb-2 fw-bold">Betalning och säkerhet</h5>
                            <h6 className="mb-2 fw-bold">Betalningsalternativ</h6>
                            <p className="mb-3">Vi erbjuder betalning via Klarna, inklusive:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Faktura</li>
                                <li className="mb-2">Bankkonto</li>
                                <li className="mb-2">Kredit- och betalkort</li>
                                <li className="mb-2">Lokala betalningsalternativ (t.ex. Swish i Sverige)</li>
                            </ul>
                            <h6 className="mb-2 fw-bold">Kortbetalningar</h6>
                            <p className="mb-3">Vi accepterar Visa och Mastercard.</p>
                            <h6 className="mb-2 fw-bold">Betalningssäkerhet</h6>
                            <p className="mb-3">Vi använder HTTPS med SSL-certifikat för att säkerställa en säker och krypterad anslutning.</p>
                            <h5 className="mb-2 fw-bold">Köpvillkor</h5>
                            <h6 className="mb-2 fw-bold">Allmänt</h6>
                            <p className="mb-3">När du gör en beställning på Tavlorify accepterar du våra köpvillkor och vår hantering av dina personuppgifter enligt vår integritetspolicy.</p>
                            <h6 className="mb-2 fw-bold">Priser</h6>
                            <p className="mb-3">Priserna anges i svenska kronor inklusive moms. Vid eventuella prisändringar som påverkas av faktorer utanför vår kontroll, har du rätt att avbryta köpet utan kostnad.</p>
                            <h6 className="mb-2 fw-bold">Betalningsvillkor</h6>
                            <p className="mb-3">Betalning sker via Klarna enligt de betalningsalternativ som finns tillgängliga.</p>
                            <h6 className="mb-2 fw-bold">Kampanjer och erbjudanden</h6>
                            <p className="mb-3">Erbjudanden och kampanjer gäller endast under specificerade perioder och kan återkallas när som helst.</p>
                            <h5 className="mb-2 fw-bold">Leverans och transport</h5>
                            <h6 className="mb-2 fw-bold">Leveranstid</h6>
                            <p className="mb-3">Normalt tar leveransen 3-5 arbetsdagar.</p>
                            <h6 className="mb-2 fw-bold">Spårningsinformation</h6>
                            <p className="mb-3">Du får ett spårningsnummer via e-post när din beställning har skickats.</p>
                            <h6 className="mb-2 fw-bold">Leveransförseningar</h6>
                            <p className="mb-3">Om leveransen drar ut på tiden informerar vi dig så snart som möjligt. Om leveransen överstiger 40 dagar utan avtalad förlängning har du rätt att avbryta köpet utan kostnad.</p>
                            <h6 className="mb-2 fw-bold">Outlöst paket</h6>
                            <p className="mb-3">Om du inte hämtar ut ditt paket inom den angivna tiden, debiterar vi en avgift på 200 kr för extra fraktkostnader och administration.</p>
                            <h6 className="mb-2 fw-bold">Skadad produkt</h6>
                            <p className="mb-3">Om din poster är skadad, kontakta oss på info@tavlorify.se med följande information:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Beskrivning av skadan</li>
                                <li className="mb-2">Ordernummer</li>
                                <li className="mb-2">Bild på postern</li>
                            </ul>
                            <h6 className="mb-2 fw-bold">Ångerrätt och öppet köp</h6>
                            <p className="mb-3">Eftersom våra posters är specialtillverkade gäller inte ångerrätten.</p>
                            <h6 className="mb-2 fw-bold">Återbetalningar</h6>
                            <p className="mb-3">Återbetalningar sker via Klarna till samma konto som användes vid köpet.</p>
                            <h6 className="mb-2 fw-bold">Reservationer</h6>
                            <p className="mb-3">Vi reserverar oss för eventuella skrivfel och prisjusteringar på vår webbplats.</p>
                            <h6 className="mb-2 fw-bold">Länkar</h6>
                            <p className="mb-3">Vi kan länka till andra företag och webbplatser. Dessa ligger utanför vår kontroll, och vi rekommenderar att du läser deras integritetspolicy innan du lämnar ut dina personuppgifter.</p>
                            <h6 className="mb-2 fw-bold">Force majeure</h6>
                            <p className="mb-3">Vid händelser utanför vår kontroll som krig, naturkatastrofer eller myndighetsbeslut, är vi befriade från våra förpliktelser enligt avtalet.</p>
                            <h6 className="mb-2 fw-bold">Tvister</h6>
                            <p className="mb-3">Tvister ska i första hand lösas i samförstånd med vår kundtjänst. Om tvisten inte kan lösas kan du vända dig till ARN eller EU</p>
                            <p className="mb-3">onlineplattform för tvistlösning.</p>
                            <h6 className="mb-2 fw-bold">Kontakt</h6>
                            <p className="mb-3">För frågor, kontakta oss på info@tavlorify.se.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}