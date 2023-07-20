import { Box, IconButton, TextField, Typography, Button } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useState, useRef } from "react"
import DisplayUser from "./DisplayUser"
import { useFormContext, Controller } from "react-hook-form"

const MenteePreferenceSelector = () => {
    const {control, setValue} = useFormContext()

    const inputref = useRef();
    const [mentees, setMentees] = useState([])
    const addMentee = () => {
        const newMentee = inputref.current.value;
        const updated = [...mentees, newMentee];
        setMentees(updated)
        setValue("preferredMentees", updated)
        inputref.current.value = "";
    }

    const removeMentee = (name) => {
        const updated = mentees.filter(mentee => mentee !== name)
        setMentees(updated)
        setValue("preferredMentees", updated)
    } 

    return (
    <Box width="100%">
         <PageHeader text="Mentee Preferences" margin="20px 0"/>
         <Box>
            <Typography variant="h4" fontWeight="bold">Mentees:</Typography>
                <Box width="100%" display="flex" flexDirection="column" alignItems="flex-start" gap="10px">
                <Typography>Preferred Mentee (please input full name)</Typography>
                {mentees.map(mentee => <DisplayUser key={mentee} name={mentee} removeUser={removeMentee}/>)}
                <Controller
                    name="preferredMentees"
                    control={control}
                    render = {({field}) => <TextField inputRef={inputref} />
                }/>
                <Button variant="contained" color="secondary" onClick={addMentee}>Add Mentee</Button>
            </Box>
         </Box>
    </Box>)
}
export default MenteePreferenceSelector