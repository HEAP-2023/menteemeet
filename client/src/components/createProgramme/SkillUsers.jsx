import {Box, Typography, TextField} from "@mui/material"

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";


const SkillUsers = ({children}) => {

    return (
    <Box width="80%">
        <Box display="flex" alignItems="center">
            <Typography fontWeight="700">Skill: </Typography>
            {children}
        </Box>
        <Typography>Rate your proficiency from 1 to 10</Typography>
        <HoverRating/>
        <Typography>Elaborate on this skill</Typography>
        <TextField 
            variant="outlined" 
            multiline={true}
            rows={4}
            
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

export default SkillUsers;


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

const HoverRating = () =>  {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}