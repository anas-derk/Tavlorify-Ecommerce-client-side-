import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import "../Scss/index.css";
import "../components/Header/index.css";
import "../pages/profile/index.css";
import "../components/Footer/index.css";
import "../pages/index.css";
import "../pages/text-to-image/index.css";
// import Footer from "@/components/Footer";
import { useEffect } from "react";
import "../pages/available-products/index.css";

export default function App({ Component, pageProps }) {

  const { asPath } = useRouter();

  const handleGlobalElement = (el, left, width) => {
    
    el.style.left = left;

    el.style.width = width;

  }

  useEffect(() => {

    let globalHeader = document.querySelector("#__next .global-header");

    let globalFooter = document.querySelector("#__next .global-footer");

    if (asPath === "/profile") {

      handleGlobalElement(globalHeader, "60px", "calc(100vw - 77px)");

      // handleGlobalElement(globalFooter, "60px", "calc(100vw - 77px)");

    } else {

      handleGlobalElement(globalHeader, "0", "100%");

      // handleGlobalElement(globalFooter, "0", "100%");

    }

  }, [asPath]);

  return (
    <>
      <Head>
        <meta name="description" content="Online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
      {/* <Footer /> */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
    </>
  );
}
