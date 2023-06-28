import { Box, Typography, Input, TextField, Button } from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../state(kiv)";

import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "./validationSchema";

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const {control,formState: {errors} , handleSubmit, reset} = useForm({
        defaultValues : {
            email : "",
            password : "",
        },
        resolver : yupResolver(loginSchema)
    })
    
    const handleSave = (data) => {
        console.log("to be submitted")
        console.log(data)

        // if valid
            // get role  
            // change userType to role
            // navigate to home 

            const role = "mentee"
            dispatch(logIn({type : role }))
            navigate("/")

        // else 
            // resetForm 
            // stay here

            // reset();
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
                    <ErrorMessage errors={errors} name="email"/>
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Password</label>
                    <Controller
                    name="password"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                    />
                    <ErrorMessage errors={errors} name="password"/>
                </Box>
    
                <Button type="submit" variant="contained" color="secondary" sx={{width:"100%"}}>Log In</Button>
            </Box>
        </form>
    </Box>
}

export default LoginForm;