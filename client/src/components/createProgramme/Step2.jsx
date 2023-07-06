import { Box, Typography, Button, TextField, FormControl } from "@mui/material"
import SectionHeader from "../../components/SectionHeader";
import { Controller } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";

const Step2 = ({control, matchingCriterias}) => {


    return (
    <Box width="100%" p="40px" display="flex" flexDirection="column" bgcolor="#F1F1F1" m="20px 0">
        <SectionHeader margin="0" text="Step 2 - Group Matching"/>
        <SectionHeader margin="0" text="Inform us about your desired criteria for group matching, which will be incorporated into our advanced matching algorithm"/>

            <Box display="flex" flexDirection="column" width="100%" gap="20px" p="20px">
                    <label>Matching Criteria</label>
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