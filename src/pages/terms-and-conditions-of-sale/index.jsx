import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";
import Link from "next/link";

export default function TermsAndConditionsOfSale() {
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    useEffect(() => {
        setIsLoadingPage(false);
    }, []);
    return (
        <div className="terms-and-conditions-of-sale policy-page">
            <Head>
                <title>Tavlorify - Köpvillkor</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Köpvillkor</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-2 fw-bold">Företagsinformation</h6>
                            <p className="mb-3">Tavlorify.se är ett E-handelsföretag som säljer posters och Canvastavlor. Företaget har sitt säte på Sverige</p>
                            <h6 className="mb-2 fw-bold">Åldersgräns</h6>
                            <p className="mb-3">På Tavlorify.se tillämpas 18-års åldersgräns vid köp.</p>
                            <h6 className="mb-2 fw-bold">Priser och betalning</h6>
                            <p className="mb-3">Varje vara anges med pris inklusive moms. I kassan kan man se det totala priset inklusive alla avgifter, moms, frakt och betalning - Vi erbjuder våra kunder köp via Klarna, Visa, Mastercard, och Swish. Vid beställningar med leveransadress utanför Sverige betalas eventuella efterföljande tullkostnader och skatter av dig. På beställning med leveransadress utanför EU debiteras du inte moms.</p>
                            <h6 className="mb-2 fw-bold">Klarnas betalningsalternativ</h6>
                            <p className="mb-3">Tillsammans med Klarna Bank AB (publ), Sveavägen 46, 111 34 Stockholm, Sweden, erbjuder vi följande betalningsalternativ där betalningen görs direkt till Klarna:</p>
                            <p className="mb-3">Betala inom 14 dagar: Betalningstid är 14 dagar från avsändandet av varorna. Villkoren för betala inom 14 dagar finner du <a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/sv_se/account">här</a></p>
                            <p className="mb-3">Konto: Klarna Konto är en kontokredit som tillhandahålls av Klarna och som ger kredittagaren möjlighet att delbetala sina köp månadsvis med minst 1/24 (minimum 50 SEK) av totala utnyttjade kreditbeloppet eller i enlighet med de i kassan godkända villkoren. För mer information om Klarna Konto inklusive allmänna villkor och Standardiserad Europeisk konsumentkreditinformation finner du <a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/sv_se/account">här</a>. Du hittar mer information om Klarna här och kan läsa deras användarvillkor <a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/sv_se/user">här</a>. För att kunna erbjuda en uppsättning av olika betalningsalternativ behöver vi dela dina person-, kontakt- och orderuppgifter med leverantören av respektive betaltjänst. Vi rekommenderar dig att läsa vår intergritetspolicy. Tillsammans med Klarna Bank AB (publ), Sveavägen 46, 111 34 Stockholm, Sweden, erbjuder vi följande betalningsalternativ där betalningen görs direkt till Klarna: Betala inom 14 dagar: Betalningstid är 14 dagar från avsändandet av varorna. Villkoren för betala inom 14 dagar finner du <a href="https://www.klarna.com/se/">här</a></p>
                            <p className="mb-3">Du hittar mer information om Klarna <a href="https://www.klarna.com/se/">här</a> och kan läsa deras användarvillkor <a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/sv_se/user">här</a>.</p>
                            <p className="mb-3">För att kunna erbjuda en uppsättning av olika betalningsalternativ behöver vi dela dina person-, kontakt- och orderuppgifter med leverantören av respektive betaltjänst. Vi rekommenderar dig att läsa vår <Link href="privacy-policy">intergritetspolicy</Link>.</p>
                            <p className="mb-3">Användningen av dessa uppgifter regleras i enlighet med gällande dataskyddslag och Klarnas <a href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/sv_se/privacy">sekretesspolicy</a>.</p>
                            <h6 className="mb-2 fw-bold">Ångerrätt</h6>
                            <p className="mb-3">Ångerrätten gäller i 14 dagar från det att du har tagit emot varan. Du har självklart rätt att öppna förpackningen för att titta närmare på varan. Varan som returneras måste vara oanvänd, i hel originalförpackning samt i oskadat skick. Fyll alltid i <a href="return-policy">returformuläret</a> för att göra en retur. Vid retur av vara står du själv för returkostnaden. Återbetalning av ordersumman eller makulering av utställd faktura skall göras av Tavlorify inom 14 dagar från det datum då den returnerade varan mottagits.</p>
                            <h6 className="mb-2 fw-bold">Ångerrätt gäller inte ifall</h6>
                            <p className="mb-3">Kunden har handlat en limiterad Print som är numrerad. Om kunden har handlat en specialanpassad Produkt eller en Produkt med en signifikant special anpassning, såsom en limiterat Print, så är Kunden inte kvalificerad för Tavlorifys ångerrätt. En Produkt som tagits fram enligt Kundens specifika specifikationer är befriad från konsumentens rätt att häva köpet under lagen om Svenska distansavtal .</p>
                            <p className="mb-3">Eftersom postern är specialtillverkad från en personlig bild gäller inte ångerrätten då den inte går att sälja vidare. Utdrag från Hallå Konsument: ”Ångerrätten gäller inte för alla sorters köp. Den gäller exempelvis inte när du köper en resa eller en specialtillverkad produkt .</p>
                            <h6 className="mb-2 fw-bold">Garantier och service</h6>
                            <p className="mb-3">Är det en synlig skada som har inträffat innan att leveransen är mottagen går produkten att reklamera. Mejla i sådana fall till info@tavlorify.se. Om det visar sig att produkten är skadad återbetalas konsumenten fraktkostnad och får utskickad en ny lika produkt där Tavlorify står för frakten .</p>
                            <h6 className="mb-2 fw-bold">Privat Policy</h6>
                            <p className="mb-3">När du lägger din beställning hos oss uppger du dina personuppgifter. I samband med din registrering och beställning godkänner du att vi lagrar och använder dina uppgifter i vår verksamhet för att fullfölja avtalet gentemot dig. Du har enligt den nya GDPR-lagen vissa rättigheter om den information som vi har registrerat om dig. Läs mer om vår Integritetspolicy <a href="/privacy-policy">här</a> .</p>
                            <h6 className="mb-2 fw-bold">Cookies</h6>
                            <p className="mb-3">Denna webbutik använder sig av cookies enligt Electronic Communications Act, 25 juli 2003. En cookie är en liten textfil som lagras på din dator och som innehåller information för att hjälpa webbutiken att identifiera och följa användare. Cookies finns som sessionscookies och som cookies som lagras permanent på din dator. Under tiden för ditt första besök i webbutiken blir din webbläsare tilldelad en sessionscookie som är unik och som används för att inte blanda ihop dig som användare med andra användare. För att kunna använda webbutiken bör du tillåta cookies i din webbläsare. Denna typ av cookie används enbart för att ge dig som besökare en bättre upplevelse och support och lagrar inga personlig uppgifter om dig. Cookies kan raderas. I denna webbutik används cookies exempelvis för att hålla koll på din kundvagn, dina inställningar och vilka sidor du besökt för att kunna ge dig en bättre kundupplevelse och support. Läs mer om hur Tavlorify använder cookies <a href="/cookie-policy">här</a> .</p>
                            <h6 className="mb-2 fw-bold">Leveranser</h6>
                            <p className="mb-3">Leveranstiden uppskattas att vara 2-5 arbetsdagar inom Sverige och skickas med DHL, Postnord eller Bring beroende på val i kassan. Till övriga länder tar det mellan 2-7 arbetsdagar beroende på land .</p>
                            <h6 className="mb-2 fw-bold">Ej uthämtade paket</h6>
                            <p className="mb-3">De flesta försändelser finns hos ditt postombud i 7 dagar. På avin hittar du information om liggetiden. Försändelser som inte hämtas ut i tid skickas tillbaka till avsändaren. Ej hämtade varor returneras till oss. För alla paket som inte löses ut förbehåller vi oss rätten att debitera dig kostnader för returfrakt, expeditionsavgift och hanteringsavgift. För närvarande motsvarar denna kostnad 150kr .</p>
                            <h6 className="mb-2 fw-bold">Reklamation</h6>
                            <p className="mb-3">Är det en synlig skada som har inträffat innan att leveransen är mottagen går produkten att reklamera. Om det visar sig att produkten är skadad återbetalas konsumenten fraktkostnad och får utskickad en ny lika produkt där Tavlorify står för frakten. Kontakta info@tavlorify.se om en skada har inträffat .</p>
                            <h6 className="mb-2 fw-bold">Återbetalningsskyldighet</h6>
                            <p className="mb-3">Vi ska, om du utnyttjat din ångerrätt, betala tillbaka vad du har betalat för varan snarast eller senast inom 14 dagar från den dag då vi tog emot varan. Konsumenten står för returkostnaden när du sänder tillbaka varan. Vi betalar dock alltid returkostnaden för att sända tillbaka en reklamerad produkt .</p>
                            <h6 className="mb-2 fw-bold">FORCE MAJEUR</h6>
                            <p className="mb-3">Händelse såsom utanför Tavlorifys kontroll, vilken ej skäligen kunnat förutses, skall hänföras till force majeure, vilket innebär att Tavlorify befrias från sina förpliktelser att fullgöra ingångna avtal .</p>
                            <h6 className="mb-2 fw-bold">Övrigt</h6>
                            <p className="mb-3">Tavlorify förbehåller sig rätten till ändring av all information utan föregående avisering. Tavlorify förbehåller sig rätten att i enskilda fall neka en beställning. Om ett försäljningsobjekt utgått har Tavlorify rätt att häva köpet och återbetala eventuella i förskott inbetalda belopp. Tavlorify reserverar sig för eventuella tryckfel i texter på denna webbsida. Tavlorify garanterar heller inte alla bilder exakt återger produkternas verkliga utseende. Tavlorify förbehåller sig rätten att justera priser och eventuella prisfel .</p>
                        </div>
                    </div>
                </div>
            </> : <LoaderPage />}
        </div>
    );
}