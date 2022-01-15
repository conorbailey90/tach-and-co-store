import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

import styles from '../styles/Home.module.css'
import { useState, useEffect, Fragment } from 'react'

export default function HomeTileOne({heading, text, image}) {

    const [paragraphs, setParagraphs] = useState([]);
    useEffect(() => {
        let textArr = [...text];
        textArr.forEach((p, idx) => {
            p.id = `p-${idx}`;
        })
        setParagraphs(textArr);
    },[])

    return (
        <div className={styles.tile}>
            <div className={styles.tileInfo}>
                <h1>{heading}</h1><br />
                {paragraphs.map(p => (
                    <React.Fragment key={p.id}>
                        <p >{p.text}</p><br />
                    </React.Fragment>
                ))}
            </div>
            <div className={styles.tileImage}>
                <img src={image} alt="jewelry" />
            </div>
        </div>
    )
}