import Layout from '../components/layout'
import { CartProvider } from '../context/cart'
import { MobileMenuProvider } from '../context/mobileMenu';
import {PersonalisationProvider} from '../context/personalisation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <PersonalisationProvider>
      <CartProvider>
        <MobileMenuProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </MobileMenuProvider>
      </CartProvider>
    </PersonalisationProvider>
  )
}

export default MyApp
