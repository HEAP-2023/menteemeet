import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const SmallCalendar = () => {
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar views={['day']} showDaysOutsideCurrentMonth fixedWeekNumber={6}/>
        </LocalizationProvider>
    )
}

export default SmallCalendar