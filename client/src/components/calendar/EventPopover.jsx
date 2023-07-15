import { Typography, Box, Button, Popover } from "@mui/material";
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const EventPopover = ({ isOpen, onRequestClose, event, anchorEl, deleteEvent }) => {
    const start = format(event.start, 'EEE, MMM dd HH:mm');
    const end = format(event.end, 'EEE, MMM dd HH:mm');

    const handleDelete = () => {
        console.log(event);
        deleteEvent(event._def.publicId);
        onRequestClose();
    }

    return (
        <Popover
            // id={event._def.publicId}
            open={isOpen}
            onClose={onRequestClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            sx={{ zIndex: '99999' }}>
            <Box sx={{ width: '300px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    <DeleteOutlinedIcon onClick={handleDelete} sx={{ cursor: 'pointer', mt: '5px', mx: '5px' }} />
                    <CloseIcon onClick={onRequestClose} sx={{ cursor: 'pointer', mt: '5px', mx: '5px' }} />
                </Box>
                <Box sx={{ padding: '10px' }}>
                    <Box sx={{ display: 'flex', marginY: '16px' }}><EventOutlinedIcon sx={{ mr: '15px' }} /><Typography>{event._def.title}</Typography></Box>
                    <Typography sx={{marginY: '16px', marginLeft: '39px'}}>{start} - {end}</Typography>
                    <Typography sx={{marginY: '16px', marginLeft: '39px'}}>{event.extendedProps.mentorshipProgramme}</Typography>
                    {event._def.extendedProps.topic && (<Box sx={{ display: 'flex', marginY: '16px' }}><TopicOutlinedIcon sx={{ mr: '15px' }} /><Typography>{event._def.extendedProps.topic}</Typography></Box>)}
                    {event._def.extendedProps.location && (<Box sx={{ display: 'flex', marginY: '16px' }}><LocationOnOutlinedIcon sx={{ mr: '15px' }} /> <Typography>{event._def.extendedProps.location}</Typography></Box>)}
                </Box>
            </Box>
        </Popover>
    )

}

export default EventPopover