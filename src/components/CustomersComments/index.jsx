export default function CustomersComments() {

    const commentsList = [
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
    ];

    return (
        <section className="customers-comments p-4 text-center">
            <h2 className="section-name fw-bold mb-4">KUNDRECENSIONER</h2>
            <div className="comments-box">
                <div className="row">
                    {commentsList.map((comment, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="comment-box bg-white p-3">
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