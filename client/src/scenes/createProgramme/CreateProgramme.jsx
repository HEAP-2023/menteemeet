import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { createProgrammeSchema } from "../../components/createProgramme/createProgrammeVSchema";
import { DevTool } from "@hookform/devtools";


import Step1 from "../../components/createProgramme/Step1";
import Step2 from "../../components/createProgramme/Step2";
import Step3 from "../../components/createProgramme/Step3";
import PreviewForm from "../../components/createProgramme/PreviewForm";



const CreateProgramme = () => {

    const [progress, setProgress] = useState(0)
    const [preview, setPreview] = useState(false)
    const methods = useForm({
        defaultValues : {
// new
            deadline : "",
            externalLink : "",
            media : "",
// new
            programmeName : "",
            programmeStart : "",
            programmeEnd : "",
            fixedDates : "",
            frequency : "",
            duration : "",
            mentorCapacity : "",
            menteeCapacity : "",

            matchingCriteria : [],
            description : "",
            
            skills : [],
            interestField : ""
        },
        resolver : yupResolver(createProgrammeSchema)
    })
    const {control,formState: {errors, defaultValues, dirtyFields, isDirty} , handleSubmit, reset, getValues, watch} = methods

    let done = Object.keys(dirtyFields);
    useEffect(() => {
        const total = Object.keys(defaultValues).length
        const dirty = done.filter(key => dirtyFields[key] === true || dirtyFields[key].length > 0)
        if(isDirty){
            let result = Math.round(dirty.length * 100 / total)
            setProgress(result);
        }
    }, [done])



    const handleSave = (data) => {
        console.log("to be submitted")
        console.log(data)
    }
    const testImage = getValues("media")
    return (
    <Box width="100%" p="40px" display="flex" flexDirection="column">
        {/* progress bar */}
        <ProgressBar progress={progress}/>

        <SectionHeader margin="20px" text="Welcome organiser, let’s start to create your mentoring programme." />

    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)} width="100%" >

        {/* step 1 */}
        <Step1 />

        {/* step 2 */}
        <Step2 matchingCriterias={matchingCriterias}/>

        {/* step 3 form creation */}
        <Step3 />

        <Box display="flex" gap="20px">
            <Button type="submit" variant="contained" color="secondary" onClick={() => {console.log("submit??");console.log(errors)}}>Submit</Button>
            <Button /* disabled={progress < 100} */ variant="contained" color="secondary" onClick={() => {setPreview(!preview)}}>Preview Form </Button>
        </Box>

        <PreviewForm open={preview} setPreview={setPreview} getValues={getValues}/>
        </form>
    </FormProvider>
        <DevTool control={control}/>
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