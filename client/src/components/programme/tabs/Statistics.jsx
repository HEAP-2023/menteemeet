import { Box, Typography } from "@mui/material"
import Bar from "../charts/Bar";
import { generateColors } from "../../../theme";
import SatisfactionHistogram from "../charts/SatisfactionHistogram";
const Statistics = () => {
    const barData = fetchBarData()
    const colors = generateColors();

    return (
        <Box width="100%" height="100%" display="flex">
            <Box display="flex" flexDirection="column">
                <Box sx={{ height: "300px", width: "550px", bgcolor: `${colors.primary[500]}`, borderRadius: '20px', m: '10px' }} >
                    <Typography sx={{ mt: '15px', ml: '15px' }}>Summary</Typography>
                    <Bar data={barData} />
                </Box>
                <Box sx={{ height: "300px", width: "550px",bgcolor: `${colors.primary[500]}`, borderRadius: '20px', m: '10px' }} >
                    <Typography sx={{ mt: '15px', ml: '15px' }}>Mentor and Mentee Satisfaction</Typography>
                   
                </Box>
            </Box>
            <Box display="flex" flexDirection="column">
                <Box sx={{ height: "300px", width: "550px", display: "flex", flexDirection: "column", bgcolor: `${colors.primary[500]}`, borderRadius: '20px', m:'10px' }} >
                    <Typography sx={{ mt: '15px', ml: '15px' }}>Mentee Attendance Rate</Typography>
                    
                </Box>
                <Box sx={{ height: "300px", width: "550px", display: "flex", flexDirection: "column", bgcolor: `${colors.primary[500]}`, borderRadius: '20px', m:'10px' }} >
                    <Typography sx={{ mt: '15px', ml: '15px' }}>Mentee Interest Composition</Typography>
                    
                </Box>
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
            "endAdornment": " "
        },

        {
            "labelName": "Mentor Count",
            "count": 36,
            "endAdornment": " "
        },

        {
            "labelName": "Mentee Retention Rate",
            "count": 29.2,
            "endAdornment": "%"
        },

        {
            "labelName": "Match Success Rate",
            "count": 78.1,
            "endAdornment": "%"
        },
        {
            "labelName": "Progress",
            "count" : "90",
            "endAdornment": " "
        },
    ]
}