import Head from "next/head";
import Script from "next/script";
import "../Scss/index.css";
import "../components/Header/header.css";
import "../components/Footer/footer.css";
import "../pages/index.css";
import "../pages/text-to-image/text_to_image.css";
import "../pages/image-to-image/image_to_image.css";
import "../components/ControlPanelHeader/control_panel_header.css";
import "../pages/admin-dashboard/login/index.css";
import "./checkout/index.css";
import "../components/CustomersComments/customers_comments.css";
import "../components/PaginationBar/pagination_bar.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
    </>
  );
}