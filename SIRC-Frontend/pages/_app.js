import "../styles/globals.css";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeSettings from "../src/theme/ThemeSettings";
import wrapper from "../src/store/Store";
import Head from "next/head";
import FullLayout from "../src/Layout/FullLayout";
import DashboardLayout from "../src/Layout/DashboardLayout";
import LoginLayout from "../src/Layout/LoginLayout";

function App({ Component, pageProps }) {
  const Gettheme = ThemeSettings();
  console.log(Component.Layout);
  const Layout = Component.Layout ? LoginLayout : DashboardLayout;
  return (
    <>
      <Head>
        <title>SIRC</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600;6..12,700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={Gettheme}>
        <CssBaseline />
        <Layout>{<Component {...pageProps} />}</Layout>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
