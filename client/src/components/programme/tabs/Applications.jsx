import { Box, Typography, Button } from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { generateColors } from "../../../theme";
import { useState, useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';
import { getApplicationsByProgID } from "../../../services/programmes/organiserServices";
import { putApplicationAcceptance } from "../../../services/programmes/organiserServices";


const Applications = (programmeID) => {

    const [fetchApplications, setFetchApplications] = useState([]);
    const [rerender, setRerender] = useState(true);


    useEffect(() => {
        // If already rendered, do nothing
        if (!rerender) return;

        // Fetch applications from backend
        getApplicationsByProgID(programmeID.programmeID)
        .then(res => {
            setFetchApplications(res.data.getApplication);
            setRerender(false);
        })
        .catch(err => {
            console.log("ERROR:", err);
        })
    }, [rerender]) 

    const colors = generateColors();
    const menteeApplications = fetchApplications.filter((item)=> item.role === 'mentee' && item.is_accepted === 0);
    const mentorApplications = fetchApplications.filter((item) => item.role === 'mentor' && item.is_accepted === 0);
    const menteesEnrolled = fetchApplications.filter((item)=> item.role === 'mentee' && item.is_accepted === 1);
    const mentorsEnrolled = fetchApplications.filter((item) => item.role === 'mentor' && item.is_accepted === 1);
    const menteesRejected = fetchApplications.filter((item)=> item.role === 'mentee' && item.is_accepted === 2);
    const mentorsRejected = fetchApplications.filter((item) => item.role === 'mentor' && item.is_accepted === 2);
    const renderAvailability = (params) => {
        const availability = JSON.parse(params.row.availability);
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
        const skills = JSON.parse(params.row.skills);
        const skillsString = skills.map((item) => item).join(', ');
        return (
            <Tooltip title={skillsString}>
                <div>{skillsString}</div>
            </Tooltip>
        )
    };
    
    const renderInterests = (params) => {
        const interests = JSON.parse(params.row.interests);
        const interestsString = interests.map((item) => item).join(', ');
    
        return (
            <Tooltip title={interestsString}>
                <div>{interestsString}</div>
            </Tooltip>
        )
    }
    
    
    const ApproveOrReject = (params) => {
        const colors = generateColors();
        const handleClick = async(approval) => {
            putApplicationAcceptance(params.id, {approval: approval})
            .then(_ => setRerender(true))
            .catch(err => {
                console.log("ERROR:", err);
            })
            const newApps = await getApplicationsByProgID(programmeID.programmeID);
        }
        
        return (
            <>
                <Button
                    onClick={() => handleClick(1)}
                    sx={{ color: colors.text[500], bgcolor: colors.primary[500], mr: '10px', '&:hover': { bgcolor: colors.primary[600] } }}>
                    Approve
                </Button>
                <Button 
                    onClick={() => handleClick(2)}
                    sx={{ color: colors.text[500], bgcolor: colors.primary[500], '&:hover': { bgcolor: colors.primary[600] } }}>
                    Reject
                </Button>
            </>
    
        )
    }
    
    const Undo = (params) => {
        const colors = generateColors();
        const handleClick = async(approval) => {
            putApplicationAcceptance(params.id, {approval: approval})
            .then(_ => setRerender(true))
            .catch(err => {
                console.log("ERROR:", err);
            })
            console.log(approval);
            const newApps = await getApplicationsByProgID(programmeID.programmeID);
        }
        return (<>
            <Button 
                onClick={() => handleClick(0)}
                sx={{ color: colors.text[500], bgcolor: colors.primary[500], '&:hover': { bgcolor: colors.primary[600] } }}>
                Undo
            </Button>
        </>)
    }
    const columnHeading = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            // renderCell: (params) => (
            //     <Tooltip title={params.value}>
            //         <div>{params.value}</div>
            //     </Tooltip>
            // ),
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
            width: 280,
            renderCell:renderInterests
        }, 
        {
            field: 'undo',
            headerName: 'Undo',
            renderCell: Undo
        }
    ]
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