import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import '../../styles/background.css'; 
import Layout from '../common/layout';
import theme from '../common/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
  )
}
