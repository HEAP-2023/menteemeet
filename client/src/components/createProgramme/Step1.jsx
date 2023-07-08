import { Box, Button, Typography } from "@mui/material"
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
import { useState } from "react";

const Step1 = ({control, errors}) => {


    return (
    <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" bgcolor="#F1F1F1" >
        <SectionHeader margin="0" text="Step 1 - The Basics"/>
        <SectionHeader margin="0" text="Tell us about the basic information of the program"/>

            <Box display="flex" flexDirection="column" width="100%" gap="20px" p="20px">
                <Box display="flex" width="100%">
                        <Controller
                        name="programmeName"
                        control={control}
                        render={({field}) => 
                    <StandardTextField errors={errors} field={field} 
                    name="programmeName" label="Programme Name" />
                    }
                        />
                </Box>

                <Box display="flex" width="100%" flexDirection="column">
                <Typography fontWeight="bold" mb="10px">Duration of Programme</Typography>
                    <Box width="100%" >
                        <label>Start</label>
                        <Controller
                        name="programmeStart"
                        control={control}
                        render={({field}) => 
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker {...field} 
                              format="DD-MM-YYYY"
                              value=""
                              onChange={(e) => {
                                const formattedDate = dayjs(e.$d).format("DD/MM/YYYY")
                                field.onChange(formattedDate)
                            }}
                            sx={{width:"30%", p:"0 20px"}}/>
                    </LocalizationProvider>
                    }
                        />
                        <label>End</label>
                        <Controller
                        name="programmeEnd"
                        control={control}
                        render={({field}) => 
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker {...field} 
                            value=""
                            format="DD-MM-YYYY"
                           onChange={(e) => {
                                const formattedDate = dayjs(e.$d).format("DD/MM/YYYY")
                                field.onChange(formattedDate)
                            }}
                            sx={{width:"30%", p:"0 20px"}} />
                        </LocalizationProvider>
                    }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%" flexDirection="column">
                    <Typography fontWeight="bold" mb="10px">Session on fixed dates?</Typography>
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
                </Box>

                <Box display="flex" width="100%" flexDirection="column">
                <Typography fontWeight="bold" mb="10px">Frequency of sessions</Typography>
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
                </Box>

                <Box display="flex" width="100%" gap="20px">
                    <Box width="100%" >
                        <Controller
                        name="duration"
                        control={control}
                        render={({field}) => 
                        <StandardTextField errors={errors} field={field} adornment="hour"
                        name="duration" label="Duration per session" />
                    }
                        />
                    </Box>

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
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker {...field} 
                            value=""
                            format="DD-MM-YYYY"
                            onChange={(e) => {
                                const formattedDate = dayjs(e.$d).format("DD/MM/YYYY")
                                field.onChange(formattedDate)
                            }}
                            sx={{width:"30%"}}/>
                    </LocalizationProvider>
                    }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%" alignItems="center">
                        <Controller
                        name="externalLink"
                        control={control}
                        render={({field}) => 
                    <StandardTextField errors={errors} field={field} 
                    name="externalLink" label="Link to external site (N.A. if not applicable)" />
                    }
                />

                        {/* <Controller
                        name="media"
                        control={control}
                        render={({field}) => 
                        <Button
                        component="label"
                        variant="contained"
                        color="secondary"
                        startIcon={<UploadFileIcon />}
                        sx={{ ml : "20px" }}
                      >
                        Upload Image
                        <input {...field} type="file" accept="image/*" hidden />
                      </Button>
                    }
                        /> */}

                </Box>

    
            </Box>

        </Box>);
}

export default Step1;

