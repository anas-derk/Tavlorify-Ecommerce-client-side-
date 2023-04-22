import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { BiPhone } from "react-icons/bi";

const Footer = () => {
    return (
        // Start Page Footer
        <footer className="global-footer pt-3 pb-3 bg-success text-white">
            {/* Start Container */}
            <div className="container-fluid">
                {/* Start Grid System */}
                <div className="row align-items-center">
                    {/* Start Column */}
                    <div className="col-md-3">
                        <ul className="social-media-list d-flex mb-3 justify-content-center">
                            <li className="social-link-item">
                                <a href="http://google.com" target="_blank" className="link">
                                    <TiSocialFacebook />
                                </a>
                            </li>
                            <li className="social-link-item">
                                <a href="http://google.com" target="_blank" className="link">
                                    <AiOutlineTwitter />
                                </a>
                            </li>
                        </ul>
                        <ul className="locations-list d-flex mb-3 justify-content-center info-box">
                            <li className="location-icon-box">
                                <IoLocationSharp className="location-icon info-icon" />
                                Lattakia, Syria
                            </li>
                        </ul>
                        <ul className="numbers-list d-flex mb-3 justify-content-center info-box">
                            <li className="number-icon-box">
                                <BiPhone className="number-icon info-icon" />
                                +963941519404
                            </li>
                        </ul>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3">
                        Authentication
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3">
                        <ul className="page-names-list">
                            <li className="page-name-item mb-2">
                                <MdKeyboardDoubleArrowRight />
                                <Link href="/">Home</Link>
                            </li>
                            <li className="page-name-item">
                                <MdKeyboardDoubleArrowRight />
                                <Link href="/">Products</Link>
                            </li>
                        </ul>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3">
                        logo + paragraph
                    </div>
                    {/* End Column */}
                </div>
                {/* End Grid System */}
            </div>
            {/* End Container */}
        </footer>
        // End Page Footer
    );
}

export default Footer;