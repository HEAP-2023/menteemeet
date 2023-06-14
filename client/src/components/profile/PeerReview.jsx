import { Box, Typography } from "@mui/material"

const PeerReview = ({peerReviews}) => {
    return (            
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, 600px)">
        {Object.entries(peerReviews).map(([key, value]) => {
            const {RID,
                programmeName, 
                reviewer,
                reviewerRole, 
                date, 
                rating, 
                comments} = value


        return (<Box height="200px" bgcolor="primary.main" borderRadius="20px" p="20px" m="20px" key={RID}>
                    <Typography fontWeight="700">{programmeName}</Typography>
                    <Typography>{reviewer} ({reviewerRole})</Typography>
                    <Typography>{comments}</Typography>
                </Box>)})
        }
    </Box>)
}
export default PeerReview;