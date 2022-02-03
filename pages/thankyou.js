import styles from '../styles/Contact.module.css'
import Footer from '../components/Footer/Footer'
import { useEffect } from 'react';
import { useMobileMenuState } from '../context/mobileMenu';

export default function Contact() {

    const {setMobileMenu} = useMobileMenuState();
    useEffect(() => {
      setMobileMenu(false);
    }, []);

    return (
        <>
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 style={{textAlign: 'left'}}>Thankyou!</h1><br />
                
                
            </div>
        </section>
        <Footer />
        </>
    )
}