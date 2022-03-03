import { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer/Footer';
import { makeStyles } from '@material-ui/core';
import { useCartState, useCartDispatch } from '../context/cart';
import AddressForm from '../components/CheckoutForm/AddressForm';
import PaymentForm from '../components/CheckoutForm/PaymentForm';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider} from '@material-ui/core'
import { commerce } from '../lib/commerce'
import { useMobileMenuState } from '../context/mobileMenu';

import styles from '../styles/Checkout.module.css'

const steps = ['Shipping address', 'Payment details'];

export default function CheckoutPage(){

    const cart = useCartState();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [order, setOrder] = useState({})
    const [ordered, setOrdered] = useState(false);
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const {refreshCart} = useCartDispatch();

    const {setMobileMenu} = useMobileMenuState();

    const useStyles = makeStyles(() => ({
        root: {
          "&.MuiStepper-root": { padding: "24px 0" },
        }
      }));

      const c = useStyles();

    useEffect(() => {
        setMobileMenu(false);
    }, []);

    useEffect(() => {
        const generateToken = async () => {
            try{    
                if(cart.total_items >= 1){
                    const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                    setCheckoutToken(token);
                    setLoading(false)
                }else{
                    setLoading(false)
                }
            }catch(err){
                setLoading(false)
            }
        }
        generateToken();
    }, [cart])

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {

        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            setOrdered(true);
            refreshCart();
        }catch(err){
            // setErrorMessage(err.data.error.message)
            console.log(err);
        }
    }

    const nextStep = () => setActiveStep(previousActiveStep => previousActiveStep + 1);
    const previousStep = () => setActiveStep(previousActiveStep => previousActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }


    const Form = () => activeStep === 0 
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} previousStep={previousStep} nextStep={nextStep} onCaptureCheckout={handleCaptureCheckout}/>

    
        if(cart.total_items < 1 && !ordered ){
            return ( loading ?
                
                <>
                <section className={styles.emptySection}>
                    <div className={styles.emptyContainer}>
                        <CircularProgress />
                    </div>
                </section>
                <Footer />
                </>
                :
                <>
                <section className={styles.emptySection}>
                    <div className={styles.emptyContainer}>
                        <p className={styles.emptyText}>Your cart is empty. <Link href={'/shop'}><a className={styles.link}>Add some items!</a></Link></p>
                    </div>
                </section>
                <Footer />
                </>
            )
        }

        
    const Confirmation = () => order.customer ? (
            <>
                <div>
                    <br />
                    <Typography variant='subtitle2'>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                    <br />
                    <Divider />
                    <br />
                    <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
                </div>
                <br />
                <Link href={'/'}>
                    <a>
                        <button className={styles.bhButton} type="button">Back to Home</button>
                    </a>
                </Link>
            </>
        ) : (
            <section className={styles.emptySection}>
                <div className={styles.emptyContainer}>
                    <CircularProgress />
                </div>
            </section>
        )

    return (
        <>
            <section className={styles.section}>
            <main className={styles.layout}>
                <Paper elevation={0} className={styles.paper}>
                    <Typography variant='h4' align="center">Checkout</Typography>
                    <Stepper className={c.root} activeStep={activeStep}>
                        {steps.map(step => (
                            <Step  key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
            <Footer />
            </section>
        </>
    )
}