import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";

export default function PrivacyPolicy() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);
    
    return (
        <div className="privacy-policy policy-page">
            <Head>
                <title>Tavlorify - Integritetspolicy</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Integritetspolicy</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-3 fw-bold">FÖRE KÖP</h6>
                            <table className="policy-table mb-4">
                                <thead>
                                    <tr>
                                        <th>För vilket ändamål behandlar vi personuppgifterna ?</th>
                                        <th>Vilka uppgifter behandlar vi ?</th>
                                        <th>Vad är den lagliga grunden för behandlingen ?</th>
                                        <th>Hur länge behandlar/lagrar vi uppgifterna ?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>För att spara din övergivna varukorg och påminna dig om produkten du har lämnat</td>
                                        <td>Information om din varukorg och angiven e-postadress</td>
                                        <td>Vårt berättigade intresse att för dig underlätta ett planerat köp av produkten du lagt i din varukorg</td>
                                        <td>7 dagar</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className="mb-3 fw-bold">FÖR GENOMFÖRANDE AV KÖP, AVTAL, ETC .</h6>
                            <table className="policy-table mb-4">
                                <thead>
                                    <tr>
                                        <th>För vilket ändamål behandlar vi personuppgifterna ?</th>
                                        <th>Vilka uppgifter behandlar vi ?</th>
                                        <th>Vad är den lagliga grunden för behandlingen ?</th>
                                        <th>Hur länge behandlar/lagrar vi uppgifterna ?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>För att genomföra och administrera ditt köp, bekräfta ditt köp, kommunicera med dig angående din order samt samla in information om din upplevelse</td>
                                        <td>Kontaktuppgifter (såsom namn, e-postadress, adress), orderinformation, IP-adress, betalningsuppgifter</td>
                                        <td>För att kunna genomföra vårt avtal med dig enligt Tavlorifys allmänna försäljningsvillkor</td>
                                        <td>12 månader efter genomförd order</td>
                                    </tr>
                                    <tr>
                                        <td>För att fullfölja rättsliga förpliktelser, såsom bokföringslagen</td>
                                        <td>Kontaktuppgifter, betalningsuppgifter, orderinformation, korrespondens och/eller annan information om </td>
                                        <td>Rättslig förpliktelse att följa relevant lagstiftning</td>
                                        <td>Så länge vi är skyldiga att spara uppgifterna enligt lag eller myndighetsbeslut</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>ärendet</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>För att hantera klagomål, reklamationer och/eller rättsliga tvister mot oss</td>
                                        <td>Namn, kontaktuppgifter samt annan information som du lämnat oss som är relevant för klagomålet, reklamationen och/eller den rättsliga tvisten</td>
                                        <td>Berättigat intresse</td>
                                        <td>12 månade efter klagomålet, reklamationen och/eller den rättsliga tvisten är avslutad</td>
                                    </tr>
                                    <tr>
                                        <td>För att hantera kundtjänstärenden</td>
                                        <td>Kontaktuppgifter, betalningsuppgifter, orderinformation, användargenererad data, korrespondens och/eller annan information om ärendet</td>
                                        <td>Berättigat intresse</td>
                                        <td>12 månader efter den senaste kontakten i ärendet</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className="mb-3 fw-bold">FÖR ATT KOMMUNICERA NYHETSBREV, INSPIRATION ELLER AKTUELLA ERBJUDANDEN TILL DIG</h6>
                            <table className="policy-table mb-4">
                                <thead>
                                    <tr>
                                        <th>För vilket ändamål behandlar vi personuppgifterna ?</th>
                                        <th>Vilka uppgifter behandlar vi ?</th>
                                        <th>Vad är den lagliga grunden för behandlingen ?</th>
                                        <th>Hur länge behandlar/lagrar vi uppgifterna ?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>För att skicka nyhetsbrev och relevanta erbjudanden till dig</td>
                                        <td>E-postadress, köphistorik</td>
                                        <td>När du anmäler dig till vårt nyhetsbrev ger du oss ditt samtycke att hantera din information När du genomfört ett köp behandlar vi din information baserat</td>
                                        <td>Om du anmält dig till vårt nyhetsbrev skickad dom tills du avregistrerar dig Om vi skickar nyhetsbrev baserat på vårt berättigade intresse så görs detta i två år efter köpets</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>på vårt berättigade intresse att skicka direkt marknadsföring till dig. Detta gör vi endast om du genomfört ett köp och inte aktivt valt att ej ta emot marknadsföring</td>
                                        <td>genomförande, såvida du inte motsätter dig marknadsföring innan dess</td>
                                    </tr>
                                    <tr>
                                        <td>För att göra riktad marknadsföring till dig om våra produkter och tjänster via tredjepartssidor</td>
                                        <td>E-postadress, cookies och IP-adress</td>
                                        <td>Vårt berättigade intresse att göra vår marknadsföring mer relevant för dig.</td>
                                        <td>2 år efter köpets genomförande, såvida du inte motsätter dig marknadsföring innan dess</td>
                                    </tr>
                                    <tr>
                                        <td>För att marknadsföra våra tjänster och produkter kan vi komma att publicera bilder, filmer och/eller text på inlägg via sociala medier som du taggat med #tavlorify eller @tavlorify på dina sociala medier</td>
                                        <td>Bilden, filmen och/eller texten från ditt inlägg, samt ditt användarnamn på plattformen</td>
                                        <td>Vårt berättigade intresse att publicera material som innehåller taggen #tavlorify eller @tavlorify</td>
                                        <td>Fram till dess att du meddelar oss att du inte längre vill att vi visar din bild/film eller text på vår hemsida eller våra sociala medier</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 className="mb-3 fw-bold">VAR LAGRAS MINA PERSONUPPGIFTER ?</h6>
                            <p className="mb-3">Av tekniska skäl så kan våra underleverantörer behöva flytta uppgifter till andra länder utanför EU. Om detta sker så används lämpliga skyddsåtgärder och standardiserade dataskyddsbestämmelser som godkänts av EU-kommissionen</p>
                            <p className="mb-3">Tavlorify friskriver sig från ansvar kring hur andra företag lagrar, behandlar och delar vidare delade personuppgifter.</p>
                            <h6 className="mb-3 fw-bold">DATAÖVERFÖRING TILL TREDJE PART</h6>
                            <p className="mb-3">Vi överför dina uppgifter till tjänsteleverantörer som stödjer oss i driften av våra webbplatser och tillhörande processer i enlighet med Art. 28 GDPR. Våra tjänsteleverantörer är strängt bundna till våra instruktioner och således även avtalsmässigt bundna. Vi använder följande tjänsteleverantörer :</p>
                            <p className="mb-3">Vi använder dessa tjänster för att förbättra och övervaka vår hemsida: emarsys, SalesForce, FaceBook Business Manager - Facebook Custom Audience List, Google - Google Customer Match List, IntelliAd, Google Analytics, Google AdSense, Google Adwords och Youtube .</p>
                            <p className="mb-3">Vi arbetar tillsammans med följande marknadsföringspartners för att genomföra marknadsföringsåtgärder: Google Adwords, Google AdSense, Googles Display Network, Youtube, Bing, Facebook, samt Avilliate Networks (Awin, Flexoffers, Cross sell, Zanox, Affilinet, Webgains, Tradetracker, Daisycon, CJ Affiliate by Conservant, Belboon, Adcell) och deras respektive anslutna partners .</p>
                            <p className="mb-3">Dessa marknadsföringspartners kontrollerar om du har nått vår webbplats genom att ha klickat på en annonseringskampanjs-objekt. Detta ger oss möjlighet att utveckla riktade marknadsföringsstrategier och säkerställa en optimal annonsupplevelse för dig som användare.</p>
                            <h6 className="mb-3 fw-bold">DATAÖVERFÖRING TILL TREDJELÄNDER</h6>
                            <p className="mb-3">I vissa fall överför vi personuppgifter till ett tredjeland utanför EU, men vi ser alltid till att en lämplig skyddsnivå upprätthålls vilket illustreras nedan :</p>
                            <p className="mb-3">I vissa fall överför vi personuppgifter till ett tredjeland utanför EU, men vi ser alltid till att en lämplig skyddsnivå upprätthålls vilket illustreras nedan :I händelse av dataöverföring till USA, följer en adekvat nivå av dataskydd från det motsvarande deltagandet av tjänsteleverantörerna i Privacy Shield Agreement (Art. 45 § 1 GDPR )</p>
                            <p className="mb-3">När det gäller EU-länder har EU-kommissionen beslutat om en lämplig nivå av dataskydd i enlighet med art. 45 §1 GDPR</p>
                            <h6 className="mb-3 fw-bold">SÄKERHET</h6>
                            <p className="mb-3">Vi använder HTTPS, vilket är en krypterad och säker anslutning som innehar SSL-certifikat, som är vanligt på hemsidor med betalningslösningar. Detta är för att undvika att utomstående avlyssnar data som skickas mellan dig och hemsidan.</p>
                            <h6 className="mb-3 fw-bold">VAD ÄR MINA RÄTTIGHETER ?</h6>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Rätt till information: Du kan begära att få en kopia på de personuppgifter vi har om dig</li>
                                <li className="mb-2">Rätt till rättelse: Vi vill säkerställa att din information är uppdaterad och korrekt. Du kan begära att få din information rättad eller borttagen om du anser att den är inkorrekt</li>
                                <li className="mb-2">Rätt till radering: Du kan begära att vi ska radera dina personuppgifter. Vi får inte radera uppgifter som lagen kräver att vi behåller</li>
                                <li className="mb-2">Dataportabilitet: Du kan be oss att flytta dina personuppgifter från vår IT-miljö till någon annan, antingen ett annat företag eller till dig. Detta gäller inte uppgifter som lagen kräver att vi behåller</li>
                                <li className="mb-2">Ta tillbaka samtycke: Du kan ta tillbaka ditt samtycke till att dela din information eller att ta emot marknadsföring och/eller nyhetsbrev när som helst. Antingen genom att avprenumerera från meddelandet eller kontakta oss via e-post</li>
                                <li className="mb-2">•	Om du tycker att vi hanterar dina personuppgifter på ett felaktigt sätt är du välkommen att kontakta oss på <a href="mailto:Info@tavlorify.se">Info@tavlorify.se</a>. Du har även rätt lämna ett klagomål till Datainspektionen om du anser att vi behandlar dina personuppgifter i strid med dataskyddsförordningen.</li>
                            </ul>
                            <h6 className="mb-3 fw-bold">TILLÄGG</h6>
                            <p className="mb-3">Denna integritetspolicy finns alltid i sin senaste version på Tavlorifys hemsida. Policyn gäller vid var tid i den form och till det innehåll som är publicerat på hemsidan.</p>
                            <p className="mb-3">Tavlorify har rätt att när som helst uppdatera integritetspolicyn. Om större förändringar sker kan vi komma att skicka ut separat information via e-post .</p>
                            <h6 className="mb-3 fw-bold">KONTAKT</h6>
                            <p className="mb-3">Om du har vidare frågor kring denna integritetspolicy eller vår behandling av din information, vänligen kontakta kundservice på <a href="mailto:Info@tavlorify.se">Info@tavlorify.se</a>.</p>
                            <p>Denna integritetspolicy uppdaterades 2021-03-17 .</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}