import { Box, IconButton, TextField, Typography, Button } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useState, useRef } from "react"
import DisplayUser from "./DisplayUser"


const MentorPreferenceSelector = () => {
    const inputref = useRef();
    const [mentors, setMentors] = useState([])
    const addMentor = () => {
        const newMentor = inputref.current.value;
        setMentors([...mentors, newMentor]);
        inputref.current.value = "";
    }

    const removeMentor = (name) => {
        setMentors(mentors.filter(mentor => mentor !== name))
    } 

    return (
    <Box width="100%">
         <PageHeader text="Mentor Preferences" margin="20px 0"/>
         <Box>
            <Typography variant="h4" fontWeight="bold">Mentors:</Typography>
            

            <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" gap="10px">
                <Typography>Preferred Mentor (please input full name)</Typography>
                {mentors.map(mentor => <DisplayUser key={mentor} name={mentor} removeUser={removeMentor}/>)}

                <TextField  inputRef={inputref}/>
                <Button variant="contained" color="secondary" disabled={inputref.current?.value.length === 0} onClick={addMentor}>Add Mentor</Button>
            </Box>
         </Box>
    </Box>)
}
export default MentorPreferenceSelector