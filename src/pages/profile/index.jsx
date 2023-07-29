import Header from "@/components/Header";
import Head from "next/head";
import { FaClipboardList, FaUserEdit } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Axios from "axios";
import validations from "../../../public/global_functions/validations";

const Profile = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [isWaitStatus, setIsWaitStatus] = useState(false);

    const [errors, setErrors] = useState({});

    const [errorMsg, setErrorMsg] = useState("");

    const [resultMsg, setResultMsg] = useState("");

    const [userId, setUserId] = useState("");

    const updateUserInfo = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "email",
                value: email,
                rules: {
                    isRequired: {
                        msg: "Sorry, Can't Be Field Is Empty !!",
                    },
                    isEmail: {
                        msg: "Sorry, This Email Not Valid !!",
                    }
                },
            },
            {
                name: "password",
                value: password,
                rules: {
                    isValidPassword: {
                        value: password,
                        msg: "Sorry, The Password Must Contain At Least 8 Characters",
                    },
                },
            },
        ]);
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            try {
                setIsWaitStatus(true);
                const res = await Axios.put(`${process.env.BASE_API_URL}/users/update-user-info/${userId}`, {
                    email,
                    password
                });
                setTimeout(async () => {
                    setIsWaitStatus(false);
                    const msg = await res.data;
                    if (msg === "Update Process Successful ...") {
                        setResultMsg(msg);
                        setTimeout(() => {
                            setResultMsg("");
                        }, 3000);
                    }
                }, 2000);
            } catch (err) {
                setErrorMsg(err);
            }
        }
    }

    useEffect(() => {
        async function fetchData() {
            const userId = localStorage.getItem("tavlorify-store-user-id");
            const res = await Axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`);
            const data = await res.data;
            setEmail(data.email);
            setPassword(data.password);
            setUserId(userId);
        }
        fetchData();
    }, []);

    return (
        <>
            {/* Start Profile Page */}
            <div className="profile">
                <Head>
                    <title>Tavlorify Store - Profile</title>
                </Head>
                <Header />
                {/* Start Container */}
                <div className="ps-5 pe-5 pt-4 pb-5 container-fluid">
                    <h2 className="welcome-msg mb-4 text-center p-3 border border-2 border-dark">
                        Welcome To You In Your Profile
                    </h2>
                    {/* Start Edit Profile Icon Box */}
                    <div className="edit-profile-icon-box text-center p-3 mx-auto border border-3 border-dark mb-2">
                        <FaUserEdit className="edit-profile-icon" />
                    </div>
                    {/* End Edit Profile Icon Box */}
                    {/* Start Profile Info Box */}
                    <section className="profile-info-box p-3">
                        <form className="update-user-info-form p-4 border border-2 border-dark" onSubmit={updateUserInfo}>
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
                                            type="text"
                                            placeholder="Please Enter The New Your Email Here ."
                                            className={`form-control border-2 ${errors["email"] ? "border border-danger mb-2" : "border-dark"}`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors["email"] && <p className='error-msg text-danger m-0'>{errors["email"]}</p>}
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
                                            placeholder="Please Enter The New Your Password Here ."
                                            className={`form-control border-2 ${errors["password"] ? "border border-danger mb-2" : "border-dark"}`}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {errors["password"] && <p className='error-msg text-danger m-0'>{errors["password"]}</p>}
                                    </div>
                                    {/* End Column */}
                                </div>
                                {/* End Grid System */}
                            </div>
                            {/* End Input Field Box */}
                            {!isWaitStatus && <button
                                type="submit"
                                className={`btn btn-dark mx-auto d-block ${(errorMsg || resultMsg) ? "mb-4" : ""}`}
                            >
                                <span className="me-2">Update Now</span>
                                <FaUserEdit />
                            </button>}
                            {isWaitStatus && <button className="btn btn-primary mx-auto d-block mb-4" type="button" disabled>
                                <span className="me-2">Loading</span>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            </button>}
                            {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
                            {resultMsg && <p className="alert alert-success">{resultMsg}</p>}
                        </form>
                    </section>
                    {/* End Profile Info Box */}
                </div>
                {/* End Container */}
            </div>
            {/* End Profile Page */}
        </>
    );
}

export default Profile;