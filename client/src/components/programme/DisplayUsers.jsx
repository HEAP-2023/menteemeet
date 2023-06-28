import { Box, Typography, Button, IconButton } from "@mui/material";
import Droppable from "../Droppable";
import Draggable from "../Draggable";
import { useCallback, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { useSelector, useDispatch } from "react-redux";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { addToParking } from "../../state(kiv)";
const DisplayUsers = ({props, role}) => {
    let {id, api, value, row} = props
    const dispatch = useDispatch()
    const disableDrag = useSelector(state => state.user.disableDrag)
    const droppableKey = `${row.id}-${role}`;

    const removeThis = (userID) => {
        const newValue = value.filter((user) => {
            return (user.id !== userID)
        })
        const toBeAdded = value.find(user => user.id === userID);
        dispatch(addToParking({user : toBeAdded}));
        row[role] = newValue
        console.log(row)
        api.updateRows([{...row}])
    }

    return (
    <Droppable id={droppableKey}>
        <Box width="100%" display="flex" flexDirection="column" >

            
    {value.map((user) => (
    <Box key={user.id} display="flex" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
            <AccountCircleOutlinedIcon/>
            <Typography>{user.name}</Typography>
            {
            !disableDrag && 
            <IconButton onClick={() => removeThis(user.id)}>
                <HighlightOffOutlinedIcon/>
            </IconButton>
            }
    </Box>)
    )}
        </Box>
    </Droppable>
    )
}

export default DisplayUsers;



 
    


