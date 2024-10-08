import Link from "next/link";

export default function Footer() {
    return (
        // Start Page Footer
        <footer className="global-footer pt-4 pb-4 text-dark">
            {/* Start Container */}
            <div className="container">
                {/* Start Grid System */}
                <div className="row justify-content-center mb-5">
                    {/* Start Column */}
                    <div className="col-md-4 mb-3">
                        <h6 className="fw-bold mb-4">TAVLORIFY</h6>
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list">
                            <li className="link-item mb-3">
                                <Link className="link" href="/text-to-image?paintingTypeAsQuery=poster">
                                    Skapa AI-konst
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href="/image-to-image?paintingTypeAsQuery=poster">
                                    Skapa fotokonst
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href="/face-swap?paintingTypeAsQuery=poster">
                                    Ansiktskonst
                                </Link>
                            </li>
                            <li className="link-item">
                                <Link className="link" href="/who-are-we">
                                    Om oss
                                </Link>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-5 mb-3">
                        <h6 className="fw-bold mb-4">KUNDTJÄNST</h6>
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list">
                            <li className="link-item mb-3">
                                <Link className="link" href="/customer-service">
                                    Kundservice
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href="/questions-and-answers">
                                    Frågor & Svar
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href="/integrity-policy">
                                    Integritetspolicy
                                </Link>
                            </li>
                            <li className="link-item">
                                <Link className="link" href="/cookie-policy">
                                    Cookiepolicy
                                </Link>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3 mb-3">
                        <h6 className="fw-bold mb-4">Hjälp</h6>
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list">
                            <li className="link-item mb-3">
                                <Link className="link" href="/contact-us">
                                    Kontakta oss
                                </Link>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                </div>
                {/* End Grid System */}
                {/* <div className="payment-company-images-box">
                    aa
                </div> */}
                <h6 className="text-center">Copyright © 2024, TAVLORIFY</h6>
            </div>
            {/* End Container */}
        </footer>
        // End Page Footer
    );
}