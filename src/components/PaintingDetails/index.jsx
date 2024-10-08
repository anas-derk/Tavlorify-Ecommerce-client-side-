import { useState } from "react";

export default function PaintingDetails({ windowInnerWidth, serviceName }) {
    
    const [appearedPaintingDetailsList, setAppearedPaintingDetailsList] = useState(["summary"]);
    
    return (
        <section className="painting-details">
            {windowInnerWidth >= 767 && <>
                <ul className="painting-details-buttons-list row text-center m-0">
                    <li
                        className={`painting-details-button-item col-md-4 p-3 fw-bold ${appearedPaintingDetailsList.includes("summary") ? "selected" : ""}`}
                        onClick={() => setAppearedPaintingDetailsList(["summary"])}
                    >
                        Hur fungerar det
                    </li>
                    <li
                        className={`painting-details-button-item col-md-4 p-3 fw-bold ${appearedPaintingDetailsList.includes("product-information") ? "selected" : ""}`}
                        onClick={() => setAppearedPaintingDetailsList(["product-information"])}
                    >
                        Produktinformation
                    </li>
                    <li
                        className={`painting-details-button-item col-md-4 p-3 fw-bold ${appearedPaintingDetailsList.includes("shipping-and-delivery") ? "selected" : ""}`}
                        onClick={() => setAppearedPaintingDetailsList(["shipping-and-delivery"])}
                    >
                        Frakt & Leverans
                    </li>
                </ul>
                {appearedPaintingDetailsList.includes("summary") && <div className="summary-box p-3 pb-4 pt-4">
                    {serviceName === "text-to-image" && <>
                        <p className="mb-2 content">Skapa Din Egen AI-Genererade Konst: En Enkel Guide .</p>
                        <p className="mb-2 content">Välkommen till en värld där din kreativitet möter artificiell intelligens för att skapa unik konst. Här på Tavlorify kan du enkelt omvandla dina idéer till vackra konstverk med hjälp av AI. Processen är enkel och tillgänglig för alla, oavsett konstnärlig erfarenhet .</p>
                        <ul>
                            <li className="mb-2 content"><span className="fw-bold">Steg 1</span>: Formulera Din Vision - Börja med att beskriva vad du vill se i ditt konstverk. Denna kan innehålla allt från scener och objekt till färger och känslor. Var så detaljerad som möjligt för att ge AI:n en tydlig uppfattning om din vision.</li>
                            <li className="mb-2 content"><span className="fw-bold">Steg 2</span>: Välj Kategori & Stil - För varje kategori finns det speciella konststilar. Välj kategori & en konstnärlig stil för ditt verk. Det kan vara allt från klassiskt och realistiskt till modern och abstrakt. Vi erbjuder en mängd olika stilar som speglar olika konstnärliga epoker och rörelser.</li>
                            <li className="mb-2 content"><span className="fw-bold">Steg 3</span>: Skapa Din Konst - När du är nöjd med din text och stilval, tryck helt enkelt på "SKAPA DIN KONST"-knappen. Vår AI kommer då att bearbeta din förfrågan och skapa ett unikt konstverk inspirerat av din beskrivning.</li>
                            <li className="mb-2 content"><span className="fw-bold">Steg 4</span>: Beundra Resultatet - Inom kort kommer ditt personliga AI-genererade konstverk att visas. På Tavlorify har du möjligheten att inte bara skapa, utan också att förädla din konst. Föreställ dig ditt unika konstverk omvandlat till en elegant affisch, inramad och klar för att pryda ditt rum med stil. Eller kanske du föredrar den klassiska känslan av en canvastavla, redo att hängas upp och bli hemmets mittpunkt. Välj mellan ramar och stilfulla hängare som kompletterar din konstnärliga skapelse, och förvandla ditt konstverk till ett tidlöst inredningsmästerverk. Skapa, förädla, och låt ditt hem berättar din historia genom konsten.</li>
                        </ul>
                        <p className="mb-4 content">Att skapa konst med AI är en spännande och kreativ process där du har full kontroll över slutresultatet. Vare sig du söker inspiration eller vill förverkliga en specifik konstnärlig vision, är vår plattform det perfekta verktyget för att utforska konstens gränslösa möjligheter.</p>
                    </>}
                    {serviceName === "image-to-image" && <>
                        <p className="mb-2 content">Skapa din alldeles egna unika konstverk på ett ögonblick. Hos oss är det enkelt och smidigt att förvandla dina mest betydelsefulla minnen till personliga tavlor. Bara några enkla steg skiljer dig från att ha din egen konst på väggen</p>
                        <ol>
                            <li className="mb-2"><span className="fw-bold content">Ladda upp din bild</span>: Börja med att ladda upp den bild som betyder mest för dig. Det kan vara ett speciellt ögonblick, en minnesvärd resa, eller en nära vän eller familjemedlem. Ditt val, din historia</li>
                            <li className="mb-2"><span className="fw-bold content">Anpassa din tavla</span>: Nu är det dags att sätta din personliga touch på verket. Välj bland olika alternativ såsom kategori, stilar, format och storlekar. Forma din tavla precis som du vill ha den</li>
                            <li className="mb-2"><span className="fw-bold content">Skapa ditt konstverk</span>: Tryck på "Skapa din konst"-knappen, och du kommer omedelbart att få en förhandsvisning av din tavla direkt på skärmen. Det är ditt tillfälle att se hur din konst tar form, och du kan justera den tills den är precis som du önskar</li>
                            <li className="mb-2"><span className="fw-bold">Beställ din tavla</span>: När du är nöjd med resultatet är det dags att göra din beställning. Vi tar hand om resten. Snabbt, enkelt och med kärlek</li>
                        </ol>
                        <p className="mb-4 content">För att göra din tavla ännu mer unik, erbjuder vi stilrena ramar och posterhängare i matchande storlekar. Skapa din personliga konst med oss och ge ditt hem eller kontor en touch av din egen personlighet. Låt dina minnen leva genom ditt konstverk – det är enkelt och inspirerande."</p>
                    </>}
                    {serviceName === "face-swap" && <>
                        <p className="mb-2 content">Skapa din unika konst med Ansiktskonst-teknik</p>
                        <p>Hos oss kan du enkelt förvandla ditt foto till ett mästerverk med hjälp av vår avancerade AI-teknik. Följ dessa steg för att skapa ditt personliga konstverk:</p>
                        <ol>
                            <li className="mb-2"><span className="fw-bold content">Ladda upp din bild</span>: Börja med att ladda upp en bild av ditt ansikte. Detta kan vara en selfie eller en annan bild där ditt ansikte syns tydligt. Ditt foto blir grunden för konstverket.</li>
                            <li className="mb-2"><span className="fw-bold content">Välj kön</span>: När bilden är uppladdad, välj om du vill skapa en bild med en manlig eller kvinnlig stil. Detta avgör vilka stilar som kommer att vara tillgängliga för dig.</li>
                            <li className="mb-2"><span className="fw-bold content">Välj en stil</span>: Nu kan du bläddra bland de tillgängliga stilarna och välja den som passar dig bäst. Varje stil kommer att anpassas för att matcha ditt valda kön.</li>
                            <li className="mb-2"><span className="fw-bold">Välj format</span>: Välj det format som du vill ha för din tavla, stående, liggande eller kvadratiskt.</li>
                            <li className="mb-2"><span className="fw-bold">Skapa ditt konstverk</span>: Klicka på knappen "Skapa din konst" för att se en förhandsvisning av ditt konstverk där ditt ansikte har integrerats i den valda stilen.</li>
                            <li className="mb-2"><span className="fw-bold">Justera och beställ</span>: Om du är nöjd med resultatet, kan du fortsätta med att välja storlek på tavlan, samt om du vill lägga till en ram eller kant. När allt är klart, lägg till tavlan i din varukorg. Om du inte är nöjd med resultatet, kan du enkelt välja en annan stil och prova igen tills du hittar den perfekta kombinationen.</li>
                        </ol>
                        <p className="mb-4 content">Med vår Ansiktskonst-tjänst kan du experimentera med olika stilar och format tills du skapar ett konstverk som verkligen speglar din personlighet. Låt ditt ansikte bli en del av ett unikt och personligt mästerverk, redo att pryda dina väggar.</p>
                    </>}
                </div>}
                {appearedPaintingDetailsList.includes("product-information") && <div className="product-information-box p-3 pb-4 pt-4">
                    {/* Start Accordion Component From Bootstrap */}
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Premium matt papper / Affisch
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className="mb-2 content">Vårt tyngre, vita premium matta papper har en naturlig, jämn oobehandlad yta som ger en lyxig känsla vid beröring.</p>
                                    <p className="mb-2 content">Varför välja vårt premium matta papper:</p>
                                    <ul>
                                        <li className="mb-2">Utmärkt Kvalitet: Vår 200 g/m² papperstjocklek gör det inte bara robust och långlivat, utan ger också en förstklassig kvalitetskänsla till dina tryck.</li>
                                        <li className="mb-2">Miljövänligt Val: Vi använder FSC-certifierat papper eller likvärdiga certifieringar. Detta innebär att du inte bara investerar i ditt projekt, utan också i en hållbar framtid för människor och planeten.</li>
                                        <li className="mb-2">Skräddarsydd Produktion: Våra affischer och tryck tillverkas och levereras på begäran. Detta säkerställer att varje produkt är färsk och anpassad efter dina specifika behov.</li>
                                    </ul>
                                    <p className="mb-2 content">När du väljer vårt premium matta papper, väljer du både kvalitet och ansvar. Låt dina projekt glänsa på ett papper som är lika unikt som ditt budskap.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                    Hängare
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className="mb-2 content">Våra minimalistiska trähängare är tillverkade med fyra magnetiska trädowelstavar, två som klämmer fast högst upp på din utskrift och två som klämmer fast längst ner för att ge en vintage-look och känsla.</p>
                                    <p className="mb-2 content fw-bold">Funktioner:</p>
                                    <ul>
                                        <li className="mb-2">Hängarna är tillverkade av furuträ och finns i fyra färgvarianter: svart, vit, naturlig träfärg och mörkbrunt trä.</li>
                                        <li className="mb-2">Den bomullsrep som är fäst längst upp matchar hängarens färg.</li>
                                        <li className="mb-2">Designade magnetiskt, skadar inte hängarna affischen och gör det också enkelt att byta utskrifter, vilket gör dem till ett mångsidigt och hållbart alternativ.</li>
                                    </ul>
                                    <p className="mb-2 content">När du väljer våra hängare får du inte bara en praktisk lösning för att visa dina affischer, utan också en touch av elegans och vintagecharm. Gör ditt utrymme speciellt med våra vackra hängare som både skyddar och förhöjer dina konstverk.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                    Träinramad Affisch.
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className="mb-2 content">Våra färdiga träinramade affischer är stabila, hållbara och redo att hängas upp direkt!</p>
                                    <p className="mb-2 content fw-bold">Funktioner:</p>
                                    <ul>
                                        <li className="mb-2">Ramarna är tillverkade av tall eller ek och finns i fyra färger: svart, vit, naturligt trä och mörkbrunt.</li>
                                        <li className="mb-2">De är 20-25 mm tjocka och 10-14 mm breda, vilket ger den perfekta balansen mellan hållbarhet och stil.</li>
                                        <li className="mb-2">För att hålla din affisch i bästa skick använder vi splitterfri, transparent plexiglas för att skydda den från skador.</li>
                                        <li className="mb-2">Vi inkluderar upphängningsbeslag med varje beställning, vilket gör det enkelt att hänga upp ramen både horisontellt och vertikalt.</li>
                                        <li className="mb-2">Affischen är klar att hänga eftersom den levereras inramad. Den är redo att hängas direkt på väggen.</li>
                                    </ul>
                                    <p className="mb-2 content">Med våra träinramade affischer får du inte bara en praktisk och skyddande lösning för din konst, utan också en smakfull touch av elegans. Förhöj din inredning och visa upp dina affischer på bästa möjliga sätt med våra färdiga träinramade affischer.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                    Canvas
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <p className="mb-2 content">Förstärkt textur och tidlös skönhet med våra canvas-tryck. Canvasens textur förhöjer bildens naturliga utseende och känsla, vilket skapar en verkligt fördjupande konstupplevelse.</p>
                                    <p className="mb-2 content fw-bold">Funktioner:</p>
                                    <ul>
                                        <li className="mb-2">Vi använder trä till sträckramarna som är ansvarsfullt källat, främst trä med FSC-certifiering, för att skapa våra canvas-tryck och säkerställa en långvarig och högkvalitativ produkt .</li>
                                        <li className="mb-2">Vårt canvas-tryck finns i 2 cm tjocklek. Levereras med medföljande upphängningsbeslag för enkel installation.</li>
                                        <li className="mb-2">Vi använder belagt tyg i en blandning av bomull och polyester för vårt canvasunderlag. Det ger en vikt på cirka 300-350 gsm/110-130 lb duk och en tjocklek på 350-400 mikron, vilket ger dig en robust och hållbar produkt.</li>
                                        <li className="mb-2">Vi har också inkluderat en upphängningssats</li>
                                    </ul>
                                    <p className="mb-2 content">Med vårt canvas-tryck får du inte bara ett konstverk, utan också en tidlös bit som förvandlar ditt utrymme till en konstgalleri. Ge dina bilder liv med våra canvas-tryck av högsta kvalitet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Accordion Component From Bootstrap */}
                </div>}
                {appearedPaintingDetailsList.includes("shipping-and-delivery") && <div className="shipping-and-delivery-box p-3 pb-4 pt-4">
                    <p className="mb-4 content"><span className="fw-bold">Leveranstid</span>: 3-5 vardagar.</p>
                    <p className="mb-4 content"><span className="fw-bold">Fraktkostnad</span>: Fri frakt.</p>
                    <p className="m-0"><span className="fw-bold">Leverantör</span>: Skickas med DHL eller Postnord till ombud.</p>
                </div>}
            </>}
            {windowInnerWidth < 767 && <>
                {/* Start Accordion Component From Bootstrap */}
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Hur fungerar det
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p className="mb-4 content">"Skapa din alldeles egna unika konstverk på ett ögonblick. Hos oss är det enkelt och smidigt att förvandla dina mest betydelsefulla minnen till personliga tavlor. Bara några enkla steg skiljer dig från att ha din egen konst på väggen</p>
                                {serviceName === "text-to-image" && <>
                                    <p className="mb-2 content">Skapa Din Egen AI-Genererade Konst: En Enkel Guide .</p>
                                    <p className="mb-2 content">Välkommen till en värld där din kreativitet möter artificiell intelligens för att skapa unik konst. Här på Tavlorify kan du enkelt omvandla dina idéer till vackra konstverk med hjälp av AI. Processen är enkel och tillgänglig för alla, oavsett konstnärlig erfarenhet .</p>
                                    <ul>
                                        <li className="mb-2 content"><span className="fw-bold">Steg 1</span>: Formulera Din Vision - Börja med att beskriva vad du vill se i ditt konstverk. Denna kan innehålla allt från scener och objekt till färger och känslor. Var så detaljerad som möjligt för att ge AI:n en tydlig uppfattning om din vision.</li>
                                        <li className="mb-2 content"><span className="fw-bold">Steg 2</span>: Välj Kategori & Stil - För varje kategori finns det speciella konststilar. Välj kategori & en konstnärlig stil för ditt verk. Det kan vara allt från klassiskt och realistiskt till modern och abstrakt. Vi erbjuder en mängd olika stilar som speglar olika konstnärliga epoker och rörelser.</li>
                                        <li className="mb-2 content"><span className="fw-bold">Steg 3</span>: Skapa Din Konst - När du är nöjd med din text och stilval, tryck helt enkelt på "SKAPA DIN KONST"-knappen. Vår AI kommer då att bearbeta din förfrågan och skapa ett unikt konstverk inspirerat av din beskrivning.</li>
                                        <li className="mb-2 content"><span className="fw-bold">Steg 4</span>: Beundra Resultatet - Inom kort kommer ditt personliga AI-genererade konstverk att visas. På Tavlorify har du möjligheten att inte bara skapa, utan också att förädla din konst. Föreställ dig ditt unika konstverk omvandlat till en elegant affisch, inramad och klar för att pryda ditt rum med stil. Eller kanske du föredrar den klassiska känslan av en canvastavla, redo att hängas upp och bli hemmets mittpunkt. Välj mellan ramar och stilfulla hängare som kompletterar din konstnärliga skapelse, och förvandla ditt konstverk till ett tidlöst inredningsmästerverk. Skapa, förädla, och låt ditt hem berättar din historia genom konsten.</li>
                                    </ul>
                                    <p className="mb-4 content">Att skapa konst med AI är en spännande och kreativ process där du har full kontroll över slutresultatet. Vare sig du söker inspiration eller vill förverkliga en specifik konstnärlig vision, är vår plattform det perfekta verktyget för att utforska konstens gränslösa möjligheter.</p>
                                </>}
                                {serviceName === "image-to-image" && <>
                                    <p className="mb-2 content">Skapa din alldeles egna unika konstverk på ett ögonblick. Hos oss är det enkelt och smidigt att förvandla dina mest betydelsefulla minnen till personliga tavlor. Bara några enkla steg skiljer dig från att ha din egen konst på väggen</p>
                                    <ol>
                                        <li className="mb-2"><span className="fw-bold content">Ladda upp din bild</span>: Börja med att ladda upp den bild som betyder mest för dig. Det kan vara ett speciellt ögonblick, en minnesvärd resa, eller en nära vän eller familjemedlem. Ditt val, din historia</li>
                                        <li className="mb-2"><span className="fw-bold content">Anpassa din tavla</span>: Nu är det dags att sätta din personliga touch på verket. Välj bland olika alternativ såsom kategori, stilar, format och storlekar. Forma din tavla precis som du vill ha den</li>
                                        <li className="mb-2"><span className="fw-bold content">Skapa ditt konstverk</span>: Tryck på "Skapa din konst"-knappen, och du kommer omedelbart att få en förhandsvisning av din tavla direkt på skärmen. Det är ditt tillfälle att se hur din konst tar form, och du kan justera den tills den är precis som du önskar</li>
                                        <li className="mb-2"><span className="fw-bold">Beställ din tavla</span>: När du är nöjd med resultatet är det dags att göra din beställning. Vi tar hand om resten. Snabbt, enkelt och med kärlek</li>
                                    </ol>
                                    <p className="mb-4 content">För att göra din tavla ännu mer unik, erbjuder vi stilrena ramar och posterhängare i matchande storlekar. Skapa din personliga konst med oss och ge ditt hem eller kontor en touch av din egen personlighet. Låt dina minnen leva genom ditt konstverk – det är enkelt och inspirerande."</p>
                                </>}
                                <p className="mb-4 content">För att göra din tavla ännu mer unik, erbjuder vi stilrena ramar och posterhängare i matchande storlekar. Skapa din personliga konst med oss och ge ditt hem eller kontor en touch av din egen personlighet. Låt dina minnen leva genom ditt konstverk – det är enkelt och inspirerande."</p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Produktinformation
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                {/* Start Accordion Component From Bootstrap */}
                                <div className="accordion" id="accordionExample1">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneInsideCollapseTwo" aria-expanded="true" aria-controls="collapseOneInsideCollapseTwo">
                                                Premium matt papper / Affisch
                                            </button>
                                        </h2>
                                        <div id="collapseOneInsideCollapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample1">
                                            <div className="accordion-body">
                                                <p className="mb-2 content">Vårt tyngre, vita premium matta papper har en naturlig, jämn oobehandlad yta som ger en lyxig känsla vid beröring.</p>
                                                <p className="mb-2 content">Varför välja vårt premium matta papper:</p>
                                                <ul>
                                                    <li className="mb-2">Utmärkt Kvalitet: Vår 200 g/m² papperstjocklek gör det inte bara robust och långlivat, utan ger också en förstklassig kvalitetskänsla till dina tryck.</li>
                                                    <li className="mb-2">Miljövänligt Val: Vi använder FSC-certifierat papper eller likvärdiga certifieringar. Detta innebär att du inte bara investerar i ditt projekt, utan också i en hållbar framtid för människor och planeten.</li>
                                                    <li className="mb-2">Skräddarsydd Produktion: Våra affischer och tryck tillverkas och levereras på begäran. Detta säkerställer att varje produkt är färsk och anpassad efter dina specifika behov.</li>
                                                </ul>
                                                <p className="mb-2 content">När du väljer vårt premium matta papper, väljer du både kvalitet och ansvar. Låt dina projekt glänsa på ett papper som är lika unikt som ditt budskap.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwoInsideCollapseTwo" aria-expanded="true" aria-controls="collapseTwoInsideCollapseTwo">
                                                Hängare
                                            </button>
                                        </h2>
                                        <div id="collapseTwoInsideCollapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample1">
                                            <div className="accordion-body">
                                                <p className="mb-2 content">Våra minimalistiska trähängare är tillverkade med fyra magnetiska trädowelstavar, två som klämmer fast högst upp på din utskrift och två som klämmer fast längst ner för att ge en vintage-look och känsla.</p>
                                                <p className="mb-2 content fw-bold">Funktioner:</p>
                                                <ul>
                                                    <li className="mb-2">Hängarna är tillverkade av furuträ och finns i fyra färgvarianter: svart, vit, naturlig träfärg och mörkbrunt trä.</li>
                                                    <li className="mb-2">Den bomullsrep som är fäst längst upp matchar hängarens färg.</li>
                                                    <li className="mb-2">Designade magnetiskt, skadar inte hängarna affischen och gör det också enkelt att byta utskrifter, vilket gör dem till ett mångsidigt och hållbart alternativ.</li>
                                                </ul>
                                                <p className="mb-2 content">När du väljer våra hängare får du inte bara en praktisk lösning för att visa dina affischer, utan också en touch av elegans och vintagecharm. Gör ditt utrymme speciellt med våra vackra hängare som både skyddar och förhöjer dina konstverk.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThreeInsideCollapseTwo" aria-expanded="true" aria-controls="collapseThreeInsideCollapseTwo">
                                                Träinramad Affisch.
                                            </button>
                                        </h2>
                                        <div id="collapseThreeInsideCollapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample1">
                                            <div className="accordion-body">
                                                <p className="mb-2 content">Förstärkt textur och tidlös skönhet med våra canvas-tryck. Canvasens textur förhöjer bildens naturliga utseende och känsla, vilket skapar en verkligt fördjupande konstupplevelse.</p>
                                                <p className="mb-2 content fw-bold">Funktioner:</p>
                                                <ul>
                                                    <li className="mb-2">Vi använder trä till sträckramarna som är ansvarsfullt källat, främst trä med FSC-certifiering, för att skapa våra canvas-tryck och säkerställa en långvarig och högkvalitativ produkt .</li>
                                                    <li className="mb-2">Vårt canvas-tryck finns i 2 cm tjocklek. Levereras med medföljande upphängningsbeslag för enkel installation.</li>
                                                    <li className="mb-2">Vi använder belagt tyg i en blandning av bomull och polyester för vårt canvasunderlag. Det ger en vikt på cirka 300-350 gsm/110-130 lb duk och en tjocklek på 350-400 mikron, vilket ger dig en robust och hållbar produkt.</li>
                                                    <li className="mb-2">Vi har också inkluderat en upphängningssats</li>
                                                </ul>
                                                <p className="mb-2 content">Med vårt canvas-tryck får du inte bara ett konstverk, utan också en tidlös bit som förvandlar ditt utrymme till en konstgalleri. Ge dina bilder liv med våra canvas-tryck av högsta kvalitet.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourInsideCollapseTwo" aria-expanded="true" aria-controls="collapseFourInsideCollapseTwo">
                                                Canvas
                                            </button>
                                        </h2>
                                        <div id="collapseFourInsideCollapseTwo" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample1">
                                            <div className="accordion-body">
                                                <p className="mb-2 content">Förstärkt textur och tidlös skönhet med våra canvas-tryck. Canvasens textur förhöjer bildens naturliga utseende och känsla, vilket skapar en verkligt fördjupande konstupplevelse.</p>
                                                <p className="mb-2 content fw-bold text-dark bg-transparent">Funktioner:</p>
                                                <ul>
                                                    <li className="mb-2">Vi använder trä till sträckramarna som är ansvarsfullt källat, främst trä med FSC-certifiering, för att skapa våra canvas-tryck och säkerställa en långvarig och högkvalitativ produkt.</li>
                                                    <li className="mb-2">Vårt canvas-tryck finns i 2 cm tjocklek.</li>
                                                    <li className="mb-2">För att hålla din affisch i bästa skick använder vi splitterfri, transparent plexiglas för att skydda den från skador.</li>
                                                    <li className="mb-2">Vi använder belagt tyg, en blandning av bomull och polyester, för vårt canvas-material. Det ger en vikt på ungefär 300-350 gsm och en tjocklek på 350-400 mikron, vilket ger dig en robust och hållbar produkt.</li>
                                                    <li className="mb-2">Observera att färgade kanter inte stöds. Vi försäkrar dock att vårt canvas-tryck är en vacker och högkvalitativ produkt som kommer att ge liv åt vilket rum som helst.</li>
                                                </ul>
                                                <p className="mb-2 content">Med vårt canvas-tryck får du inte bara ett konstverk, utan också en tidlös bit som förvandlar ditt utrymme till en konstgalleri. Ge dina bilder liv med våra canvas-tryck av högsta kvalitet.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Accordion Component From Bootstrap */}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed fw-bold text-dark bg-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Frakt & Leverans
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p className="mb-4 content"><span className="fw-bold">Leveranstid</span>: 3-5 vardagar.</p>
                                <p className="mb-4 content"><span className="fw-bold">Fraktkostnad</span>: Fri frakt.</p>
                                <p className="m-0"><span className="fw-bold">Leverantör</span>: Skickas med DHL eller Postnord till ombud.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Accordion Component From Bootstrap */}
            </>}
        </section>
    );
}