import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import dashboardLoginImage from "../../../../../public/images/backgrounds/dashboardLogin.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminLogin = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errMsg, setErrorMsg] = useState("");

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (adminId) {
            router.push("/dashboard/admin/admin-panel");
        }
    }, []);

    const adminLogin = (e) => {
        e.preventDefault();
        Axios.get(`${process.env.BASE_API_URL}/admin/login?email=${email}&password=${password}`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    setErrorMsg(result);
                    setTimeout(() => {
                        setErrorMsg("");
                    }, 2000);
                } else {
                    localStorage.setItem("tavlorify-store-admin-id", result._id);
                    router.push("/dashboard/admin/admin-panel");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="admin-login text-center" style={{ backgroundImage: `url(${dashboardLoginImage.src})`, backgroundSize: "cover" }}>
            <Head>
                <title>Tavlorify Store - Admin Login</title>
            </Head>
            <div className="overlay d-flex align-items-center">
                <div className="container-fluid">
                    <form className="admin-login-form mb-3 p-5 mx-auto" onSubmit={adminLogin}>
                        <h1 className="mb-4 p-3 mx-auto">Admin Login Page</h1>
                        <FiLogIn className="login-icon mb-4 p-2" />
                        <input
                            type="email"
                            placeholder="Your Admin Email"
                            className="form-control mx-auto mb-4 p-3"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className='password-field-box'>
                            <input
                                type={isVisiblePassword ? "text" : "password"}
                                placeholder="Your Admin password"
                                className="form-control mx-auto mb-4 p-3"
                                required
                                onChange={(e) => setPassword(e.target.value.trim())}
                            />
                            <div className='icon-box'>
                                {!isVisiblePassword && <AiOutlineEye className='eye-icon icon' onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                {isVisiblePassword && <AiOutlineEyeInvisible className='invisible-eye-icon icon' onClick={() => setIsVisiblePassword(value => value = !value)} />}
                            </div>
                        </div>
                        <button type="submit" className="btn w-100 login-btn p-3">Login</button>
                        {errMsg && <p className="alert alert-danger mt-3 mb-0">{errMsg}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;