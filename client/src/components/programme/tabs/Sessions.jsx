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
import { getSessionsByProgID } from "../../../services/programmes/userServices";
import { useState, useEffect } from "react";
const Sessions = (programmeID) => {
  const [rows, setRows] = useState([]);
  const now = new Date().getTime();
  const pastRows = rows.filter((item) => new Date(`${item.date} ${item.end_time}`).getTime() < now);
  const upcomingRows = rows.filter((item) => new Date(`${item.date} ${item.end_time}`).getTime() >= now);
  console.log(programmeID)
  useEffect(() => {
    getSessionsByProgID(programmeID.programmeID)
      .then(res => {
        console.log("res", res)
        setRows(res.data.sessionsWithRole);
      })
      .catch(err => {
        console.log("ERROR:", err);
      })
  }, [])

  const userType = useSelector((state) => state.user.userBasicDetails.account_type);
  const colors = generateColors();
  const role = "mentee";
  const columns = structure(role)

  return (
    <Box>
      {role === "mentor" && <NewSessionLog />}
      <Box width="100%" display="flex">
        <SectionHeader text="Upcoming Sessions" />
      </Box>
      <SessionTable rows={upcomingRows} columns={columns}
        checkbox={role === "mentee" ? false : true}
        color={colors.primary[500]}
        editable={role === "mentee" ? false : true} />
      <SectionHeader text="Past Sessions" />
      <SessionTable rows={pastRows} columns={columns} />
    </Box>
  );
}
export default Sessions;


const structure = (role) => {
  return (
    [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'group_id',
        headerName: 'Group No.',
        width: 100,
        editable: true,
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: true,
      },
      {
        field: 'start_time',
        headerName: 'Start time',
        width: 150,
        editable: true,
      },
      {
        field: 'end_time',
        headerName: 'End time',
        width: 150,
        editable: true,
      },
      {
        field: 'topic',
        headerName: 'Topics covered',
        width: 200,
        editable: true,
      },
      {
        field: 'remarks',
        headerName: 'Remarks For' + (role === "mentee" ? " Mentee" : " Mentor"),
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        editable: false,
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
        renderCell: RowMenuCell,
      },
    ]
  );
}

function RowMenuCell(props) {
  const { api, id } = props;
  const isInEditMode = api.getRowMode(id) === 'edit';

  const handleEditClick = (event) => {
    // console.log(api)
    api.getAllRowIds().filter(id => api.getRowMode(id) === "edit").forEach(id => api.stopRowEditMode({ id }));
    event.stopPropagation();
    api.startRowEditMode({ id });
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.stopRowEditMode({ id });
    const row = api.getRow(id);
    api.updateRows([{ ...row, action: "save" }]);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    api.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (event) => {
    event.stopPropagation();
    api.stopRowEditMode({ id })
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


