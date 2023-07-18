import { Box, Typography, Divider,Stack, TextField } from "@mui/material"
import { useSelector } from 'react-redux'
import PageHeader from "../../PageHeader"
import SectionHeader from "../../SectionHeader"
import StandardTextField from "../../StandardTextField"
import MenteePreferenceSelector from "./MenteePreferenceSelector"
import MentorPreferenceSelector from "./MentorPreferenceSelector"
import SkillUsers from "../../createProgramme/SkillUsers"
import WeekSelectionCalendarSubmitable from "./WeekSelectionCalendarSubmitable"

import { useForm, Controller, FormProvider } from "react-hook-form"
import { DevTool } from "@hookform/devtools";

const SignUpForm = (id={id}) => {
    const details = fetch_details(id)
    const {
        category ,
        deadline,
        description,
        matching_criteria,
        name,
        programmeEnd,
        programmeStart,
        skills,
    } = details
    const skillSet = JSON.parse(skills);
    const matching_criteria_set = JSON.parse(matching_criteria)

    const {account_type, name : userName, email, telegram_username} = useSelector((state) => state.user.userBasicDetails)

    const methods = useForm({
        defaultValues :{
            name : userName, 
            email : email, 
            tele : telegram_username,
            availabilities : [],
            skill : [], //array of objects {skillName : "", rating : "", elaboration : ""}
            interests : [], // interest 1,2,3,
            preferredMentors : [],
            preferredMentees : [],
        }
    })

    const {control,formState: {errors, defaultValues, dirtyFields, isDirty} , handleSubmit, reset, getValues, watch} = methods


    return (
        <Box>
            <FormProvider {...methods}>
            <form>
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
                            skillSet.map(skill => {
                                return (
                                <SkillUsers key={skill}>
                                    <Typography fontWeight="700">{skill.skillName}</Typography>
                                </SkillUsers>)
                            })
                        }
                    </Stack>
                }

                {matching_criteria_set.includes("interest") && 
                <Stack>
                    <Typography fontWeight="700">Interest</Typography>
                    <Typography>Select the top 3 areas you are interested in {category}</Typography>

                    <Box display="flex" gap="20px">
                    <TextField fullWidth
                        select
                        value=""
                        label="Interest 1"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        select
                        value=""
                        label="Interest 2"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        select
                        value=""
                        label="Interest 3"
                        variant="outlined"
                        children={[]}
                    />
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
            </form>
            </FormProvider>
            <DevTool control={control}/>
        </Box>
    )
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
