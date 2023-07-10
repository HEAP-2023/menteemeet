import { Box } from '@mui/material';
import MainCalendar from '../../components/calendar/MainCalendar';
import SmallCalendar from '../../components/calendar/SmallCalendar';
import CalendarFilter from '../../components/calendar/CalendarFilter';
const Calendar = () => {
    return (<>
        <Box display={'flex'}>
            <Box sx={{ flex: '20%', justifyContent: 'left' }}>
                <SmallCalendar />
                <CalendarFilter />
            </Box>
            <Box sx={{ flex: '80%', marginRight: "100px", marginY: '2%' }}>
                <MainCalendar />
            </Box>

        </Box>


    </>)
}

export default Calendar;