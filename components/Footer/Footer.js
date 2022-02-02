import styles from './Footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div>
                    <h4 className={styles.logo}>Tach & Co.</h4>
                </div>
                <div>
                    <h4>tachandco@gmail.com</h4>
                </div>

                <div>
                    <a href='https://www.instagram.com/tachandco/' target={'__blank'} className={styles.ig}>
                        <FontAwesomeIcon icon={['fab', 'instagram']} size='lg'/>
                    </a>
                </div>
            </div>
        </footer>
    )
}