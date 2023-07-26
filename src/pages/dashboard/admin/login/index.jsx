import Axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import dashboardLoginImage from "../../../../../public/images/backgrounds/dashboardLogin.jpg";

const AdminLogin = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [errMsg, setErrorMsg] = useState("");

    const router = useRouter();

    const adminLogin = (e) => {
        e.preventDefault();
        Axios.get(`${process.env.BASE_API_URL}/admin/login?email=${email}&password=${password}`)
            .then((res) => {
                let result = res.data;
                if (typeof result === "string") {
                    setErrorMsg(result);
                } else {
                    localStorage.setItem("admin-info", JSON.stringify(result));
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
                        <input
                            type="password"
                            placeholder="Your Admin password"
                            className="form-control mx-auto mb-4 p-3"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="btn w-100 login-btn p-3">Login</button>
                    </form>
                    {errMsg && <p className="alert alert-danger">{errMsg}</p>}
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;