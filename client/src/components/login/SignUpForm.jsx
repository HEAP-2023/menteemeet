import { useForm, Controller } from "react-hook-form";
import { Box, FormControlLabel,Radio, RadioGroup, TextField, Button } from "@mui/material";
import StandardTextField from "../StandardTextField";

import { yupResolver } from "@hookform/resolvers/yup"
import { signUpSchema } from "./validationSchema";
// import { DevTool } from "@hookform/devtools";
import useSignup from "../../hooks/auth/useSignup"


const SignUpForm = () => {

    const {control, formState: {errors}, handleSubmit, reset} = useForm({
        defaultValues : {
            name : "",
            email : "",
            password : "",
            confirmPassword : "",
            account_type : "user",
        },
        resolver : yupResolver(signUpSchema)
    })

    const {mutate : signup} = useSignup(reset)
    console.log(errors)
    const handleSave = async (data) => {
        console.log("to be submitted")
        console.log(data)
        signup(data)
        
        // original 
        // try {
        //   const {authorised, role} = await register(data);
        //   if (authorised) {
        //     dispatch(logIn({ type : role }))
        //     navigate("/");
        //   }
        // } catch (err) {
        //   alert(err);
        //   reset();
        // }
    }

    return <Box width="100%" height="100%" >
        <form onSubmit={handleSubmit(handleSave)} width="100%" display="flex">
            <Box display="flex" flexDirection="column" width="100%" gap="10px" >
            <Box display="flex" flexDirection="column" width="100%" >
                    {/* <label>First Name</label> */}
                    <Controller
                    name="name"
                    control={control}
                    render={({field}) => 

                    <StandardTextField 
                            errors={errors} 
                            field={field} 
                            name="name" 
                            label="Name"/>
                        
                }
                    />

                </Box>
                
                <Box display="flex" flexDirection="column" width="100%" >
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
                <Box display="flex" flexDirection="column" width="100%">
                    <Controller
                    name="confirmPassword"
                    control={control}
                    render={({field}) => 
                        <StandardTextField 
                            type="password"
                            errors={errors} 
                            field={field} 
                            name="confirmPassword" 
                            label="Confirm Password"/>
                }
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="100%">
                    <label>Account Type:</label>
                    <Controller
                    name="account_type"
                    control={control}
                    render={({field}) => 
                    <RadioGroup
                        row
                        {...field}>
                        <FormControlLabel value="organiser" control={
                            <Radio sx={{'&.Mui-checked': {color: "#AEAEFF"}
                        }}/>} 
                        label="Organiser" />
                        <FormControlLabel value="user" control={
                        <Radio disableRipple sx={{'&.Mui-checked': {color: "#AEAEFF"}
                        }}/>} 
                        label="Mentee/Mentor" />
                      </RadioGroup>
                    }
                    />
                </Box>
                <Button type="submit" variant="contained" color="secondary" sx={{width:"100%"}}>Sign Up</Button>
            </Box>
        </form>
        {/* <DevTool control={control} />  */}
    </Box>
}

export default SignUpForm;