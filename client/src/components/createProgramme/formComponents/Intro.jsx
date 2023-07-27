import { Box, TextField } from "@mui/material"
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";

const Intro = () => {
    const {control, watch, formState : {errors}} = useFormContext();

    return (
        <Box width="100%">
        <Controller
        name="description"
        control={control}
        render={({field}) => 
    <TextField error={errors["description"] !== undefined} 
    {...field} multiline rows={4}
        name="description" label="Introduction Paragraph / description of programme" 
        helperText={errors["description"]?.message}
        sx={{
            width : "100%",
            "& label.Mui-focused": {
                color: "secondary.main"
                },

            "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                    borderColor: "secondary.main"
                }
            }
        }}/>
    }
/>
    </Box>
    )
}
export default Intro