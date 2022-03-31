import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Web3ContextProvider } from '../context'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider theme={theme}>
      <Web3ContextProvider>
        <>
        <Component {...pageProps} />
        <ToastContainer
            hideProgressBar
            position="bottom-right"
            autoClose={2000} />
        </>
      </Web3ContextProvider>
    </ChakraProvider>
  ) 
}

export default MyApp
