import { Box, Typography, Button } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
import SectionRow from "./SectionRow"
import ResourcesRow from "./ResourcesRow"
import ProgressBar from "./charts/ProgressBar"
import CustomButton from "./CustomButton"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSelector } from "react-redux";

const Section = ({header, rows, rowColor="primary.main", highlight=false, checkbox=false, showDTG=false}) => {
    const userType = useSelector((state) => state.user.userType)
    const progress = 90;
    let content;
    if(header === 'Resources'){
        content = <Box display="inline-flex" flexDirection="column" alignItems="left">
            <ResourcesRow resources={rows} />
        </Box>
    } else if (header === 'Progress') {
        content = <>
            <Box display="inline-flex" flexDirection="column" alignItems="center"></Box>
            <ProgressBar progress={progress} />
        </>
    }
    else {
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
    return (
        <Box display="inline-flex" flexDirection="column" bgcolor="primary.main" width="100%" p="10px" borderRadius="20px" mt="20px">

            {header === 'Announcements' && userType === "organiser"?
                (<>
                    <Box display="flex" width={"95%"} alignItems={"center"}>
                        <SectionHeader text={header} margin="0" />
                        <CustomButton buttonName={"Add"} height={"30px"} endIcon={<AddOutlinedIcon/>}/>
                    </Box>
                </>
                ) : (<SectionHeader text={header} margin="0" />)}
            {content}
        </Box>)
}
export default Section;