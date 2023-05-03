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

    const [name, setName] = useState("");

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

    useEffect(() => {
        async function fetchData() {
            let userInfo = JSON.parse(localStorage.getItem("e-commerce-canvas-user-info"));
            const res = await Axios.get(`${process.env.BASE_API_URL}/api/users/user-info/${userInfo._id}`);
            const data = await res.data;
            setName(data.name);
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
                        <form className="signup-form p-4">
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
                                            placeholder="Please Enter The New Your Name Here ."
                                            className="form-control border-success border-2"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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
                                            value={email}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.password)}
                                        />
                                    </div>
                                    {/* End Column */}
                                </div>
                                {/* End Grid System */}
                            </div>
                            {/* End Input Field Box */}
                            <button className="btn btn-success mx-auto d-block mb-4">
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