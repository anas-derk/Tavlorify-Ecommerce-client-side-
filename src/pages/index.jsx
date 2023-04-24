import Head from 'next/head';
import Header from '../components/Header';
import backImg1 from "../../public/images/backgrounds/01.jpg";
import backImg2 from "../../public/images/backgrounds/02.jpg";
import backImg3 from "../../public/images/backgrounds/03.jpg";
import { useState } from 'react';
import { IoSearchCircleSharp } from "react-icons/io5";

export default function Home() {

  const [infoBoxAppearedIndex, setInfoBoxAppearedIndex] = useState(1);

  let infoBoxData = [
    {
      id: 1,
      backImgSrc: backImg1.src,
      content: "Welcome to the Tavlorify Store"
    },
    {
      id: 2,
      backImgSrc: backImg2.src,
      content: "Welcome to the Tavlorify Store"
    },
    {
      id: 3,
      backImgSrc: backImg3.src,
      content: "Welcome to the Tavlorify Store"
    },
  ];

  let productsInfo = [
    {
      id: 1,
      imageSrc: backImg1.src,
      name: "Canvas"
    },
    {
      id: 2,
      imageSrc: backImg2.src,
      name: "Canvas"
    },
    {
      id: 3,
      imageSrc: backImg3.src,
      name: "Canvas"
    },
    {
      id: 4,
      imageSrc: backImg1.src,
      name: "Canvas"
    },
    {
      id: 5,
      imageSrc: backImg2.src,
      name: "Canvas"
    }
  ];

  setInterval(() => {

    switch (infoBoxAppearedIndex) {

      case 1: {

        setInfoBoxAppearedIndex(2);

        break;

      }

      case 2: {

        setInfoBoxAppearedIndex(3);

        break;

      }

      case 3: {

        setInfoBoxAppearedIndex(1);

        break;

      }

    }

  }, 4000);

  return (
    <div className="home">
      <Head>
        <title>Tavlorify Store - Home</title>
      </Head>
      <Header />
      {/* Start Introduction Section */}
      <section className="introduction">
        {infoBoxData.map((data, index) => (
          /* Start Info Box */
          <div className="info-box"
            key={data.id}
            style={{
              backgroundImage: `url(${data.backImgSrc})`,
              opacity: infoBoxAppearedIndex == data.id ? 1 : 0,
              transform: infoBoxAppearedIndex == data.id ? "scale(1.2)" : "scale(1)",
            }}>
            <div className="overlay text-white d-flex justify-content-center align-items-center">
              {/* Start Main Content */}
              <main
                className="p-3"
                style={{
                  transform: infoBoxAppearedIndex == data.id ? "rotateX(360deg) scale(0.8)" : ""
                }}
              >
                {data.content}
              </main>
              {/* End Main Content */}
            </div>
          </div>
          /* End Info Box */
        ))}
      </section>
      {/* End Introduction Section */}
      {/* Start Try Some Of AI Services In Our Website Section */}
      <section className="try-ai-service pt-4 pb-4">
        {/* Start Custom Container */}
        <div className="custom-container">
          <h3 className="text-center mb-4">Try a Some Of AI Services In Our Website</h3>
          <div className="service-box p-4">
            {/* Start Grid System */}
            <div className="row">
              {/* Start Column */}
              <div className="col-md-7">
                <h5 className="text-center mb-3">Enter a Text Prompt</h5>
                <form className="generate-from-text-form text-center">
                  <input
                    type="text"
                    placeholder="a dog riding a bicycle"
                    className="form-control p-2 mb-2"
                    required
                  />
                  <button type="submit" className="btn search-btn">
                    <IoSearchCircleSharp className="search-icon" />
                  </button>
                </form>
              </div>
              {/* End Column */}
              {/* Start Column */}
              <div className="col-md-5 text-center">
                <h5 className="text-center mb-3 mb-3">Upload Image From Device</h5>
                <form className="generate-canvas-form">
                  <input type="file" className="form-control mb-4" required />
                  <button type="submit" className="btn btn-success">Upload And Generate Now</button>
                </form>
              </div>
              {/* End Column */}
            </div>
            {/* End Grid System */}
          </div>
        </div>
        {/* End Custom Container */}
      </section>
      {/* End Try Some Of AI Services In Our Website Section */}
      {/* Start Most Popular Of Products Section */}
      <section className="most-popular-products pt-3 pb-3">
        {/* Start Custom Container */}
        <div className="custom-container text-center">
          <h4 className="section-name mb-4">Most Popular Of Products</h4>
          {/* Start Grid System */}
          <div className="row">
            {productsInfo.map((productInfo, index) => (
              /* Start Column */
              <div className="col-md-3" >
                <div className="product-box">
                  <img src={backImg1.src} alt="Product Image" className="product-image mb-3" />
                  <h6 className="product-name">Canvas</h6>
                </div>
              </div>
              /* End Column */
            ))}
          </div>
          {/* End Grid System */}
        </div>
        {/* End Custom Container */}
      </section >
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