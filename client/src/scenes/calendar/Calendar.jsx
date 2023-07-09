import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import MainCalendar from '../../components/calendar/MainCalendar';

const Calendar = () => {
    return (<>
        <Box display={'flex'}>
            <Box sx={{ flex: '20%', justifyContent: 'left' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </Box>
            <Box sx={{ flex: '80%', marginRight: "100px", marginY: '2%' }}>
                <MainCalendar />
            </Box>

        </Box>


    </>)
}

export default Calendar;