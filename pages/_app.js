import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
