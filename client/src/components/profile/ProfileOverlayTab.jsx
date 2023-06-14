import { Box, IconButton, Typography, Button } from "@mui/material";
import { generateColors } from "../../theme";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SectionHeader from "../SectionHeader";

// need rmb state using redux mentee / mentor

const ProfileOverlayTab = ({acctInfo}) => {
    const {id, name, email} = acctInfo;
    return (<Box width="10%" height="300px" 
    borderRadius="20px" position="absolute" 
    top="5%" left="89%" bgcolor="primary.main"
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


            <Box display="flex">
                <ChangeCircleOutlinedIcon/>
                <Typography>
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