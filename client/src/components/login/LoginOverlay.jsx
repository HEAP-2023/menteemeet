import { Box, Typography, Button, IconButton } from "@mui/material"
import Modal from '@mui/material/Modal';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { generateColors } from "../../theme";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { loginOverlayToggle } from "../../state(kiv)";



const LoginOverlay = () => {
    const colors = generateColors();
    const dispatch = useDispatch();
    const overlayActive = useSelector((state) => state.user.loginOverlay)
    const [newUser, setNewUser] = useState(false)
    return (
        <Modal
        open={overlayActive}
        sx = {{display:"flex", justifyContent:"center", alignItems:"center"}}
        >
            <Box width="600px" height="800px" 
            bgcolor="#ffffff" display="flex"
            flexDirection="column" p="20px"
            gap="20px"
            >
                <IconButton sx={{width:"40px" ,ml:"auto"}} onClick={() => dispatch(loginOverlayToggle())}>
                    <CancelOutlinedIcon/>
                </IconButton>
                <Box  display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <img src="../../../images/global/menteemeet.png" style={{width: "200px", margin: "5px 0px 0p 0px", height: "100px", objectFit: "contain", padding:"0px"}} />
                    <Typography fontWeight="700">Log in to continue</Typography>
                </Box>
                {!newUser &&
                <Box display="flex" flexDirection="column" gap="20px">
                    <LoginForm/>
                    <Typography>Forgot Password</Typography>
                    <Box display="flex" alignItems="center">
                        <Typography>don't have an account?</Typography>
                        <Button onClick={() => setNewUser(true)} sx={{color: colors.text[500]}}>
                            <Typography sx={{textDecoration:"underline"}}>
                                Sign Up
                            </Typography>
                        </Button>
                    </Box>
                </Box>}

                {newUser && 
                <Box display="flex" flexDirection="column" gap="20px">
                    <SignUpForm/>
                    <Box display="flex" alignItems="center">
                        <Typography>Already a member ?</Typography>
                        <Button onClick={() => setNewUser(false)} sx={{color: colors.text[500], textDecoration:"underline"}}>
                            <Typography sx={{textDecoration:"underline"}}>
                                Log In
                            </Typography>
                        </Button>
                    </Box>
                </Box>}

            </Box>
        </Modal>
        
      )
}

export default LoginOverlay