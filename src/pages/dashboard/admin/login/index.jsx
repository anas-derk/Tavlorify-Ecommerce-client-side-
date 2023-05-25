import Axios from "axios";
import { useState } from "react";

const AdminLogin = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const adminLogin = (e) => {
        e.preventDefault();
        Axios.get(`${process.env.BASE_API_URL}/admin/login?email=${email}&password=${password}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }
    
    return (
        <div className="admin-login text-center p-5">
            <h1>Hello To You In Admin Login Page</h1>
            <hr className="mb-5" />
            <form className="admin-login-form" onSubmit={adminLogin}>
                <input
                    type="email"
                    placeholder="Please Enter Your Admin Email"
                    className="form-control w-50 mx-auto mb-4"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Please Enter Your Admin password"
                    className="form-control w-50 mx-auto mb-4"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;