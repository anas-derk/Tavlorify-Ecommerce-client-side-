import Link from "next/link";
import Logo from "../../../public/images/Logo/logo1.jpg";
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
        <footer className="global-footer pt-4 pb-4 text-dark">
            {/* Start Container */}
            <div className="container-fluid">
                {/* Start Grid System */}
                <div className="row align-items-center">
                    {/* Start Column */}
                    <div className="col-md-3 text-center mb-4">
                        <img src={Logo.src} alt="Logo Image !!" />
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-6 mb-4">
                        <h6>Vårt företag länkar</h6>
                        <hr className="mt-0" />
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list row">
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/' target="_blank">
                                    <AiOutlineHome className="me-2" />
                                    <span>Hemsida</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/who-are-we' target="_blank">
                                    <BsInfoCircle className="me-2" />
                                    <span>Vilka är vi ?</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/contact-us' target="_blank">
                                    <AiOutlineContacts className="me-2" />
                                    <span>Ring Oss</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/faq' target="_blank">
                                    <FaQuestion className="me-2" />
                                    <span>FAQ</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/text-to-image' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Förvandla ord till konstverk</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/image-to-image' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>förvandla foton till konstverk</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/privacy-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Integritetspolicy</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/terms-and-conditions-of-sale' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Köpvillkor</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3 col-md-6">
                                <Link className="link" href='/return-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Returpolicy</span>
                                </Link>
                            </li>
                            <li className="link-item col-md-6">
                                <Link className="link" href='/cookie-policy' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Cookiepolicy</span>
                                </Link>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3 mb-3">
                        <h6>Sociala medier och kontaktlänkar</h6>
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