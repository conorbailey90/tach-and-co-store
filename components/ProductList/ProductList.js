
import Product from "../Product/Product";

import styles from './ProductList.module.css'

export default function ProductList({products}){

    if(!products) return null;
    
    return(
        <section className={styles.section}>
            <div className={styles.container}>
                    {products.map(product => (
                        <Product key={product.id} {...product} />
                    ))}
            </div>
        </section>
    )
}