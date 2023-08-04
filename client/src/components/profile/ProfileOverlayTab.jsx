import { Box, IconButton, Typography, Button, List } from "@mui/material";
import { generateColors } from "../../theme";
import { Link, useNavigate } from "react-router-dom";


// icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SectionHeader from "../SectionHeader";



// redux imports
import { useDispatch, useSelector } from "react-redux";
import { profileOverlayToggle, logOut } from "../../state(kiv)";
import { useQueryClient } from "@tanstack/react-query";

import { motion, Variants } from "framer-motion";
import { ListParent, ListItem } from "../../animations/List";
import NameAvatar from "../NameAvatar";


const ProfileOverlayTab = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const {name, email} = useSelector((state) => state.user.userBasicDetails) 
    // const {mutate : logout} = useLogout()

    // try use fixed width and / or media query
    return (
        <Box width="200px" height="300px" 
        borderRadius="20px" position="absolute"
        top="50px" right="0px" 
        bgcolor="primary.main"
        display="flex" flexDirection="column" alignItems="center"
        p="5px" zIndex="2" justifyContent="space-evenly"
        >
 
        <ListParent>
            <ListItem>
                <IconButton component={Link} to={"/profile"}>
                    {/* <AccountCircleOutlinedIcon fontSize="large" sx={{transform : "scale(2)"}}/> */}
                    <NameAvatar name={name} scale={2} m="0"/>
                </IconButton>
            </ListItem>

<ListItem>
            <SectionHeader text={name} margin="10px"/>
</ListItem>
        
<ListItem>
            <Typography sx={{overflowWrap:"break-word"}}>{email}</Typography>
</ListItem>

<ListItem>
                <Box display="flex" onClick={() => {
                    navigate("/accountSettings");
                }}>
                    <ManageAccountsOutlinedIcon/>
                    <Typography sx={{":hover":{cursor:"pointer"}}}>
                        Account Settings
                    </Typography>
                </Box>
</ListItem>


<ListItem>

                <Box display="flex" onClick={() => {
                    dispatch(profileOverlayToggle());
                    dispatch(logOut())
                    localStorage.setItem("jwt", "");
                    queryClient.clear()
                    navigate("/login/start") //--> should be auto since home is protected except for org create prog
                }}>
                    <LogoutOutlinedIcon/>
                    <Typography sx={{":hover":{cursor:"pointer"}}}>
                        Logout
                    </Typography>
                </Box>
</ListItem>
    </ListParent>
    </Box>);
}
export default ProfileOverlayTab;


  