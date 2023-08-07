import { Box, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

const Duration = () => {
    const {control, watch, formState : {errors}} = useFormContext();

    return (
    <Box display="flex" width="100%" flexDirection="column">
        <Typography fontWeight="bold" mb="10px">Duration of Programme</Typography>
            <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <label>Start</label>
                <Controller
                name="programmeStart"
                control={control}
                render={({field: { value, ref, ...field }, fieldState}) => 
            {
            return (<LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker 
                    {...field}
                    inputRef={ref}
                    disablePast
                    format="DD-MM-YYYY"
                    // inputRef={}
                    onChange={(e) => {
                        const formattedDate = dayjs(e.$d).format("YYYY-MM-DD")
                        field.onChange(formattedDate)
                    }}
                    slotProps={{
                        textField: {
                            error : errors["programmeStart"] !== undefined,
                            helperText: errors["programmeStart"]?.["message"],
                        },
                      }}
                    sx={{width:"45%"}}
                    />
            </LocalizationProvider>)
                }
            }
                />
                <label>End</label>
                <Controller
                name="programmeEnd"
                control={control}
                render={({field: { value, ref, ...field }, fieldState}) => 
                {
                    return (<LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker 
                            {...field}
                            inputRef={ref}
                            disablePast
                            format="DD-MM-YYYY"
                            onChange={(e) => {
                                const formattedDate = dayjs(e.$d).format("YYYY-MM-DD")
                                field.onChange(formattedDate)
                            }}
                            slotProps={{
                                textField: {
                                    error : errors["programmeEnd"] !== undefined,
                                    helperText: errors["programmeEnd"]?.["message"],
                                },
                              }}
                            sx={{width:"45%"}}/>
                    </LocalizationProvider>)
                }
            }
                />
            </Box>
        </Box>
    )
}
export default Duration