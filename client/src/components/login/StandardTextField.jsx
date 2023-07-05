import { TextField } from "@mui/material";

const StandardTextField = ({errors, field, name, label}) => {
    return (
        <TextField {...field} 
                label = {label}
                variant="outlined" 
                sx={{width:"100%", 
                "& label.Mui-focused": {
                    color: "secondary.main"
                    },

                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "secondary.main"
                    }
                    }}}
                error={errors[name]}
                helperText={errors[name]?.message}/> 
    )
}
export default StandardTextField;