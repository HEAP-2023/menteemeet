import { Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import StandardTextField from "../../StandardTextField";


const Capacity = () => {
    const {control, watch, formState : {errors}} = useFormContext();

    return (
        <Box display="flex" width="100%" gap="20px">
            <Box width="100%" >
                <Controller
                name="mentorCapacity"
                control={control}
                render={({field}) => 
                <StandardTextField errors={errors} field={field} type="number"
                name="mentorCapacity" label="Mentor Capacity" />
            }
                />
            </Box>

            <Box width="100%" >
                <Controller
                name="menteeCapacity"
                control={control}
                render={({field}) => 
                <StandardTextField errors={errors} field={field} type="number"
                name="menteeCapacity" label="Mentee Capacity" />
            }
                />
            </Box>
    </Box>
    )
}
export default Capacity