import { Box, IconButton, TextField, Typography, Button } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useState, useRef } from "react"


const MenteeGroupingSection = () => {

    return (
    <Box width="100%">
         <PageHeader text="Mentee Preferences" margin="20px 0"/>
         <Box>
            <Typography variant="h4" fontWeight="bold">Mentees:</Typography>
            
            <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" gap="10px">
                <Typography>Preferred Mentee (please input full name)</Typography>
                <TextField disabled/>

                <Button variant="contained" color="secondary" disabled>Add Mentee</Button>
            </Box>
         </Box>
    </Box>)
}
export default MenteeGroupingSection