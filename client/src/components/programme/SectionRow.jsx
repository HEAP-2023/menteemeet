import { Box, Typography, Divider } from "@mui/material"
import {parse, format} from "date-fns"
const SectionRow = ({details, rowColor, checkbox, highlight, showDTG}) => {
    const {title, description,createdAt} = details;
    const parsedDate = parse(createdAt, 'dd/MM/yyyy, h:mm:ss a', new Date());
    const date = format(parsedDate, 'yyyy MMM dd p')
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