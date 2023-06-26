import { Box, Typography, IconButton } from "@mui/material"
import { useSelector } from "react-redux";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"

import Draggable from "../Draggable";

const DraggableParking = () => {
    const parking = useSelector(state => state.user.dragParking) 
    const disableDrag = useSelector(state => state.user.disableDrag)
  return (
    <Box width="30%" height="100%">
        <Typography>Unassigned</Typography>
        {
            parking.map(user => {
                return (
    <Draggable key={user.id} id={user.id} name={user.name} disableDrag={disableDrag}>
        <Box display="flex" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
                <AccountCircleOutlinedIcon/>
                <Typography>{user.name}</Typography>
        </Box>
    </Draggable>
                )
            })
        }
    </Box>
  )
}

export default DraggableParking;
