import { Box } from '@mui/material';
import MainCalendar from '../../components/calendar/MainCalendar';

const Calendar = () => {
    return (<>
        <Box display={'flex'}>
            <MainCalendar />
        </Box>
    </>)
}

export default Calendar;