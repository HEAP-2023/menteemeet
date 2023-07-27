import { Box, IconButton, Typography, Button } from "@mui/material";
import { generateColors } from "../../theme";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const ProfileNav = () => {
    const colors = generateColors();
    const acctName = useSelector((state) => state.user.userBasicDetails.name);
    return (<Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained">
                    <AccountCircleOutlinedIcon color={colors.text[500]} />                    
                    <Typography variant="h6">{acctName}</Typography>
                </Button>
    </Box>);
}

export default ProfileNav;