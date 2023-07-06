import { Box, TextField, Typography } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { Controller } from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import StandardTextField from "../StandardTextField";


const Step1 = ({control, errors}) => {
   
    return (
    <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" bgcolor="#F1F1F1" >
        <SectionHeader margin="0" text="Step 1 - The Basics"/>
        <SectionHeader margin="0" text="Tell us about the basic information of the program"/>

            <Box display="flex" flexDirection="column" width="100%" gap="20px" p="20px">
                <Box display="flex" width="100%">
                    <Box width="100%" >
                        <Controller
                        name="programmeName"
                        control={control}
                        render={({field}) => 
                    <StandardTextField errors={errors} field={field} 
                    name="programmeName" label="Programme Name" />
                    }
                        />
                    </Box>
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
                            <DatePicker {...field} sx={{width:"30%", p:"0 20px"}}/>
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
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
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
                            <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                            <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                            <FormControlLabel value="yearly" control={<Radio />} label="Yearly" />
                            <FormControlLabel value="na" control={<Radio />} label="Not Applicable" />

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
                        name="expectedMentors"
                        control={control}
                        render={({field}) => 
                        <StandardTextField errors={errors} field={field} type="number"
                        name="expectedMentors" label="Expected Number of Mentors" />
                    }
                        />
                    </Box>

                    <Box width="100%" >
                        <Controller
                        name="expectedMentees"
                        control={control}
                        render={({field}) => 
                        <StandardTextField errors={errors} field={field} type="number"
                        name="expectedMentees" label="Expected Number of Mentees" />
                    }
                        />
                    </Box>
                </Box>
    
            </Box>

        </Box>);
}

export default Step1;