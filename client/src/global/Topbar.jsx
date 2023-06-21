import { Box, IconButton, Typography } from "@mui/material";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileOverlayTab from "../components/profile/ProfileOverlayTab";


// redux
import { useDispatch, useSelector } from "react-redux";
import { profileOverlayToggle } from "../state(kiv)";


const Topbar = ({acctInfo}) => {
    const dispatch = useDispatch();
    const userType = useSelector((state) => state.user.userType)
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

            <Box width="10%" minWidth="200px" display="flex" flexDirection="column">
                
                <Box onClick={() => dispatch(profileOverlayToggle())}> 
                    <ProfileNav />
                </Box>
                {profileOverlay && <ProfileOverlayTab acctInfo={acctInfo}/> }
            </Box>
    </Box>);
}

export default Topbar;

