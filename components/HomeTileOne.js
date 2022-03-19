import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function HomeTileOne({uid, heading, text, image}) {
    const tileLink = uid === 'tile-1' ? '/shop/GiSiLx' 
                    : uid === 'tile-2' ? '/shop/personalised/6elTq9'
                    : '/shop' 
    const [paragraphs, setParagraphs] = useState([]);

    useEffect(() => {
        let textArr = [...text];
        textArr.forEach((p, idx) => {
            p.id = `p-${idx}`;
        })
        setParagraphs(textArr);
    },[])

    return (
        <Link href={tileLink}>
            <a>
                <div className={styles.tile}>
                    <div className={styles.tileInfo}>
                        <h3>{heading}</h3>
                        {paragraphs.map(p => (
                            <React.Fragment key={p.id}>
                                <p>{p.text}</p><br />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className={styles.tileImage}>
                        <img src={image} alt="jewelry" />
                    </div>
                </div>
            </a>
        </Link>
    )
}