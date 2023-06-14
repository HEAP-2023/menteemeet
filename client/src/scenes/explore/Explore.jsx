import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Element from "../../components/explore/Element"
import SearchBar from "../../components/explore/SearchBar"



const Explore = ({programmes}) => {
    return (<Box display="flex" flexDirection="column" >
        <PageHeader text="Explore Programmes" />
        
        {/* search bar */}
        {/* i have trouble getting it to rounded borders :( */}
        <Box width="100%" height="10vh" p="20px" >
            <SearchBar></SearchBar>
        </Box>

        {/* programme should have overflowY */}
        {
            Object.entries(programmes).map(([key,value])  => <Element key={value.PID} details={value}/>)

        }
    </Box>);
}

export default Explore;

