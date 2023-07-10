import { Box, Typography } from "@mui/material"
import PageHeader from "../../PageHeader"
import WeekSelectionCalendar from "./WeekSelectionCalendar"

const AvailabilitySection = () => {

    return (<Box>
        {/* info section */}
        <PageHeader text="Availability" margin="20px 0"/>

        {/* response section */}
        <Typography>Please select the timeslots you will be available for a mentorship section</Typography>
        <WeekSelectionCalendar admin={true}/>
    </Box>)
}

export default AvailabilitySection