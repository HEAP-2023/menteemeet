import { Box, Divider, Typography } from "@mui/material"
import SectionHeader from "../SectionHeader"

const FindOutMore = ({description}) => {
    return (
        <Box>
            <SectionHeader text="About Programme" margin="0"/>
            <Divider/>
            <Typography>{description}</Typography>
        </Box>
    )
}
export default FindOutMore