import { Box, Grid, Typography} from "@mui/material"
import IndeterminateCheckbox from "../IndeterminateCheckbox"
const AvailabilityCBox = () => {

    return (
        <Box mt="20px">
            <Typography fontWeight="700">Availability</Typography>
            <Grid container columns={12}>
                {
                    days.map(day => (
                        <Grid item key={day}>
                            <IndeterminateCheckbox pLabel={day} />
                        </Grid>
                        ))
                }
            </Grid>
        </Box>
    )
}

const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
export default AvailabilityCBox