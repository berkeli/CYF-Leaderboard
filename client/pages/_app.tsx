import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import '../styles/background.css'; 
import theme from './theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  )
}
