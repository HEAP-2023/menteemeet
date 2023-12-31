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
import { useParams } from "react-router-dom";
import { deleteSessionBySessionID } from "../../../services/user/userServices";
const Sessions = (programmeID) => {
  const [rows, setRows] = useState([]);
  const now = new Date().getTime();
  let pastRows = rows.filter((item) => new Date(`${item.date} ${item.end_time}`).getTime() < now);
  pastRows = pastRows.sort(
    (objA, objB) => Number(new Date(`${objA.date} ${objA.start_time}`).getTime()) - Number(new Date(`${objB.date} ${objB.start_time}`).getTime())
  )
  let upcomingRows = rows.filter((item) => new Date(`${item.date} ${item.end_time}`).getTime() >= now);
  upcomingRows = upcomingRows.sort(
    (objA, objB) => Number(new Date(`${objA.date} ${objA.start_time}`).getTime()) - Number(new Date(`${objB.date} ${objB.start_time}`).getTime())
  )
  console.log(programmeID)
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    getSessionsByProgID(programmeID.programmeID)
      .then(res => {
        console.log("res", res)
        setRows(res.data.sessionsWithRole);
        setRerender(false);
      })
      .catch(err => {
        console.log("ERROR:", err);
      })
  }, [programmeID.programmeID, rerender])

  const handleRerender = () => {
    setRerender(true);
  };

  const userType = useSelector((state) => state.user.userBasicDetails.account_type);
  const colors = generateColors();

  const {id} = useParams();
  const programmes = useSelector((state) => state.user.programmes)
  const programme = programmes.find(program => program.programme_id === Number(id));
  const role = programme.role;
  const structure = (role) => {
    return (
      [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'group_no',
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
          headerName: 'Topics / Location',
          width: 200,
          editable: true,
        },
        // {
        //   field: 'remarks',
        //   headerName: 'Remarks For' + (role === "mentee" ? " Mentee" : " Mentor"),
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   editable: false,
        //   width: 400
        // },
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
  const columns = structure(role)

  return (
    <Box>
      {role === "mentor" && <NewSessionLog handleRerender={handleRerender}/>}
      <Box width="100%" display="flex">
        <SectionHeader text="Upcoming Sessions" />
      </Box>
      <SessionTable rows={upcomingRows} columns={columns}
        checkbox={role === "mentee" ? false : true}
        color={colors.primary[500]}
        editable={role === "mentee" ? false : true}
        handleRerender={handleRerender} />
      <SectionHeader text="Past Sessions" />
      <SessionTable rows={pastRows} columns={columns}
        handleRerender={handleRerender} />
    </Box>
  );


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
    const row = api.getRow(id);
    // console.log("row:", row.session_id)
    const session_id = row.session_id;
    deleteSessionBySessionID(session_id);
    api.updateRows([{ session_id, action: 'delete' }]);
    setRerender(true);
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

}
export default Sessions;
