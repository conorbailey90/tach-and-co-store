import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import styles from './Form.module.css'

export default function FormInput({name, label, required}){

    const {control} = useFormContext();

    return (
        <Grid  item xs={12} sm={6}>
            <Controller 
                render={({ field }) => (<TextField {...field} className={styles.input}  label={label} required={required}/>)}
                control={control}
                fullWidth
                defaultValue=''
                name={name}
                
            />
        </Grid>
    )
}