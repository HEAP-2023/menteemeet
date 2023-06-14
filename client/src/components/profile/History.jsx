import { Box, Typography } from "@mui/material";


const History = ({history}) => {
    return ( <Box display="flex" flexDirection="column" width="100%">
    {Object.entries(history).map(([key, value]) => {
        const {HID,
            startDate,
            role,
            completionDate,
            programmeName } = value

    return (<Box height="100px" width="80%" bgcolor="primary.main" borderRadius="20px" p="20px" m="20px" key={HID}>
                <Typography fontWeight="700">{programmeName}</Typography>
                <Typography>Joined as {role} from {startDate} to {completionDate} </Typography>
            </Box>)})
    }
</Box>);
}

export default History;