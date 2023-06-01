import Header from "@/components/Header";
import Head from "next/head";

const Cart = () => {
    return (
        // Start Cart Page
        <div className="cart bg-info">
            <Head>
                <title>Tavlorify Store - Cart</title>
            </Head>
            <Header />
            {/* Start Container From Bootstrap */}
            <div className="container pt-4 pb-4">
                <h1 className="text-center mb-4">Hello To You In Cart Page</h1>
                <table className="products-table mb-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>dimentions</th>
                            <th>price</th>
                            <th>Image</th>
                            <th>Total Price</th>
                            <th>Process</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="product-name-cell">
                                aa
                            </td>
                            <td>
                                Type
                            </td>
                            <td>
                                dimentions
                            </td>
                            <td className="product-price-cell">
                                price
                            </td>
                            <td className="product-image-cell">
                                image
                                {/* <img src={`${process.env.BASE_API_URL}/${product.imageSrc}`} alt="Product Image !!" width="100" height="100" /> */}
                            </td>
                            <td className="total-price-cell">
                                aa
                            </td>
                            <td className="proceses-cell">
                                <button
                                    className="btn btn-danger"
                                >Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* End Container From Bootstrap */}
        </div >
        // End Cart Page
    );
}

export default Cart;