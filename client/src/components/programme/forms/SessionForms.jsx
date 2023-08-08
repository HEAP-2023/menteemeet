import { Box, Typography, Input, TextField, Button } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import { addSessionByGrpID } from "../../../services/user/userServices";
import {useParams} from 'react-router-dom';
const SessionForms = ({handleRerender}) => {
    const {id} = useParams();
    const acctID = useSelector((state) => state.user.userBasicDetails.account_id)
    const userID = useSelector((state) => state.user.userBasicDetails.user_id)
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            groupID: '',
            date: "",
            startTime: "",
            endTime: "",
            topic: "",
        }
    });

    const handleSave = (data) => {
        console.log("to be submitted")
        const newSession = {
            groupNo: data.groupID,
            date: format(data.date.$d, 'yyyy-MM-dd'),
            startTime: format(data.startTime.$d, 'HH:mm:ss'),
            endTime: format(data.endTime.$d, 'HH:mm:ss'),
            topic: data.topic,
            userRole: "mentor",
            userID: userID
        }
        console.log("newsession:", newSession)
        console.log("submitted by")
        console.log(acctID);
        addSessionByGrpID(newSession, id)
            .then(res => {
                console.log('Session created:', res);
                console.log('Rerender set to true');
                handleRerender();
            })
            .catch(err => {
                console.log("ERROR:", err);
            })
            reset({groupID: '',
            date: "",
            startTime: "",
            endTime: "",
            topic: "",})
    }
    return (<Box bgcolor="primary.main" p="20px" borderRadius="20px">
        <form onSubmit={handleSubmit(handleSave)}>
            <Box display="flex" justifyContent="space-between">


                <Box display="flex" flexDirection="column" width="45%" justifyContent="space-evenly">
                    {/* <Box display="flex" alignItems="center">
                        <Box width="150px">
                            <label>Group No: </label>
                        </Box>
                        <Controller
                            name="groupID"
                            control={control}
                            render={({ field }) => <TextField {...field} variant="outlined" sx={{ width: "20%" }} />}
                        />
                    </Box> */}

                    <Box display="flex" alignItems="center" >
                        <Box width="100px">
                            <label>Date </label>
                        </Box>
                        <Controller
                            name="date"
                            control={control}
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker {...field} sx={{ width: "65%" }} disablePast />
                                </LocalizationProvider>
                            }
                        />
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Box width="100px">
                            <label>Time </label>
                        </Box>
                        <Controller
                            name="startTime"
                            control={control}
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <TimePicker {...field} sx={{ width: "30%", mr: "10px" }} />
                                </LocalizationProvider>}
                        />
                        <label> to </label>
                        <Controller
                            name="endTime"
                            control={control}
                            render={({ field }) =>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <TimePicker {...field} sx={{ width: "30%", ml: "10px" }} />
                                </LocalizationProvider>}
                        />
                    </Box>

                </Box>




                <Box display="flex" flexDirection="column" width="45%">
                    <Box display="flex" justifyContent="space-between" mb="20px" mt="40px">
                        <label> Topic / Location</label>
                        <Controller
                            name="topic"
                            control={control}
                            render={({ field }) => <TextField {...field} variant="outlined"
                                multiline rows={4} sx={{ width: "70%" }} />}
                        />
                    </Box>

                    {/* <Box display="flex"  justifyContent="space-between" mb="20px">
                    <label> Location </label>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => <TextField {...field} variant="outlined"
                        multiline rows={4} sx={{width:"70%"}} />}
                        />
                </Box> */}

                    <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Button type="submit" variant="contained" color="secondary">Add</Button>
                    </Box>
                </Box>
            </Box>
        </form>
    </Box>);
}
export default SessionForms;