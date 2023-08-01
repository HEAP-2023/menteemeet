import { Badge, Box, Divider, IconButton, Stack, Typography, ClickAwayListener, Button } from "@mui/material";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileOverlayTab from "../components/profile/ProfileOverlayTab";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { toggleNotifs } from "../state(kiv)";
// redux
import { useDispatch, useSelector } from "react-redux";
import { closeProfileOverlay,  } from "../state(kiv)";
import Notifications from "../components/notifications/Notifications";

const Topbar = () => {
    const dispatch = useDispatch();
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const profileOverlay = useSelector((state) => state.user.profileOverlay);
   
    return (
    <Box bgcolor="primary.main" 
        width="100%" height="5%" 
        display="flex" justifyContent="flex-end" 
        alignItems="center"
        position="sticky"
        top="0px"
        zIndex={99}
        >

        {/* original 82.5% position fixed */}

        {/* to be deleted in production */}
        <Typography color="#ff0000" >mode : {userType} (a helper, not part of design)    </Typography>

        {userType !== "organiser" && <IconButton onClick={() => {dispatch(toggleNotifs())}}>
            <Badge badgeContent={10} color="secondary">
                <NotificationsOutlinedIcon />
            </Badge>
        </IconButton>}

        <Notifications />

        <ClickAwayListener onClickAway={() => dispatch(closeProfileOverlay())}>
            <Box width="10%" minWidth="200px" display="flex" >
                    <ProfileNav />
                    {profileOverlay && <ProfileOverlayTab /> }
            </Box>
        </ClickAwayListener>

        
    </Box>);
}

export default Topbar;
