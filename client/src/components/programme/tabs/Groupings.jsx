import { Box, Typography, Button } from "@mui/material"
import GroupingTable from "../tables/GroupingTable"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import {DndContext} from '@dnd-kit/core';
import Draggable from "../../Draggable";
import Droppable from "../../Droppable";

const Groupings = () => {
    const userType = useSelector((state) => state.user.userType);
    const rows = fetchGroups()
    const [disableDrag, toggleDrag] = useState(true)

    const [parent, setParent] = useState(null)
    const [child, setChild] = useState(null)


    const handleDragEnd = (event) => {
        const {over} = event;
    
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        console.log(child.id)
        console.log(`draggable id = ${event.active.id} is dropped into container with id = ${event.over.id}`)
        setParent(over ? over.id : null);
    }


    const handleDragStart = (event) => {
        console.log(event.active.data.current)
        setChild(event.active.data.current);
    }
    const displayUsers = (props) => {
        const { api, value, row } = props;
        return (
        <Droppable id={row.id}>
            <Box width="100%" display="flex" flexDirection="column">
                {value.map((user) => {
                    const button = displayButton(user.name)
                    return (
                        <Draggable key={user.id} id={user.id} disableDrag={disableDrag} name={user.name} children={button} />
                    )}
                )}
                
                {parent === row.id ? <Draggable key={child.id} id={child.id} disableDrag={disableDrag} children={displayButton(child.name)}/>
                           : null}
            </Box>
        </Droppable>
        )
    }
    
    const columns = structure(userType, displayUsers)

    return (<Box>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <GroupingTable rows={rows} columns={columns} editable={true}/>
        </DndContext>
        <Button variant="contained" onClick={()=>toggleDrag(!disableDrag)}>{disableDrag ?  "edit" : "cancel" }</Button>
    </Box>);
}
export default Groupings

const displayButton = (name) => {
    return ( <Box>
        <Button variant="contained" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
            <AccountCircleOutlinedIcon/>
            <Typography>{name}</Typography>
        </Button>
    </Box>)
}

const fetchGroups = () => {
    return [
        {
            id : 1,
            groupNo : 1,
            mentor : [{id : 1, name : "Hong Yao"}, {id : 2, name : "Gabriel"}],
            mentee : [{id : 3, name : "Olivia"}, {id : 4, name : "Axel"}, {id : 5, name : "Bruce"}],
            commonDT : ["Mondays, 9pm to 10pm", "Saturdays, 2pm to 6pm"]
        }, 
        {
            id : 2,
            groupNo : 2,
            mentor : [{id : 6, name : "alpha"}, {id : 7, name : "beta"}],
            mentee : [{id : 8, name : "gamma"}, {id : 9, name : "delta"}, {id : 10, name : "epsilon"}],
            commonDT : ["Mondays, 9pm to 10pm", "Saturdays, 2pm to 6pm"]
        }
    ]
}

const structure = (userType, displayUsers) => {
    return (
        [
            { field: 'id', headerName: 'ID', width: 90 },
            {
              field: 'groupNo',
              headerName: 'Group No.',
              width: 80,
              editable: true,
            },
            {
              field: 'mentor',
              headerName: 'Mentor(s)',
              width: 300,
              editable: true,
              renderCell : displayUsers,
            },
            {
              field: 'mentee',
              headerName: 'Mentees',
              width: 300,
              editable: true,
              renderCell : displayUsers,
            },
            {
              field: 'commonDT',
              headerName: "Common Available Datetime(s)",
              sortable: false,
              editable : true,
              width: 500,
              renderCell : displayDate,
            },
            
          ]
    );
}



const displayDate = (props) => {
    const { api, value } = props;
    return (<Box width="100%" display="flex" flexDirection="column">
        {value.map((user) => {
            return (
            <Box m="10px 0" key={user}>
                    <Typography>{user}</Typography>
            </Box>
            )}
        )}
    </Box>)
}