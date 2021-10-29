import { ChakraProvider } from "@chakra-ui/react";
import theme from "../style/theme";
import { AppProps } from "next/app";
import React from "react";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
