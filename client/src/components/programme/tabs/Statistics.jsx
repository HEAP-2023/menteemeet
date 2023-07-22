import { Box, Typography } from "@mui/material"
import Bar from "../charts/Bar";
import { generateColors } from "../../../theme";
import SatisfactionHistogram from "../charts/SatisfactionHistogram";
// import InterestComposition from "../charts/InterestComposition";

const Statistics = () => {
    const barData = fetchBarData()
    const histogramData = fetchHistogramData()
    const pieData = fetchPieData()
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
                    <Box sx={{display: "flex", height: "250px", width: "500px", marginLeft:"20px"}}>
                    <SatisfactionHistogram data={histogramData}/>
                    </Box>
                </Box>
            </Box>
            <Box display="flex" flexDirection="column">
                <Box sx={{ height: "300px", width: "550px", display: "flex", flexDirection: "column", bgcolor: `${colors.primary[500]}`, borderRadius: '20px', m:'10px' }} >
                    <Typography sx={{ mt: '15px', ml: '15px' }}>Mentee Attendance Rate</Typography>
                    
                </Box>
                <Box sx={{ height: "300px", width: "550px", display: "flex", flexDirection: "column", bgcolor: `${colors.primary[500]}`, borderRadius: '20px', m:'10px' }} >
                    <Typography sx={{ mt: '15px', ml: '15px' }}>Mentee Interest Composition</Typography>
                    {/* <InterestComposition data={pieData}/> */}
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
            "endAdornment": "%"
        },
    ]
}

const fetchHistogramData = () => {
    return [
        {"labelName": 1, "mentorCount": 0, "menteeCount": 0}, 
        {"labelName": 2, "mentorCount": 0, "menteeCount": 0}, 
        {"labelName": 3, "mentorCount": 0, "menteeCount": 0}, 
        {"labelName": 4, "mentorCount": 0, "menteeCount": 0}, 
        {"labelName": 5, "mentorCount": 3, "menteeCount": 3}, 
        {"labelName": 6, "mentorCount": 10, "menteeCount": 15}, 
        {"labelName": 7, "mentorCount": 25, "menteeCount": 27}, 
        {"labelName": 8, "mentorCount": 30, "menteeCount": 30}, 
        {"labelName": 9, "mentorCount": 18, "menteeCount": 50},
        {"labelName": 10, "mentorCount": 10, "menteeCount": 45}, 

    ]
}

const fetchPieData = () => {
    return [
        {
            "labelName": "Business",
            "count" : 33,
            "endAdornment": "%"
        },
        {
            "labelName": "Business",
            "count" : 33,
            "endAdornment": "%"
        },
    ]
}