import { Box, Button, Typography } from "@mui/material"
import { useState } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller } from "react-hook-form";
import Step1 from "../../components/createProgramme/Step1";
import Step2 from "../../components/createProgramme/Step2";
import Step3 from "../../components/createProgramme/Step3";

const CreateProgramme = () => {
    const [progress, setProgress] = useState(10);

    const {control,formState: {errors} , handleSubmit, reset, watch} = useForm({
        defaultValues : {
            programmeName : "",
            programmeStart : "",
            programmeEnd : "",
            fixedDates : "",
            frequency : "",
            duration : "",
            expectedMentors : "",
            expectedMentees : "",

            matchingCriteria : [],
            introPara : "",
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

        <form onSubmit={handleSubmit(handleSave)} width="100%" >

        {/* step 1 */}
        <Step1 control={control} errors={errors}/>

        {/* step 2 */}
        <Step2 control={control}  matchingCriterias={matchingCriterias}/>

        {/* step 3 form creation */}
        <Step3 control={control} 
                errors={errors} 
                watch={watch}/>

        <Button type="submit"  variant="contained" color="secondary">Submit</Button>
        </form>
    </Box>);
}

export default CreateProgramme;


const matchingCriterias = [
    {
        label : "Availability",
        value : "availability"
    },
    {
        label : "Skill",
        value : "skill"
    },
    {
        label : "Interest",
        value : "interest"
    },
    {
        label : "Mentor Grouping",
        value : "mentorGrouping"
    },
    {
        label : "Mentee Grouping",
        value : "menteeGrouping"
    }
]