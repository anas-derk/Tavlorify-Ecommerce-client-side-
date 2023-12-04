import Link from "next/link";
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiPhone } from "react-icons/bi";
import { BiBrain } from "react-icons/bi"
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome, AiOutlineContacts } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";

export default function Footer() {
    return (
        // Start Page Footer
        <footer className="global-footer pt-4 pb-4 text-white">
            {/* Start Container */}
            <div className="container-fluid">
                {/* Start Grid System */}
                <div className="row">
                    {/* Start Column */}
                    <div className="col-md-3 text-center mb-4">
                        <AiOutlineContacts className="mb-3 logo" />
                        <h6>Tavlorify Store</h6>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-6 mb-4">
                        <h6>Our Company Links</h6>
                        <hr className="mt-0" />
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list row">
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/' target="_blank">
                                    <AiOutlineHome className="me-2" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/who-are-we' target="_blank">
                                    <BsInfoCircle className="me-2" />
                                    <span>Who Are We ?</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/contact-us' target="_blank">
                                    <AiOutlineContacts className="me-2" />
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                            <li className="link-item col-md-6">
                                <Link className="link" href='/faq' target="_blank">
                                    <FaQuestion className="me-2" />
                                    <span>FAQ</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/text-to-image' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Text To Image Service</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/image-to-image' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Image To Image Service</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/privacy-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Privacy Policy</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/selling-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Selling Policy</span>
                                </Link>
                            </li>
                            <li className="link-item col-md-6">
                                <Link className="link" href='/return-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Return Policy</span>
                                </Link>
                            </li>
                            <li className="link-item col-md-6">
                                <Link className="link" href='/cookie-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Cookie Policy</span>
                                </Link>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3 mb-3">
                        <h6>Social Media And Contact Links</h6>
                        <hr className="mt-0" />
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list">
                            <li className="link-item mb-3">
                                <Link className="link" href='/login' target="_blank">
                                    <TiSocialFacebook className="me-2" />
                                    <span>Facebook</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/login' target="_blank">
                                    <AiOutlineTwitter className="me-2" />
                                    <span>Twitter</span>
                                </Link>
                            </li>
                            <li className="link-item">
                                <BiPhone className="me-2" />
                                <span>+963932532412</span>
                            </li>
                        </ul>
                        {/* End Link List */}
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