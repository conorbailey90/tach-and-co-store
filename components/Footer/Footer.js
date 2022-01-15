import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div>
                    <h4 className={styles.logo}>Tach & Co.</h4>
                </div>
                <div>
                    <h4>natacha6@gmail.com</h4>
                </div>

                <div>
                    <h4>Instagram</h4>
                </div>

            </div>
            
        </footer>
    )
}