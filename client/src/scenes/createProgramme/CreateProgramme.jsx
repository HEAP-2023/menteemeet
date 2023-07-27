import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { createProgrammeSchema } from "../../components/createProgramme/createProgrammeVSchema";
import { DevTool } from "@hookform/devtools";
import usePostProgramme from "../../hooks/programmes/organiser_authorised/usePostProgramme";

import MainForm from "../../components/createProgramme/MainForm";
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
        },
        resolver : yupResolver(createProgrammeSchema)
    })
    const {control,formState: {errors, defaultValues, dirtyFields, isDirty} , handleSubmit, reset, getValues, watch} = methods
    let done = Object.keys(dirtyFields);

    useEffect(() => {
        const max = Object.keys(defaultValues).length
        const dirty = done.filter(key => dirtyFields[key] === true || dirtyFields[key].length > 0)
        
        if(isDirty){
            let result = Math.round(dirty.length * 100 / max)
            setProgress(result);
        }
    }, [done])


    const { mutate : createProgramme } = usePostProgramme()

    // The code below is working for creating programmes and uploading images (Axel)
    const handleSave = async (data) => {
        console.log(errors)
        console.log("to be submitted")
        const formattedData = {...data, 
            // skills : JSON.stringify(data.skills.map(skill => skill.skillName)),
            matching_criteria : JSON.stringify(data.matching_criteria)
        }
        console.log(formattedData)

        const formData = new FormData();
        for (const key in formattedData) {
            formData.append(key, formattedData[key]);
        }

        console.log(formData);
        // createProgramme(formData);

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

        <MainForm />

        {/* <Box display="flex" gap="20px"> */}
            <Button type="submit" variant="contained" color="secondary" >Submit</Button>
            <Button /* disabled={progress < 100} */ variant="contained" color="secondary" onClick={() => {setPreview(!preview)}}>Preview Form </Button>
        {/* </Box> */}

        <PreviewForm open={preview} setPreview={setPreview} getValues={getValues}/>
        </form>
    </FormProvider>
        <DevTool control={control}/>
    </Box>);
}

export default CreateProgramme;
