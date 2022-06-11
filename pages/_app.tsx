import * as React from "react";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../styles/theme/theme";
import "../styles/globals.css";
import Layout from "../components/layout";
import { AuthContextProvider } from "../services/authcontext";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { ProductProvider } from "../store/ProductProvider";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(theme);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <AuthContextProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {/* <ProductProvider> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </ProductProvider> */}
        </ThemeProvider>
      </CacheProvider>
    </AuthContextProvider>
  );
};

export default MyApp;
