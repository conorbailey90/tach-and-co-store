import Link from 'next/link'
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCartState } from '../../context/cart';
// import { useMobileMenuState } from '../../context/mobileMenu';
import styles from './Header.module.css'
import { useMobileMenuState } from '../../context/mobileMenu';

const MobileNav = ({total_items}) => {
    const {setMobileMenu} = useMobileMenuState();
    return(
        <>
        <ul className={styles.mobileNav}>
           
            <li>
                <Badge color="secondary" badgeContent={total_items}>
                    <Link href="/cart">
                        <a>
                            <ShoppingCartIcon />
                        </a>
                    </Link>
                </Badge>
            </li>
            <li>
                <div onClick={() => setMobileMenu(true)} className={styles.menuToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </li>
        </ul>
        </>
       
    )
}

export default function Header() {
    const {total_items} = useCartState();

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <MobileNav total_items={total_items} />
                <Link href="/">
                    <a><h3 className={styles.logo}>Tach & Co.</h3></a>
                </Link>

                <ul className={styles.nav}>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/info">
                            <a>Info</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop">
                            <a>Shop</a>
                        </Link>
                    </li>
            
                    <li>
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Badge color="secondary" badgeContent={total_items}>
                            <Link href="/cart">
                                <a>
                                    <ShoppingCartIcon />
                                </a>
                            </Link>
                        </Badge>
                    </li>
                </ul>
            </div>
        </div>
    )
}