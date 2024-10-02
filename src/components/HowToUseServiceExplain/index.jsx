export default function HowToUseServiceExplain({ pageName, imgSrcs }) {

    const howToUseExplain = {
        "image-to-image": [
            {
                "title": "Ladda upp",
                "explains": [
                    "Ladda upp en bild från din kamerarulle"
                ],
            },
            {
                "title": "Skapa din konst",
                "explains": [
                    "Välj mellan kategori, stil, klicka på knappen \"Skapa din konst\""
                ],
            },
            {
                "title": "Beställning",
                "explains": [
                    "Slutför köp och betala, få din affisch inom 3-5 dagar"
                ],
            },
        ],
        "face-swap": [
            {
                "title": "Ladda upp",
                "explains": [
                    "Ladda upp en bild från din kamerarulle"
                ],
            },
            {
                "title": "Skapa Ansiktskonst",
                "explains": [
                    "Välj mellan kön, stil, format,",
                    "klicka på knappen \"Skapa din konst\""
                ]
            },
            {
                "title": "Beställning",
                "explains": [
                    "Slutför köp och betala, få din affisch inom 3-5 dagar"
                ],
            },
        ]
    }

    return (
        <section className="how-to-use-service pt-5 pb-5 text-center">
            <div className="row">
                {howToUseExplain[pageName].map((details, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="explain-image-box mb-4">
                            <img
                                src={imgSrcs[index]}
                                alt="How To Use Image To Image Page ( Image 1 )"
                                className="explain-image mw-100"
                            />
                        </div>
                        <div className="explain-box">
                            <h6 className="fw-bold">{index + 1}. {details.title}</h6>
                            {details.explains.map((explain, explainIndex) => (
                                <p key={explainIndex}>{explain}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}