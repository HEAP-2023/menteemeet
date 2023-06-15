import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
import SectionRow from "./SectionRow"


const Section = ({header, rows, rowColor="primary.main", highlight=false, checkbox=false, showDTG=false}) => {

    // console.log({rowColor})
    return  (
    <Box display="inline-flex" flexDirection="column" bgcolor="primary.main" width="100%" p="10px" borderRadius="20px" mt="20px">
        <SectionHeader text={header} margin="0"/>
        <Box display="inline-flex" flexDirection="column" alignItems="center">

            {
                Object.entries(rows).map((row) => {
                    const [key, details] = row
                    return (
                        <SectionRow key={`${details.title}-${details.dtg}`} details={details} rowColor={rowColor} checkbox={checkbox} highlight={highlight} showDTG={showDTG}/>
                    );
                })
            }
        </Box>
    </Box>)
}
export default Section;