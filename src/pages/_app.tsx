import { AppProps } from "next/app";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@src/styles/theme";
import Header from "@src/components/Header";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Component {...pageProps} />
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default MyApp;
