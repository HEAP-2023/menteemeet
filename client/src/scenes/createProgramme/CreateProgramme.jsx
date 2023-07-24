import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { createProgrammeSchema } from "../../components/createProgramme/createProgrammeVSchema";
import { DevTool } from "@hookform/devtools";
import usePostProgramme from "../../hooks/programmes/organiser_authorised/usePostProgramme";

import Step1 from "../../components/createProgramme/Step1";
import Step2 from "../../components/createProgramme/Step2";
import Step3 from "../../components/createProgramme/Step3";
import PreviewForm from "../../components/createProgramme/PreviewForm";
import axiosInstance from "../../utils/axiosInstance";
import { postProgramme } from "../../services/programmes/organiserServices";



const CreateProgramme = () => {

    const [progress, setProgress] = useState(0)
    const [preview, setPreview] = useState(false)
    const methods = useForm({
        defaultValues : {
            name : "",
            programmeStart : "",
            programmeEnd : "",
            deadline : "",
            display_image : "",
            mentorCapacity : "",
            menteeCapacity : "",

            matching_criteria : [],
            description : "",
            
            skills : [],
            category : ""
        },
        resolver : yupResolver(createProgrammeSchema)
    })
    const {control,formState: {errors, defaultValues, dirtyFields, isDirty} , handleSubmit, reset, getValues, watch} = methods
    const watchMatching = watch("matching_criteria")
    let done = Object.keys(dirtyFields);

    useEffect(() => {
        const max = Object.keys(defaultValues).length
        const dirty = done.filter(key => dirtyFields[key] === true || dirtyFields[key].length > 0)
        let total = max;
        if(!watchMatching.includes("skill")){total = total - 1}
        if(!watchMatching.includes("interest")){total = total - 1}
        if(isDirty){
            let result = Math.round(dirty.length * 100 / total)
            setProgress(result);
        }
    }, [done, watchMatching])


    const { mutate : createProgramme } = usePostProgramme()

    const handleSave = async (data) => {
        console.log("to be submitted")
        const formattedData = {...data, 
            skills : JSON.stringify(data.skills.map(skill => skill.skillName)),
            matching_criteria : JSON.stringify(data.matching_criteria)
        }
        console.log(formattedData)
        createProgramme(formattedData);

        // try {
        //     await postProgramme(formattedData);
        // } catch (err) {
        //     console.log(err);
        // }
    }
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

        {/* <Box display="flex" gap="20px"> */}
            <Button type="submit" variant="contained" color="secondary">Submit</Button>
            <Button /* disabled={progress < 100} */ variant="contained" color="secondary" onClick={() => {setPreview(!preview)}}>Preview Form </Button>
        {/* </Box> */}

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