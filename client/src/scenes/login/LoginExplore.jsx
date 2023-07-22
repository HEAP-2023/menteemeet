import { Box } from "@mui/material";
import { generateColors } from "../../theme";
import PageHeader from "../../components/PageHeader"
import Header from "../../components/login/start/Header"
import LoginOverlay from "../../components/login/LoginOverlay"


const loginExplore = () => {
    const color = generateColors();
    return (
    <Box width="100%" position="relative">
        <LoginOverlay/>
        <Box display="grid" gridTemplateRows="1fr 4fr 1fr 4fr" gap="20px" width="100%" p="20px">
            <Header></Header>
            <Box sx={{backgroundImage: "url('../images/loginExplore/Untitled design (6).png')"}}
            borderRadius="20px"
            paddingTop="180px" paddingLeft="80px" color = "#000000">
                {/* <img src="../images/loginExplore/Untitled design (6).png" >
                </img> */}
            </Box>
            <Box></Box>
            <Box borderRadius="20px" bgcolor="#8091FF"
            paddingTop="180px" paddingLeft="80px" color = "#000000">

            </Box>
        </Box>


    </Box>);
}
export default loginExplore;