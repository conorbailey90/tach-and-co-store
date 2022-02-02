import React, {useEffect} from "react";
import Footer from "../components/Footer/Footer";
import { commerce } from "../lib/commerce";
import ProductList from "../components/ProductList/ProductList";
import { useMobileMenuState } from '../context/mobileMenu';


export default function ProductsPage({products}){

    const {setMobileMenu} = useMobileMenuState();
    useEffect(() => {
      setMobileMenu(false);
    }, []);

    return(
        <>
            <section>
                <ProductList products={products} />
            </section>
            <Footer />
        </>
    )
}

export async function getStaticProps(){
    try{
        const {data: products} = await commerce.products.list();
        return {
            props: {
                products
            }
        }
    }catch(err){
        console.log(err)
        
        return{
            props: err
        }
    }
    

    
}