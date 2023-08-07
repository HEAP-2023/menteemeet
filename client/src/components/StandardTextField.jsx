import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

const StandardTextField = ({errors, field, name, label, type="text", adornment="", multiline=false, rows=1, inputRef=null}) => {
    return (
        <TextField {...field} 
                label={label}
                type={type}
                variant="outlined" 
                multiline={multiline}
                rows={rows}
                inputRef={inputRef}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
                }}
                sx={{width:"100%", 
                "& label.Mui-focused": {
                    color: "secondary.main"
                    },

                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "secondary.main"
                    }
                    }}}
                error={errors[name] !== undefined}
                helperText={errors[name]?.message}/> 
    )
}
export default StandardTextField;