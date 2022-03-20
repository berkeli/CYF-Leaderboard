import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import '../../styles/background.css'; 
import Layout from '../common/Layout';
import theme from '../common/theme';
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-R61RWTSD8Q" async={true} strategy="afterInteractive"/>
          <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-R61RWTSD8Q');`}
        </Script>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>    
  )
}
