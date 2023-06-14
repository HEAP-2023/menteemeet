import { Box, Button, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SectionHeader from "../../components/SectionHeader";
import PeerReview from "../../components/profile/PeerReview";
import History from "../../components/profile/History";

const Profile = ({peerReviews, history, acctInfo}) => {
    const {acctID, 
            name, 
            email} = acctInfo
    return (<Box height="100%" display="grid" gridTemplateRows="1fr 3fr 1fr 6fr 6fr">

        <PageHeader text="My Profile"/>
        
        {/* name and profile pic? */}
        <Box display="flex" p="20px">
            <Box width="150px" height="150px" borderRadius="50%" bgcolor="primary.main"></Box>
            <PageHeader text={name}/>
        </Box>
        
        {/* account settings button */}
        <Box p="20px">
            <Button variant="contained">
                <ManageAccountsOutlinedIcon/>
                <Typography sx={{textDecoration:"underline"}}>Account Settings</Typography>
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