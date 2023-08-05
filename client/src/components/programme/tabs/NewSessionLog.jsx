import { Box, Typography } from "@mui/material";
import PageHeader from "../../PageHeader"
import SectionHeader from "../../SectionHeader";
import SessionForms from "../forms/SessionForms";

const NewSessionLog = ({handleRerender}) => {
    return <Box display="flex" flexDirection="column" width="100%" p="20px">
        {/* <SectionHeader text="Session Log"/> */}
        <SectionHeader text="Add New Session"/>
        <SessionForms handleRerender={handleRerender}></SessionForms>
    </Box>
}
export default NewSessionLog;