import { useState } from "react";
import { Box, Typography, Button, TextField} from "@mui/material";
import { generateColors } from "../../theme";
import PageHeader from "../../components/PageHeader"
import Header from "../../components/login/start/Header"
import LoginOverlay from "../../components/login/LoginOverlay"
import RSearchBox from "../../components/explore/SearchBox";

const LoginExplore = () => {
    const color = generateColors();

    return (
    <Box width="100%" position="relative">
        <LoginOverlay/>
        <Box gap="20px" width="100%" p="20px">
            <Header></Header>
            <Box sx={{
                backgroundImage: "url('../images/loginExplore/Untitled design (6).png')", height: "500px"}}>
                {/* <img src="../images/loginExplore/Untitled design (6).png" >
                </img> */}
            </Box>
            <Box
                height= "50px"></Box>
            <Box
                borderRadius="20px" bgcolor="#8091FF" height="600px"
                paddingTop="60px" paddingLeft="60px" color = "#000000">
                <Typography fontFamily="prompt" fontWeight="500" variant="h5">Our Top Categories</Typography>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (2).png')", backgroundPositionX: "centre", backgroundPositionY: "centre",
                backgroundSize: "cover", backgroundRepeat: "no-repeat" ,color: "#FFFFFF", height : "80%", width: "18%", borderRadius:"20px", mt: "30px"}}>
                    <Typography fontFamily="prompt" fontWeight="500" variant="h5">HELLO</Typography>
                </Button>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (1).png')", backgroundPositionX: "centre", backgroundPositionY: "centre",
                backgroundSize: "cover", backgroundRepeat: "no-repeat" ,color: "#000000", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml: "20px"}}>
                </Button>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (3).png')", backgroundPositionX: "centre", backgroundPositionY: "centre",
                backgroundSize: "cover", backgroundRepeat: "no-repeat" ,color: "#000000", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml: "20px"}}>
                </Button>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (4).png')", backgroundPositionX: "centre", backgroundPositionY: "centre",
                backgroundSize: "cover", backgroundRepeat: "no-repeat" ,color: "#000000", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml: "20px"}}>
                </Button>
                <Button sx={{backgroundImage: "url('../images/loginExplore/categories (5).png')", backgroundPositionX: "centre", backgroundPositionY: "centre",
                backgroundSize: "cover", backgroundRepeat: "no-repeat" ,color: "#000000", height : "80%", width: "18%", borderRadius:"20px", mt: "30px", ml: "20px"}}>
                </Button>
            </Box>
            <Box
                height="50px"></Box>
            <Box
                borderRadius="20px" bgcolor="#8091FF"
                paddingTop="60px" padding="60px" color = "#000000">
                <Typography
                    fontFamily="prompt" fontWeight="500" variant="h5" paddingBottom="7px">
                    All Programmes
                </Typography>
                <RSearchBox />
            </Box>
        </Box>



    </Box>);
}
export default LoginExplore;