import { Box, Button, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"

const Element = ({details}) => {
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

    return (<Box display="flex" p="20px" >
        {/* image */}
        <Box width="30%" height="300px">
            <img src={media} style={{width:"100%", height:"100%", objectFit:"contain"}}/>
        </Box>


        {/* details */}
        <Box width="70%" height="300px" display="grid" gridTemplateRows="1fr 5fr 2fr" rowGap="20px" p="20px">
            <SectionHeader text={name} margin="0"/>
            <Typography>{description}</Typography>
            <Box width="30%" display="flex" justifyContent="space-between" >
                <Button variant="contained" sx={{borderRadius:20}}>Find Out More</Button>
                <Button variant="contained" sx={{borderRadius:20, bgcolor: `${colors.text[500]}` ,color:"#ffffff"}}>Sign Up</Button>

            </Box>
        </Box>
    </Box>);
}
export default Element;