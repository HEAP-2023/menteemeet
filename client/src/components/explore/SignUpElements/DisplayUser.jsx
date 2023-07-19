import { Box, IconButton, Typography } from "@mui/material";
import NameAvatar from "../../NameAvatar";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
const DisplayUser = ({name, removeUser}) => {
    return (
        <Box display="flex" gap="10px" alignItems="center">
            <NameAvatar name={name}/>
            <Typography>{name}</Typography>
            <IconButton onClick={() => removeUser(name)}>
                <CancelOutlinedIcon/>
            </IconButton>
        </Box>
    )
}
export default DisplayUser;