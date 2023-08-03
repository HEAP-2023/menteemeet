import { Typography } from "@mui/material"

const SectionHeader = ({text, margin="25px 30px"}) => {
    return (            
        <Typography variant="h4" margin={margin} fontWeight="700" sx={{display:"inline-block"}}>{text}</Typography>
    );
}

export default SectionHeader;