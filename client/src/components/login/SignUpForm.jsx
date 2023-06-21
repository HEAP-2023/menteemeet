import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Input, TextField, Button } from "@mui/material";

const SignUpForm = () => {
    const {control, handleSubmit} = useForm({
        defaultValues : {
            email : "",
            password : "",
            confirmPassword : "",
        }
    })

    const handleSave = (data) => {
        console.log("to be submitted")
        console.log(data)
    }

    return <Box width="100%">
        <form onSubmit={handleSubmit(handleSave)} width="100%">
            <Box display="flex" flexDirection="column" width="100%" gap="20px">
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Email</label>
                    <Controller
                    name="email"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Password</label>
                    <Controller
                    name="password"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Confirm Password</label>
                    <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                    />
                </Box>
    
                <Button type="submit" variant="contained" color="secondary" sx={{width:"100%"}}>Sign Up</Button>
            </Box>
        </form>
    </Box>
}

export default SignUpForm;