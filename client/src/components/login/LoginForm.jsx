import { Box, Button } from "@mui/material";
import StandardTextField from "../StandardTextField";

import { useForm, Controller } from "react-hook-form";

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
                    <Controller
                    name="email"
                    control={control}
                    render={({field}) => 
                        <StandardTextField 
                            errors={errors} 
                            field={field} 
                            name="email" 
                            label="Email"/>
                }
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <Controller
                    name="password"
                    control={control}
                    render={({field}) => 
                        <StandardTextField 
                            type="password"
                            errors={errors} 
                            field={field} 
                            name="password" 
                            label="Password"/>
                }
                    />
                </Box>
    
                <Button type="submit" variant="contained" color="secondary" sx={{width:"100%"}}>Log In</Button>
            </Box>
        </form>
        <DevTool control={control} /> 
    </Box>
}

export default LoginForm;