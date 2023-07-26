import { Box, Typography, Button } from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { generateColors } from "../../../theme";

const Applications = () => {
    const colors = generateColors();
    const menteeApplications = fetchMenteeApplications;
    const mentorApplications = fetchMentorApplications;
    return (<>
        <Box width="100%" height="100%" display="flex" flexDirection={"column"}>
            <Box>
                <Typography sx={{ mt: '20px' }}>Mentee Applications</Typography>
                <DataGrid rows={menteeApplications} columns={columnHeading} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }} disableRowSelectionOnClick/>
            </Box>
            <Box >
                <Typography sx={{ mt: '20px' }}>Mentor Applications</Typography>
                <DataGrid rows={mentorApplications} columns={columnHeading} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }}disableRowSelectionOnClick />
            </Box>
        </Box>
    </>)
}

export default Applications

const fetchMenteeApplications = [
    {
        id: 1,
        name: "Jaime Lannister",
        availability: [],
        skills: [],
        interestCategory: "Category 1",
        interest1: "Interest 1",
        interest2: "Interest 2",
        interest3: "Interest 3",
    },
    {
        id: 2,
        name: "Cersei Lannister",
        availability: [],
        skills: [],
        interestCategory: "Category 1",
        interest1: "Interest 1",
        interest2: "Interest 2",
        interest3: "Interest 3",
    },
    {
        id: 3,
        name: "Kelly Melisandre",
        availability: [],
        skills: [],
        interestCategory: "Category 1",
        interest1: "Interest 1",
        interest2: "Interest 2",
        interest3: "Interest 3",
    },
]

const fetchMentorApplications = [
    {
        id: 1,
        name: "Jon Snow",
        availability: [],
        skills: [],
        interestCategory: "Category 1",
        interest1: "Interest 1",
        interest2: "Interest 2",
        interest3: "Interest 3",
    },
    {
        id: 2,
        name: "Arya Stark",
        availability: 'a veyyyyy llong availabildigskdifsdifhusi',
        skills: 'Javascript',
        interestCategory: "Category 1",
        interest1: "Interest 1",
        interest2: "Interest 2",
        interest3: "Interest 3",
    },
]

const ApproveOrReject = () => {
    const colors = generateColors();
    return (
        <>
        <Button sx={{color: colors.text[500], bgcolor: colors.primary[500], mr: '10px', '&:hover': {bgcolor: colors.primary[600]}}}>Approve</Button>
        <Button sx={{color: colors.text[500], bgcolor: colors.primary[500], '&:hover': {bgcolor: colors.primary[600]}}}>Reject</Button>
        </>
        
    )
}

const columnHeading = [
    {
        field: 'name',
        headerName: 'Name',
        width: 150
    },
    {
        field: 'availability',
        headerName: 'Availability',
        width: 250,
    },
    {
        field: 'skills',
        headerName: 'Skills',
        width: 50
    },
    {
        field: 'interestCategory',
        headerName: 'Interest Category',
        width: 150
    },
    {
        field: 'interest1',
        headerName: 'Interest 1',
        // width: 100
    },
    {
        field: 'interest2',
        headerName: 'Interest 2',
        // width: 100
    },
    {
        field: 'interest3',
        headerName: 'Interest 3',
        // width: 100
    },
    {
        field: 'approve/reject',
        headerName: 'Approve/Reject',
        sortable: false,
        width: 200,
        disableColumnMenu: true,
        disableReorder: true,
        renderCell: ApproveOrReject
    }
]   
