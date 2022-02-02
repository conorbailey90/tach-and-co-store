

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from "./CustomTextField";
import { CircularProgress } from '@material-ui/core';

import { commerce } from '../../lib/commerce';

export default function AddressForm({checkoutToken, next}){

    const [shippingCountries, setShippingCountries] = useState([{id: '', label: ''}]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([{id: '', label: ''}]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([{id: '', label: '', price: {formatted_with_symbol: ''}}]);
    const [shippingOption, setShippingOption] = useState('');
    const [loading, setLoading] = useState(true);

    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}));
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {

        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id)
        setLoading(false);

        return () => {
            setShippingCountries([]);
            setShippingCountry('');
        }
    
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);

        return () => {
            setShippingCountries([]);
            setShippingCountry('');
        }
        
    }, [checkoutToken])

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry)

        return () => {
            setShippingSubdivisions([]);
            setShippingSubdivision('');
        }
    },[shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision )
        return () => {
            setShippingOption([]);
            setShippingOption('');
        }
    }, [shippingSubdivision])

    return (
        loading ? <CircularProgress /> :
        <>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit((data => next({...data, shippingCountry, shippingSubdivision, shippingOption})))}>
                <Grid container spacing={3}>
                    <FormInput required name='firstname' label='First Name'  />
                    <FormInput required name='lastname' label='Last Name'  />
                    <FormInput required name='address1' label='Address'  />
                    <FormInput required name='email' label='Email'  />
                    <FormInput required name='city' label='City'  />
                    <FormInput required name='zip' label='ZIP / Post Code'  />
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry ? shippingCountry : ''} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map(country => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivisions</InputLabel>
                        <Select value={shippingSubdivision ? shippingSubdivision : ''} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {subdivisions.map(subdivision => (
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption ? shippingOption : ''} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map(sO => (
                                <MenuItem key={sO.id} value={sO.id}>
                                    {sO.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link href={'/cart'}>
                        <a>
                            <Button variant='outlined'>Back to Cart</Button>
                        </a>
                    </Link>
                    <Button type='submit' variant='contained' color='primary'>Next</Button>
                </div>
            </form>
        </FormProvider>
        </>
    )
}