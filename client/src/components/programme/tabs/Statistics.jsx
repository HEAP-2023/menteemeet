import { Box, Typography } from "@mui/material"
import Bar from "../charts/Bar";
const Statistics = () => {
    const barData = fetchBarData()

    return (
        <Box width="100%" height="100%">
            <Box height="200px" width="400px" display="flex" flexDirection="column" alignItems="center">
                <Typography>Summary</Typography>
                <Bar data={barData}/>
            </Box>
        </Box>
    )
}
export default Statistics;

const fetchBarData = () => {
    return [
        {
            "labelName": "Mentee Count",
            "count": 87,
            "endAdornment" : " "
        },

        {
            "labelName": "Mentor Count",
            "count": 36,
            "endAdornment" : " "
        },

        {
            "labelName": "Mentee Retention Rate",
            "count": 29.2,
            "endAdornment" : "%"
        },

        {
            "labelName": "Match Success Rate",
            "count": 78.1,
            "endAdornment" : "%"
        },
    ]
}