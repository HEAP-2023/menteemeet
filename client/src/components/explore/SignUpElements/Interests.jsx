import { Stack, Typography, Box } from "@mui/material"
import {Controller, useFormContext, useFieldArray } from "react-hook-form"
import SelectField from "../../SelectField";
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

        <Box display="flex" gap="20px">
        {fields.map((item, index) => (
        <Box key={item.id} width="100%">
            
            <Controller 
            name={`interests.${index}.interest`}
            control={control} 
            render={({field}) =>
                <SelectField
                select={true}
                selectChildren={getInterests}
                field={field}
                label={`interest ${index + 1}`}
                errors={errors}
                name="interests"
                />
            }/>

        </Box>))}

        </Box>
    </Stack>


    )
}
export default Interests

const getInterests = ["interest1", "interest2", "interest3"]