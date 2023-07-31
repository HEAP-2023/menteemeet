import { Badge, Box, Divider, IconButton, Stack, Typography, ClickAwayListener, Button } from "@mui/material";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileOverlayTab from "../components/profile/ProfileOverlayTab";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

// redux
import { useDispatch, useSelector } from "react-redux";
import { closeProfileOverlay, profileOverlayToggle } from "../state(kiv)";
import { useState, forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Topbar = () => {
    const dispatch = useDispatch();
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const profileOverlay = useSelector((state) => state.user.profileOverlay);

    const [openNotifs, setOpenNotifs] = useState(false)
      
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

        <IconButton onClick={() => setOpenNotifs(true)}>
            <Badge badgeContent={10} color="secondary">
                <NotificationsOutlinedIcon/>
            </Badge>
        </IconButton>

        <ClickAwayListener onClickAway={() => dispatch(closeProfileOverlay())}>
            <Box width="10%" minWidth="200px" display="flex" >
                    <ProfileNav />
                    {profileOverlay && <ProfileOverlayTab /> }
            </Box>
        </ClickAwayListener>

        <Dialog
        open={openNotifs}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpenNotifs(false)}}
      >
        <Stack>
           <NotificationExpanded header="Approved Applications">
           </NotificationExpanded>

           <NotificationExpanded header="Pending Applications">
           </NotificationExpanded>
            
        </Stack>
      </Dialog>
    </Box>);
}

export default Topbar;

const NotificationExpanded = ({header, children=false}) => {
    return (
        <Stack p="20px">
            <Typography fontWeight="700">{header}</Typography>
            <Divider/>
            {!!children ? 
            children
            : 
            <Typography>
                no applications yet
            </Typography>}
        </Stack>
    )
}