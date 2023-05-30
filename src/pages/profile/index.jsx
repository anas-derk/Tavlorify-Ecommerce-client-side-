import Header from "@/components/Header";
import Head from "next/head";
import { FaClipboardList, FaUserEdit } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Axios from "axios";

const Profile = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [errors, setErrors] = useState({});

    const [errorMsg, setErrorMsg] = useState("");

    const my_info_icons_data = [
        {
            id: 0,
            title: "My Cart",
            icon: <FaClipboardList />
        },
        {
            id: 1,
            title: "My Orders",
            icon: <AiOutlineShoppingCart />
        },
    ];

    const updateUserInfo = async (e) => {
        e.preventDefault();
        setErrors({});
        let errorsObject = validations.inputValuesValidation([
            {
                name: "firstName",
                value: firstName,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                },
            },
            {
                name: "lastName",
                value: lastName,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                },
            },
            {
                name: "email",
                value: email,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                    isEmail: {
                        msg: "عذراً ، الإيميل الذي أدخلته غير صالح ، الرجاء إدخال إيميل صالح !!",
                    },
                },
            },
            {
                name: "password",
                value: password,
                rules: {
                    isRequired: {
                        msg: "عذراً ، لا يجب أن يكون الحقل فارغاً !!",
                    },
                    isPassword: {
                        value: password,
                        msg: "عذراً ، يجب أن يكون عدد أحرف الكلمة 8 على الأقل ولا تحتوي محارف خاصة ، وتحتوي على أحرف",
                    },
                },
            },
        ]);
        setErrors(errorsObject);
        if (Object.keys(errorsObject).length == 0) {
            try {
                setIsWaitStatus(true);
                const res = await Axios.put(`${process.env.BASE_API_URL}/users/update-user-info/`, {
                    firstName,
                    lastName,
                    email,
                    password
                });
                setTimeout(async () => {
                    setIsWaitStatus(false);
                    const msg = await res.data;
                    if (msg === "Ok !!, Create New User Is Successfuly !!") {
                        setResultMsg(msg);
                        setTimeout(() => {
                            setResultMsg("");
                            router.push("/login");
                        }, 3000);
                    } else if (msg === "Sorry, Can't Create User Because it is Exist !!!") {
                        setTimeout(() => {
                            setErrorMsg(msg);
                            setTimeout(() => {
                                setErrorMsg("");
                            }, 3000);
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
            let userId = JSON.parse(localStorage.getItem("e-commerce-canvas-user-id"));
            const res = await Axios.get(`${process.env.BASE_API_URL}/users/user-info/${userId}`);
            const data = await res.data;
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setPassword(data.password);
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
                <div className="ps-5 pe-5 pt-4 pb-5 profile-container">
                    <h2 className="welcome-msg mb-4 text-center border p-3 border-2 border-success">
                        Welcome Anas In Your Profile
                    </h2>
                    {/* Start Edit Profile Icon Box */}
                    <div className="edit-profile-icon-box text-center p-3 mx-auto border border-3 border-success mb-2">
                        <FaUserEdit className="edit-profile-icon" />
                    </div>
                    {/* End Edit Profile Icon Box */}
                    {/* Start Profile Info Box */}
                    <section className="profile-info-box p-3">
                        <form className="update-user-info-form p-4" onSubmit={updateUserInfo}>
                            {/* Start Input Field Box */}
                            <div className="input-field-box mb-5">
                                {/* Start Grid System */}
                                <div className="row align-items-center">
                                    {/* Start Column */}
                                    <div className="col-md-2">
                                        First Name *
                                    </div>
                                    {/* End Column */}
                                    {/* Start Column */}
                                    <div className="col-md-10">
                                        <input
                                            type="text"
                                            placeholder="Please Enter The New Your Name Here ."
                                            className="form-control border-success border-2"
                                            defaultValue={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
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
                                        Last Name *
                                    </div>
                                    {/* End Column */}
                                    {/* Start Column */}
                                    <div className="col-md-10">
                                        <input
                                            type="text"
                                            placeholder="Please Enter The New Your Name Here ."
                                            className="form-control border-success border-2"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
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
                                            placeholder="Please Enter The New Your Email Here ."
                                            className="form-control border-success border-2"
                                            defaultValue={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            placeholder="Please Enter The New Your Password Here ."
                                            className="form-control border-success border-2"
                                            defaultValue={password}
                                            onChange={(e) => setPassword(e.target.password)}
                                        />
                                    </div>
                                    {/* End Column */}
                                </div>
                                {/* End Grid System */}
                            </div>
                            {/* End Input Field Box */}
                            <button
                                type="submit"
                                className="btn btn-success mx-auto d-block mb-4"
                            >
                                <span className="me-2">Update Now</span>
                                <FaUserEdit />
                            </button>
                        </form>
                    </section>
                    {/* End Profile Info Box */}
                </div>
                {/* End Container */}
            </div>
            <aside className="taskbar text-center">
                <ul className="my-info-links d-flex flex-column justify-content-center">
                    {my_info_icons_data.map((el, index) =>
                        <li key={el.id}>
                            <button className="btn tooltip-btn text-white">{el.title}</button>
                            <Link href="/" className="link">
                                {el.icon}
                            </Link>
                        </li>
                    )}
                </ul>
            </aside>
            {/* End Profile Page */}
        </>
    );
}

export default Profile;