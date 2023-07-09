import { Typography, Box, Button, Popover, TextField, MenuItem, Select } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { format } from 'date-fns';
import { generateColors } from "../../theme";
import CloseIcon from '@mui/icons-material/Close';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AddEventPopover = ({ isOpen, onRequestClose, selectedDateInfo, addEvent }) => {
    const mentorshipProgrammes = fetchMentorshipProgrammes();
    const addEventSchema = yup.object()
        .shape({
            title: yup.string()
                .required("This field is required"),
            startTime: yup.string()
                .required("This field is required"),
            endTime: yup.string()
                .required("This field is required"),
                //need to add one more validation to check that endTime is after startTime
            programme: yup.string()
                .oneOf(mentorshipProgrammes, "Required")
        }).required()

    // console.log(selectedDateInfo.dateStr);
    const date = format(selectedDateInfo.date, 'EEE, MMM dd HH:mm');
    const [mentorshipProgramme, setMentorshipProgramme] = useState('');
    const { control, handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            date: selectedDateInfo.dateStr,
            startTime: "",
            endTime: "",
            programme: mentorshipProgramme,
            topic: "",
            location: "",
        }, resolver: yupResolver(addEventSchema)
    });
    const colors = generateColors();
    const handleChange = (event) => {
        setMentorshipProgramme(event.target.value);
    };
    const handleSave = (data) => {
        const eventData = {
            title: data.title,
            start: `${selectedDateInfo.dateStr}T${format(new Date(data.startTime), "HH:mm:ss")}`, // formatted time into string
            end: `${selectedDateInfo.dateStr}T${format(new Date(data.endTime), "HH:mm:ss")}`,
            mentorshipProgramme: data.programme
        }
        console.log("to be submitted")
        console.log(eventData);
        addEvent(eventData);
        onRequestClose();
    }


    return (
        <Popover
            open={isOpen}
            onClose={onRequestClose}
            anchorEl={selectedDateInfo.dayEl} // https://fullcalendar.io/docs/dateClick
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
        >
            <Box sx={{ width: '400px', height: '500px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', backgroundColor: '#D1D1D14C' }}>
                    <CloseIcon onClick={onRequestClose} sx={{ cursor: 'pointer' }} />
                </Box>
                <Box sx={{ padding: '10px' }}>
                    <form onSubmit={handleSubmit(handleSave)}>
                        <Box sx={{ marginBottom: '20px' }}>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => <TextField {...field} variant="standard" label="Add title" sx={{ width: '100%' }} />}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="title"
                                render={({ message }) => <p style={{ color: "#ff0000", margin: "0px" }}>{message}</p>}
                            />
                        </Box>
                        <Typography sx={{ marginBottom: '20px' }}>{date}</Typography>
                        <Typography>Time</Typography>
                        <ErrorMessage
                            errors={errors}
                            name="startTime"
                            name="endTime"
                            render={({ message }) => <p style={{ color: "#ff0000", margin: "0px" }}>{message}</p>}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <Controller
                                name="startTime"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                                            <TimePicker {...field} sx={{ width: "40%", mr: "10px" }} />
                                        </LocalizationProvider>);
                                }}
                            />
                            <label> to </label>
                            <Controller
                                name="endTime"
                                control={control}
                                render={({ field }) =>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <TimePicker {...field} sx={{ width: "40%", ml: "10px", }} />
                                    </LocalizationProvider>}
                            />
                        </Box>
                        <Typography sx={{ display: 'inline-block', mr: '10px', mb: '20px' }}>Session for</Typography>
                        <Select
                            {...register("programme")}
                            value={mentorshipProgramme}
                            onChange={handleChange}
                            displayEmpty
                            sx={{ height: "30px", bgcolor: "#EBEBEB", border: "none" }}
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {mentorshipProgrammes.map((item, index) => (
                                <MenuItem value={item} key={index}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                        <ErrorMessage
                            errors={errors}
                            name="programme"
                            render={({ message }) => <p style={{ color: "#ff0000", margin: "0px", marginLeft: '10px', display: 'inline-block'}}>{message}</p>}
                        />

                        <Box sx={{ mb: '20px' }}>
                            <Controller
                                name="topic"
                                control={control}
                                render={({ field }) => <TextField {...field} variant="standard" label="Topic"
                                    sx={{ width: "79%" }} />}
                            />
                        </Box>
                        <Box sx={{ mb: '20px' }}>
                            <Controller
                                name="location"
                                control={control}
                                render={({ field }) => <TextField {...field} variant="standard" label="Location"
                                    sx={{ width: "80%" }} />}
                            />
                        </Box>
                        <Box display="flex"  >
                            <Button type="submit" variant="contained">Add</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Popover>
    )
}

export default AddEventPopover

const fetchMentorshipProgrammes = () => {
    return ['ABC Programme', 'CDE Programme', 'XYZ Programme']
}