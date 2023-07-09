import { Box, IconButton, TextField, Typography, Button } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useState, useRef } from "react"
import DisplayUser from "./DisplayUser"

const MenteeGroupingSection = ({admin=false}) => {
    const inputref = useRef();
    const [mentees, setMentees] = useState([])
    const addMentee = () => {
        const newMentee = inputref.current.value;
        setMentees([...mentees, newMentee]);
        inputref.current.value = "";
    }

    const removeMentee = (name) => {
        setMentees(mentees.filter(mentee => mentee !== name))
    } 

    return (
    <Box width="100%">
         <PageHeader text="Mentee Preferences" margin="20px 0"/>
         <Box>
            <Typography variant="h4" fontWeight="bold">Mentees:</Typography>
            
            <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" gap="10px">
                <Typography>Preferred Mentee (please input full name)</Typography>
                {mentees.map(mentee => <DisplayUser key={mentee} name={mentee} removeUser={removeMentee}/>)}

                <TextField disabled={admin} inputRef={inputref}/>
                <Button variant="contained" color="secondary" disabled={admin}  onClick={addMentee}>Add Mentee</Button>
            </Box>
         </Box>
    </Box>)
}
export default MenteeGroupingSection