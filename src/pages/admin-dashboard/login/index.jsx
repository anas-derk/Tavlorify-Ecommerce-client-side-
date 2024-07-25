import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import dashboardLoginImage from "../../../../public/images/backgrounds/dashboardLogin.jpg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoaderPage from "@/components/LoaderPage";
import validations from "../../../../public/global_functions/validations";
import ErrorOnLoadingThePage from "@/components/ErrorOnLoadingThePage";

export default function AdminLogin() {

    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const [isErrorMsgOnLoadingThePage, setIsErrorMsgOnLoadingThePage] = useState(false);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [waitMsg, setWaitMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [formValidationErrors, setFormValidationErrors] = useState({});

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const adminToken = localStorage.getItem(process.env.adminTokenNameInLocalStorage);
        if (adminToken) {
            validations.getAdminInfo(adminToken)
                .then(async (result) => {
                    if (result.error) {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        setIsLoadingPage(false);
                    } else await router.push("/admin-dashboard");
                })
                .catch(async (err) => {
                    if (err?.response?.data?.msg === "Unauthorized Error") {
                        localStorage.removeItem(process.env.adminTokenNameInLocalStorage);
                        setIsLoadingPage(false);
                    }
                    else {
                        setIsLoadingPage(false);
                        setIsErrorMsgOnLoadingThePage(true);
                    }
                });
        } else setIsLoadingPage(false);
    }, []);

    const adminLogin = async (e) => {
        try {
            e.preventDefault();
            setFormValidationErrors({});
            let errorsObject = validations.inputValuesValidation([
                {
                    name: "email",
                    value: email,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                        isEmail: {
                            msg: "Sorry, This Email Is Not Valid !!",
                        }
                    },
                },
                {
                    name: "password",
                    value: password,
                    rules: {
                        isRequired: {
                            msg: "Sorry, This Field Can't Be Empty !!",
                        },
                        isValidPassword: {
                            msg: "Sorry, The Password Must Be At Least 8 Characters Long, With At Least One Number, At Least One Lowercase Letter, And At Least One Uppercase Letter."
                        },
                    },
                },
            ]);
            setFormValidationErrors(errorsObject);
            if (Object.keys(errorsObject).length == 0) {
                setWaitMsg("Wait Logining ...");
                const res = await axios.get(`${process.env.BASE_API_URL}/admins/login?email=${email}&password=${password}`);
                const result = res.data;
                if (result.error) {
                    setWaitMsg("");
                    setErrorMsg(result.msg);
                    setTimeout(() => {
                        setErrorMsg("");
                    }, 4000);
                } else {
                    localStorage.setItem(process.env.adminTokenNameInLocalStorage, result.data.token);
                    await router.push("/admin-dashboard");
                }
            }
        }
        catch (err) {
            setWaitMsg("");
            setErrorMsg("Sorry, Someting Went Wrong, Please Try Again The Process !!");
            setTimeout(() => {
                setErrorMsg("");
            }, 3000);
        }
    }

    return (
        <div className="admin-login text-center" style={{ backgroundImage: `url(${dashboardLoginImage.src})` }}>
            <Head>
                <title>Tavlorify Store - Admin Login</title>
            </Head>
            {!isLoadingPage && !isErrorMsgOnLoadingThePage && <>
                <div className="overlay d-flex align-items-center">
                    <div className="container-fluid">
                        <form className="admin-login-form mb-3 p-5 mx-auto" onSubmit={adminLogin}>
                            <h1 className="mb-4 p-3 mx-auto">Admin Login Page</h1>
                            <FiLogIn className="login-icon mb-4 p-2" />
                            <input
                                type="email"
                                placeholder="Your Admin Email"
                                className={`form-control p-3 border-2 ${formValidationErrors["email"] ? "border-danger mb-2" : "mb-4"}`}
                                onChange={(e) => setEmail(e.target.value.trim().toUpperCase())}
                            />
                            {formValidationErrors["email"] && <p className="error-msg text-danger">{formValidationErrors["email"]}</p>}
                            <div className="password-field-box">
                                <input
                                    type={isVisiblePassword ? "text" : "password"}
                                    placeholder="Your Admin password"
                                    className={`form-control p-3 border-2 ${formValidationErrors["password"] ? "border-danger mb-2" : "mb-4"}`}
                                    onChange={(e) => setPassword(e.target.value.trim())}
                                />
                                <div className="icon-box">
                                    {!isVisiblePassword && <AiOutlineEye className="eye-icon icon" onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                    {isVisiblePassword && <AiOutlineEyeInvisible className="invisible-eye-icon icon" onClick={() => setIsVisiblePassword(value => value = !value)} />}
                                </div>
                            </div>
                            {formValidationErrors["password"] && <p className='error-msg text-danger'>{formValidationErrors["password"]}</p>}
                            {!waitMsg && !errorMsg && <button type="submit" className="btn w-100 login-btn p-3">Login</button>}
                            {waitMsg && <button disabled className="btn btn-primary mx-auto d-block mb-4">
                                <span className="me-2">{waitMsg}</span>
                            </button>}
                            {errorMsg && <p className="alert alert-danger mt-3 mb-0">{errorMsg}</p>}
                        </form>
                    </div>
                </div>
            </>}
            {isLoadingPage && !isErrorMsgOnLoadingThePage && <LoaderPage />}
            {isErrorMsgOnLoadingThePage && <ErrorOnLoadingThePage />}
        </div>
    );
}