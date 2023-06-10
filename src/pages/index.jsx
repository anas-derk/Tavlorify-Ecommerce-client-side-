import Head from 'next/head';
import Header from '../components/Header';
import { useEffect, useState } from "react";
import Axios from "axios";
import Link from 'next/link';
import Carousel from 'react-bootstrap/Carousel';
import { AiOutlineContacts } from "react-icons/ai";

export default function Home() {
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
    let header = document.querySelector("#__next .global-header"),
      introduction = document.querySelector(".home .introduction");
    introduction.style.minHeight = `calc(100vh - ${header.clientHeight}px)`;
  }, []);

  return (
    <div className="home">
      <Head>
        <title>Tavlorify Store - Home</title>
      </Head>
      <Header />
      {/* Start Introduction Section */}
      <section className="introduction">
        {/* Start Carousel Component From Bootstrap */}
        <Carousel indicators={false}>
          {/* Start Carousel Item */}
          <Carousel.Item>
            <div className="overlay d-flex align-items-center justify-content-center">
              <Carousel.Caption>
                <h1>Welcome to the Tavlorify Store</h1>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          {/* End Carousel Item */}
          {/* Start Carousel Item */}
          <Carousel.Item>
            <div className="overlay d-flex align-items-center justify-content-center">
              <Carousel.Caption>
                <h2>Welcome to the Tavlorify Store</h2>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          {/* End Carousel Item */}
          {/* Start Carousel Item */}
          <Carousel.Item>
            <div className="overlay d-flex align-items-center justify-content-center">
              <Carousel.Caption>
                <h2>Welcome to the Tavlorify Store</h2>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
          {/* End Carousel Item */}
        </Carousel>
        {/* End Carousel Component From Bootstrap */}
      </section>
      {/* End Introduction Section */}
      {/* Start Most Popular Of Products Section */}
      <section className="most-popular-products pt-5 pb-5">
        {/* Start Custom Container */}
        <div className="container text-center pt-4 pb-4">
          <h4 className="section-name mb-4">Most Popular Of Products</h4>
          {/* Start Grid System */}
          <div className="row mb-3">
            {productsData.map((productInfo, index) => (
              /* Start Column */
              index < 12 && <div className="col-md-3" key={index}>
                <div className="product-box">
                  <Link href={`/products/${productInfo.name}/${productInfo._id}`}>
                    <img
                      src={`${process.env.BASE_API_URL}/${productInfo.imageSrc}`}
                      alt={productInfo.name}
                      // className="product-image mb-3 canvas-prints-image prints-image"
                      className="product-image mb-3"
                    />
                  </Link>
                  <h6 className="product-name">{productInfo.name}</h6>
                  <h6 className="product-type">{productInfo.type}</h6>
                </div>
              </div>
              /* End Column */
            ))}
          </div>
          {/* End Grid System */}
          <Link
            href="/products"
            className='btn btn-dark'
            target='_blank'
          >
            View All Products
          </Link>
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
              <AiOutlineContacts style={{ fontSize: "413px" }} />
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
    </div>
  );
}