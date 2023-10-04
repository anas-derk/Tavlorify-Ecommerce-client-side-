import Head from "next/head";
import Script from "next/script";
import "../Scss/index.css";
import "../components/Header/index.css";
import "../pages/profile/index.css";
import "../components/Footer/index.css";
import "../pages/index.css";
import "../pages/text-to-image/index.css";
import "../pages/image-to-image/index.css";
import "../pages/available-products/index.css";
import "./dashboard/admin/admin-panel/text-to-image-manager/styles-manager/update-and-delete-styles-info/index.css";
import "./dashboard/admin/admin-panel/text-to-image-manager/categories-manager/update-and-delete-category-info/index.css";
import "./dashboard/admin/admin-panel/image-to-image-manager/styles-manager/update-and-delete-styles-info/index.css";
import "./dashboard/admin/admin-panel/image-to-image-manager/categories-manager/update-and-delete-category-info/index.css";
import "./dashboard/admin/admin-panel/products-manager/update-and-delete-products/index.css";
import "./dashboard/admin/admin-panel/products-manager/add-product/index.css";
import "../components/ControlPanelHeader/index.css";
import "../pages/products/[name]/[id]/index.css";
import "../pages/products/index.css";
import "../pages/dashboard/admin/login/index.css";
import "../pages/login/index.css";
import "../pages/sign-up/index.css";
import "../pages/dashboard/admin/admin-panel/generated-images/index.css";
import "./dashboard/admin/admin-panel/prices-manager/index.css";
import "./checkout/index.css";
import "./confirmation/[id]/index.css";
import "./dashboard/admin/admin-panel/orders-manager/index.css";

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