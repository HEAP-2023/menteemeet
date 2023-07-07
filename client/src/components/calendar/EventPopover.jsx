import { Typography, Box, Button, Popover } from "@mui/material";
import { format } from 'date-fns';

const EventPopover = ({ isOpen, onRequestClose, event, anchorEl}) => {
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
              }}>
            <Box sx={{width: '300px'}}>
                <Typography>{event._def.title}</Typography>
                <p>{start} - {end}</p>
                <p>{event.extendedProps.mentorshipProgramme}</p>
                <Button onClick={onRequestClose} sx={{color: 'black'}}>Close</Button>
            </Box>
        </Popover>
    )

}

export default EventPopover