import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import LoaderPage from "@/components/LoaderPage";

export default function ReturnPolicy() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    useEffect(() => {
        setIsLoadingPage(false);
    }, []);
    
    return (
        <div className="return-policy policy-page">
            <Head>
                <title>Tavlorify Store - Return Policy</title>
            </Head>
            {!isLoadingPage ? <>
                <Header />
                <div className="page-content">
                    <div className="container-fluid">
                        <h1 className="text-center mb-4 welcome-msg pb-3">Retur & reklamation</h1>
                        <div className="policy-explain w-50 mx-auto">
                            <h6 className="mb-2 fw-bold">HAR JAG ÅNGERRÄTT ?</h6>
                            <p className="mb-3">Eftersom postern är specialtillverkad från en personlig bild gäller inte ångerrätten då den inte går att sälja vidare. Utdrag från Hallå Konsument: ”Ångerrätten gäller inte för alla sorters köp. Den gäller exempelvis inte när du köper en resa eller en specialtillverkad produkt.”</p>
                            <p className="mb-3">Om du vill returnera en ram, kontakta oss på <a href="mailto:info@tavlorify.se">info@tavlorify.se</a> så hjälper vi dig med frakten. Vänligen notera att vi behöver debitera 150 kr för de extra fraktkostnaderna.</p>
                            <h6 className="mb-2 fw-bold">VAD GÖR JAG OM JAG ÄR MISSNÖJD MED MIN PRODUKT ?</h6>
                            <p className="mb-3">Det är viktigt för oss att du är nöjd med ditt köp. Om du upplever att postern inte motsvarar förväntningarna ber vi dig maila följande uppgifter till <a href="mailto:info@tavlorify.se">info@tavlorify.se</a> :</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Vad på postern som inte motsvarar det som utlovades när du lade beställningen</li>
                                <li className="mb-2">Ordernummer</li>
                                <li>Bifoga även bild på postern</li>
                            </ul>
                            <p className="mb-3">Vår kundservice återkommer till dig så snart som möjligt. Vi strävar alltid efter att lösa problemet med ett nytt print som motsvarar förväntningarna.</p>
                            <h6 className="mb-2 fw-bold">VAD GÖR JAG OM PRODUKTEN ÄR SKADAD ?</h6>
                            <p className="mb-3">Om din poster är skadad så ber vi dig maila följande uppgifter till <a href="mailto:info@tavlorify.se">info@tavlorify.se</a> :</p>
                            <ul className="policy-list mb-3 ms-4">
                                <li className="mb-2">Förklaring vad som skadats på postern</li>
                                <li className="mb-2">Ordernummer</li>
                                <li>Bifoga även bild på postern</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </> : <LoaderPage />}
        </div>
    );
}