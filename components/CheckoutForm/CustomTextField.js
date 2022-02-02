import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";


export default function FormInput({name, label, required}){

    const {control} = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller 
                render={({ field }) => (<TextField {...field}   label={label} required={required}/>)}
                control={control}
                fullWidth
                defaultValue=''
                name={name}
            />
        </Grid>
    )
}