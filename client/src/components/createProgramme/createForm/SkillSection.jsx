import { Box, Typography, Button, Modal, Input, TextField } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useRef, useState } from "react"
import Skill from "./Skill"

const SkillSection = () => {
    const [skills, setSkills] = useState([])
    const [skillModal, toggleModal] = useState(false)
    const skillInput = useRef(null)
    const popupAddskillButton = useRef(null)

    return (
    <Box>
        <PageHeader text="Skills" margin="20px 0"/>
        <Box display="flex" flexDirection="column" gap="20px">
            {skills.map(skill => <Skill skillName={skill} key={skill} skills={skills} setSkills={setSkills}/>)}

            {/* popup */}
            <Modal
            open={skillModal}
            sx={{
                width:"100%",
                height:"100%",
                display : "flex",
                justifyContent : "center",
                alignItems : "center",
            }}
            >
                <Box width="30%" height="20%" display="flex" flexDirection="column" alignItems="flex-start" gap="20px" bgcolor="#ffffff" p="20px">
                    <Typography>Skill: </Typography>
                    <TextField inputRef={skillInput} variant="outlined"
                    autoFocus
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          console.log('Enter key pressed');
                          popupAddskillButton.current.click()
                          toggleModal(false)
                        }}
                    }
                    sx={{width:"100%", 
                    "& label.Mui-focused": {
                        color: "secondary.main"
                        },
    
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "secondary.main"
                        }
                        }}}/>
                    <Button ref={popupAddskillButton} variant="contained" color="secondary" onClick={() => {
                        setSkills([...skills, skillInput.current.value])
                        toggleModal(false)
                        }}>Add Skill</Button>
                </Box>
            </Modal>

            <Button variant="contained" color="secondary" sx={{width : "15%"}} onClick={() => toggleModal(!skillModal)}>Add Skill</Button>
        </Box>
    </Box>)

}

export default SkillSection;