import Head from "next/head";
import Header from "@/components/Header";
import Test from "../../../public/images/1.png";

const CustomizeProduct = () => {
    return (
        // Start Customize Product Page
        <div className="customize-product">
            <Head>
                <title>Tavlorify Store - Customize Product</title>
            </Head>
            <Header />
            {/* Start Custom Container */}
            <div className="custom-container pt-5 pb-5">
                <h3 className="text-center mb-5">Tavlorify Store - Customize Product</h3>
                {/* Start Grid System */}
                <div className="row">
                    {/* Start Column */}
                    <div className="col-md-2 text-center">
                        aa
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-5">
                        <div className="image-box">
                            <img src={Test.src} alt="canvas prints image !!" className="canvas-prints-image prints-image" />
                        </div>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-5">
                        <h2>Price: 40$</h2>
                        <button className="add-to-cart-btn btn btn-success mb-3">Add To Cart</button>
                        
                    </div>
                    {/* End Column */}
                </div>
                {/* End Grid System */}
            </div>
            {/* End Custom Container */}
        </div>
        // End Customize Product Page
    )
}

export default CustomizeProduct;