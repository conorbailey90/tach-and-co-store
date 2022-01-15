import styles from '../styles/Info.module.css';
import { Client } from '../utils/prismicHelpers';
import React from 'react';

export default function Info({document}) {
    console.log(document)
    return (
        <section className={styles.section}>
            <div className={styles.container}>
            
                <h1>{document.data.title[0].text}</h1><br />
                {document.data.text.map((p,idx) => {
                    return p.text === '' ?
                    <React.Fragment key={idx}></React.Fragment>
                    :
                    <React.Fragment key={idx}>
                        <p>{p.text}</p><br />
                    </React.Fragment>

                })}
            </div>
        </section>
    )
}

export async function getStaticProps(context) {
 
    // Get all homepage tiles
    const document = await Client().getSingle('info_page')
  
    return {
      props: { document }, // will be passed to the page component as props
    }
  }