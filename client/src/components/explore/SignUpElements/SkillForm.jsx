import {Box, Typography, TextField} from "@mui/material"

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";


const SkillForm = ({children, index}) => {
    const [hover, setHover] = useState(-1);
    const {control, register} = useFormContext()
    return (
    <Box width="80%">
        <Box display="flex" alignItems="center">
            <Typography fontWeight="700">Skill: </Typography>
            {children}
        </Box>
        <Typography>Rate your proficiency from 1 to 10</Typography>
        <Controller
        name={`skill.${index}.rating`}
        control={control}
        render = {({field: {onChange, value} })=> (
        <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}>
            <Rating
                name={`skill.${index}.rating`} 
                onChange={onChange}
                value={Number(value)}
                precision={0.5}
                getLabelText={getLabelText}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
    </Box>)}
    />

        <Typography>Elaborate on this skill</Typography>
        <TextField 
            variant="outlined" 
            multiline={true}
            rows={4}
            {...register(`skill.${index}.elaboration`)}
            sx={{width:"90%", 
            "& label.Mui-focused": {
                color: "secondary.main"
                },

            "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                    borderColor: "secondary.main"
                }
                }}}/> 
    </Box>)
}

export default SkillForm;


const labels = {
    0.5: '',
    1: 'novice',
    1.5: '',
    2: 'amateur',
    2.5: '',
    3: 'pro',
    3.5: '',
    4: 'expert',
    4.5: '',
    5: 'pathfinder',
  };
  

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

