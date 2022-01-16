import React from "react"
import Link from "next/link";
import { commerce } from "../../lib/commerce"
import { useCartDispatch } from "../../context/cart"

import styles from './Product.module.css'

export default function Product({id, name, price, image, permalink}){
   
    const { setCart } = useCartDispatch()

    const addToCart = () => commerce.cart.add(id).then(({cart}) => setCart(cart))

    const handleAddToCart = (e) => {

        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        addToCart();
    }

    return (
        <div className={styles.productTile}>
            <Link href={`/shop/${permalink}`}>
                <a>
                    <div className={styles.image}>
                        <img src={image.url} alt="bracelet"></img>
                    </div>
                </a>
            </Link>
            <div className={styles.productInfo}>
               <div>{name}: {price.formatted_with_symbol}</div>
               <div onClick={handleAddToCart} className={styles.addToCart}>Add to cart</div>
            </div>
        </div>
            

     

    )
}