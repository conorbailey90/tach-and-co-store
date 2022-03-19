import React from "react"
import Link from "next/link";
import { commerce } from "../../lib/commerce"
import { useCartDispatch } from "../../context/cart"

import styles from './Product.module.css'

export default function Product({id, name, price, image, permalink}){
    const { setCart } = useCartDispatch()
    console.log(name)
    return (
        <div className={styles.productTile}>
            <Link href={name === 'The Personalised Bracelet' ? `/shop/personalised/${permalink}` : `/shop/${permalink}`}>
                <a>
                    <div className={styles.image}>
                        <img src={image.url} alt="bracelet"></img>
                    </div>
                    <div className={styles.productInfo}>
                    <div>{name}: {price.formatted_with_symbol}</div>
                    </div>
                </a>
            </Link>
        </div>
            

     

    )
}