import { Box, Typography, FormControlLabel, Checkbox} from '@mui/material';

const CalendarFilter = () => {
    const mentorshipProgrammes = fetchMentorshipProgrammes();
    return (
        <Box sx={{ marginTop: '30px', marginX: '16px' }}>
            <Typography>Sort</Typography>
            <hr/>
            {mentorshipProgrammes.map((item, index) => {
                const name = item;
                console.log(name);
                return(
                    <FormControlLabel
                    key={index}
                    control={<Checkbox />}
                    label={item}
                    sx={{ display: 'block' }}
                  />
                )
            })}
        </Box>
    )
}

export default CalendarFilter

const fetchMentorshipProgrammes = () => {
    return ['ABC Programme', 'CDE Programme', 'XYZ Programme']
}