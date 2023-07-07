import { Box, Typography, Select, MenuItem, InputLabel, FormControl, TextField  } from "@mui/material";
import PageHeader from "../../PageHeader";
import { Controller } from "react-hook-form";

const InterestSection = ({control}) => {
    const sectors = fetchSectors();

    return (
        <Box>
            <PageHeader text="Interests" margin="20px 0"/>
            <Box>
                <FormControl fullWidth >
                <Controller
                        name="interestField"
                        control={control}
                        render={({field}) => 
                    <TextField
                        {...field}
                        select
                        label="Sector"
                        variant="outlined"
                        sx={{
                            "& .MuiInputLabel-root": {
                              color: "secondary.main"
                            },
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                              borderColor: "secondary.main"
                            }
                        }}
                    >
                    {sectors.map(sector => 
                        <MenuItem value={sector} key={sector}>{sector}</MenuItem>
                    )}
                    </TextField>}
                    />
                </FormControl>
            </Box>

            <Box>
                <Typography>Select you top 3 interest relevant to this Sector</Typography>
                <Box display="flex" gap="20px">
                    <TextField fullWidth
                        disabled
                        select
                        value=""
                        label="Interest 1"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        disabled
                        select
                        value=""
                        label="Interest 2"
                        variant="outlined"
                        children={[]}
                    />
                    <TextField fullWidth
                        disabled
                        select
                        value=""
                        label="Interest 3"
                        variant="outlined"
                        children={[]}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default InterestSection;


const fetchSectors = () => {
    //  can fetch thru online api later
    return (
        ["Tech", "Business", "Competition"]
    )
}