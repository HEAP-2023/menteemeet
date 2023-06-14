import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { generateColors } from "../theme";
import ProfileNav from "../components/profile/ProfileNav";
import ProfileOverlayTab from "../components/profile/ProfileOverlayTab";

// change to redux later on

const Topbar = ({acctInfo}) => {
    const [profileActive, setActive ] = useState(false);
    const colors = generateColors();
    return (
    <Box bgcolor="primary.main" 
        width="100%" height="5%" 
        display="flex" justifyContent="flex-end" 
        alignItems="center">
            <Box width="10%" display="flex" flexDirection="column">
                
                {/* if we track state can remove the box */}
                <Box onClick={() => {setActive(!profileActive)}}> 
                    <ProfileNav />
                </Box>
                {profileActive && <ProfileOverlayTab acctInfo={acctInfo}/> }
            </Box>
    </Box>);
}

export default Topbar;

