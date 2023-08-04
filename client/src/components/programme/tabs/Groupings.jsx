import { Box, Typography, Button, Modal } from "@mui/material"
import GroupingTable from "../tables/GroupingTable"
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGridApiRef } from "@mui/x-data-grid";

import DisplayUsers from "../DisplayUsers";
import {DndContext} from '@dnd-kit/core';
import { dragToggle, removeFromParking } from "../../../state(kiv)";
import DraggableParking from "../DraggableParking";
import useGetGrouping from "../../../hooks/algo/useGetGrouping";
import { useQueryClient } from "@tanstack/react-query";
const Groupings = ({id}) => {
    //this page cannot have state change that leads to rerender if not everything will go haywire

    
    const api = useGridApiRef();
    const userType = useSelector((state) => state.user.userBasicDetails.account_type);
    const disableDrag = useSelector((state) => state.user.disableDrag)
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch(); 
    const queryClient = useQueryClient()
    const { data:groupingData , isSuccess, isError, isLoading } = useGetGrouping(id)
    const rows = groupingData.map((group) => ({...group, mentee : JSON.parse(group.mentee), mentor : JSON.parse(group.mentor)}))



    if(isSuccess){
    const len = rows.reduce((sum, group) => sum + group.mentee.length + group.mentor.length, 0)
    const handleDragEnd = (event) => {
        const {over, active} = event;
        if(!over){return }
        console.log(`draggable id = ${active.id} is dropped into container with id = ${over.id}`)
        const droppingRole = active.data.current.role
        const containerRole = getRoleFromId(over.id)
        if(droppingRole != containerRole){
            console.log("not allowed")
            return
        }

        const data = event.active.data.current
        console.log(data)
        modifyRows(api, event.over.id, data);
        dispatch(removeFromParking({id : event.active.id}))
    }
    const handleDragStart = (event) => {
        console.log(event)
    }
    
    const columns = structure() 


    return (<Box>
        <Modal open={!!submitted} onClose={() => {
            setSubmitted(false);
            window.location.reload()}}
            sx={{
                width:"100%", height:"100%",
                display:"flex", justifyContent:"center",
                alignItems : "center"}} 
            >
            <Box bgcolor="#ffffff" width="20%" p="20px">{submitted}</Box>
        </Modal>
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Box width="100%" display="flex">
                <GroupingTable api={api} rows={rows} columns={columns}/>
                {userType === "organiser" && <DraggableParking/>}
            </Box>
        </DndContext>
        {
        userType === "organiser" &&
        <Button variant="contained" onClick={()=> {
            dispatch(dragToggle())
            if(!disableDrag){
                // cancel
                window.location.reload()
            }
        }}>{disableDrag ?  "edit" : "cancel" }</Button>
        }
        {
            !disableDrag && 
            <Button variant="contained" 
            // disabled={remain.length > 0 ? true : false}
            onClick={() => {
                const updatedData = api.current.getSortedRows();
                const {status, message} = isValid(updatedData, len)
                if(status){
                    console.log("submit data", updatedData)
                    setSubmitted(message)
                    queryClient.invalidateQueries(["getGroup", id])
                    dispatch(dragToggle());
                }else{
                    setSubmitted(message)
                }
            }}>
                save
            </Button>
        }
    </Box>);
    }
}
export default Groupings

const modifyRows = (api, to, data) => {
    console.log(to)
    const [containerID, role] = to.split("-");
    console.log(api.current)
    const rows = api.current.getSortedRows()
    
    if(to !== null){
        const row = rows.find(row => row.id == containerID)
        if(!(row[role].includes(user => user.id === data.id))){
            row[role].push(data)
        }
        api.current.updateRows([{...row}])
    }
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

const structure = () => {
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
              renderCell : (props) => <DisplayUsers props={props} role={"mentor"} />
            },
            {
              field: 'mentee',
              headerName: 'Mentees',
              width: 300,
              editable: true,
              renderCell : (props) => <DisplayUsers props={props} role={"mentee"} />
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
    if(!value){
        return (
        <Box width="100%" display="flex" flexDirection="column" >
            <Typography>no available date time</Typography>
        </Box>)
    }
    return (<Box width="100%" display="flex" flexDirection="column" >
        {value.map((user) => {
            return (
            <Box m="10px 0" key={user}>
                    <Typography>{user}</Typography>
            </Box>
            )}
        )}
    </Box>)
}

const getRoleFromId = (id) => {
    console.log(id.split('-')[1])
    return id.split('-')[1]
}


const isValid = (data, len) => {
    data.forEach(group => {
        console.log(group)
        if(group.mentee.length < 1){
            return {status : false, message : "group without mentee"}
        }
        if(group.mentor.length < 1){
            return {status : false, message : "group without mentor"}
        }
        len = len - group.mentee.length - group.mentor.length
    });
    if(len > 0){return {status : false, message : "There is unassigned participants"}}
    return {status : true, message : "Successful Submission"};
}