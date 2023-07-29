import { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import ControlPanelHeader from "@/components/ControlPanelHeader";

const RegisteredUsers = () => {

    const router = useRouter();

    const [usersData, setUsersData] = useState([]);

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const adminId = localStorage.getItem("tavlorify-store-admin-id");
        if (!adminId) {
            router.push("/dashboard/admin/login");
        } else {
            Axios.get(`${process.env.BASE_API_URL}/users/all-users`)
                .then((res) => {
                    let result = res.data;
                    if (typeof result === "string") {
                        console.log(result);
                    } else {
                        setUsersData(result);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setErrorMsg("Sorry, Something Went Wrong !!");
                });
        }
    }, []);

    const handleRegisterationDate = (registerationDate) => {
        let registerationDateInDateFormat = new Date(registerationDate);
        const year = registerationDateInDateFormat.getFullYear();
        const month = registerationDateInDateFormat.getMonth() + 1;
        const day = registerationDateInDateFormat.getDate();
        const hours = registerationDateInDateFormat.getHours();
        const niceStyleRegisterationDate = `${year} / ${month} / ${hours}`;
        return niceStyleRegisterationDate;
    }

    return (
        <div className="update-category-styles-info">
            <Head>
                <title>Tavlorify Store - Registered Users</title>
            </Head>
            <ControlPanelHeader />
            <div className="content text-center pt-4 pb-4">
                <div className="container-fluid">
                    <h1 className="welcome-msg mb-4 fw-bold mx-auto pb-3">Registered Users Page</h1>
                    {usersData.length > 0 ? <div className="categories-and-styles-box p-3">
                        <table className="categories-and-styles-table mb-4">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Country</th>
                                    <th>Registeration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData.map((user, index) => (
                                    <tr>
                                        <td>{ user.email }</td>
                                        <td>{ user.country }</td>
                                        <td>{ handleRegisterationDate(user.registerationDate) }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> : <p className="alert alert-danger">Sorry, Can't Find Any Registered User !!</p>}
                    {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
                </div>
            </div>
        </div>
    )
}

export default RegisteredUsers;