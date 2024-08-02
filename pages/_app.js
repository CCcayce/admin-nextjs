// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
// import theme from "../theme"; // 如果有自定义主题

function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
