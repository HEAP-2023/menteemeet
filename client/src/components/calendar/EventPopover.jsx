import { Typography, Box, Button, Popover } from "@mui/material";
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';

const EventPopover = ({ isOpen, onRequestClose, event, anchorEl }) => {
    const start = format(event.start, 'EEE, MMM dd HH:mm');
    const end = format(event.end, 'EEE, MMM dd HH:mm');
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
                    <CloseIcon onClick={onRequestClose} sx={{cursor: 'pointer', mt: '5px'}} />
                </Box>
                <Box sx={{padding: '10px'}}>
                    <Typography>{event._def.title}</Typography>
                    <p>{start} - {end}</p>
                    <p>{event.extendedProps.mentorshipProgramme}</p>
                </Box>
            </Box>
        </Popover>
    )

}

export default EventPopover