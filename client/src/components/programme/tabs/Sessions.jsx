import { useSelector } from "react-redux";
import SessionTable from "../tables/SessionTable";
import { Box, Typography, IconButton } from "@mui/material";
import SectionHeader from "../../SectionHeader";
import { generateColors } from "../../../theme";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NewSessionLog from "./NewSessionLog"



const Sessions = () => {
    const userType = useSelector((state) => state.user.userType);
    const colors = generateColors();
    const rows = fetchUpcomingSessions(userType)
    const columns = structure(userType)

    return (
    <Box>
        {userType !== "mentee" && <NewSessionLog/>}
        <Box width="100%" display="flex">
            <SectionHeader text="Upcoming Sessions" />
        </Box>
            <SessionTable rows={rows} columns={columns} 
            checkbox={userType === "mentee" ? false : true} 
            color={colors.primary[500]}
            editable={userType === "mentee" ? false : true}/>
        <SectionHeader text="Past Sessions" />
        <SessionTable rows={rows} columns={columns}/>

    </Box>
    );
}
export default Sessions;



const fetchUpcomingSessions = (userType) => {
    if(userType === " mentee"){
        return ( [
            { id: 1, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 2, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 3, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 4, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 5, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 6, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 7, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 8, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
            { id: 9, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentee's remarks " },
          ]);
    }
    return ([
        { id: 1, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 2, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 3, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 4, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 5, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 6, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 7, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 8, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
        { id: 9, groupNo: 5 , time: "13:50- 14:50", topicsCovered: "topic", remarks : "mentor's remarks " },
      ]);
}

const structure = (userType) => {
    return (
        [
            { field: 'id', headerName: 'ID', width: 90 },
            {
              field: 'groupNo',
              headerName: 'Group No.',
              width: 100,
              editable: true,
            },
            {
              field: 'time',
              headerName: 'Time',
              width: 150,
              editable: true,
            },
            {
              field: 'topicsCovered',
              headerName: 'Topics covered',
              width: 200,
              editable: true,
            },
            {
              field: 'remarks',
              headerName: 'Remarks For' + (userType === "mentee" ? "Mentee" : "Mentor"),
              description: 'This column has a value getter and is not sortable.',
              sortable: false,
              editable : false,
              width: 400
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                width: 100,
                headerAlign: 'center',
                filterable: false,
                align: 'center',
                disableColumnMenu: true,
                disableReorder: true,
                renderCell : RowMenuCell,
              },
          ]
    );
}

function RowMenuCell(props) {
    const { api, id } = props;
    const isInEditMode = api.getRowMode(id) === 'edit';

    const handleEditClick = (event) => {
        // console.log(api)
        api.getAllRowIds().filter(id => api.getRowMode(id) === "edit").forEach(id => api.stopRowEditMode({id}));
        event.stopPropagation();
        api.startRowEditMode({id});
    };
  
    const handleSaveClick = (event) => {
      event.stopPropagation();
      api.stopRowEditMode({id});
      const row = api.getRow(id);
      api.updateRows([{ ...row, action : "save" }]);
    };
  
    const handleDeleteClick = (event) => {
      event.stopPropagation();
      api.updateRows([{ id, _action: 'delete' }]);
    };
  
    const handleCancelClick = (event) => {
      event.stopPropagation();
      api.stopRowEditMode({id})
    };
  
    if (isInEditMode) {
      return (
        <div >
          <IconButton
            color="inherit"
            size="small"
            aria-label="save"
            onClick={handleSaveClick}
          >
            <DoneOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            aria-label="cancel"
            onClick={handleCancelClick}
          >
            <CancelOutlinedIcon fontSize="small" />
          </IconButton>
        </div>
      );
    }
  
    return (
      <div >
        <IconButton
          color="inherit"
          size="small"
          aria-label="edit"
          onClick={handleEditClick}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="delete"
          onClick={handleDeleteClick}
        >
          <DeleteOutlineOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }
  

//   end of tables specification code


