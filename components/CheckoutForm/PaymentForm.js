import { usePersonalisationState } from "../../context/personalisation";
import { Typography, Divider } from "@material-ui/core"
import { commerce } from "../../lib/commerce";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { useState, useRef } from "react";
import Review from './Review'

import styles from './Form.module.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentForm({shippingData, checkoutToken, previousStep, nextStep, onCaptureCheckout }){

    const shippingCost = checkoutToken.live.shipping.available_options.filter(option => option.countries[0] === shippingData.shippingCountry)[0].price.raw;
    const {state} = usePersonalisationState();
    const couponInput = useRef();
    const circularContainer = useRef();   

    const [total, setTotal] = useState(checkoutToken.live.subtotal.raw + shippingCost);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [saving, setSaving] = useState('');

    async function handleSetDiscount(){
        const coupon = couponInput.current.value;
        circularContainer.current.style.opacity = 1;
        try{
            const response = await commerce.checkout.checkDiscount(checkoutToken.id, { code: coupon })
            console.log(response)
            setTotal(+response.live.total.formatted + +shippingCost);
            setDiscountApplied(true);
            setSaving(response.discount.amount_saved.formatted_with_symbol)

        }catch(err){
            alert('Coupon invaild')
        }
        
        circularContainer.current.style.opacity = 0;
    }

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
        
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({type: 'card', card: cardElement});

        if(error){
            console.log(error)
        }else{
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstname,
                    lastname: shippingData.lastname,
                    email: shippingData.email
                },
                shipping: {
                    name: 'primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                billing: {
                    name: 'primary',
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment:{
                    shipping_method: shippingData.shippingOption
                },
                payment:{
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                },
                extra_fields: {
                    extr_NqKE50NBDwdgBL: state,
                }
            }
            onCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
       
    }

    return (
       <>
        <Review checkoutToken={checkoutToken} shippingCost={shippingCost} total={total} saving={saving} couponInput={couponInput} circularContainer={circularContainer} handleSetDiscount={handleSetDiscount} discountApplied={discountApplied}/>
        <Divider />
        <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment method</Typography>
        <Elements stripe={stripePromise}> 
            <ElementsConsumer>
                {({elements, stripe}) => (
                    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                        <CardElement />
                        <br /><br />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <button className={styles.backButton}  onClick={previousStep}>Back</button>
                            <button className={styles.nextButton} type="submit" disabled={!stripe} color='primary'>
                                Pay £{total}
                            </button>
                        </div>
                    </form>
                )}
            </ElementsConsumer>
        </Elements>
       </>
    )
}