import { Box, Typography, Divider } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
// import SectionRow from "./SectionRow"
import SectionRow from './SectionRow'
import { format } from "date-fns";


const Section = ({ header, rows, rowColor = "primary.main", highlight = false, checkbox = false, showDTG = false }) => {

    // console.log({rowColor})
    if (header === 'Upcoming Sessions') {
        console.log("rows:", rows);
        return (
            <Box display="inline-flex" flexDirection="column" bgcolor="primary.main" width="100%" p="10px" borderRadius="20px" mt="20px">
                <SectionHeader text={header} margin="5px 0px 5px 25px" />
                <Box display="inline-flex" flexDirection="column" alignItems="center">
                    {
                        rows.map((item, index) => {
                            const day = format(new Date(item.date), "EEE");
                            const dayOfMonth = format(new Date(item.date), 'dd');
                            const month = format(new Date(item.date), 'MMM');
                            return (
                                <Box key={index} display="flex" flexDirection="row" width="95%" bgcolor="background.main" mt="5px" mb="18px" p="10px" minHeight="100px" borderRadius="5px"  >
                                    <Box p="5px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                        <Typography>{day}</Typography>
                                        <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>{dayOfMonth}</Typography>
                                        <Typography>{month}</Typography>
                                    </Box>
                                    <Box p="5px" px="20px">
                                        <Divider orientation="vertical" sx={{ borderRightWidth: 3, borderColor: rowColor }} />
                                    </Box>
                                    <Box display="flex" flexDirection="column">
                                        <Typography fontWeight="700" >Session</Typography>
                                        <Typography>{item.topic}</Typography>
                                        <Typography>{format(new Date(`${item.date} ${item.start_time}`), 'p')}-{format(new Date(`${item.date} ${item.end_time}`), 'p')}</Typography>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>)
    }
    return (
        <Box display="inline-flex" flexDirection="column" bgcolor="primary.main" width="100%" p="10px" borderRadius="20px" mt="20px">
            <SectionHeader text={header} margin="0px 0px 0px 30px" />
            <Box display="inline-flex" flexDirection="column" alignItems="center">
                {
                    Object.entries(rows).map((row) => {
                        const [announcement_id, details] = row
                        return (
                            <SectionRow key={announcement_id} details={details} rowColor={rowColor} checkbox={checkbox} highlight={highlight} showDTG={showDTG} />
                        );
                    })
                }
            </Box>
        </Box>)
}
export default Section;