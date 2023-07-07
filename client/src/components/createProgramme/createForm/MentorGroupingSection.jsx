import { Box, IconButton, TextField, Typography, Button } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useState, useRef } from "react"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


const MentorGroupingSection = () => {
    return (
    <Box width="100%">
         <PageHeader text="Mentor Preferences" margin="20px 0"/>
         <Box>
            <Typography variant="h4" fontWeight="bold">Mentors:</Typography>
            

            <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" gap="10px">
                <Typography>Preferred Mentor (please input full name)</Typography>
                <TextField disabled/>

                <Button variant="contained" color="secondary" disabled>Add Mentor</Button>
            </Box>
         </Box>
    </Box>)
}
export default MentorGroupingSection