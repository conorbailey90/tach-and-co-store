import React from "react";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import { commerce } from "../../lib/commerce";
import { useCartDispatch } from "../../context/cart";

import styles from '../../styles/Product.module.css'

export async function getStaticProps({ params }) {
    const { permalink } = params;
  
    const product = await commerce.products.retrieve(permalink, {
      type: 'permalink',
    });
  
    return {
      props: {
        product,
      },
    };
  }
  
  export async function getStaticPaths() {
    const { data: products } = await commerce.products.list();
  
    return {
      paths: products.map((product) => ({
        params: {
          permalink: product.permalink,
        },
      })),
      fallback: false,
    };
  }
  
  export default function ProductPage({ product }) {

    const { setCart } = useCartDispatch()

    const addToCart = () => commerce.cart.add(product.id).then(({cart}) => setCart(cart))

    return (
      <section className={styles.section}>
        <div className={styles.container}>    
          <div className={styles.productContainer}>
            <ImageCarousel product={product} / >
            <div className={styles.productInfo}>
              <h3 className={styles.title}>{product.name}</h3>
              <h4 className={styles.price} >{product.price.formatted_with_symbol}</h4>
              <button className={styles.addToCart} onClick={addToCart}>Add to Cart </button>
              <div className={styles.description} dangerouslySetInnerHTML={{__html : product.description}}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }