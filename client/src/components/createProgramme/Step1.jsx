import { Box, Stack, Typography, Input, TextField, FormControl, FormHelperText } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { Controller } from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StandardTextField from "../StandardTextField";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import dayjs from "dayjs";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
    const {control, watch, formState : {errors}} = useFormContext();
    const imagePreview = useRef();
    const imgUploaded = watch("display_image", false)
    return (
    <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" bgcolor="#F1F1F1" >
        <SectionHeader margin="0" text="Step 1 - The Basics"/>
        <SectionHeader margin="0" text="Tell us about the basic information of the program"/>

            <Box display="flex" flexDirection="column" width="100%" gap="20px" p="20px">
                <Box display="flex" width="100%">
                        <Controller
                        name="name"
                        control={control}
                        render={({field}) => 
                    <StandardTextField errors={errors} field={field} 
                    name="name" label="Programme Name" />
                    }
                        />
                </Box>

                <Box display="flex" width="100%" flexDirection="column">
                <Typography fontWeight="bold" mb="10px">Duration of Programme</Typography>
                    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                        <label>Start</label>
                        <Controller
                        name="programmeStart"
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

                {/* <Box display="flex" width="100%" flexDirection="column">
                    <FormControl
                    error={errors["fixedDates"] !== undefined}
                    >
                        <Box display="flex">
                            <Typography fontWeight="bold" mb="10px">Session on fixed dates?</Typography>
                            <FormHelperText>{errors["fixedDates"]?.message}</FormHelperText>
                        </Box>
                        <Box width="100%">
                                <Controller
                                name="fixedDates"
                                control={control}
                                render={({field}) => 
                                <RadioGroup
                                row
                                {...field}>
                                <FormControlLabel value="Yes" control={<Radio color="secondary"/>} label="Yes" />
                                <FormControlLabel value="No" control={<Radio color="secondary"/>} label="No" />
                            </RadioGroup>
                            }
                                />
                        </Box>
                    </FormControl>
                </Box> */}

                {/* <Box display="flex" width="100%" flexDirection="column">
                <FormControl
                    error={errors["frequency"] !== undefined}
                >
                    <Box display="flex">
                        <Typography fontWeight="bold" mb="10px">Frequency of sessions</Typography>
                        <FormHelperText>{errors["frequency"]?.message}</FormHelperText>
                    </Box>
                        <Box width="100%" >
                            <Controller
                            name="frequency"
                            control={control}
                            render={({field}) => 
                            <RadioGroup
                            row
                            {...field}>
                                <FormControlLabel value="weekly" control={<Radio color="secondary"/>} label="Weekly" />
                                <FormControlLabel value="monthly" control={<Radio color="secondary"/>} label="Monthly" />
                                <FormControlLabel value="yearly" control={<Radio color="secondary"/>} label="Yearly" />
                                <FormControlLabel value="na" control={<Radio color="secondary"/>} label="Not Applicable" />

                        </RadioGroup>
                        }
                            />
                        </Box>
                </FormControl>
                </Box> */}

                <Box display="flex" width="100%" gap="20px">
                    {/* <Box width="100%" >
                        <Controller
                        name="duration"
                        control={control}
                        render={({field}) => 
                        <StandardTextField errors={errors} field={field} adornment="hour"
                        name="duration" label="Duration per session" />
                    }
                        />
                    </Box> */}

                    <Box width="100%" >
                        <Controller
                        name="mentorCapacity"
                        control={control}
                        render={({field}) => 
                        <StandardTextField errors={errors} field={field} type="number"
                        name="mentorCapacity" label="Mentor Capacity" />
                    }
                        />
                    </Box>

                    <Box width="100%" >
                        <Controller
                        name="menteeCapacity"
                        control={control}
                        render={({field}) => 
                        <StandardTextField errors={errors} field={field} type="number"
                        name="menteeCapacity" label="Mentee Capacity" />
                    }
                        />
                    </Box>

                </Box>
                
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

                <Stack display="flex" width="100%" >
                        {/* <Controller
                        name="externalLink"
                        control={control}
                        render={({field}) => 
                    <StandardTextField errors={errors} field={field} 
                    name="externalLink" label="Link to external site (N.A. if not applicable)" />
                    }
                /> */}

                        <Controller
                        name="display_image"
                        control={control}
                        render={({field}) => {
                        const {value, ...others} = field; 
                        return (
                        <Stack width="50%">
                            <Typography fontWeight="bold" m="10px 0">Add a cover image for your programme</Typography>
                            <TextField {...others} type="file" 
                            inputProps={{accept : "image/*"}} 
                            InputProps={{endAdornment:<UploadFileIcon/>}} 
                            error={errors["display_image"] !== undefined} 
                            helperText={errors["display_image"]?.message} 
                            variant="outlined"
                            onChange={(e) => {
                                const [file] = e.target.files
                                if (file) {
                                    // const blob = URL.createObjectURL(file)
                                    // imagePreview.current.src = blob
                                    field.onChange(file);
                                  }
                            }}
                            />
                            {/* <img ref={imagePreview} alt="Image format is not supported" 
                            src="#" hidden={!imgUploaded}
                            style={{height: "300px", objectFit : "scale-down" ,width: "auto"}}/> */}
                        </Stack>)}
                    }
                        />

                </Stack>

    
            </Box>

        </Box>);
}

export default Step1;

