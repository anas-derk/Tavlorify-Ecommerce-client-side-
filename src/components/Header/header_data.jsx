import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaRegRegistered } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

let navbarLinks = [
    {
        route: "/",
        pageTitle: "Home",
        icon: <AiOutlineHome />
    },
    {
        route: "/products",
        pageTitle: "Products",
        icon: <MdProductionQuantityLimits />
    },
];

let authenticationData = [
    {
        route: "/login",
        pageTitle: "Login",
        icon: <FiLogIn />
    },
    {
        route: "/sign-up",
        pageTitle: "Join",
        icon: <FaRegRegistered />
    },
];

export default { navbarLinks, authenticationData};