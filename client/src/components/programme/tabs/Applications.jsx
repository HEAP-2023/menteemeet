import { Box, Typography, Button } from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { generateColors } from "../../../theme";
import { useState } from "react";
import Tooltip from '@mui/material/Tooltip';

const Applications = () => {
    const colors = generateColors();
    const menteeApplications = fetchApplications.filter((item)=> item.role === 'mentee' && item.is_accepted === 0);
    const mentorApplications = fetchApplications.filter((item) => item.role === 'mentor' && item.is_accepted === 0);
    const menteesEnrolled = fetchApplications.filter((item)=> item.role === 'mentee' && item.is_accepted === 1);
    const mentorsEnrolled = fetchApplications.filter((item) => item.role === 'mentor' && item.is_accepted === 1);
    const menteesRejected = fetchApplications.filter((item)=> item.role === 'mentee' && item.is_accepted === 2);
    const mentorsRejected = fetchApplications.filter((item) => item.role === 'mentor' && item.is_accepted === 2);

    const [selectedPerson, setSelectedPerson] = useState('');
    const handleRowSelection = (params) => {
        setSelectedPerson(params.selectionModel);
    };
    const getSelectedPersonData = () => {
        const selectedPersonData = selectedPerson.map((rowId) =>
            menteeApplications.find((row) => row.id === rowId)
        );
        console.log(selectedPerson);
        return selectedPerson;
    };

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
                }} disableRowSelectionOnClick
                    onSelectionModelChange={handleRowSelection}
                    getRowId={(row) => row.application_id}
                />
            </Box>
            <Box >
                <Typography sx={{ mt: '20px' }}>Mentor Applications</Typography>
                <DataGrid rows={mentorApplications} columns={columnHeading} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }} disableRowSelectionOnClick
                getRowId={(row) => row.application_id}
                />
            </Box>
            <Box>
                <Typography sx={{ mt: '20px' }}>Enrolled Mentees</Typography>
                <DataGrid rows={menteesEnrolled} columns={columnHeading2} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }} disableRowSelectionOnClick 
                getRowId={(row) => row.application_id}/>
            </Box>
            <Box>
                <Typography sx={{ mt: '20px' }}>Enrolled Mentors</Typography>
                <DataGrid rows={mentorsEnrolled} columns={columnHeading2} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }} disableRowSelectionOnClick 
                getRowId={(row) => row.application_id}/>
            </Box>
            <Box>
                <Typography sx={{ mt: '20px' }}>Rejected Mentees</Typography>
                <DataGrid rows={menteesRejected} columns={columnHeading2} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }} disableRowSelectionOnClick
                getRowId={(row) => row.application_id} />
            </Box>
            <Box>
                <Typography sx={{ mt: '20px' }}>Rejected Mentors</Typography>
                <DataGrid rows={mentorsRejected} columns={columnHeading2} slots={{ toolbar: GridToolbar }} sx={{
                    width: '100%', "& .css-j337ty-MuiButtonBase-root-MuiButton-root": {
                        color: colors.text[500],
                        // bgcolor: colors.primary[500]
                    },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: `${colors.primary[500]}` }
                }} disableRowSelectionOnClick 
                getRowId={(row) => row.application_id}/>
            </Box>
        </Box>
    </>)
}

export default Applications

const renderAvailability = (params) => {
    const availability = params.row.availability;
    const availabilityString = availability.map((item) => {
        const day = Object.keys(item)[0];
        const timeSlots = item[day].join(', ');
        return `${day}: ${timeSlots}`;
    }).join('\n');
    return (<Tooltip title={availabilityString}>
        <div style={{ whiteSpace: 'pre-line' }}>{availabilityString}</div>
    </Tooltip>)
};

const renderSkills = (params) => {
    const skills = params.row.skills;
    const skillsString = skills.map((item) => item).join(', ');

    return (
        <Tooltip title={skillsString}>
            <div>{skillsString}</div>
        </Tooltip>
    )
};

const renderInterests = (params) => {
    const interests = params.row.interests;
    const interestsString = interests.map((item) => item).join(', ');

    return (
        <Tooltip title={interestsString}>
            <div>{interestsString}</div>
        </Tooltip>
    )
}

const fetchApplications = [
    {
        application_id: 1,
        name: "Jaime Lannister",
        role: 'mentee',
        availability: [{ "Wednesday": ["Afternoon", "Night"] }, { "Thursday": ["Afternoon"] }],
        skills: ["C", "Java", "Python"],
        interests: ["AI", "Software Engineering", "Data Analytics"],
        is_accepted: 0
    },
    {
        application_id: 2,
        name: "Cersei Lannister",
        role: 'mentee',
        availability: [{ "Tuesday": ["Morning", "Afternoon", "Night"] }, { "Thursday    ": ["Afternoon"] }],
        skills: ["C", "Java", "Python"],
        interests: ["AI", "Software Engineering", "Data Analytics"],
        is_accepted: 0
    },
    {
        application_id: 3,
        name: "Kelly Melisandre",
        role: 'mentee',
        availability: [{ "Monday": ["Afternoon", "Night"] }, { "Friday": ["Night"] }],
        skills: ["C", "Java", "Python"],
        interests: ["AI", "Software Engineering", "Data Analytics"],
        is_accepted: 0
    },
    {
        application_id: 4,
        name: "Jon Snow",
        role: 'mentor',
        availability: [{ "Monday": ["Afternoon"] }, { "Sunday": ["Morning", "Afternoon", "Night"] }],
        skills: ["C", "Java", "Python"],
        interests: ["AI", "Software Engineering", "Data Analytics"],
        is_accepted: 0
    },
    {
        application_id: 5,
        name: "Arya Stark",
        role: 'mentor',
        availability: [{ "Thursday": ["Morning", "Afternoon", "Night"] }, { "Friday": ["Afternoon"] }],
        skills: ["C", "Java", "Python"],
        interests: ["AI", "Software Engineering", "Data Analytics"],
        is_accepted: 0
    },
]



const ApproveOrReject = () => {
    const colors = generateColors();
    return (
        <>
            <Button
                // onClick={console.log(...data)}
                sx={{ color: colors.text[500], bgcolor: colors.primary[500], mr: '10px', '&:hover': { bgcolor: colors.primary[600] } }}>Approve</Button>
            <Button sx={{ color: colors.text[500], bgcolor: colors.primary[500], '&:hover': { bgcolor: colors.primary[600] } }}>Reject</Button>
        </>

    )
}

const columnHeading = [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <div>{params.value}</div>
            </Tooltip>
        ),
    },
    {
        field: 'availability',
        headerName: 'Availability',
        width: 280,
        renderCell: renderAvailability
    },
    {
        field: 'skills',
        headerName: 'Skills',
        width: 180,
        renderCell: renderSkills
    },
    {
        field: 'interests',
        headerName: 'Interests',
        width: 280,
        renderCell:renderInterests
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

const columnHeading2 = [
    {
        field: 'name',
        headerName: 'Name',
        width: 200,
        renderCell: (params) => (
            <Tooltip title={params.value}>
                <div>{params.value}</div>
            </Tooltip>
        ),
    },
    {
        field: 'availability',
        headerName: 'Availability',
        width: 280,
        renderCell: renderAvailability
    },
    {
        field: 'skills',
        headerName: 'Skills',
        width: 180,
        renderCell: renderSkills
    },
    {
        field: 'interests',
        headerName: 'Interests',
        renderCell:renderInterests
    }, 
]