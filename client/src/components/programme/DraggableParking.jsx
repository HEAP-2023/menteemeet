import { Box, Typography, IconButton } from "@mui/material"
import { useSelector } from "react-redux";
import SectionHeader from "../SectionHeader"

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"

import Draggable from "../Draggable";
import NameAvatar from "../NameAvatar";

const DraggableParking = () => {
    const parking = useSelector(state => state.user.dragParking) 
    const disableDrag = useSelector(state => state.user.disableDrag)
  return (
    <Box width="30%" height="100%" display="flex" flexDirection="column" alignItems="center">
        <SectionHeader text="Unassigned"/>
        {
            parking.map(user => {
                console.log(user)
                return (
    <Draggable key={user.id} id={user.id} name={user.name} role={user.role} disableDrag={disableDrag}>
        <Box display="flex" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
                <NameAvatar name={user.name} scale={0.5} m="0"/>
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
