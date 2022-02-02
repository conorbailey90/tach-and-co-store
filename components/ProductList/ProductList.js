
import Product from "../Product/Product";

import styles from './ProductList.module.css'

export default function ProductList({products}){

    if(!products) return null;
    
    return(
        <section className={styles.section}>
            <div className={styles.container}>
            <h1>Products</h1>
                <div className={styles.productList}>
                    {products.map(product => (
                        <Product key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    )
}