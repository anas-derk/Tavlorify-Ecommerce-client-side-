import Link from "next/link";
import { TiSocialFacebook } from "react-icons/ti";
import { AiOutlineTwitter } from "react-icons/ai";
// import { IoLocationSharp } from "react-icons/io5";
import { BiPhone } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import { BiBrain } from "react-icons/bi"
import { BsCart2, BsInfoCircle } from "react-icons/bs";
import { AiOutlineHome, AiOutlineUserAdd, AiOutlineContacts } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaQuestion } from "react-icons/fa";

const Footer = () => {
    return (
        // Start Page Footer
        <footer className="global-footer pt-4 pb-4 bg-dark text-white">
            {/* Start Container */}
            <div className="container">
                {/* Start Grid System */}
                <div className="row">
                    {/* Start Column */}
                    <div className="col-md-3 text-center">
                        <AiOutlineContacts className="mb-3" style={{ fontSize: "100px" }} />
                        <h6>Tavlorify Store</h6>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3">
                        <h6>User Links</h6>
                        <hr className="mt-0" />
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list">
                            <li className="link-item mb-3">
                                <Link className="link" href='/login' target="_blank">
                                    <FiLogIn className="me-2" />
                                    <span>Login</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/sign-up' target="_blank">
                                    <AiOutlineUserAdd className="me-2" />
                                    <span>Signup</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/cart' target="_blank">
                                    <BsCart2 className="me-2" />
                                    <span>Cart</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/orders' target="_blank">
                                    <MdProductionQuantityLimits className="me-2" />
                                    <span>Orders</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/profile' target="_blank">
                                    <CgProfile className="me-2" />
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="link-item sign-out-item">
                                <GoSignOut className="me-2" />
                                <span>Sign Out</span>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3">
                        <h6>Our Company Links</h6>
                        <hr className="mt-0" />
                        {/* Start Link List */}
                        <ul className="list-unstyled link-list">
                            <li className="link-item mb-3">
                                <Link className="link" href='/' target="_blank">
                                    <AiOutlineHome className="me-2" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/products' target="_blank">
                                    <MdProductionQuantityLimits className="me-2" />
                                    <span>Products</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/text-to-image' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Text To Image Service</span>
                                </Link>
                            </li>
                            {/* <li className="link-item mb-3">
                                <Link className="link" href='/login' target="_blank">
                                    <BiBrain className="me-2" />
                                    <span>Image To Image Service</span>
                                </Link>
                            </li> */}
                            <li className="link-item mb-3">
                                <Link className="link" href='/who-are-we' target="_blank">
                                    <BsInfoCircle className="me-2" />
                                    <span>Who Are We ?</span>
                                </Link>
                            </li>
                            <li className="link-item mb-3">
                                <Link className="link" href='/contact-us' target="_blank">
                                    <AiOutlineContacts className="me-2" />
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                            <li className="link-item">
                                <Link className="link" href='/faq' target="_blank">
                                    <FaQuestion className="me-2" />
                                    <span>FAQ</span>
                                </Link>
                            </li>
                        </ul>
                        {/* End Link List */}
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-3">
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

export default Footer;