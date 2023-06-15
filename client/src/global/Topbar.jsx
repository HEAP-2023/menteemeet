import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { generateColors } from "../theme";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileOverlayTab from "../components/profile/ProfileOverlayTab";


// redux
import { useDispatch, useSelector } from "react-redux";
import { overlayToggle } from "../state(kiv)";


const Topbar = ({acctInfo}) => {
    const colors = generateColors();
    const dispatch = useDispatch();
    const userType = useSelector((state) => state.user.userType)
    const profileOverlay = useSelector((state) => state.user.profileOverlay);

    return (
    <Box bgcolor="primary.main" 
        width="82.5%" height="5%" 
        display="flex" justifyContent="flex-end" 
        alignItems="center"
        position="fixed"
        zIndex={99}
        >

        {/* to be deleted in production */}
        <Typography color="#ff0000" >mode : {userType} (a helper, not part of design)     </Typography>

            <Box width="10%"  display="flex" flexDirection="column">
                
                <Box onClick={() => dispatch(overlayToggle())}> 
                    <ProfileNav />
                </Box>
                {profileOverlay && <ProfileOverlayTab acctInfo={acctInfo}/> }
            </Box>
    </Box>);
}

export default Topbar;

