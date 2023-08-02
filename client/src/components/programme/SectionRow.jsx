import { Box, Typography, Divider } from "@mui/material"
import {format} from "date-fns"
const SectionRow = ({details, rowColor, checkbox, highlight, showDTG}) => {
    const {title, description,createdAt} = details;
    const date = format(new Date(createdAt), 'yyyy-MM-dd p')
    return  (
    <Box display="flex" flexDirection="row" width="95%" bgcolor="background.main" marginY="5px" p="10px" mb="18px" minHeight="100px" borderRadius="5px">
        {highlight && <Box p="5px"  px="20px">
            <Divider orientation="vertical"  sx={{ borderRightWidth: 3 , borderColor: rowColor }}/>
        </Box>}
        <Box display="flex" flexDirection="column">
            <Typography>{date}</Typography>
            <Typography  fontWeight="700" >{title}</Typography>
            <Typography>{description}</Typography>
        </Box>
    </Box>)
}
export default SectionRow;