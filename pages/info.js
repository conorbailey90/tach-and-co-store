import styles from '../styles/Info.module.css';
import Footer from '../components/Footer/Footer';
import { Client } from '../utils/prismicHelpers';
import React, {useEffect} from 'react';
import { useMobileMenuState } from '../context/mobileMenu';

export default function Info({document}) {

    const {setMobileMenu} = useMobileMenuState();
    useEffect(() => {
      setMobileMenu(false);
    }, []);

    return (
        <>
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>{document.data.title[0].text}</h1><br />
                    {document.data.text.map((p,idx) => {
                        return p.text === '' ? ''
                        :
                        <React.Fragment key={idx}>
                            <p>{p.text}</p><br />
                        </React.Fragment>
                    })}
                </div>
            
              
            </div>
        </section>
        <Footer />
        </>
    )
}

export async function getStaticProps(context) {
 
    // Get all homepage tiles
    const document = await Client().getSingle('info_page')
  
    return {
      props: { document }, // will be passed to the page component as props
    }
  }