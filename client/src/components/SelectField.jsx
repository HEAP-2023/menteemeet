import { TextField, MenuItem } from "@mui/material";

const SelectField = ({errors, field, name, label, type="text", selectChildren}) => {
    return (
        <TextField {...field} 
                label={label}
                type={type}
                variant="outlined" 
                select
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
                helperText={errors[name]?.message}
        >
                
            {selectChildren.map((option) => (
                <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
            ))}
        </TextField> 
    )
}
export default SelectField;