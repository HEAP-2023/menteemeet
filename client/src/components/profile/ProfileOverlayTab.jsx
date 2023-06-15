import { Box, IconButton, Typography, Button } from "@mui/material";
import { generateColors } from "../../theme";
import { Link, useNavigate } from "react-router-dom";


// icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SectionHeader from "../SectionHeader";



// redux imports
import { useDispatch, useSelector } from "react-redux";
import { swap, overlayToggle } from "../../state(kiv)";



// need rmb state using redux mentee / mentor

const ProfileOverlayTab = ({acctInfo}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {id, name, email} = acctInfo;
    return (<Box width="10%" height="300px" 
    borderRadius="20px" position="absolute" 
    top="105%" left="89.5%" bgcolor="primary.main"
    display="flex" flexDirection="column" alignItems="center"
    p="10px" zIndex="2" justifyContent="space-evenly">

        <IconButton component={Link}  to={"/profile"}>
            <AccountCircleOutlinedIcon fontSize="large" sx={{transform : "scale(2)"}}/>
        </IconButton>
        <SectionHeader text={name} margin="10px"/>
        
        <Typography sx={{width:"130px", overflowWrap:"break-word"}}>{email}</Typography>

        <Box display="flex" flexDirection="column" >
            <Box display="flex">
                <ManageAccountsOutlinedIcon/>
                <Typography>
                    Account Settings
                </Typography>
            </Box>


            <Box display="flex" onClick={() => {
                // basically close the overlay and go home
                dispatch(overlayToggle())
                dispatch(swap());
                navigate("/");
                }}>

                    
                <ChangeCircleOutlinedIcon/>
                <Typography sx={{textDecoration:"underline"}}>
                    Switch view
                </Typography>
            </Box>


            <Box display="flex">
                <LogoutOutlinedIcon/>
                <Typography>
                    Logout
                </Typography>
            </Box>
        </Box>
    </Box>);
}
export default ProfileOverlayTab;