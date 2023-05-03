import Header from "@/components/Header";
import Axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

const SignUp = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [name, setName] = useState("");

    const signUpNow = async (e) => {

        e.preventDefault();

        try {

            const res = await Axios.post(`${process.env.BASE_API_URL}/api/users/create-new-user`, {
                name,
                email,
                password
            });

            const msg = await res.data;

            console.log(msg);

        }catch(err) {

            console.log(err);

        }

    }

    return (
        // Start Sign Up Page
        <div className="sign-up">
            <Head>
                <title>Tavlorify Store - Sign Up</title>
            </Head>
            <Header />
            {/* Start Container */}
            <div className="custom-container pt-5 pb-5">
                <h4 className="welcome-msg border-success border-2 border p-3 mb-3">Welcome To You In Registeration Page</h4>
                <hr />
                <h5 className="p-3 text-center border border-2 border-secondary mb-5">Registeration</h5>
                <form
                    className="signup-form p-4"
                    style={{ boxShadow: "1px 1px 10px green" }}
                    onSubmit={signUpNow}
                >
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Name *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    placeholder="Please Enter Your Name Here ."
                                    className="form-control border-success border-2"
                                    onChange={(e) => setName(e.target.value)}
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
                    {/* Start Input Field Box */}
                    <div className="input-field-box mb-5">
                        {/* Start Grid System */}
                        <div className="row align-items-center">
                            {/* Start Column */}
                            <div className="col-md-2">
                                Confirm Password *
                            </div>
                            {/* End Column */}
                            {/* Start Column */}
                            <div className="col-md-10">
                                <input type="password" placeholder="Please Re-enter the Password Here ." className="form-control border-success border-2" />
                            </div>
                            {/* End Column */}
                        </div>
                        {/* End Grid System */}
                    </div>
                    {/* End Input Field Box */}
                    <button className="btn btn-success mx-auto d-block mb-4">
                        <span className="me-2">Sign Up Now</span>
                        <FiLogIn />
                    </button>
                    <div className="go-login-page-box text-center">
                        <span className="me-2">Already have account?</span>
                        <Link href="/login">Login now</Link>
                    </div>
                </form>
            </div>
            {/* End Container */}
        </div>
        // End Sign Up Page
    );
}

export default SignUp;