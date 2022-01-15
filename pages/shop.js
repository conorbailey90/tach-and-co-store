import React from "react";
import { commerce } from "../lib/commerce";
import ProductList from "../components/ProductList/ProductList";


export default function ProductsPage({products}){
    return(
        <section>
            <h1>Products</h1>
            <ProductList products={products} />
        </section>
    )
}



export async function getStaticProps(){
    const {data: products} = await commerce.products.list();

    return {
        props: {
            products
        }
    }
}