import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Footer from "@/components/Footer";

export default function IntegrityPolicy() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);

    return (
        <div className="intergrity-policy policy-page">
            <Head>
                <title>Tavlorify - INTEGRITETSPOLICY</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">INTEGRITETSPOLICY FÖR TAVLORIFY</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-2 fw-bold">INTRODUKTION OCH SAMMANFATTNING</h6>
                            <p className="mb-3">Din personliga integritet är viktig för Tavlorify (”Tavlorify” eller ”vi”). I denna policy vill vi informera dig om hur vi behandlar dina personuppgifter och dina rättigheter. Personuppgifter är information som kan kopplas till dig som individ, till exempel ditt namn och dina kontaktuppgifter.</p>
                            <p className="mb-3">För att sammanfatta behandlar vi dina personuppgifter för följande ändamål:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">För att hantera och leverera din beställning.</li>
                                <li className="mb-2">För att ge dig erbjudanden och inspiration via nyhetsbrev, SMS och riktad marknadsföring i sociala medier samt online och offline.</li>
                                <li className="mb-2">För att kommunicera med dig och besvara dina frågor.</li>
                                <li className="mb-2">För att få feedback om din upplevelse av Tavlorify.</li>
                                <li className="mb-2">För att påminna dig om en övergiven varukorg.</li>
                                <li className="mb-2">För att skapa och underhålla ett kundkonto (inkl. funktioner såsom favoriter).</li>
                                <li className="mb-2">För att följa lagar och regler (t.ex. konsument- och redovisningslagar).</li>
                            </ul>
                            <p className="mb-3">Du har flera rättigheter enligt dataskyddslagen, inklusive rätten att invända mot marknadsföring. Du kan läsa mer om dina rättigheter och hur du kan påverka vår behandling av dina personuppgifter nedan.</p>
                            <p className="mb-3">Vill du veta mer? Läs gärna våra detaljerade förklaringar nedan för information om hur, varför och under hur lång tid vi behandlar dina personuppgifter.</p>
                            <h6 className="mb-2 fw-bold">VEM ÄR ANSVARIG FÖR BEHANDLINGEN AV DINA PERSONUPPGIFTER?</h6>
                            <p className="mb-3">Tavlorify, är ansvarig för behandlingen av dina personuppgifter. Notera att vissa av våra betalnings- och logistikleverantörer, såsom Klarna, behandlar personuppgifter som de själva samlar in från vår webbplats eller IT-system vid köp eller logistikprocesser och är ansvariga för sin behandling.</p>
                            <p className="mb-3">Om du vill kontakta oss om behandlingen av dina personuppgifter, vänligen maila oss på info@tavlorify.se.</p>
                            <h6 className="mb-2 fw-bold">FRÅN VEM ELLER VAR HÄMTAR VI DINA PERSONUPPGIFTER?</h6>
                            <p className="mb-3">Vi behandlar personuppgifter som du har delat med oss.</p>
                            <h6 className="mb-2 fw-bold">VEM KAN FÅ TILLGÅNG TILL DINA PERSONUPPGIFTER?</h6>
                            <p className="mb-3">Dina personuppgifter behandlas huvudsakligen av oss på Tavlorify. Vi kommer aldrig att sälja dina personuppgifter. I vissa fall delar vi dina personuppgifter för att kunna fullfölja våra skyldigheter gentemot dig på ett effektivt sätt:</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Våra betalningsleverantörer får tillgång till dina personuppgifter för att säkerställa betalningen.</li>
                                <li className="mb-2">Vi delar dina personuppgifter med logistikföretag för att kunna leverera dina produkter och hantera returer.</li>
                                <li className="mb-2">För att samla in och publicera dina recensioner på vår webbplats delar vi dina personuppgifter med leverantörer av tekniska lösningar för recensioner.</li>
                                <li className="mb-2">För att marknadsföra relevanta produkter och anpassa vår webbplats kan vi dela dina personuppgifter med marknadsförings- och analyspartner som Google, Facebook, Pinterest, Snapchat, Tiktok och Microsoft. En fullständig lista finns i vår cookiepolicy.</li>
                                <li className="mb-2">Vi delar dina personuppgifter med IT-leverantörer som behandlar personuppgifterna på uppdrag av oss för att tillhandahålla IT-tjänster.</li>
                                <li className="mb-2">För att trycka och skicka ut din personliga poster delar vi dina personuppgifter med vårt tryckeri.</li>
                            </ul>
                            <p className="mb-3">Kontakta oss om du vill ha mer detaljerad information om vilka vi delar dina personuppgifter med.</p>
                            <h6 className="mb-2 fw-bold">ÖVERFÖR VI DINA PERSONUPPGIFTER UTANFÖR EU/EEA?</h6>
                            <p className="mb-3">Tavlorify behandlar generellt dina personuppgifter inom EU/EEA men kan i vissa fall använda leverantörer från länder utanför EU/EEA. När vi överför dina personuppgifter utanför EU/EEA säkerställer Tavlorify att det finns en tillräckligt hög skyddsnivå.</p>
                            <p className="mb-3">Tavlorify kan komma att överföra dina personuppgifter till USA för att vår nyhetsbrevsleverantör och marknadsföringstjänster ska kunna göra vår hemsida så relevant som möjligt.</p>
                            <p className="mb-3">Även om vi alltid väljer de bästa tjänsteleverantörerna och säkerställer att relevanta avtal finns, kan uppgifter som överförs till USA behandlas av amerikanska myndigheter för kontroll- och övervakningsändamål utan att effektiva rättsmedel finns tillgängliga. Vi följer noga utvecklingen av nya avtal mellan EU och USA och kommer att uppdatera vår policy i enlighet med nya standarder.</p>
                            <p className="mb-3">Kontakta oss om du har frågor om hur vi delar dina personuppgifter eller vill veta mer om våra säkerhetsåtgärder.</p>
                            <h6 className="mb-2 fw-bold">HUR KAN DU PÅVERKA BEHANDLINGEN AV DINA PERSONUPPGIFTER?</h6>
                            <p className="mb-3">Enligt dataskyddslagar har du flera rättigheter att påverka vår behandling av dina personuppgifter. Läs mer nedan.</p>
                            <h6 className="mb-2 fw-bold">Rätt att återkalla samtycke och att invända mot behandling</h6>
                            <p className="mb-3">Du har rätt att helt eller delvis återkalla ditt samtycke för behandlingen av dina personuppgifter. Din återkallelse gäller från och med tidpunkten då du återkallar samtycket. Du har rätt att invända mot behandlingen av dina personuppgifter, inklusive marknadsföring som nyhetsbrev. Generellt sett har du rätt att invända när behandlingen baseras på intresseavvägning.</p>
                            <h6 className="mb-2 fw-bold">Rätt till tillgång</h6>
                            <p className="mb-3">Du har rätt att få bekräftelse på om vi behandlar personuppgifter som berör dig och få tillgång till dessa uppgifter.</p>
                            <h6 className="mb-2 fw-bold">Rätt till rättelse</h6>
                            <p className="mb-3">Du har rätt att få felaktiga personuppgifter rättade och ofullständiga uppgifter kompletterade.</p>
                            <h6 className="mb-2 fw-bold">Rätt till radering och begränsning av behandling</h6>
                            <p className="mb-3">Under vissa omständigheter har du rätt att få dina personuppgifter raderade, till exempel om uppgifterna inte längre är nödvändiga för ändamålet de samlades in för. Du har även rätt att begära att behandlingen begränsas om uppgifternas korrekthet ifrågasätts eller om behandlingen är olaglig.</p>
                            <h6 className="mb-2 fw-bold">Rätt att lämna in klagomål till en tillsynsmyndighet</h6>
                            <p className="mb-3">Du har rätt att lämna in klagomål till en tillsynsmyndighet, till exempel Datainspektionen i Sverige, om du anser att vår behandling av dina personuppgifter bryter mot gällande lagstiftning.</p>
                            <h6 className="mb-2 fw-bold">Rätt till dataportabilitet</h6>
                            <p className="mb-3">Du har rätt att få vissa av dina personuppgifter överförda till en annan personuppgiftsansvarig i ett strukturerat, maskinläsbart format.</p>
                            <h6 className="mb-2 fw-bold">HUR OCH VARFÖR BEHANDLAR VI DINA PERSONUPPGIFTER?</h6>
                            <p className="mb-3">Vi strävar efter att vara så transparenta som möjligt om hur och varför vi behandlar dina personuppgifter. Här är en översikt över de huvudsakliga ändamålen med vår behandling:</p>
                            <h6 className="mb-2 fw-bold">Behandling före köp</h6>
                            <p className="mb-3">För att kommunicera med dig, spara tavlor som du har skapat och få feedback från dig, måste vi behandla dina personuppgifter</p>
                            <p className="mb-3">Syfte: För att spara din övergivna varukorg och påminna dig om produkter. Personuppgifter: Information om din varukorg och e-postadress. Rättslig grund: Berättigat intresse. Lagringstid: Upp till fem dagar.</p>
                            <p className="mb-3">Syfte: För att besvara dina frågor. Personuppgifter: Namn, kontaktinformation och annan information du förser oss med. Rättslig grund: Utförande av avtal. Lagringstid: Tre år eller enligt lagkrav.</p>
                            <h6 className="mb-2 fw-bold">Behandling för köp och avtal</h6>
                            <p className="mb-3">För att genomföra ditt köp och följa lagstadgar behöver vi behandla dina personuppgifter.</p>
                            <p className="mb-3">Syfte: För att administrera ditt köp och kommunicera om leverans. Personuppgifter: Namn, kontaktuppgifter, orderinformation, betalningsmetod och IP-adress. Rättslig grund: Utförande av avtal. Lagringstid: Tolv månader efter orderdatum</p>
                            <p className="mb-3">Syfte: För att hantera klagomål, reklamationer och rättsliga tvister. Personuppgifter: Namn, kontaktuppgifter och relevant information. Rättslig grund: Lagkrav och berättigat intresse. Lagringstid: Så länge ärendet pågår, minst tolv månader vid avvisat anspråk.</p>
                            <p className="mb-3">Syfte: För att följa lagar som bokföringslagen. Personuppgifter: Information på faktura, köphistorik, namn och kontaktuppgifter. Rättslig grund: Lagkrav. Lagringstid: Sju till åtta år enligt bokföringslag, fem till tio år enligt penningtvättslagstiftning.</p>
                            <h6 className="mb-2 fw-bold">Behandling för recensioner</h6>
                            <p className="mb-3">Syfte: För att skicka förfrågan om recension. Personuppgifter: Namn, e-postadress och orderdetaljer. Rättslig grund: Berättigat intresse. Lagringstid: Tills förfrågan har skickats.</p>
                            <h6 className="mb-2 fw-bold">Behandling för kundkonto</h6>
                            <p className="mb-3">Syfte: För att hantera ditt kundkonto. Personuppgifter: Namn, personnummer, e-postadress, mobilnummer, cookies, IP-adress, användarnamn och leveransadress. Rättslig grund: Utförande av avtal. Lagringstid: Två år från senaste inloggning eller tills du ber oss att ta bort kontot.</p>
                            <h6 className="mb-2 fw-bold">Behandling för marknadsföring</h6>
                            <p className="mb-3">Syfte: För att skicka nyhetsbrev och relevanta erbjudanden. Personuppgifter: Namn, telefonnummer, e-postadress, köphistorik, interaktionshistorik, cookies och IP-adress. Rättslig grund: Samtycke och berättigat intresse. Lagringstid: Tills du avregistrerar dig eller två år efter senaste köp om du inte invänt mot marknadsföring.</p>
                            <p className="mb-3">Syfte: För riktad marknadsföring i sociala medier och på tredjepartssajter. Personuppgifter: E-postadress, cookies och IP-adress. Rättslig grund: Berättigat intresse. Lagringstid: Två år efter köp om du inte invänt mot marknadsföring.</p>
                            <p className="mb-3">Syfte: För att publicera recensioner och marknadsföra vårt varumärke. Personuppgifter: Namn och recension. Rättslig grund: Berättigat intresse. Lagringstid: Tills recensionen tas bort.</p>
                            <p className="mb-3">Syfte: För att marknadsföra våra produkter med dina bilder/filmer från sociala medier. Personuppgifter: Bild/film, användarnamn och text. Rättslig grund: Berättigat intresse. Lagringstid: Tills du begär att vi tar bort bilden/filmen.</p>
                            <h6 className="mb-2 fw-bold">INTRESSEAVVÄGNING</h6>
                            <p className="mb-3">För vissa ändamål behandlar Tavlorify dina personuppgifter baserat på vårt berättigade intresse. Vid bedömning av denna grund har vi gjort ett intresseavvägningstest för att säkerställa att vårt intresse väger tyngre än ditt intresse och din rättighet att inte få dina personuppgifter behandlade. Kontakta oss om du vill veta mer om detta test. Våra kontaktuppgifter finns i början av denna integritetspolicy.</p>
                            <p className="mb-3">Denna integritetspolicy uppdaterades av Tavlorify den 25/05/2023.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}