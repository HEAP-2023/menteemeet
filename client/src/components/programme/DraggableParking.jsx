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
                const {id, name, role, availability} = user
                return (
    <Draggable key={id} id={id} name={name} role={role} availability={availability} disableDrag={disableDrag}>
        <Box display="flex" alignItems="center" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
                <NameAvatar name={user.name} scale={0.5} m="0"/>
                <Typography>{user.name} {user.id}</Typography>
        </Box>
    </Draggable>
                )
            })
        }
    </Box>
  )
}

export default DraggableParking;
