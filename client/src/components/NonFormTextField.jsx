import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

const NonFormTextField = ({label, type="text", adornment="", multiline=false, rows=1}) => {
    return (
        <TextField
            label={label}
            type={type}
            variant="outlined" 
            multiline={multiline}
            rows={rows}
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
            /> 
    )
}
export default NonFormTextField;