import { useState } from "react";
import { Box, Typography, Button, TextField} from "@mui/material";
import { generateColors } from "../../theme";
import PageHeader from "../../components/PageHeader"
import Header from "../../components/login/start/Header"
import LoginOverlay from "../../components/login/LoginOverlay"
import RSearchBox from "../../components/explore/SearchBox";
import { loginOverlayToggle } from "../../state(kiv)";
import { useDispatch } from "react-redux";

const LoginExplore = () => {
    const color = generateColors();
    const dispatch = useDispatch();

    return (
    <Box width="100%" position="relative">
        <LoginOverlay/>
        <Box gap="20px" width="100%" p="20px">
            <Header></Header>
            <Box
                borderRadius="20px" bgcolor="#8091FF"
                paddingTop="60px" padding="60px" color = "#000000">
                <Typography
                    fontFamily="prompt" fontWeight="500" variant="h5" paddingBottom="7px">
                    All Programmes
                </Typography>
                <RSearchBox />
            </Box>
            <Box
                height="50px"></Box>
            <Box
                onClick={() => dispatch(loginOverlayToggle())}
                sx={{
                    backgroundImage: "url('../images/loginExplore/SMU BUDDY PROGRAMME (1).png')", backgroundSize:"cover",
                    backgroundPosition:"centre"}} width="100%" height="600px" paddingTop="480px" paddingLeft="140px">
                    <Button
                        sx={{bgcolor: "#fcac3d", color : "#000000", height : "50px", width: "20%", variant:"h4",
                        borderRadius:"20px", "&:hover":{bgcolor: "#fcac3d",opacity: 0.8}}}
                        >
                            JOIN NOW
                    </Button>
            </Box>
            <Box
                height= "50px"></Box>
            <Box
                borderRadius="20px" bgcolor="#8091FF" height="600px"
                paddingTop="60px" paddingLeft="60px" color = "#000000">
                <Typography fontFamily="prompt" fontWeight="500" variant="h5">Our Top Categories</Typography>

                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (2).png')", backgroundPosition: "centre",
                backgroundSize: "cover" ,color: "#FFFFFF", height : "80%", width: "18%", borderRadius:"20px", mt: "30px",
                alignItems:"flex-start", padding:"30px", textTransform:"none"}}>
                    <Typography fontFamily="prompt" fontWeight="500" variant="h5">Career Development</Typography>
                </Button>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (1).png')", backgroundPosition: "centre",
                backgroundSize: "cover" ,color: "#FFFFFF", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml:"20px",
                alignItems:"flex-start", padding:"30px", textTransform:"none"}}>
                    <Typography fontFamily="prompt" fontWeight="500" variant="h5">Skills Upgrading</Typography>
                </Button><Button sx={{backgroundImage: "url('../images/loginExplore/categories (3).png')", backgroundPosition: "centre",
                backgroundSize: "cover" ,color: "#FFFFFF", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml:"20px",
                alignItems:"flex-start", padding:"30px", textTransform:"none"}}>
                    <Typography fontFamily="prompt" fontWeight="500" variant="h5">Personal Development</Typography>
                </Button><Button sx={{backgroundImage: "url('../images/loginExplore/categories (4).png')", backgroundPosition: "centre",
                backgroundSize: "cover" ,color: "#FFFFFF", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml:"20px",
                alignItems:"flex-start", padding:"30px", textTransform:"none"}}>
                    <Typography fontFamily="prompt" fontWeight="500" variant="h5">Industry Insights</Typography>
                </Button>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (5).png')", backgroundPosition: "centre",
                backgroundSize: "cover" ,color: "#FFFFFF", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml:"20px",
                alignItems:"flex-start", padding:"30px", textTransform:"none"}}>
                    <Typography fontFamily="prompt" fontWeight="500" variant="h5">Goal Setting</Typography>
                </Button>
            </Box>
            
            
        </Box>



    </Box>);
}
export default LoginExplore;