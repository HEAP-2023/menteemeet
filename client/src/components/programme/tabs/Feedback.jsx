import { Box, TextField, Select, MenuItem } from "@mui/material";
import SectionHeader from "../../SectionHeader";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FeedbackTable from "../tables/FeedbackTable"

const Feedback = () => {
    const [person, setPerson] = useState('');
    const handleChange = (event) => {
        setPerson(event.target.value);
    };
    const userType = useSelector((state) => state.user.userType);
    const rows = fetchPeople(userType);

    const acctID = useSelector((state) => state.user.userDetails.acctID)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            feedback: "",
            from: acctID,
            to: ""
        }
    });

    const handleSave = (data) => {
        const feedbackEntry = {
            feedback: data.feedback,
            from: acctID,
            to: person,
        };
        // Save or process the feedback entry as needed
        console.log("Feedback Entry:", feedbackEntry);
    }

    // let feedbackFor;
    let content;

    if (userType === "mentee" || userType === "mentor") {

        content =
            <Box>

                <form onSubmit={handleSubmit(handleSave)}>
                    <SectionHeader text="Provide feedback to" sx={{ margin: "15px 30px", width: "50px" }} />
                    <Select
                        value={person}
                        onChange={handleChange}

                        displayEmpty
                        sx={{ height: "30px", bgcolor: "#EBEBEB", border: "none" }}
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value="organiser">
                            Organiser
                        </MenuItem>
                        {rows.map((item, index) => (
                            <MenuItem value={item.name} key={index}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <Box display="block">
                        <Controller
                            name="feedback"
                            control={control}
                            render={({ field }) => <TextField {...field} id="outlined-basic" variant="outlined"
                                multiline
                                rows={4}
                                sx={{
                                    ml: 4,
                                    color: "#CFCFCF",
                                    width: 600
                                }}
                            />}
                        />

                    </Box>
                    <CustomButton buttonName={"Edit"} />
                    <CustomButton buttonName={"Submit"} />
                </form>
            </Box>
    } else {
        
        content = <FeedbackTable />
    }

    return (
        <>{content}</>
    )
}

export default Feedback;

const fetchPeople = (userType) => {
    if (userType === "mentor") {
        return [{
            name: "Olivia"
        }, {
            name: "Axel"
        }, {
            name: "Bruce"
        }]
    } else if (userType === "mentee") {
        return [{
            name: "Hong Yao"
        }, {
            name: "Gabriel"
        }]
    }
}


