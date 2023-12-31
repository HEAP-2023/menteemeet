import { Box, Typography, FormControlLabel, FormControl, Checkbox, FormGroup } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
const CalendarFilter = ({ onFiltersChange }) => {
    const { handleSubmit, control } = useForm();
    const programmes = useSelector((state) => state.user.programmes)
    // console.log("prog:", programmes);

    const mentorshipProgrammes = programmes.map(item => item.name);
    // console.log("prog names:", mentorshipProgrammes);
    const [selectedFilters, setSelectedFilters] = useState(() => {
        const initialFilters = {};
        mentorshipProgrammes.forEach((item) => {
            initialFilters[item] = true; //Set all filters to true initially
        })
        return initialFilters;
    })

    const handleSave = (data) => {
        // console.log(data);
        onFiltersChange(selectedFilters);   
    }

    useEffect(() => {
        handleSubmit(handleSave)();
    }, [selectedFilters]);

    return (
        <Box sx={{ marginTop: '57px', marginX: '16px' }}>
            <Typography>Filter programmes</Typography>
            <hr />
            <FormControl>

                <FormGroup>
                    {mentorshipProgrammes.map((item, index) => (
                        <Controller
                            key={index}
                            control={control}
                            name={item}
                            defaultValue={true}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked
                                            onChange={(e) => {
                                                field.onChange(e.target.checked); setSelectedFilters((prevFilters) => ({
                                                    ...prevFilters,
                                                    [item]: e.target.checked,
                                                })); 
                                                handleSubmit(handleSave)();
                                            }}
                                            checked={field.checked}
                                        />
                                    }
                                    label={item}
                                    sx={{ display: 'block' }}
                                />
                            )}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </Box>
    )
}

export default CalendarFilter

// const fetchMentorshipProgrammes = () => {
//     return ['ABC Programme', 'DEF Programme', 'XYZ Programme']
// }