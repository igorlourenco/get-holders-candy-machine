import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import React from "react";
import dynamic from "next/dynamic";
import { ThemeProvider, createTheme } from "@material-ui/core";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

const theme1 = createTheme({
  palette: {
    type: "dark",
  },
  overrides: {
    MuiButtonBase: {
      root: {
        justifyContent: "flex-start",
      },
    },
    MuiButton: {
      root: {
        textTransform: undefined,
        padding: "12px 16px",
      },
      startIcon: {
        marginRight: 8,
      },
      endIcon: {
        marginLeft: 8,
      },
    },
  },
});

const WalletConnectionProvider = dynamic(
  () => import("../providers/wallet-connection-provider"),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme1}>
      <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <WalletConnectionProvider>
          <Component {...pageProps} />
        </WalletConnectionProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default MyApp;
