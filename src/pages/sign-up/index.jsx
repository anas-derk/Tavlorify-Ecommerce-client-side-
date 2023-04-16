import Header from "@/components/Header";
import Head from "next/head";

const SignUp = () => {
    return (
        // Start Sign Up Page
        <div className="sign-up">
            <Head>
                <title>Tavlorify Store - Sign Up</title>
            </Head>
            <Header />
            {/* Start Container */}
            <div className="container pt-3">
                <h2 className="login">Hello</h2>
            </div>
            {/* End Container */}
        </div>
        // End Sign Up Page
    );
}

export default SignUp;