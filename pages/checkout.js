import { useState } from 'react';
import AddressForm from '../components/CheckoutForm/AddressForm';
import PaymentForm from '../components/CheckoutForm/PaymentForm';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, button} from '@material-ui/core'
import { commerce } from '../lib/commerce'

import styles from '../styles/Checkout.module.css'

const steps = ['Shipping address', 'Payment details'];


export default function CheckoutPage(){

    const [activeStep, setActiveStep] = useState(0);

    const Form = () => activeStep === 0 
        ? <AddressForm />
        : <PaymentForm />

    return (
        <>
            <main className={styles.layout}>
                <Paper className={styles.paper}>
                    <Typography variant='h4' align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={styles.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : <Form />}
                </Paper>
            </main>
        </>
    )
}