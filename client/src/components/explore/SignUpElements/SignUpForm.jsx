import { Box, Typography, Button, Divider,Stack, TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material"
import { useSelector } from 'react-redux'
import PageHeader from "../../PageHeader"
import SectionHeader from "../../SectionHeader"
import StandardTextField from "../../StandardTextField"
import MenteePreferenceSelector from "./MenteePreferenceSelector"
import MentorPreferenceSelector from "./MentorPreferenceSelector"
import SkillForm from "./SkillForm"
import WeekSelectionCalendarSubmitable from "./WeekSelectionCalendarSubmitable"
import { useForm, Controller, FormProvider, useFieldArray } from "react-hook-form"



import { useEffect } from "react"
import { DevTool } from "@hookform/devtools";
import useGetSignUpForm from "../../../hooks/programmes/users/useGetSignUpForm"
const SignUpForm = ({id}) => {
    console.log(id)
    const {error, isError ,isLoading, isSuccess : getDetailsSuccess, data : details} = useGetSignUpForm({id})
    const {account_type, name : userName, email, telegram_username} = useSelector((state) => state.user.userBasicDetails)
    const methods = useForm({
        defaultValues :{
            name : userName,
            email : email, 
            tele : telegram_username,
            role : "mentee",
            availabilities : [],
            skill : [], //array of objects {skillName : "", rating : "", elaboration : ""}
            interest_1 : "",
            interest_2 : "",
            interest_3 : "",
            preferredMentors : [],
            preferredMentees : [],
        }
    })
    const {control,formState: {errors, defaultValues, dirtyFields, isDirty}, isInitialLoading, handleSubmit, reset} = methods

    const {fields : skillFields} = useFieldArray({
        name : "skill",
        control, 
    })
    useEffect(()=> {
        if(getDetailsSuccess && !isLoading){
        const skillSet = JSON.parse(details.data.programme.skills);
        const skillArr = skillSet.map(skill => ({skillName : skill, rating : 0, elaboration : ""}) )
        reset({skill : skillArr})
        }
    },[details, reset])

    if(isLoading){
        return <h2>loading...</h2>
    }
    if(isError){
        alert(error)
    }


    if(getDetailsSuccess){
        const {
            category ,
            deadline,
            description,
            matching_criteria,
            name,
            programmeEnd,
            programmeStart,
            skills,
        } = details.data.programme
        console.log(details)
        const matching_criteria_set = JSON.parse(matching_criteria)    
        const handleSave = (data) => {
            console.log("to be submitted")
            console.log(data)
        }
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
                    <SectionHeader text="Selection Criteria" margin="20px 0 0 0"/>
                    <Divider/>
                    {matching_criteria_set.includes("availability") &&
                        <Stack>
                            <WeekSelectionCalendarSubmitable programmeStart={programmeStart}/>
                        </Stack>
                    }
    
                    {matching_criteria_set.includes("skill") &&
                        <Stack>
                            {
                                skillFields.map((skill, index) => {
                                    return (
                                    <SkillForm key={skill.skillName} index={index}>
                                        <Typography fontWeight="700">{skill.skillName}</Typography>
                                    </SkillForm>)
                                })
                            }
                        </Stack>
                    }
    
                    {matching_criteria_set.includes("interest") && 
                    <Stack>
                        <Typography fontWeight="700">Interest</Typography>
                        <Typography>Select the top 3 areas you are interested in {category}</Typography>
    
                        <Box display="flex" gap="20px">
                            <Controller name="interest_1" control={control} 
                            render={({field}) =>
                            <TextField 
                                name="interest_1"
                                {...field}
                                fullWidth
                                select
                                label="Interest 1"
                                variant="outlined"
                                children={[]}
                            />}/>
    
                            <Controller name="interest_2" control={control} 
                            render={({field}) =>
                            <TextField 
                                name="interest_2"
                                {...field}
                                fullWidth
                                select
                                label="Interest 2"
                                variant="outlined"
                                children={[]}
                            />}/>
                            
                            <Controller name="interest_3" control={control} 
                            render={({field}) =>
                            <TextField 
                                name="interest_3"
                                {...field}
                                fullWidth
                                select
                                label="Interest 3"
                                variant="outlined"
                                children={[]}
                            />}/>
                    </Box>
                    </Stack>
                    }
    
                    {matching_criteria_set.includes("mentorGrouping") && 
                        <MentorPreferenceSelector/>
                    }
    
                    {matching_criteria_set.includes("menteeGrouping") && 
                        <MenteePreferenceSelector/>
                    }
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
