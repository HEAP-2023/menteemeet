import { Box, Typography, Button } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Header from "../../components/login/start/Header"
import LoginOverlay from "../../components/login/LoginOverlay"

const LoginStart = () => {
    const colors = generateColors();
    return (
    <Box width="100%" position="relative">
        <LoginOverlay/>
        <Box display="grid" gridTemplateRows="1fr 4fr 1fr 4fr 1fr 5fr" gap="20px" width="100%" p="20px">
            <Header></Header>
            <Box 
            borderRadius="20px" bgcolor="#8091FF"
            paddingTop="180px" paddingLeft="80px" color = "#000000">
                <Typography fontFamily="prompt" fontWeight="900" variant="h2">MORE THAN JUST A</Typography>
                <Typography fontFamily="prompt" fontWeight="900" variant="h2" mb="15px">MENTORING EXPERIENCE</Typography>
                <Typography fontFamily="prompt" fontWeight="200" variant="h4">Open an account today to take</Typography>
                <Typography fontFamily="prompt" fontWeight="200" variant="h4" mt="3.5px" lineHeight = "1px">your learning to greater heights</Typography>
                <Button sx={{bgcolor: "#fcac3d", color : "#000000", height : "20%", width: "20%", borderRadius:"20px", mt: "30px"}}>TRY IT OUT</Button>
                
            </Box>
            <Box></Box>
            <Box 
            borderRadius="20px" bgcolor="#8091FF"
            paddingTop="200px" paddingLeft="80px" color = "#000000">
                <Typography fontFamily="prompt" fontWeight="900" variant="h2" mb="15px">#UNLIMITED_OPPORTUNITIES</Typography>
                <Typography fontFamily="prompt" fontWeight="200" variant="h4">Explore from our catalogue of opportunies available</Typography>
                <Typography fontFamily="prompt" fontWeight="200" variant="h4" mt="3.5px" lineHeight = "1px">both as a mentor and mentee.</Typography>
                <Button sx={{bgcolor: "#fcac3d", color : "#000000", height : "20%", width: "20%", borderRadius:"20px", mt: "30px"}}>EXPLORE</Button>
            </Box>
            <Box></Box>
            <Box 
            borderRadius="20px" bgcolor="#8091FF"
            paddingTop="260px" paddingLeft="80px" color = "#000000">
                <Typography fontFamily="prompt" fontWeight="900" variant="h2" mb="15px">#UNLIMITED_OPPORTUNITIES</Typography>
                <Typography fontFamily="prompt" fontWeight="200" variant="h4">Explore from our catalogue of opportunies available</Typography>
                <Typography fontFamily="prompt" fontWeight="200" variant="h4" mt="3.5px" lineHeight = "1px">both as a mentor and mentee.</Typography>
                <Button sx={{bgcolor: "#fcac3d", color : "#000000", height : "20%", width: "20%", borderRadius:"20px", mt: "30px"}}>TRY IT OUT</Button>
            </Box>
            {/* <img src="../images/loginExplore/categories (1).png" alt="categories (1)" 
            style={{borderRadius: "50%", width: "300px", height: "300px", objectFit: "cover"}} > */}
            
            
        </Box>
      
            <img src="../images/loginExplore/Untitled design (2).png" 
                    style={{borderRadius: "80%", width: "600px", height: "600px", position : "absolute", objectFit: "cover", top:"140px", left : "380px"}}>
            </img>
            <img src="../images/loginExplore/Untitled design (3).png" 
                    style={{borderRadius: "80%", width: "400px", height: "400px", position : "absolute", objectFit: "cover", top:"580px", left : "850px"}}>
            </img>
            <img src="../images/loginExplore/Untitled design (4).png" 
                    style={{borderRadius: "80%", width: "400px", height: "400px", position : "absolute", objectFit: "cover", top:"800px", left : "620px"}}>
            </img>
            <img src="../images/loginExplore/Untitled design (5).png" 
                    style={{borderRadius: "80%", width: "800px", height: "800px", position : "absolute", objectFit: "cover", top:"1086px", left : "620px"}}>
            </img>
    </Box>
    );
}

export default LoginStart;

