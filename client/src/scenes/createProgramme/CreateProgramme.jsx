import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, DialogContentText } from "@mui/material"
import { useEffect, useState, forwardRef } from 'react';
import ProgressBar from "../../components/createProgramme/ProgressBar";
import SectionHeader from "../../components/SectionHeader";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { createProgrammeSchema } from "../../components/createProgramme/createProgrammeVSchema";
// import { DevTool } from "@hookform/devtools";
import usePostProgramme from "../../hooks/programmes/organiser_authorised/usePostProgramme";

import MainForm from "../../components/createProgramme/MainForm";
import PreviewForm from "../../components/createProgramme/PreviewForm";
import axiosInstance from "../../utils/axiosInstance";
import { postProgramme } from "../../services/programmes/organiserServices";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FailureModal, SuccessModal } from "../../components/SuccessModal";
import { useDispatch } from "react-redux";
import { setFailureModal, setSuccessModal } from "../../state(kiv)";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const CreateProgramme = () => {
    const queryClient = useQueryClient()
    const [confirmSubmission, setConfirmSubmission] = useState(false)
    const [progress, setProgress] = useState(0)
    const [preview, setPreview] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const methods = useForm({
        defaultValues : {
            name : "",
            programmeStart : "",
            programmeEnd : "",
            deadline : "",
            display_image : "",
            mentorCapacity : "",
            menteeCapacity : "",
            description : "",
        },
        resolver : yupResolver(createProgrammeSchema),
        shouldFocusError : true,
    })
    const {control,formState: {errors, defaultValues, dirtyFields, isDirty} , handleSubmit, reset, getValues} = methods
    
    let done = Object.keys(dirtyFields);

    useEffect(() => {
        const max = Object.keys(defaultValues).length
        const dirty = done.filter(key => dirtyFields[key] === true || dirtyFields[key].length > 0)
        
        if(isDirty){
            let result = Math.round(dirty.length * 100 / max)
            setProgress(result);
        }
    }, [done])


    // const { mutate : createProgramme } = usePostProgramme()

    // The code below is working for creating programmes and uploading images (Axel)
    const handleSave = async (data) => {
        console.log(errors)
        console.log("to be submitted")
        console.log(data["display_image"])
        

        const formData = new FormData();
        for (const key in data) {
            console.log(data)
            formData.append(key, data[key]);
        }

        console.log(formData);
        // createProgramme(formData);

        try {
            await postProgramme(formData);
            queryClient.invalidateQueries(["getInvolved"]);
            dispatch(setSuccessModal(true))
            queryClient.invalidateQueries(["getInvolved"])
        } catch (err) {
            console.log(err);
            dispatch(setFailureModal(true))
            
            //here shouldn't need
            // queryClient.invalidateQueries(["getInvolved"])
        }
    }
    return (
    <Box width="100%" p="40px" display="flex" flexDirection="column">
        <SuccessModal info={"Programme created successfully!"} actions={() => {navigate("/home")}} />
        <FailureModal info={"Failed to create programme"}/>
        {/* progress bar */}
        <ProgressBar progress={progress}/>

        <SectionHeader margin="20px 20px 20px 60px"  text="Let&apos;s start to create your mentoring programme." />

    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSave)} width="100%" id="createProgForm">
       
        <MainForm />

        <Box display="flex" gap="10px" ml="60px">
            <Button disabled={progress < 100} variant="contained" color="secondary" onClick={() => setConfirmSubmission(true)}>Submit</Button>
            <Button disabled={progress < 100}  variant="contained" color="secondary" onClick={() => {setPreview(!preview)}}>Preview Form </Button>
        </Box>

        <PreviewForm open={preview} setPreview={setPreview} getValues={getValues}/>
        <Dialog
        open={confirmSubmission}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setConfirmSubmission(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirm Creation of Programme?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you change your mind later, go to the programme under my programmes to delete
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button color="secondary" type="submit" form="createProgForm" onClick={() => setConfirmSubmission(false)}>Confirm</Button>
          <Button color="secondary" onClick={() => setConfirmSubmission(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </form>
    </FormProvider>
        {/* <DevTool control={control}/> */}
    </Box>);
}

export default CreateProgramme;
