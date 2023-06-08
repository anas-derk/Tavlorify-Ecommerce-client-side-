import Head from 'next/head';
import Header from '../components/Header';
import { useEffect, useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import Axios from "axios";
import Link from 'next/link';
import backImg1 from "../../public/images/backgrounds/1.jpg";
import backImg2 from "../../public/images/backgrounds/2.png";
import backImg3 from "../../public/images/backgrounds/3.jpg";
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
  const [productsData, setProductsData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    // Axios.get(`${process.env.BASE_API_URL}/products/all-products`)
    //   .then((res) => {
    //     let result = res.data;
    //     if (typeof result === "string") {
    //       setErrorMsg(result);
    //     } else {
    //       setProductsData(result);
    //     }
    //   })
    //   .catch((err) => setErrorMsg(err));
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
    </div>
  );
}