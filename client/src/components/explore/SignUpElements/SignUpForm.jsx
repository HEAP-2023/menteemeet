import { Box, Typography, Button, Divider,Stack, TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import { useSelector } from 'react-redux'
import PageHeader from "../../PageHeader"
import SectionHeader from "../../SectionHeader"
import StandardTextField from "../../StandardTextField"
import { useForm, Controller, FormProvider } from "react-hook-form"

import { DevTool } from "@hookform/devtools";
import useGetSignUpForm from "../../../hooks/programmes/users/useGetSignUpForm"
import Interests from "./Interests"
import Skills from "./Skills"
import AvailabilityCBox from "./AvailabilityCBox"
import usePostSignUpForm from "../../../hooks/user/usePostSignUpForm"
const SignUpForm = ({id}) => {
    const {error, isError ,isLoading, isSuccess : getDetailsSuccess, data : details} = useGetSignUpForm({id})
    const {account_type, name : userName, email, telegram_username} = useSelector((state) => state.user.userBasicDetails)
    const methods = useForm({
        defaultValues :{
            name : userName,
            email : email, 
            tele : !!telegram_username ? telegram_username : "none",
            role : "mentee",
            skills : [{skill : "-"}, {skill : "-"}, {skill : "-"}],
            interests : [{interest : "-"}, {interest : "-"}, {interest : "-"}],
            availability : []
        }
    })
    const {control,formState: {errors, defaultValues, dirtyFields, isDirty}, isInitialLoading, handleSubmit, reset} = methods
    const {mutate : signUp} = usePostSignUpForm()
    const handleSave = (data) => {
        console.log("to be submitted")
        const formattedData = {
            programmeID : id,
            ...data, 
            availability : JSON.stringify(data.availability),
            interests : JSON.stringify(data.interests.map(x => x.interest)),
            skills : JSON.stringify(data.skills.map(x => x.skill)),
        }
        console.log(formattedData)
        signUp(formattedData)
    }

    if(isLoading){
        return <h2>loading...</h2>
    }
    if(isError){
        alert(error)
    }


    if(getDetailsSuccess){
        const {
            deadline,
            description,
            name,
            programmeEnd,
            programmeStart,
        } = details.data.programme
        
        return (
            <Box>
                <FormProvider {...methods}>
                <form onSubmit={handleSubmit(handleSave)}>
                 <Box>
                    <PageHeader text={name} margin="20px 0"/>
    
                    <SectionHeader text="About the Programme: " margin="20px 0 0 0"/>
                    <Divider/>
                    <Box>
                        <Typography>{description}</Typography>
                    </Box>
    
                    <SectionHeader text="Programme Details: " margin="20px 0 0 0"/>
                    <Divider/>
                    <Box>
                        <Typography>{name} is conducted from {programmeStart} to {programmeEnd} </Typography>
                        <Typography>Application deadline: {deadline}</Typography>
                    </Box>
                </Box>
    
                {/* personal details */}
                <Box>
                    <SectionHeader text="Personal Details" margin="20px 0 0 0"/>
                    <Divider/>
                    <Stack direction="row" gap="20px" mt="10px">
                    <Controller
                            name="name"
                            control={control}
                            render={({field}) => 
                        <StandardTextField errors={errors} field={field} name="name" label="Name"/>
                    }/>
                    <Controller
                            name="email"
                            control={control}
                            render={({field}) => 
                        <StandardTextField errors={errors} field={field} name="email" label="Email"/>
                    }/>
                    <Controller
                            name="tele"
                            control={control}
                            render={({field}) => 
                        <StandardTextField errors={errors} field={field} name="tele" label="Telegram handle"/>
                    }/>
                    </Stack>
                    
                    <Stack direction="row" gap="20px" mt="10px" alignItems="center">
                        <Typography>Sign Up as:</Typography>
                        <Controller
                                name="role"
                                control={control}
                                render={({field}) => 
                                <RadioGroup
                                row
                                {...field}>
                                <FormControlLabel value="mentee" control={<Radio color="secondary"/>} label="mentee" />
                                <FormControlLabel value="mentor" control={<Radio color="secondary"/>} label="mentor" />
                            </RadioGroup>
                        }/>
                    </Stack>
                </Box>
                
    
                {/* Selection Criteria */}
                <Box>
                    <Interests/>
                    <Skills/>
                    <AvailabilityCBox/>
                </Box>
                <Button type="submit" variant="contained" color="secondary" sx={{mt : "20px"}}>Submit</Button>
       
                </form>
                </FormProvider>
                <DevTool control={control}/>
            </Box>
        )
    
    }


   }
export default SignUpForm 

const fetch_details = (id) => {
    
    return (
        {
            category : "Tech",
            deadline: "2023-07-21",
            description: "description of this programme is as follows",
            display_image: "blob:http://localhost:3000/f58c0e27-d8d4-4b5d-8fbe-24ad6fc6a5e1",
            matching_criteria:  "[\"availability\",\"skill\",\"interest\",\"mentorGrouping\",\"menteeGrouping\"]",
            menteeCapacity: "100",
            mentorCapacity: "20",
            name: "Heap2023",
            programmeEnd: "2023-07-25",
            programmeStart: "2023-07-20",
            skills:  "[\"skill_a\",\"skill_b\"]"
        }
    )
    
}
