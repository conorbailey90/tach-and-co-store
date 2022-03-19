import {Typography, List, ListItem, ListItemText, CircularProgress} from'@material-ui/core'
import { useRef, useState } from 'react';
import { set } from 'react-hook-form';
import { commerce } from '../../lib/commerce'
import styles from './Review.module.css'


export default function Review({checkoutToken, shippingCost, couponInput, saving, circularContainer, total, handleSetDiscount, discountApplied}){   
    return(
        <>
            <div ref={circularContainer} className={styles.circularContainer}>
                <CircularProgress className={styles.CircularProgress} />
            </div>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map(item => (
                    <ListItem style={{padding: '10px 0'}} key={item.id}>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}></ListItemText>
                        <Typography variant='body2'>{item.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary='Shipping'></ListItemText>
                    <Typography variant='body2'>{`£${shippingCost}`}</Typography>
                </ListItem>
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary='Coupon'></ListItemText>
                    {discountApplied ? 
                        <Typography variant='body2'>{`${saving} Saved`}</Typography> 
                    : 
                        <div>
                            <input className={styles.discountInput} ref={couponInput} type='text'></input>
                            <input className={styles.discountBtn} type='submit' value='Apply' onClick={handleSetDiscount}></input>
                        </div>
                    }
                   
                   
                </ListItem>
                 <ListItem style={{padding: '10px 0'}}>
                        <ListItemText primary='Total' />
                        <Typography variant='subtitle1' style={{fontWeight: 700}}>
                            £{Number.isInteger(total) ? `${total}.00` : total}
                        </Typography>
                    </ListItem>
            </List>
        </>
    )
    
}