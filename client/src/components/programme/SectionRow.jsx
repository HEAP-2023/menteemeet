import { Box, Typography, Divider } from "@mui/material"

const SectionRow = ({details, rowColor, checkbox, highlight, showDTG}) => {
    const {title, body, dtg} = details;
    return  (
    <Box display="flex" flexDirection="row" width="90%" bgcolor="background.main" marginY="5px" p="10px"  minHeight="100px" borderRadius="20px">
        {highlight && <Box p="5px">
            <Divider orientation="vertical"  sx={{ borderRightWidth: 3 , borderColor: rowColor }}/>
        </Box>}
        {showDTG && <Box p="5px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {dtg}
        </Box>}
        <Box display="flex" flexDirection="column">
            <Typography  fontWeight="700" >{title}</Typography>
            <Typography>{body}</Typography>
        </Box>
    </Box>)
}
export default SectionRow;