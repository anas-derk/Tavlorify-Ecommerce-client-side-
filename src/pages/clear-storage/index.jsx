import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ClearStorage() {
    const router = useRouter();
    useEffect(() => {
        localStorage.clear();
        router.push("/");
    }, []);
    return (
        <div className="clear-storage">
            <h1>Hello In Clear Storage Page</h1>
        </div>
    );
}