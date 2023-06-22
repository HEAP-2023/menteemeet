import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Header from "../../components/login/start/Header"
import LoginOverlay from "../../components/login/LoginOverlay"

const LoginStart = () => {

    return (
    <Box width="100%">
        <LoginOverlay/>
        <Box display="grid" gridTemplateRows="1fr 4fr 4fr 6fr" gap="20px" width="100%" p="20px">
            <Header></Header>
            <Box>hello login page</Box>
            <Box>hello login page</Box>
            <Box>hello login page</Box>
        </Box>
    </Box>
    );
}

export default LoginStart;

