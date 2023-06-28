import { Box, Button, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SectionHeader from "../../components/SectionHeader";
import PeerReview from "../../components/profile/PeerReview";
import History from "../../components/profile/History";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Profile = ({ peerReviews, history, acctInfo }) => {
    const {acctID,
        name,
        email} = acctInfo
    const navigate = useNavigate();

    return (<Box height="100%" display="grid" gridTemplateRows="1fr 3fr 1fr 6fr">

        <PageHeader text="My Profile" />

        {/* name and profile pic? */}
        <Box display="flex" p="20px">
            <AccountCircleOutlinedIcon fontSize="large" sx={{ transform: "scale(4)", margin: "40px" }} />
            <PageHeader text={name} />
        </Box>

        {/* account settings button */}
        <Box p="20px">
            <Button variant="contained" onClick={() => { navigate("/accountSettings") }}>
                <ManageAccountsOutlinedIcon />
                <Typography >Account Settings</Typography>
            </Button>
        </Box>

        <Box display="flex" flexDirection="column">
            {/* peer review section */}

            <SectionHeader text="Peer Reviews"/>
            <PeerReview peerReviews={peerReviews}/>



            <SectionHeader text="History"/>
            <History history={history}/>
        </Box>
    </Box>)
}

export default Profile;