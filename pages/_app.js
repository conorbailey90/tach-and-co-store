import Layout from '../components/layout'
import { CartProvider } from '../context/cart'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  )
}

export default MyApp
