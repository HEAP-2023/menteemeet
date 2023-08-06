import { Box, TextField, Select, MenuItem, Button, Typography } from "@mui/material";
import SectionHeader from "../../SectionHeader";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import FeedbackTable from "../tables/FeedbackTable";
import { generateColors } from "../../../theme";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import { DevTool } from "@hookform/devtools";
import { getAllFeedback } from "../../../services/user/userServices";
import { useParams } from 'react-router-dom';
import { getListOfMentees, getListOfMentors } from "../../../services/user/userServices";
const Feedback = () => {
    const {id} = useParams(); // progID
    const programmes = useSelector((state) => state.user.programmes)
    const programme = programmes.find(program => program.programme_id === Number(id));
    const userRole = programme.role;
    const [reviewees, setReviewees] = useState([]);
    useEffect(() => {
        getAllFeedback()
        .then(res => {console.log("res:",res);
        setStore(res.data.feedbackArray);})
        .catch(err => console.log("ERROR:", err))
    },[])

    useEffect(() => {
        if(userRole === "mentee"){
            getListOfMentors(id)
            .then(res => {
                console.log("res getList:", res.data);
                setReviewees(res.data);
            })
            .catch(err => console.log("ERRORS:", err));
        }else if (userRole === "mentor"){
            getListOfMentees(id)
            .then(res => {
                console.log("res getList:", res.data);
                setReviewees(res.data);
            })
            .catch(err => console.log("ERRORS:", err));
        }
    },[])
    const bgColor = generateColors().primary[500];
    const [person, setPerson] = useState('');
    const handleChange = (event) => {
        setPerson(event.target.value);
    };
    const userType = useSelector((state) => state.user.userBasicDetails.account_type);
    
    
    // const rows = fetchPeople(userRole);
    
    const acctID = useSelector((state) => state.user.userBasicDetails.account_id);
    const people = ["Organiser"].concat(reviewees.map((item, index) => item.name));
    
    const feedbackSchema = yup.object()
        .shape({
            feedback: yup.string()
                .required("This field is required"),  
            person: yup.string()
                .oneOf(people, "Select a person for feedback")
                .required("Select a person for feedback")
        }).required()
    const { control, handleSubmit, reset, formState: { errors }, register } = useForm({
        defaultValues: {
            feedback: "",
            from: acctID,
            to: ""
        }, resolver: yupResolver(feedbackSchema)
    });
    const [store, setStore] = useState([]);
    const handleSave = (data) => {
        let feedbackEntry = {
            content: data.feedback,
            author_id: acctID,
            receiver_id: person ? person : "none",
        };
        setStore((prevStore) => [...prevStore, feedbackEntry]);
        // Save or process the feedback entry as needed
        console.log("Feedback Entry:", feedbackEntry);

        reset({ feedback: "" })
    }

    let content;
    // console.log(store)
    let hasContent = store.length > 0 ? true : false;
    // console.log(hasContent);
    if (userType === "user") {

        content =
            <Box display="grid" gridTemplateColumns="1fr 1fr">

                <form onSubmit={handleSubmit(handleSave)}>
                    <SectionHeader text="Provide feedback to" sx={{ margin: "15px 30px", width: "50px" }} />
                    <Select
                        {...register("person")}
                        value={person}
                        onChange={handleChange}
                        displayEmpty
                        name="person"
                        sx={{ height: "30px", bgcolor: "#EBEBEB", border: "none" }}
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value="Organiser">
                            Organiser
                        </MenuItem>
                        {reviewees.map((item, index) => (
                            <MenuItem value={item.name} key={index}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <ErrorMessage
                        errors={errors}
                        name="person"
                        render={({ message }) => <p style={{ color: "#ff0000", margin: "0px", marginLeft: "35px"}}>{message}</p>}
                    />

                    <Box display="flex" flexDirection={"column"}>
                        <Controller
                            name="feedback"
                            control={control}
                            render={({ field }) => <TextField {...field} id="outlined-basic" variant="outlined"
                                multiline
                                rows={10}
                                sx={{
                                    ml: 4,
                                    color: "#CFCFCF",
                                    width: "90%"
                                }}
                            />}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="feedback"
                            render={({ message }) => <p style={{ color: "#ff0000", marginLeft: "35px"}}>{message}</p>}
                        />
                    
                        <Box display="flex" justifyContent="flex-end" width={"95%"}>
                            <CustomButton buttonName={"Edit"} />
                            <CustomButton buttonName={"Submit"} />
                        </Box>
                    </Box>


                </form>
                <Box>
                    <SectionHeader text="Feedback submissions" sx={{ margin: "15px 30px", width: "50px" }} />

                    <Box display="flex" flexDirection="column" width="90%" bgcolor={bgColor} marginX="30px" p="10px" minHeight="100px" borderRadius="20px" >

                        {hasContent ? (store.map((value, index) => (
                            <Box key={index}>
                                <Typography my="10px">Feedback to {value.receiver_id}</Typography>
                                <Box bgcolor="#FFFFFF" borderRadius="10px" height="60%" p="10px" display="inline-block" minWidth="100%">
                                    <Typography>{value.comment}</Typography>
                                </Box>
                            </Box>
                        ))) : <></>}

                    </Box>

                </Box>
                <DevTool control={control}/>
            </Box>

    } else if (userType === "organiser"){

        content = <FeedbackTable />
    }

    return (
        <>{content}</>
    )
}

export default Feedback;

// const fetchPeople = (role) => {
//     if (role === "mentor") {
//         return [{
//             name: "Olivia"
//         }, {
//             name: "Axel"
//         }, {
//             name: "Bruce"
//         }]
//     } else if (role === "mentee") {
//         return [{
//             name: "Hong Yao"
//         }, {
//             name: "Gabriel"
//         }]
//     } else{
//         return []
//     }
// }
