import { useEffect, useState } from "react";

export default function WaitGeneratingImage() {

    const waitSentences = [
        "Analyserar din text",
        "Väljer kategori och stil",
        "Skapar din unika konstverk",
        "Optimera bildformatet",
        "Genererar din bild",
        "Nästan klar",
        "Finjusterar detaljer",
        "Slutför processen",
        "Din konstverk är på väg!",
        "Tack för ditt tålamod!"
    ];

    const [selectedSentence, setSelectedSentence] = useState(waitSentences[0]);

    let currentIndex = 0;

    useEffect(() => {
        let intervalTimeout = setInterval(() => {
            if (currentIndex < waitSentences.length) {
                setSelectedSentence(waitSentences[currentIndex]);
                currentIndex++;
            } else {
                clearInterval(intervalTimeout);
            }
        }, 500);
    }, []);

    return (
        <div className="wait-generating-image">
            <h2 className="mb-4">Generator Art</h2>
            <h5>{selectedSentence} ...</h5>
        </div>
    );
}