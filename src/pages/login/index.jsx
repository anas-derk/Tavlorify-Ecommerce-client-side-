import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import Axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginingStatus, setIsLoginingStatus] = useState(false);
    const [errMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const loginNow = async (e) => {
        e.preventDefault();
        setIsLoginingStatus(true);
        try {
            const res = await Axios.get(`${process.env.BASE_API_URL}/users/login?email=${email}&password=${password}`);
            const data = await res.data;
            setTimeout(() => {
                setIsLoginingStatus(false);
                if (typeof data === "string") {
                    setErrorMsg(data);
                } else {
                    localStorage.setItem("e-commerce-canvas-user-id", data._id);
                    router.push("/");
                }
            }, 2000);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        // Start Login Page
        <div className="login">
            <Head>
                <title>Tavlorify Store - Login</title>
            </Head>
            <Header />
            {/* Start Container */}
            <div className="container pt-5 pb-5">
                <h4 className="welcome-msg border-success border-2 border p-3 mb-3">Welcome To You In Login Page</h4>
                <hr />
                <h5 className="p-3 text-center border border-2 border-secondary mb-5">Login</h5>
                <form
                    className="login-form p-4"
                    style={{ boxShadow: "1px 1px 10px green" }}
                    onSubmit={loginNow}
                >
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Email *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input
                                    type="email"
                                    placeholder="Please Enter Your Email Here ."
                                    className="form-control border-success border-2"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                    </div>
                    {/* End Input Field Box */}
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Password *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input
                                    type="password"
                                    placeholder="Please Enter Your Password Here ."
                                    className="form-control border-success border-2"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                    </div>
                    {/* End Input Field Box */}
                    {!isLoginingStatus && <button className="btn btn-success mx-auto d-block mb-4">
                        <span className="me-2">Login Now</span>
                        <FiLogIn />
                    </button>}
                    {isLoginingStatus && <button className="btn btn-primary mx-auto d-block mb-4" type="button" disabled>
                        <span className="spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>}
                    {errMsg && <p className="alert alert-danger text-center">{errMsg}</p>}
                    <div className="go-signup-page-box text-center">
                        <span>Don't have an account?</span>
                        <Link href="/sign-up" className="btn">Create an account now</Link>
                    </div>
                </form>
            </div>
            {/* End Container */}
        </div>
        // End Login Page
    );
}

export default Login;