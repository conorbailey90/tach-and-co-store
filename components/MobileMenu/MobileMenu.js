import Link from "next/link"
import { useMobileMenuState } from "../../context/mobileMenu"
import styles from './MobileMenu.module.css'


export default function MobileMenu(){
    const mobileMenuContext = useMobileMenuState();

    return(
        <div  className={mobileMenuContext.state ? styles.mobileMenuActive : styles.mobileMenu}>
            <div className={styles.container}>
                <h1 className={styles.mobileNavLogo}>Tach & Co.</h1>
                <div onClick={() => mobileMenuContext.setMobileMenu(false)} className={styles.menuToggle}>
                    <span></span>
                    <span></span>
                </div>
                <ul className={styles.mobileNav}>
                    <li onClick={() => window.location.pathname === '/' ? mobileMenuContext.setMobileMenu(false) : ''}>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li onClick={() => window.location.pathname === '/info' ? mobileMenuContext.setMobileMenu(false) : ''}>
                        <Link href="/info">
                            <a>Info</a>
                        </Link>
                    </li>
                    <li onClick={() => window.location.pathname === '/shop' ? mobileMenuContext.setMobileMenu(false) : ''}>
                        <Link href="/shop">
                            <a>Shop</a>
                        </Link>
                    </li>
                    <li onClick={() => window.location.pathname === '/contact' ? mobileMenuContext.setMobileMenu(false) : ''}>
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}