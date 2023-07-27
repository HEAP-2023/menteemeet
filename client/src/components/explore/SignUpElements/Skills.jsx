import { Stack, Typography, TextField, Box } from "@mui/material"
import {Controller, useFieldArray, useFormContext } from "react-hook-form"
import StandardTextField from "../../StandardTextField";
import SelectField from "../../SelectField";
const Skills = () => {
    const {control, formState : {errors}} = useFormContext();
    const { fields } = useFieldArray({
        control,
        name: "skills"
    })

    return (
        <Stack>
        <Typography fontWeight="700">Skill</Typography>
        <Typography>Select the your top 3 skills </Typography>

        <Box display="flex" gap="20px">
        
        {fields.map((item, index) => (
        <Box key={item.id} width="100%">
            
            <Controller 
            name={`skills.${index}.skill`}
            control={control} 
            render={({field}) =>
                <SelectField
                select={true}
                selectChildren={getSkills}
                field={field}
                label={`skill ${index + 1}`}
                errors={errors}
                name="skill"
                />
            }/>

        </Box>))}

        </Box>
    </Stack>


    )
}
export default Skills


// <Controller name="skill_2" control={control} 
// render={({field}) =>
// <TextField 
//     name="skill_2"
//     {...field}
//     fullWidth
//     select
//     label="skill 2"
//     variant="outlined"
//     children={[]}
// />}/>

// <Controller name="skill_3" control={control} 
// render={({field}) =>
// <TextField 
//     name="skill_3"
//     {...field}
//     fullWidth
//     select
//     label="skill 3"
//     variant="outlined"
//     children={[]}
// />}/>

const getSkills = ["skill_a", "skill_b", "skill_c"]