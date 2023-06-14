import { Box, Button, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"

const Card = ({details}) => {
    const colors = generateColors();


    const {
        PID, 
        name,  
        description,
        category,
        capacity, 
        startDate,
        endDate, 
        applicationDeadline,
        media, 
        criteria,
        link, 
    } = details

    return (<Box display="flex" flexDirection="column" width="225px" height="400px" >
        {/* image */}
        <Box width="100%" height="40%">
            <img src={media} style={{width:"100%", height:"100%", objectFit:"contain"}}/>
        </Box>
        <Box display="flex" flexDirection="column">
            <Typography>{name}</Typography>
            <Typography>{description}</Typography>
        </Box>
    </Box>);
}
export default Card;