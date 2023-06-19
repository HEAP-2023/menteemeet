import { Box, Typography, Button } from "@mui/material"
import GroupingTable from "../tables/GroupingTable"
import { useSelector } from "react-redux";
import { generateColors } from "../../../theme";


const Groupings = () => {
    const userType = useSelector((state) => state.user.userType);
    const colors = generateColors();
    const rows = fetchGroups(userType)
    const columns = structure(userType)


    return (<Box>
        <GroupingTable rows={rows} columns={columns}/>
    </Box>);
}
export default Groupings


const fetchGroups = () => {
    return [
        {
            id : 1,
            groupNo : 1,
            mentors : ["Hong Yao", "Gabriel"],
            mentees : ["Olivia", "Axel", "Bruce"],
            commonDT : ["Mondays, 9pm to 10pm", "Saturdays, 2pm to 6pm"]
        }, 
        {
            id : 2,
            groupNo : 2,
            mentors : ["Hong Yao", "Gabriel"],
            mentees : ["Olivia", "Axel", "Bruce"],
            commonDT : ["Mondays, 9pm to 10pm", "Saturdays, 2pm to 6pm"]
        }
    ]
}

const structure = (userType) => {
    return (
        [
            { field: 'id', headerName: 'ID', width: 90 },
            {
              field: 'groupNo',
              headerName: 'Group No.',
              width: 80,
              editable: true,
            },
            {
              field: 'mentors',
              headerName: 'Mentor(s)',
              width: 300,
              editable: true,
              renderCell : displayUsers,
            },
            {
              field: 'mentees',
              headerName: 'Mentees',
              width: 300,
              editable: true,
              renderCell : displayUsers,
            },
            {
              field: 'commonDT',
              headerName: "Common Available Datetime(s)",
              sortable: false,
              editable : true,
              width: 500,
              renderCell : displayDate,
            },
            
          ]
    );
}

const displayUsers = (props) => {
    const { api, value } = props;
    return (<Box width="100%" display="flex" flexDirection="column"     >
        {value.map((user) => {
            return (
            <Box>
                <Button variant="contained" sx={{m:"10px 0", borderRadius:"20px", bgcolor:"#EBEBEB"}}>
                    <Typography>{user}</Typography>
                </Button>
            </Box>

            )}
        )}
    </Box>)
}

const displayDate = (props) => {
    const { api, value } = props;
    return (<Box width="100%" display="flex" flexDirection="column">
        {value.map((user) => {
            return (
            <Box m="10px 0">
                    <Typography>{user}</Typography>
            </Box>
            )}
        )}
    </Box>)
}