import { Box, Button, Typography, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material"
import useGetMMByProgID from "../../hooks/programmes/organiser_authorised/useGetMMByProgID"
import usePostGrouping from "../../hooks/algo/usePostGrouping"
import { useSelector } from "react-redux";
import { useState } from "react";


const GenerateGroup = ({progID}) => {

    const [failed, setFailGenerate] = useState(false)
    const {data, isSuccess} = useGetMMByProgID(progID);
    const { mutate : createGroup } = usePostGrouping(progID, setFailGenerate)
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const handleClick = () => {
        if(isSuccess){
            createGroup(data)
        }
    }

    let participants = 0;
    if(isSuccess){
        console.log(data)
        participants += data.mentees.length + data.mentors.length 
    }

    return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
        <Dialog open={!!failed} onClose={() => setFailGenerate(false)} >
            <DialogTitle>Failed</DialogTitle>
            <DialogContent> <p>{failed}</p> </DialogContent>
            <DialogActions>
                <Button 
                color="secondary"
                onClick={() => { 
                   setFailGenerate(false)
                }
                    }>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
        {
            userType === "organiser" ? 
            
            <Button variant="contained" onClick={handleClick} disabled={participants === 0}>
                <Typography>
                Create Group automatically with our advanced algorithm
                </Typography>
            </Button> :

            <Typography>No Groupings Yet</Typography>

        }

    </Box>)
}
export default GenerateGroup