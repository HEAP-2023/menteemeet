import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Input, TextField, Button } from "@mui/material";
import { ErrorMessage } from '@hookform/error-message';


import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../state(kiv)";

import { yupResolver } from "@hookform/resolvers/yup"
import { signUpSchema } from "./validationSchema";
import { DevTool } from "@hookform/devtools";
import { register } from "../../services/auth/authServices";


const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {control, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues : {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            confirmPassword : "",
        },
        resolver : yupResolver(signUpSchema)
    })

    const handleSave = async (data) => {
        console.log("to be submitted")
        console.log(data)

        try {
          const {authorised, role} = await register(data);
          if (authorised) {
            dispatch(logIn({ type : role }))
            navigate("/");
          }
        } catch (err) {
          alert(err);
          reset();
        }

        // if valid
            // get role  
            // change userType to role
            // navigate to home 

        // else 
            // resetForm 
            // stay here

    }

    return <Box width="100%">
        <form onSubmit={handleSubmit(handleSave)} width="100%">
            <Box display="flex" flexDirection="column" width="100%" gap="20px">
            <Box display="flex" flexDirection="column" width="100%">
                    <label>First Name</label>
                    <Controller
                    name="firstname"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                    />
                    <ErrorMessage 
                    errors={errors} 
                    name="firstname"
                    render={({ message }) => <p style={{color : "#ff0000"}}>{message}</p>}
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Last Name</label>
                    <Controller
                    name="lastname"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} /> }
                    />
                    <ErrorMessage 
                    errors={errors} 
                    name="lastname"
                    render={({ message }) => <p style={{color : "#ff0000"}}>{message}</p>}
                    />
                </Box>
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
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Confirm Password</label>
                    <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field}) => <TextField {...field} variant="outlined" sx={{width:"100%"}} type="password"/> }
                    />
                    <ErrorMessage errors={errors} 
                    name="confirmPassword"
                    render={({ message }) => <p style={{color : "#ff0000"}}>{message}</p>}
                    />
                </Box>
    
                <Button type="submit" variant="contained" color="secondary" sx={{width:"100%"}}>Sign Up</Button>
            </Box>
        </form>
        <DevTool control={control} /> 
    </Box>
}

export default SignUpForm;