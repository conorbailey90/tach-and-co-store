import {Typography, List, ListItem, ListItemText} from'@material-ui/core'
import { commerce } from '../../lib/commerce'

export default function Review({checkoutToken, shippingData}){
    const shippingCost = checkoutToken.live.shipping.available_options.filter(option => option.countries[0] === shippingData.shippingCountry)[0].price;
    const total = checkoutToken.live.subtotal.raw + shippingCost.raw;
    return(
        <>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map(item => (
                    <ListItem style={{padding: '10px 0'}} key={item.name}>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`}></ListItemText>
                        <Typography variant='body2'>{item.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: '10px 0'}}>
                    <ListItemText primary='Shipping'></ListItemText>
                    <Typography variant='body2'>{shippingCost.formatted_with_symbol}</Typography>
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