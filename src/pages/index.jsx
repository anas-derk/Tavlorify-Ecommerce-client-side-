import Head from 'next/head';
import Header from '../components/Header';
import backImg1 from "../../public/images/backgrounds/01.jpg";
import backImg2 from "../../public/images/backgrounds/02.jpg";
import backImg3 from "../../public/images/backgrounds/03.jpg";
import { useState } from 'react';

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
  ]

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
              transform: infoBoxAppearedIndex == data.id ? "scale3d(1, 1, 1)" : "scale3d(0.8, 0.8, 0.8)",
            }}>
            <div className="overlay text-white d-flex justify-content-center align-items-center">
              {/* Start Main Content */}
              <main
                className="p-3"
                style={{
                  transform: infoBoxAppearedIndex == data.id ? "rotateX(360deg)" : ""
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
    </div>
  );
}