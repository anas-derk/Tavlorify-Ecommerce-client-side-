import Header from "@/components/Header";
import Head from "next/head";
import Test from "../../../public/images/1.png";
import Link from "next/link";

const AvailableProducts = () => {
    return (
        // Start Available Products Page
        <div className="available-products">
            <Head>
                <title>Tavlorify Store - Available Products</title>
            </Head>
            <Header />
            {/* Start Custom Container */}
            <div className="custom-container pt-5 pb-5">
                <h3 className="text-center mb-5">Tavlorify Store - Available Products</h3>
                {/* Start Available Products Box */}
                <section className="available-products-box">
                    {/* Start Grid System */}
                    <div className="row">
                        {/* Start Column */}
                        <div className="col-md-3 product-box">
                            <Link href="/customize-product">
                                <div className="image-box">
                                    <img src={Test.src} alt="canvas prints image !!" className="canvas-prints-image prints-image" />
                                </div>
                            </Link>
                            <h6 className="product-name text-center mt-3">Canvas Prints</h6>
                            <p className="product-price text-center">Starting at $35.00</p>
                        </div>
                        {/* End Column */}
                        {/* Start Column */}
                        <div className="col-md-3 product-box">
                            <Link href="/">
                                <div className="image-box framed-image-box">
                                    <img src={Test.src} alt="framed prints image !!" className="framed-prints-image prints-image" />
                                </div>
                            </Link>
                            <h6 className="product-name text-center mt-3">Framed Prints</h6>
                            <p className="product-price text-center">Starting at $35.00</p>
                        </div>
                        {/* End Column */}
                    </div>
                    {/* End Grid System */}
                </section>
                {/* End Available Products Box */}
            </div>
            {/* End Custom Container */}
        </div>
        // End Available Products Page
    );
}

export default AvailableProducts;