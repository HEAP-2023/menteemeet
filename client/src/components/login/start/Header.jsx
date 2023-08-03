import { Box, Button, Typography } from "@mui/material"
import { generateColors } from "../../../theme";
import Backdrop from '@mui/material/Backdrop';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginOverlayToggle } from "../../../state(kiv)";
import { useNavigate } from "react-router-dom";



const Header = () => {
    const colors = generateColors();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
    <Box display="flex" width="100%" alignItems="center">
       <Button sx={{color : colors.text[500], height : "40%", borderRadius:"20px"}}>Contact</Button>
       <Button href="/login/faq" sx={{color : colors.text[500] ,height : "40%", borderRadius:"20px", mr: "auto"}}>FAQ</Button>
       
       <div onClick={()=> navigate("/login/start")}>
        <img src="../images/global/menteemeet.png" style={{width: "200px", margin: "5px 0px 0p 0px", height: "100px", objectFit: "contain", padding:"0px"}} />
       </div>
       
       <Box ml="auto" onClick={() => dispatch(loginOverlayToggle())}>
        <Button variant="contained" sx={{height : "40%", borderRadius:"20px"}}> login / sign up</Button>
       </Box>
    </Box>);
}

export default Header;

