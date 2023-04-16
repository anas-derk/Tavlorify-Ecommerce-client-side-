import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaClipboardList, FaRegRegistered } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";

let headerData = [
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
    {
        route: "/my-orders",
        pageTitle: "My Orders",
        icon: <FaClipboardList />
    },
    {
        route: "/my-cart",
        pageTitle: "My Cart",
        icon: <AiOutlineShoppingCart />
    },
    ,
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
    {
        route: "/sign-out",
        pageTitle: "Sign Out",
        icon: <GoSignOut />
    },
];

export default headerData;