import { Box, Typography,FormGroup, FormControl, FormControlLabel, Checkbox  } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import SectionHeader from "../../SectionHeader";
import { ErrorMessage } from "@hookform/error-message"



const MatchingCriterias = () => {
    const {control, watch, formState : {errors}} = useFormContext();

    return (
        <Box display="flex" flexDirection="column" width="100%" gap="20px" mt="20px">
        <SectionHeader margin="0" text="Matching Criteria"/>
        <Typography>Inform us about your desired criteria for group matching, which will be incorporated into our advanced matching algorithm</Typography>
    
        <ErrorMessage errors={errors} name="matching_criteria" 
        render={({message}) => 
        <Typography sx={{color: "#ff0000"}}>
            {message}
        </Typography>}/>
            <Box width="70%" >
                <FormControl >
                    <FormGroup  >
                        <Controller
                        name="matching_criteria"
                        control={control}
                        render={({field}) => {
    
                    return (<>
                        {matchingCriterias.map((matchingCriteria) => (
                            <FormControlLabel
                            key={matchingCriteria.value}
                            label={matchingCriteria.label}
                            control={
                                <Checkbox
                                color="secondary"
                                value={matchingCriteria.value}
                                checked={field.value.includes(matchingCriteria.value)}
                                onChange={(event, checked) => {
                                    if (checked) {
    // if it is checked add value to array 
                                    field.onChange([
                                        ...field.value,
                                        event.target.value
                                    ]);
                                    } else {
    // else remove from the array
                                    field.onChange(
                                        field.value.filter(
                                        (value) => value !== event.target.value
                                        )
                                    );
                                    }
                                }}
                                />
                            }
                            />
                        ))}
                        </>)}
                    }
                    />
                </FormGroup>
                </FormControl>
            </Box>
        </Box>
    )
}
export default MatchingCriterias

const matchingCriterias = [
    {
        label : "Availability",
        value : "availability"
    },
    {
        label : "Skill",
        value : "skill"
    },
    {
        label : "Interest",
        value : "interest"
    },
]