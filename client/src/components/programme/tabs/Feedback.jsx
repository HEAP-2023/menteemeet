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
import { getAllFeedback, getListOfMentees, getListOfMentors, addFeedback } from "../../../services/user/userServices";
import { addOrgFeedback, getAllFeedbackByUsers } from "../../../services/organiser/organiserServices";
import { useParams } from 'react-router-dom';
const Feedback = () => {
    const bgColor = generateColors().primary[500];
    const { id } = useParams(); // progID
    const programmes = useSelector((state) => state.user.programmes)
    const programme = programmes.find(program => program.programme_id === Number(id));
    console.log(programme);
    const userRole = programme.role;
    const [reviewees, setReviewees] = useState([]);
    const [rerender, setRerender] = useState(true);
    const [store, setStore] = useState([]); // storing feedback given by user
    useEffect(() => {
        getAllFeedback()
            .then(res => {
                console.log("res:", res);
                const allFeedback = res.data.feedbackArray;
                const feedbackByProgID = allFeedback.filter((item) =>item.programme_id === Number(id))
                setStore(feedbackByProgID)
                setRerender(false);
            })
            .catch(err => console.log("ERROR:", err))
    }, [rerender, id])

    useEffect(() => {
        if (userRole === "mentee") {
            getListOfMentors(id)
                .then(res => {
                    console.log("res getList:", res.data);
                    setReviewees(res.data); // adding list of mentors to list of reviewees
                })
                .catch(err => console.log("ERRORS:", err));
        } else if (userRole === "mentor") {
            getListOfMentees(id)
                .then(res => {
                    console.log("res getList:", res.data);
                    setReviewees(res.data); // adding list of mentees to list of reviewees
                })
                .catch(err => console.log("ERRORS:", err));
        }
    }, [])
    //to select the person
    const [person, setPerson] = useState('');
    const handleChange = (event) => {
        console.log("event.target.value:", event.target.value)
        setPerson(event.target.value);
    };
    const userType = useSelector((state) => state.user.userBasicDetails.account_type);
    const acctID = useSelector((state) => state.user.userBasicDetails.account_id);
    const people = ["Organiser"].concat(reviewees.map((item, index) => `${item.id}`)); // adding Organiser and list of people to select from
    console.log("people:", people);

    //Feedback Schema
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

    const handleSave = (data) => {
        console.log("receiver_id:", person);
        if (person !== "Organiser") { // if feedback is given to mentee/mentor
            const feedbackEntry = {
                comment: data.feedback,
                receiverID: person ? person : "none",
                programmeID: id,
                rating: null
            };
            setStore((prevStore) => [...prevStore, feedbackEntry]);
            // Save or process the feedback entry as needed
            console.log("Feedback Entry:", feedbackEntry);

            addFeedback(feedbackEntry)
                .then(res => {
                    console.log("res:", res);
                    setRerender(true);
                })
                .catch(err => console.log("ERROR:", err));
        } else { // if feedback is given to the organiser
            const feedbackEntry = {
                comment: data.feedback,
                receiverID: programme.organiser_id,
                programmeID: id,
                rating: null
            }
            setStore((prevStore) => [...prevStore, feedbackEntry]);

            // Save or process the feedback entry as needed
            console.log("Feedback Entry:", feedbackEntry);
            addOrgFeedback(feedbackEntry)
                .then(res => console.log("res:", res))
                .catch(err => console.log("ERROR:", err))
            setRerender(true);
        }
        reset({ feedback: "" })
    }

    let content;
    console.log("store:", store)
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
                            <MenuItem value={`${item.id}`} key={index}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <ErrorMessage
                        errors={errors}
                        name="person"
                        render={({ message }) => <p style={{ color: "#ff0000", margin: "0px", marginLeft: "35px" }}>{message}</p>}
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
                            render={({ message }) => <p style={{ color: "#ff0000", marginLeft: "35px" }}>{message}</p>}
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

                        {hasContent ? (store.map((value, index) => {
                            let revieweeName;
                            if('organiser_review_id' in value){
                                console.log("org:",value.organiser_review_id);
                                revieweeName = "Organiser"
                            }
                            if('receiver_id' in value){
                                console.log("rec:" ,value.receiver_id);
                                const reviewee = reviewees.find((item) => item.id === value.receiver_id)
                                if(reviewee !== undefined){
                                    revieweeName = reviewee.name
                                }
                            }
                            return (
                                <Box key={index}>
                                    <Typography my="10px">Feedback to {revieweeName}</Typography>
                                    <Box bgcolor="#FFFFFF" borderRadius="10px" height="60%" p="10px" display="inline-block" minWidth="100%">
                                        <Typography>{value.comment}</Typography>
                                    </Box>
                                </Box>
                            )
                        })) : <></>}

                    </Box>

                </Box>
                <DevTool control={control} />
            </Box>

    } else if (userType === "organiser") {

        content = <FeedbackTable />
    }

    return (
        <>{content}</>
    )
}

export default Feedback;
