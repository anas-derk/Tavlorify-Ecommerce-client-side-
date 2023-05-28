import { AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
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
        icon: <AiOutlineUserAdd />
    },
];

let aiServicesData = [
    {
        route: "/text-to-image",
        pageTitle: "Text To Image",
        icon: <FiLogIn />
    },
];

export default { navbarLinks, authenticationData, aiServicesData};