export default function CustomersComments({ pageName }) {

    const commentsList = {
        "text-to-image": [
            {
                "title": "Mellan penseldrag och digital magi",
                "contents": [
                    "Mellan penseldrag och digital magi,",
                    "Art Generation gav liv åt min poesi.",
                    "Med AI som följeslagare på min resa,",
                    "Min vision blev verklig, utan att stressa.",
                    "Tack vare denna tjänst, kan jag nu se",
                    "mina ord bli konst, och själen le.",
                ],
                "owner": "Eva",
            },
            {
                "title": "Ett 10-poängs företag",
                "contents": [
                    "När jag stötte på Tavlorify,",
                    "visste jag inte vad jag skulle förvänta mig .",
                    "Men fascinationen av att se mina tankar omvandlas till konst var för stor för att ignorera.",
                    "Resultatet? Ett mästerverk.",
                    "Jag är nu en stolt ägare av ett konstverk som är lika unikt som min egen signatur.",
                ],
                "owner": "Daniel",
            },
            {
                "title": "Fantastiskt resultat!",
                "contents": [
                    "Jag har alltid haft en bild i mitt sinne,",
                    "en unik tavla som jag inte kunde hitta någonstans.",
                    "Med bara några ord, kunde AI:n omvandla min inre vision till verklighet.",
                    "Nu hänger den tavlan på min vägg.",
                    "Jag är verkligen glad.",
                ],
                "owner": "Lina",
            },
        ],
        "image-to-image": [
            {
                "title": "hög kvalitet",
                "contents": [
                    "Jag är extremt nöjd med min beställning! Kvaliteten på konstverket var utmärkt, varje detalj återgiven med precision.",
                    "En sömlös upplevelse från början till slut!",
                ],
                "owner": "Johan",
            },
            {
                "title": "Den bästa presenten!",
                "contents": [
                    "Jag hade höga förväntningar, men slutresultatet överträffade allt! Varje detalj, varje nyans var perfekt återgiven.",
                    "En unik och kärleksfull gåva som verkligen berörde.",
                ],
                "owner": "Emma",
            },
            {
                "title": "Carl Larssons stil",
                "contents": [
                    "Att se min bild förvandlas till ett konstverk i Carl Larssons stil var en otrolig upplevelse! Varje penseldrag fångade hans klassiska svenska charm och ljusa färgpalett.",
                ],
                "owner": "Lars",
            },
        ],
        "face-swap": [
            {
                "title": "Den perfekta presenten!",
                "contents": [
                    "Jag beställde två personliga tavlor till min son och min dotter,",
                    "och resultatet var helt otroligt! Deras bilder förvandlades till de karaktärer de älskar,",
                    "och det gjorde tavlorna ännu mer speciella för dem."
                ],
                "owner": "Ella",
            },
            {
                "title": "Genialisk Förvandling!",
                "contents": [
                    "Jag är oerhört imponerad av resultatet! Min bild förvandlades till en perfekt tolkning av Albert Einstein.",
                    "Det känns som ett konstverk som fångar både personlighet och geni.",
                    "Rekommenderas starkt!",
                ],
                "owner": "Olaf",
            },
            {
                "title": "ett minne för evigt.",
                "contents": [
                    "Jag beställde en personlig tavla och resultatet var helt fantastiskt.",
                    "Det var inte bara vackert utan också en meningsfull och unik gåva. Min vän blev överlycklig och det blev ett minne.",
                ],
                "owner": "Astrid",
            },
        ],
    };

    return (
        <section className="customers-comments p-4 text-center">
            <h3 className="section-name fw-bold mb-4">KUNDRECENSIONER</h3>
            <div className="comments-box">
                <div className="row">
                    {commentsList[pageName].map((comment, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="comment-box bg-white p-3 d-flex flex-column justify-content-center">
                                <h5 className="comment-title mb-4">{comment.title}</h5>
                                {comment.contents.map((content, contentIndex) => (
                                    <p className="comment-content mb-2" key={contentIndex}>{content}</p>
                                ))}
                                <h6 className="comment-owner mb-0 mt-4 fw-bold">{comment.owner}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}