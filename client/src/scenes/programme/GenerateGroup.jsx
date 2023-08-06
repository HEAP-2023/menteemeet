import { Box, Button, Typography } from "@mui/material"
import useGetMMByProgID from "../../hooks/programmes/organiser_authorised/useGetMMByProgID"
import usePostGrouping from "../../hooks/algo/usePostGrouping"
import { useSelector } from "react-redux";
const GenerateGroup = ({progID}) => {

    const {data, isSuccess} = useGetMMByProgID(progID);
    const { mutate : createGroup } = usePostGrouping(progID)
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