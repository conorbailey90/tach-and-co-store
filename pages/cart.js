import { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { useCartDispatch, useCartState } from "../context/cart";
import { commerce } from '../lib/commerce'
import Link from "next/link";
import styles from '../styles/Cart.module.css'
import { useMobileMenuState } from '../context/mobileMenu';

function CartItem({id, name, quantity, line_total, image}){

    const {setCart} = useCartDispatch();

    const handleUpdateCart = ({cart}) => setCart(cart);

    const removeItem = () => commerce.cart.remove(id).then(handleUpdateCart);

    const decrementQuantity = () => {
        quantity >  1 ? commerce.cart.update(id, {quantity: quantity - 1}).then(handleUpdateCart) :
        removeItem();
    }
    
    const incrementQuantity = () => commerce.cart.update(id, {quantity: quantity + 1}).then(handleUpdateCart);

    const {setMobileMenu} = useMobileMenuState();
    useEffect(() => {
      setMobileMenu(false);
    }, []);


    return (
        <div className={styles.itemTile}>
            <div className={styles.itemImg}>
                <img src={image.url}></img>
            </div>
            <div className={styles.itemInfo}>
                <p>{name}</p>
                <p>Quantity: {quantity}</p>
                <div className={styles.quantity}>
                        <div className={styles.quantityBtnMinus} onClick={decrementQuantity}><span></span></div>
                        <div className={styles.quantityBtnPlus} onClick={incrementQuantity}><span></span><span></span></div>
                    </div>
                <p>{line_total.formatted_with_symbol}</p>
                <div className={styles.remove} onClick={removeItem}>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}

export default function CartPage(){
    const {line_items, subtotal} = useCartState();

    const isEmpty = line_items.length === 0;

    if(isEmpty) {
        return (
            <>
            <section className={styles.section}>
                <div className={styles.emptyContainer}>
                    <p className={styles.emptyText}>Your cart is empty. <Link href={'/shop'}><a className={styles.link}>Add some items!</a></Link></p>
                </div>
            </section>
            <Footer />
            </>
        )
    }

    return (
        <>
        <section className={styles.section}>
            <div className={styles.container}>
                <h1>Cart</h1>
                <div className={styles.content}>
                    <div className={styles.productList}>
                        
                        {line_items.map(item => <CartItem key={item.id} {...item} />)}
                    </div>
                    <div className={styles.orderSummary}>
                        <div>
                        <h2>Order Summary</h2>
                        <h4>Subtotal: {subtotal.formatted_with_symbol}</h4>
                        </div>
                        
                            <Link href={'/checkout'}>
                                <a>
                                    <div className={styles.checkout}>
                                        Checkout
                                    </div> 
                                </a>
                            </Link>
                    </div>
                    </div>
                </div>
        </section>
        <Footer />
        </>
       
    )
}