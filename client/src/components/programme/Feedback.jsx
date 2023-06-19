import { Box, TextField, Select, MenuItem} from "@mui/material";
import SectionHeader from "../SectionHeader";
import { useSelector } from "react-redux";
import CustomButton from "./CustomButton";
import { useState } from "react";

const Feedback = () => {
    const [mentee, setMentee] = useState('');
    const handleChange = (event) => {
        setMentee(event.target.value);
    };

    const userType = useSelector((state) => state.user.userType);
    let content;
    if (userType === "mentee") {
        content = <Box>
            <SectionHeader text="Feedback for Organisers" margin={"15px 30px"} />
            <Box display="block">
                <TextField id="outlined-basic" variant="outlined"
                    multiline
                    rows={4}
                    sx={{
                        ml: 4,
                        color: "#CFCFCF",
                        width: 600
                    }}
                />
            </Box>
            <CustomButton buttonName={"Edit"} />
            <CustomButton buttonName={"Submit"} />
            <br></br>
            <SectionHeader text="Feedback for Mentors" margin={"15px 30px"} />
            <Box display="block">
                <TextField id="outlined-basic" variant="outlined"
                    multiline
                    rows={4}
                    sx={{
                        ml: 4,
                        color: "#CFCFCF",
                        width: 600
                    }}
                />
            </Box>
            <CustomButton buttonName={"Edit"} />
            <CustomButton buttonName={"Submit"} />
        </Box>
    } else if (userType === "mentor") {

        content = <Box>
            <SectionHeader text="Feedback for Organisers" margin={"15px 30px"} />
            <Box display="block">
                <TextField id="outlined-basic" variant="outlined"
                    multiline
                    rows={4}
                    sx={{
                        ml: 4,
                        color: "#CFCFCF",
                        width: 600
                    }}
                />
            </Box>
            <CustomButton buttonName={"Edit"} />
            <CustomButton buttonName={"Submit"} />
            <br></br>
            <SectionHeader text="Feedback for Mentees" sx={{margin: "15px 30px", width: "50px"}}/>
                <Select
                    value={mentee}
                    onChange={handleChange}
                    displayEmpty
                    labelId="select-mentee"
                    sx={{ height: "30px", bgcolor: "#EBEBEB", border: "none" }}
                >
                    <MenuItem value="">
                        <em>Select</em>
                    </MenuItem> 
                    <MenuItem value={10}>Mentee A</MenuItem>
                    <MenuItem value={20}>Mentee B</MenuItem>
                    <MenuItem value={30}>Mentee C</MenuItem>
                </Select>
            <Box display="block">
                <TextField id="outlined-basic" variant="outlined"
                    multiline
                    rows={4}
                    sx={{
                        ml: 4,
                        color: "#CFCFCF",
                        width: 600
                    }}
                />
            </Box>
            <CustomButton buttonName={"Edit"} />
            <CustomButton buttonName={"Submit"} />
        </Box>
    }
    return (
        <>{content}</>
    )
}

export default Feedback;