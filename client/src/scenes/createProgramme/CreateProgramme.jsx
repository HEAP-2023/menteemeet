import { Box, Typography } from "@mui/material"
import { useState } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller } from "react-hook-form";
import Step1 from "../../components/createProgramme/Step1";
import Step2 from "../../components/createProgramme/Step2";


const CreateProgramme = () => {
    const [progress, setProgress] = useState(10);

    const {control,formState: {errors} , handleSubmit, reset} = useForm({
        defaultValues : {
            programmeName : "",
            programmeStart : "",
            programmeEnd : "",
            fixedDates : "",
            frequency : "",
            duration : "",
            expectedMentors : "",
            expectedMentees : "",

            matchingCriteria : "",
        },
    })


    const handleSave = (data) => {
        console.log("to be submitted")
        console.log(data)
    }

    return (
    <Box width="100%" p="40px" display="flex" flexDirection="column">
        {/* progress bar */}
        <ProgressBar progress={progress}/>

        <SectionHeader margin="20px" text="Welcome organiser, let’s start to create your mentoring programme." />

        {/* step 1 */}
        <Step1 control={control} handleSubmit={handleSubmit(handleSave)} />

        {/* step 2 */}
        <Step2 control={control} handleSubmit={handleSubmit(handleSave)}/>
    </Box>);
}

export default CreateProgramme;