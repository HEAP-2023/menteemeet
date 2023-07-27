import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

const Deadline = () => {
    const {control, watch, formState : {errors}} = useFormContext();

    return (
        <Box display="flex" width="100%" flexDirection="column">
            <Typography fontWeight="bold" mb="10px">Application Deadline</Typography>
                <Box width="100%" >
                    <Controller
                    name="deadline"
                    control={control}
                    render={({field}) => 
                    {
                const {value, ...others} = field; 
                return (<LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker 
                        {...others}
                        disablePast
                        format="DD-MM-YYYY"
                        onChange={(e) => {
                            const formattedDate = dayjs(e.$d).format("YYYY-MM-DD")
                            field.onChange(formattedDate)
                        }}
                        slotProps={{
                            textField: {
                                error : errors["deadline"] !== undefined,
                                helperText: errors["deadline"]?.["message"],
                            },
                            }}
                        sx={{width:"30%"}}/>
                </LocalizationProvider>)
                    }
                }
                    />
                </Box>
        </Box>
    )
}

export default Deadline;