import { Stack, Typography, Box, Autocomplete, TextField } from "@mui/material"
import {Controller, useFormContext, useFieldArray } from "react-hook-form"
import { styled } from '@mui/system';
import { ErrorMessage } from "@hookform/error-message";


const Interests = () => {
    const {control, formState : {errors}} = useFormContext();
    const { fields } = useFieldArray({
        control,
        name: "interests"
    })
    return (
        <Stack>
        <Typography fontWeight="700">Interest</Typography>
        <Typography>Select the top 3 areas you are interested </Typography>

        <Box display="flex" gap="20px" mt="15px">
        {fields.map((item, index) => (
        <Box key={item.id} width="100%">
            <Controller 
            name={`interests.${index}.interest`}
            control={control} 
            render={({field}) =>
                <Autocomplete
                disableClearable
                sx={{ width: "100%" }}
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.title}
                value={{firstLetter: field.value[0].toUpperCase(), title : field.value}}
                clearOnBlur={false}
                name={`interests.${index}.interest`} 
                onChange={(event, value) => {
                    field.onChange(value.title);
                }
            }
                renderInput={(params) => 
                    <TextField {...params} 
                        value={field.value}
                        label={`interest ${index + 1}`} 
                        name={`interests.${index}.interest`} 
                        variant="outlined"
                        error={!!errors.interests && errors.interests[index] && errors.interests[index].interest !== 'undefined'}
                        helperText={!!errors.interests && errors.interests[index] && errors.interests[index]?.interests?.message}
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
export default Interests

const getInterests = [
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


const options = getInterests.map((option) => {
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


  