import { Box, Typography ,Button, Modal, TextField, List, ListItem, FormControl, FormHelperText } from "@mui/material"
import PageHeader from "../../PageHeader"
import { useRef, useState } from "react"
import { Controller, useFieldArray } from "react-hook-form"
import SkillAdmin from "./SkillAdmin"
import { useFormContext } from "react-hook-form";


const SkillSection = () => {
    const {control, formState : {errors}} = useFormContext();

    const [skillModal, toggleModal] = useState(false)
    const skillInput = useRef(null)
    const popupAddskillButton = useRef(null)

    const {fields, append, remove } = useFieldArray({
        name : "skills",
        control
    })

    return (
    <Box>
        <PageHeader text="Skills" margin="20px 0"/>
        <Box display="flex" flexDirection="column" gap="20px">
        <FormControl
            error={errors["skills"] !== undefined}
        >
            <FormHelperText>{errors["skills"]?.message}</FormHelperText>
            <List>
            {
            fields.map((item, index) => {
                return (
                <ListItem key={item.id}>
                    <Controller
                    render={({ field }) => {
                    return (
                        <SkillAdmin remove={remove} index={index}>
                            <TextField {...field} disabled variant="standard"></TextField>
                        </SkillAdmin>
                    )}
                }
                    name={`skills.${index}.skillName`}
                    control={control}
                    />
                </ListItem>)
            })
            }
            </List>
        </FormControl>

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
// autofocus and enter key not working well

                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter') {
                    //       console.log('Enter key pressed');
                    //       popupAddskillButton.current.click()
                    //       toggleModal(false)
                    //     }}
                    // }
                    sx={{width:"100%", 
                    "& label.Mui-focused": {
                        color: "secondary.main"
                        },
    
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "secondary.main"
                        }
                        }}}/>
                    <Controller
                    name="skills"
                    control={control}
                    render={({field}) => 
                    <Button ref={popupAddskillButton} variant="contained" color="secondary" onClick={() => {
                        append({ skillName :  skillInput.current.value})
                        toggleModal(false)
                        }}>Add Skill</Button>
                    }/>
                </Box>
            </Modal>

            <Button variant="contained" color="secondary" sx={{width : "15%"}} onClick={() => toggleModal(!skillModal)}>Add Skill</Button>
        </Box>
    </Box>)

}

export default SkillSection;
