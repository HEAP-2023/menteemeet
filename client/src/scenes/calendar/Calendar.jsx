import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './FullCalendar.css';


const Calendar = () => {
    return (<>
        <Box display={'flex'}>
            <Box sx={{ flex: '20%', justifyContent: 'left' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </Box>
            <Box sx={{ flex: '80%', marginRight: "100px", marginTop: "2%" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1}
                    headerToolbar={{
                        start: 'dayGridMonth,timeGridWeek,timeGridDay', // will normally be on the left. if RTL, will be on the right
                        center: 'title',
                        end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
                    }}
                />
            </Box>

        </Box>


    </>)
}

export default Calendar;