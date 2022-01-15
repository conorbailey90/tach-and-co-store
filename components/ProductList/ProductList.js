import Link from "next/link";
import Product from "../Product/Product";

import styles from './ProductList.module.css'

export default function ProductList({products}){

    if(!products) return null;
    
    return(
        <section className={styles.section}>
            <div className={styles.container}>
                    {products.map(product => (
                        <div key={product.id}>
                            <Link href={`/shop/${product.permalink}`}>
                                <a>
                                    <Product {...product} />
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>
        </section>
    )
}