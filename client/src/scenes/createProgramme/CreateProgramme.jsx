import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { createProgrammeSchema } from "../../components/createProgramme/createProgrammeVSchema";
import { DevTool } from "@hookform/devtools";


import Step1 from "../../components/createProgramme/Step1";
import Step2 from "../../components/createProgramme/Step2";
import Step3 from "../../components/createProgramme/Step3";



const CreateProgramme = () => {

    const [progress, setProgress] = useState(0)
    const {control,formState: {errors, defaultValues, dirtyFields} , handleSubmit, reset, getValues, watch} = useForm({
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

    let done = Object.keys(dirtyFields).length
    useEffect(() => {
        const total = Object.keys(defaultValues).length
        if(done > 0){
            let result = Math.round(done * 100 / total)
            setProgress(result);
        }
    }, [done])



    const handleSave = (data) => {
        console.log("to be submitted")
        console.log(data)
    }
    const testImage = getValues("media")
    console.log(testImage)
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
                watch={watch}
            />

        <Box display="flex" gap="20px">
            <Button type="submit" variant="contained" color="secondary" onClick={() => {console.log("submit??");console.log(errors)}}>Submit</Button>
            <Button variant="contained" color="secondary">Preview Form </Button>
        </Box>
        </form>
        {/* <img src={}/> */}
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