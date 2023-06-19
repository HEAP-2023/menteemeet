import { Box, Typography } from "@mui/material";
import PageHeader from "../../PageHeader"
import SectionHeader from "../../SectionHeader";
import SessionForms from "../forms/SessionForms";


const NewSessionLog = () => {
    return <Box display="flex" flexDirection="column" width="100%" p="20px">
        <PageHeader text="Session Log"/>
        <SectionHeader text="Add New Session"/>
        <SessionForms></SessionForms>
    </Box>
}
export default NewSessionLog;