import { Box} from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
import SectionRow from "./SectionRow"
import ResourcesRow from "./ResourcesRow"


const Section = ({header, rows, rowColor="primary.main", highlight=false, checkbox=false, showDTG=false}) => {
    let content;
    if(header === 'Resources'){
        content = <Box display="inline-flex" flexDirection="column" alignItems="left">
            <ResourcesRow resources={rows} />
        </Box>
    }else{
        content = <Box display="inline-flex" flexDirection="column" alignItems="center">
        {
            Object.entries(rows).map((row) => {
                const [key, details] = row
                return (
                    <SectionRow key={`${details.title}-${details.dtg}`} details={details} rowColor={rowColor} checkbox={checkbox} highlight={highlight} showDTG={showDTG}/>
                );
            })
        }
        </Box>
    }
    return  (
    <Box display="inline-flex" flexDirection="column" bgcolor="primary.main" width="100%" p="10px" borderRadius="20px" mt="20px">
        <SectionHeader text={header} margin="0"/>
        {content}
    </Box>)
}
export default Section;