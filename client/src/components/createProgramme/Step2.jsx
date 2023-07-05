import { Box, Typography, Button, TextField } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";

const Step2 = ({control, handleSubmit}) => {
    const [state, setState] = useState({
        availability: false,
        skill: false,
        interest: false,
        mentorGrouping : false, 

      });



    return (
    <Box width="100%" p="40px" display="flex" flexDirection="column" bgcolor="#CFCFCF" m="20px 0">
        <SectionHeader margin="0" text="Step 2 - Group Matching"/>
        <SectionHeader margin="0" text="Inform us about your desired criteria for group matching, which will be incorporated into our advanced matching algorithm"/>

        <Box p="20px">
        <form onSubmit={handleSubmit} width="100%">
            <Box display="flex" flexDirection="column" width="100%" gap="20px">
                    <label>Matching Criteria</label>
                    <Box width="70%" >
                        <Controller
                        name="programmeName"
                        control={control}
                        render={({field}) => 
                    <FormGroup {...field} >
                        <FormControlLabel control={<Checkbox color="secondary"/>} label="Availability" />
                        <FormControlLabel control={<Checkbox color="secondary"/>} label="Skill" />
                        <FormControlLabel control={<Checkbox color="secondary"/>} label="Interests" />
                        <FormControlLabel control={<Checkbox color="secondary"/>} label="Grouping preference for mentors" />
                        <FormControlLabel control={<Checkbox color="secondary"/>} label="Grouping preference for mentees" />
                    </FormGroup>
                    }
                        />
                    </Box>
            </Box>
        </form>
        </Box>
    </Box>);
}

export default Step2;