import { useRouter } from "next/router";
import { useEffect } from "react";

const ClearCart = () => {
    const router = useRouter();
    useEffect(() => {
        localStorage.removeItem("tavlorify-store-user-cart");
        router.push("/");
    }, []);
    return (
        <div className="clear-cart">
            <h1>Hello In Clear Cart Page</h1>
        </div>
    );
}

export default ClearCart;