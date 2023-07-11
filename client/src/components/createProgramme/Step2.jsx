import { Box, Typography, Button, TextField, FormControl } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { Controller } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"


const Step2 = ({matchingCriterias}) => {
    const {control, formState : {errors}} = useFormContext();


    return (
    <Box width="100%" p="40px" display="flex" flexDirection="column" bgcolor="#F1F1F1" m="20px 0">
        <SectionHeader margin="0" text="Step 2 - Group Matching"/>
        <SectionHeader margin="0" text="Inform us about your desired criteria for group matching, which will be incorporated into our advanced matching algorithm"/>

            <Box display="flex" flexDirection="column" width="100%" gap="20px" p="20px">
                <label>Matching Criteria</label>
                <ErrorMessage errors={errors} name="matchingCriteria" 
                render={({message}) => 
                <Typography sx={{color: "#ff0000"}}>
                    {message}
                </Typography>}/>
        <Box width="70%" >

            <FormControl >
                <FormGroup  >
                    <Controller
                    name="matchingCriteria"
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

    </Box>);
}

export default Step2;