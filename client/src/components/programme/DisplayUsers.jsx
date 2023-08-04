import { Box, Typography, Button, IconButton } from "@mui/material";
import Droppable from "../Droppable";
import Draggable from "../Draggable";
import { useCallback, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { useSelector, useDispatch } from "react-redux";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { addToParking } from "../../state(kiv)";
import NameAvatar from "../NameAvatar";
const DisplayUsers = ({props, role}) => {
    // console.log(props)
    let {id, api, value, row} = props
    // console.log(value)
    const dispatch = useDispatch()
    const disableDrag = useSelector(state => state.user.disableDrag)
    const droppableKey = `${row.id}-${role}`;
    const removeThis = (userID, role) => {
        const newValue = value.filter((user) => {
            return (user.id !== userID)
        })
        const toBeAdded = value.find(user => user.id === userID);
        dispatch(addToParking({user : {...toBeAdded, role: role}}));
        row[role] = newValue
        console.log(row)
        api.updateRows([{...row}])
    }

    return (
    <Droppable id={droppableKey}>
        <Box width="100%" display="flex" flexDirection="column" >

    {value.map((user) => {
    return (<Box key={user.id} display="flex" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
            <NameAvatar name={user.name} scale={0.5} m="0"/>
            <Typography>{user.name}  {user.id}</Typography>
            {
            !disableDrag && 
            <IconButton onClick={() => removeThis(user.id, role)}>
                <HighlightOffOutlinedIcon/>
            </IconButton>
            }
    </Box>)}
    )}
        </Box>
    </Droppable>
    )
}

export default DisplayUsers;



 
    


