import { Box, Button, Typography } from "@mui/material"
import useGetMMByProgID from "../../hooks/programmes/organiser_authorised/useGetMMByProgID"
import usePostGrouping from "../../hooks/algo/usePostGrouping"
import { createGrouping } from "../../services/algo/groupings";
const GenerateGroup = ({progID}) => {

    const {data, isSuccess} = useGetMMByProgID(progID);
    const { mutate : createGroup } = usePostGrouping(progID)

    const handleClick = () => {
        if(isSuccess){
            createGroup(data)
        }
    }

    if(isSuccess){
        console.log(data)
    }

    return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={handleClick}>
            <Typography>
            Create Group automatically with our advanced algorithm
            </Typography>
        </Button>
    </Box>)
}
export default GenerateGroup