import { Box, IconButton, Typography, Button } from "@mui/material";
import { generateColors } from "../../theme";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useDispatch, useSelector } from "react-redux";
import { profileOverlayToggle } from "../../state(kiv)";
import { motion } from "framer-motion";


const ProfileNav = () => {
    const colors = generateColors();
    const dispatch = useDispatch()
    const acctName = useSelector((state) => state.user.userBasicDetails.name);
    return (<Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" 
                sx={{
                    borderRadius : "20px"
                }}
                onClick={() => dispatch(profileOverlayToggle())}
                component={motion.div}
                whileHover={{
                   scale: 1.05,
                   transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}>
                    <AccountCircleOutlinedIcon color={colors.text[500]} />                    
                    <Typography variant="h6">{acctName}</Typography>
                </Button>
    </Box>);
}

export default ProfileNav;