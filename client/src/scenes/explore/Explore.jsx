import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Element from "../../components/explore/Element"



const Explore = ({programmes}) => {
    return (<Box display="flex" flexDirection="column" >
        <PageHeader text="Explore Programmes" />
        
        {/* search bar */}
        <Box width="100%" height="10vh"> implement search bar maybe make it sticky ??? include filters???</Box>

        {/* programme should have overflowY */}
        {
            Object.entries(programmes).map(([key,value])  => <Element key={value.PID} details={value}/>)

        }
    </Box>);
}

export default Explore;

