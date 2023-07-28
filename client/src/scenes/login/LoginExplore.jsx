import { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Typography, Button} from "@mui/material";
import { generateColors } from "../../theme";
import PageHeader from "../../components/PageHeader"
import Header from "../../components/login/start/Header"
import RSearchBox from "../../components/explore/SearchBox";
import LoginOverlay from "../../components/login/LoginOverlay"


const LoginExplore = () => {
    const color = generateColors();
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (term) => {
        setSearchTerm(term);
    }

    return (
    <Box width="100%" position="relative">
        <LoginOverlay/>
        <Box display="grid" gridTemplateRows="1fr 4fr 1fr 6fr 1fr 2fr" gap="20px" width="100%" p="20px">
            <Header></Header>
            <Box sx={{backgroundImage: "url('../images/loginExplore/Untitled design (6).png')"}}>
                {/* <img src="../images/loginExplore/Untitled design (6).png" >
                </img> */}
            </Box>
            <Box></Box>
            <Box borderRadius="20px" bgcolor="#8091FF"
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
            <Box></Box>
            <Box borderRadius="20px" bgcolor="#8091FF"
            paddingTop="60px" paddingLeft="60px" color = "#000000">
                <Typography
                    fontFamily="prompt" fontWeight="500" variant="h5" paddingBottom="7px">
                    All Programmes
                </Typography>
                <input
                    type="text" placeholder="Search for programmes" onChange={(e) => setName(e.target.value)}
                ></input>
            </Box>
        </Box>



    </Box>);
}
export default LoginExplore;