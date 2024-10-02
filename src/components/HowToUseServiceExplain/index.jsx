export default function HowToUseServiceExplain({ pageName, imgSrcs }) {
    
    const howToUseExplain = {
        "image-to-image": [
            {
                "title": "Ladda upp",
                "explain": "Ladda upp en bild från din kamerarulle"
            },
            {
                "title": "Skapa din konst",
                "explain": "Välj mellan kategori, stil, klicka på knappen \"Skapa din konst\""
            },
            {
                "title": "Beställning",
                "explain": "Slutför köp och betala, få din affisch inom 3-5 dagar",
            },
        ]
    }

    return (
        <section className="how-to-use-service pt-5 pb-5 text-center">
            <div className="row">
                {howToUseExplain[pageName].map((details, index) => (
                    <div className="col-md-4">
                    <div className="explain-image-box mb-4">
                        <img
                            src={imgSrcs[index]}
                            alt="How To Use Image To Image Page ( Image 1 )"
                            className="explain-image mw-100"
                        />
                    </div>
                    <div className="explain-box">
                        <h6 className="fw-bold">{index + 1}. {details.title}</h6>
                        <p>{details.explain}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}