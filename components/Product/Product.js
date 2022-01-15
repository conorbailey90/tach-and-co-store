import React from "react"

import styles from './Product.module.css'

export default function Product({name, price, image}){
    return (
        <div className={styles.productTile}>
            <div className={styles.image}>
                <img src={image.url} alt="bracelet"></img>
            </div>
            <div>
                {name}
                {/* : {price.formatted_with_symbol} */}
            </div>
        </div>
            

     

    )
}