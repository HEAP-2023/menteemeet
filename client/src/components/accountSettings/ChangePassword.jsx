import CustomButton from '../../components/programme/CustomButton';
import { useForm, Controller } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Typography, Box, FormControl, InputAdornment, OutlinedInput, IconButton } from '@mui/material';

import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup"
import useChangePW from '../../hooks/auth/useChangePW';

const ChangePassword = () => {

    const getCharacterValidationError = (str) => {
        return `Your password must have at least 1 ${str} character`;
    };

    const changePasswordSchema = yup.object()
    .shape(
        {
            currentPassword: yup.string()
                .required("This field is required"),
                // .matches(password, "Incorrect password"),
            newPassword: yup.string()
                .required("This field is required")
                .min(8, "Password must have at least 8 characters")
                .matches(/[0-9]/, getCharacterValidationError("digit"))
                .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
            confirmNewPassword: yup.string()
                .required("This field is required")
                .oneOf([yup.ref('newPassword'), null], 'Passwords must match')

        }
    ).required()

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(changePasswordSchema)
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmNewPassword = (event) => {
        event.preventDefault();
    };

    const { mutate : changePW } = useChangePW();

    const handleSave = (data) => {
        const passwordSave = {
            currentPW: data.currentPassword,
            newPW: data.newPassword,
            confirmNewPW: data.confirmNewPassword
        }
        console.log("Updated password:", passwordSave);
        changePW(passwordSave);
        reset()
    }
    return (
        <>
            <Typography p="20px">Please enter your current password to change your password</Typography>
            <form onSubmit={handleSubmit(handleSave)} noValidate>
                <FormControl sx={{ ml: "20px", width: '25ch', display: "block" }} variant="outlined">
                    <Typography>Current password</Typography>
                    <Controller name="currentPassword" control={control} defaultValue='' render={({ field }) =>
                        <OutlinedInput
                            {...field}
                            id="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    } />
                    <ErrorMessage
                        errors={errors}
                        name="currentPassword"
                        render={({ message }) => <p style={{ color: "#ff0000", margin:"0px" }}>{message}</p>}
                    />
                </FormControl>
                <FormControl sx={{ ml: '20px', width: '25ch', display: "block", mt: '15px' }} variant="outlined">
                    <Typography>New password</Typography>
                    <Controller name="newPassword" control={control} defaultValue='' render={({ field }) =>
                        <OutlinedInput
                            {...field}
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle new password visibility"
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownNewPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    } />
                    <ErrorMessage
                        errors={errors}
                        name="newPassword"
                        render={({ message }) => <p style={{ color: "#ff0000", margin:"0px" }}>{message}</p>}
                    />
                </FormControl>
                <FormControl sx={{ ml: '20px', width: '25ch', display: "block", mt: '15px' }} variant="outlined">
                    <Typography >Confirm new password</Typography>
                    <Controller name="confirmNewPassword" control={control} defaultValue='' render={({ field }) =>
                        <OutlinedInput
                            {...field}
                            id="confirmNewPassword"
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm new password visibility"
                                        onClick={handleClickShowConfirmNewPassword}
                                        onMouseDown={handleMouseDownConfirmNewPassword}
                                        edge="end"
                                    >
                                        {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    } />
                    <ErrorMessage
                        errors={errors}
                        name="confirmNewPassword"
                        render={({ message }) => <p style={{ color: "#ff0000", margin:"0px" }}>{message}</p>}
                    />
                </FormControl>

                <Box p="13px" >
                    <CustomButton buttonName={"Save"} />
                </Box>
            </form>
        </>
    )
}

export default ChangePassword;