import { Stack, Typography, TextField, Box, Autocomplete } from "@mui/material"
import {Controller, useFieldArray, useFormContext } from "react-hook-form"
import { styled } from '@mui/system';

const Skills = () => {
    const {control, formState : {errors}, watch} = useFormContext();
    const { fields } = useFieldArray({
        control,
        name: "skills"
    })

    const roleSelected = watch("role")
    return (
        <Stack>
        <Typography fontWeight="700">Skill</Typography>
        <Typography>Select the your top 3 skills {roleSelected === "mentee" ? "you want" : "you have"}</Typography>

        <Box display="flex" gap="20px" mt="15px">
        
        {fields.map((item, index) => (
        <Box key={item.id} width="100%">
            
            <Controller 
            name={`skills.${index}.skill`}
            control={control} 
            render={({field}) =>
               
                <Autocomplete
                sx={{ width: "100%" }}
                disableClearable
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.title}
                value={{firstLetter: field.value[0].toUpperCase(), title : field.value}}
                clearOnBlur={false}
                onChange={(event, value) => {
                    field.onChange(value.title);
                }
            }
                renderInput={(params) => 
                    <TextField {...params} 
                        value={field.value}
                        label={`skill ${index + 1}`} 
                        name={`skills.${index}.skill`} 
                        error={!!errors.skills && errors.skills[index] && errors.skills[index].skill !== 'undefined'}
                        helperText={!!errors.skills && errors.skills[index] && errors.skills[index]?.skills?.message}
                        />
                }
                renderGroup={(params) => (
                    <li key={params.key}>
                        <GroupHeader>{params.group}</GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                    </li>
                    )
                }
                isOptionEqualToValue={(option, value) => option.title == value.title}
                />
            }/>

        </Box>))}

        </Box>
    </Stack>


    )
}
export default Skills

    

const getSkills =  [
    "-",
    "Negotiation",
    "Public Speaking",
    "Networking",
    "Sales",
    "Marketing",
    "Customer Service",
    "Leadership",
    "Conflict Management",
    "Collaboration",
    "Budgeting",
    "Taxation",
    "Financial Planning",
    "Investment",
    "Retirement Planning",
    "Insurance",
    "Risk Management",
    "Real Estate",
    "Funds",
    "Bonds",
    "Python",
    "Java",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "AI Ethics",
    "Cloud computing",
    "Internet of Things",
    "Cyber security",
    ]

    const options = getSkills.map((option) => {
        if(option == "-"){
            return {
                firstLetter : "-",
                title : "-"
            }
        }
        const firstLetter = option[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          title : option,
        };
      });

      const GroupHeader = styled('div')(() => ({
        position: 'sticky',
        top: '-8px',
        padding: '4px 10px',
        color: "secondary.main",
        backgroundColor: "#f0f0ff"
      }));
      
      const GroupItems = styled('ul')({
        padding: 0,
      });


      