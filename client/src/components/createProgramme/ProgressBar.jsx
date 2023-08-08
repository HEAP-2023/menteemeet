import { Box, Typography } from "@mui/material"
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const ProgressBar = ({progress}) => {
    return (
    <Box display="flex" m="20px" position="sticky" top="50px">
        <LinearProgress variant="determinate" value={progress} 
        sx={{height : "20px", width:"95%",
        borderRadius: 5, ml:"40px",
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#CFCFCF",
            },
            [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: "#AEAEFF",
            }
        }}/>
        <Typography ml="10px">{progress}%</Typography>
    </Box>
    );
}

export default ProgressBar;