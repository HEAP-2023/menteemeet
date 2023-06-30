import { Box, Typography, Input, TextField, Button } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./validationSchema";
import { DevTool } from "@hookform/devtools";
import useLogin from "../../hooks/login/useLogin";

const LoginForm = () => {
    const {control,formState: {errors} , handleSubmit, reset} = useForm({
        defaultValues : {
            email : "",
            password : "",
        },
        resolver : yupResolver(loginSchema)
    })

    const {mutate : login} = useLogin(reset)
    const handleSave = async (data) => {
        console.log("to be submitted")
        console.log(data)
        login(data);
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
                    <ErrorMessage 
                    errors={errors} 
                    name="email"
                    render={({ message }) => <p style={{color : "#ff0000"}}>{message}</p>}
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Password</label>
                    <Controller
                    name="password"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} type="password"/> }
                    />
                    <ErrorMessage 
                    errors={errors} 
                    name="password"
                    render={({ message }) => <p style={{color : "#ff0000"}}>{message}</p>}
                    />
                </Box>
    
                <Button type="submit" variant="contained" color="secondary" sx={{width:"100%"}}>Log In</Button>
            </Box>
        </form>
        <DevTool control={control} /> 
    </Box>
}

export default LoginForm;