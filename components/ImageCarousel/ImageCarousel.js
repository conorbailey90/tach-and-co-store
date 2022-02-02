import { useState } from 'react';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({product}){

    const [mainImage, setMainImage] = useState(product.assets[0].url);

    function handleThumbnailClick(url){
        setMainImage(url);
    }
    return (
        <div className={styles.carousel}>
            <div className={styles.sidePanel}>
                {product.assets.map(image => (
                    <img className={`${styles.thumbnail} ${image.url === mainImage ? styles.active : ''}`} onClick={() => handleThumbnailClick(image.url)} key={image.id} src={image.url}></img>
                ))}
            </div>
            <div className={styles.mainImage}>
                <img src={mainImage}></img>
            </div>
        </div>
    )
}