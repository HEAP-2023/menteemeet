import { Box, Typography, Button, TextField } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { Controller } from "react-hook-form";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Step1 = ({control, handleSubmit}) => {
   
    return (
    <Box width="100%" p="40px" m="20px 0" display="flex" flexDirection="column" bgcolor="#CFCFCF" >
        <SectionHeader margin="0" text="Step 1 - The Basics"/>
        <SectionHeader margin="0" text="Tell us about the basic information of the program"/>

        <Box p="20px">
        <form onSubmit={handleSubmit} width="100%">
            <Box display="flex" flexDirection="column" width="100%" gap="20px">
                <Box display="flex" width="100%">
                    <label>Programme Name</label>
                    <Box width="70%" ml="auto">
                        <Controller
                        name="programmeName"
                        control={control}
                        render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%">
                    <label>Duration of Programme</label>
                    <Box width="70%" ml="auto">
                        <label>Start</label>
                        <Controller
                        name="programmeStart"
                        control={control}
                        render={({field}) => <TextField {...field} variant="outlined" sx={{width:"20%" , p:"0 20px"}}/> }
                        />
                        <label>End</label>
                        <Controller
                        name="programmeEnd"
                        control={control}
                        render={({field}) => <TextField {...field} variant="outlined" sx={{width:"20%" , p:"0 20px"}}/> }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%">
                    <label>Session on fixed dates?</label>
                    <Box width="70%" ml="auto">
                        <Controller
                        name="fixedDates"
                        control={control}
                        render={({field}) => 
                        <RadioGroup
                        row
                        {...field}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                      </RadioGroup>
                    }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%">
                    <label>Frequency of sessions</label>
                    <Box width="70%" ml="auto">
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

                <Box display="flex" width="100%">
                    <label>Duration</label>
                    <Box width="70%" ml="auto">
                        <Controller
                        name="duration"
                        control={control}
                        render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%">
                    <label>Expected Number of Mentors</label>
                    <Box width="70%" ml="auto">
                        <Controller
                        name="expectedMentors"
                        control={control}
                        render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                        />
                    </Box>
                </Box>

                <Box display="flex" width="100%">
                    <label>Expected Number of Mentees</label>
                    <Box width="70%" ml="auto">
                        <Controller
                        name="expectedMentees"
                        control={control}
                        render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                        />
                    </Box>
                </Box>
    
            </Box>
        </form>
        </Box>
    </Box>);
}

export default Step1;