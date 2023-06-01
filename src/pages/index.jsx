import Head from 'next/head';
import Header from '../components/Header';
import { useEffect, useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import home_data from '../../public/data/home_data';
import Axios from "axios";
import Link from 'next/link';

export default function Home() {

  const [infoBoxAppearedIndex, setInfoBoxAppearedIndex] = useState(1);

  const [isShowMoreProducts, setIsShowMoreProducts] = useState(false);

  const [isAppearedShowMoreProductsBtn, setIsAppearedShowMoreProductsBtn] = useState(true);

  const [isWaitStatus, setIsWaitStatus] = useState(false);

  const [productsData, setProductsData] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    Axios.get(`${process.env.BASE_API_URL}/products/all-products`)
      .then((res) => {
        let result = res.data;
        if (typeof result === "string") {
          setErrorMsg(result);
        } else {
          setProductsData(result);
        }
      })
      .catch((err) => setErrorMsg(err));
  }, []);

  return (
    <div className="home">
      <Head>
        <title>Tavlorify Store - Home</title>
      </Head>
      <Header />
      {/* Start Introduction Section */}
      <section className="introduction">
        {home_data.infoBoxData.map((data) => (
          /* Start Info Box */
          <div className="info-box"
            key={data.id}
            style={{
              backgroundImage: `url(${data.backImgSrc})`,
              opacity: infoBoxAppearedIndex == data.id ? 1 : 0,
              transform: infoBoxAppearedIndex == data.id ? "scale(1.2)" : "scale(1)",
            }}>
            <div className="overlay text-white d-flex justify-content-center align-items-center"></div>
          </div>
          /* End Info Box */
        ))}
      </section>
      {/* End Introduction Section */}
      <div className='main-content-box'>
        {home_data.infoBoxData.map((data, index) => (
          /* Start Main Content */
          infoBoxAppearedIndex == data.id && <main
            key={index}
            className="p-3"
          // style={{
          //   transform: infoBoxAppearedIndex == data.id ? "rotateX(360deg) scale(0.8)" : ""
          // }}
          >
            {data.content}
          </main>
          /* End Main Content */
        ))}
      </div>
      {/* Start Most Popular Of Products Section */}
      <section className="most-popular-products pt-3 pb-5">
        {/* Start Custom Container */}
        <div className="custom-container text-center">
          <h4 className="section-name mb-4">Most Popular Of Products</h4>
          {/* Start Grid System */}
          <div className="row mb-3">
            {productsData.map((productInfo, index) => (
              /* Start Column */
              index < 12 && <div className="col-md-2" key={index}>
                <div className="product-box">
                  <Link href={`/products/${productInfo.name}/${productInfo._id}`}>
                    <img src={`${process.env.BASE_API_URL}/${productInfo.imageSrc}`} alt={productInfo.name} className="product-image mb-3 canvas-prints-image prints-image" />
                  </Link>
                  <h6 className="product-name">{productInfo.name}</h6>
                  <h6 className="product-type">{productInfo.type}</h6>
                </div>
              </div>
              /* End Column */
            ))}
          </div>
          {/* End Grid System */}
          {/* Start Grid System */}
          <div className="row">
            {productsData.map((productInfo, index) => (
              /* Start Column */
              productInfo.id > 12 && isShowMoreProducts && <div className="col-md-3" key={index}>
                <div className="product-box">
                  <Link href="/">
                    <img src={productInfo.imageSrc} alt="Product Image" className="product-image mb-3" />
                  </Link>
                  <h6 className="product-name">Canvas</h6>
                </div>
              </div>
              /* End Column */
            ))}
          </div>
          {/* End Grid System */}
        </div>
        {/* End Custom Container */}
      </section>
      {/* End Most Popular Of Products Section */}
      {/* Start Contact Us Section */}
      <section className="contact-us pt-5 pb-5">
        {/* Start Custom Container */}
        <div className="custom-container text-center">
          <h2 className="section-name mb-5">Contact Us</h2>
          {/* Start Grid System */}
          <div className="row">
            {/* Start Column */}
            <div className="col-md-6">
              aa
            </div>
            {/* End Column */}
            {/* Start Column */}
            <div className="col-md-6">
              {/* Start Contact Us Form */}
              <form className="contact-us-form">
                <input
                  type="text"
                  placeholder="Please Enter Your Full Name"
                  className="form-control p-3 mb-4"
                />
                <input
                  type="email"
                  placeholder="Please Enter Your E-mail Address"
                  className="form-control p-3 mb-4"
                />
                <textarea
                  placeholder="How can we help you ?"
                  className="form-control p-3 mb-4"
                ></textarea>
                <button type="submit" className="btn btn-success pt-3 pb-3 ps-4 pe-4 d-block w-100">Send Message</button>
              </form>
              {/* End Contact Us Form */}
            </div>
            {/* End Column */}
          </div>
          {/* End Grid System */}
        </div>
        {/* End Custom Container */}
      </section>
      {/* End Contact Us Section */}
    </div >
  );
}