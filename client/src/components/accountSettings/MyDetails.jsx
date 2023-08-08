import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Grid, TextField } from "@mui/material";
import CustomButton from '../../components/programme/CustomButton';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import { useDetails } from '../../hooks/useDetails';
import { useEffect } from 'react';
import { usePutDetails } from '../../hooks/usePutDetails';
import { modifyDetails } from '../../state(kiv)';
import { FailureModal, SuccessModal } from '../SuccessModal';
import NameAvatar from '../NameAvatar';

const MyDetails = () => {
    const defaultValues = {
            name: "",
            email: "",
            contact_no: "",
            telegram_username:  "", 
            description: "",
        }
    const acctName = useSelector((state) => state.user.userBasicDetails.name) 

    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const dispatch = useDispatch()
    const myDetailsSchema = yup.object()
        .shape(
            {
                name: yup.string()
                    .required("Full name is required"),
                email: yup.string()
                    .email("Invalid email format")
                    .required("Email is required"),
                contact_no: yup.string()
                    .required("Contact number is required")
                    .matches(/^\d{8,}$/, "Invalid contact number format")
            }
        ).required()
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(myDetailsSchema)
    });


    // fetching / mutating
    const {error, isError, isSuccess : getDetailsSuccess, data} = useDetails();
    if(isError){
        alert(error.message)
    }
    const {mutate : saveDetails, isSuccess : saveFormSuccess} = usePutDetails()

    useEffect(() => {
        if(getDetailsSuccess){
            const { "Account.name" : name, "Account.email" : email, telegram_username, "Account.contact_no" : contact_no, description} = data
            reset({
                name: name,
                email: email,
                contact_no: !!contact_no ? contact_no : "",
                telegram_username: !!telegram_username ? telegram_username : "", 
                description: !!description ? description : "",
            })
            dispatch(modifyDetails(
                {
                    name : name, 
                    email : email, 
                    telegram_username : telegram_username, 
                    contact_no : contact_no, 
                    description : description
                }
            ))
        }
    }, [getDetailsSuccess, data, reset, saveFormSuccess])


    const handleSave = (data) => {
        const accountSettingsSave = {
            name: data.name,
            email: data.email,
            contact_no: data.contact_no,
            telegram_username: data.telegram_username,
            description: data.description
        }
        saveDetails(accountSettingsSave)
        console.log("Updated account settings:", accountSettingsSave);
    }
   
    // fetching / mutating


    return (
        <>
            <SuccessModal info={"successfully changed details"}/>
            <FailureModal info={"failed to change details"}/>
            <form onSubmit={handleSubmit(handleSave)} noValidate>
                <Box display="flex" p="20px" alignItems={"center"}>
                    <Box>
                        {/* <AccountCircleOutlinedIcon fontSize="large" sx={{ transform: "scale(4)", margin: "40px" }} /> */}
                        <NameAvatar name={acctName} scale={2} m="20px"/>
                    </Box>
                    {/* <Box sx={{ marginLeft: "20px" }}>
                        <CustomButton buttonName={"Change"} />
                    </Box> */}
                </Box>

                <Box display="flex" p="20px" pb="10px" >
                    <Grid container spacing={2} justifyContent="left">
                        {
                            inputs.map((item, index) => {
                                return (
                                    <Grid display="flex" flexDirection="column" margin="5px" xs={4} key={index} item={true}>
                                        <label>{item.label}</label>
                                        <Controller name={item.name} control={control} render={({ field }) =>
                                            <TextField {...field} variant="outlined" size="small" />
                                        } />
                                        <ErrorMessage errors={errors}
                                            name={item.name}
                                            render={({ message }) => <p style={{ color: "#ff0000", margin: "0px" }}>{message}</p>}
                                        />
                                    </Grid>
                                )
                            })
                        }

                        {(userType === "user") && <Grid display="flex" flexDirection="column" margin="5px" xs={4} item={true}>
                            <label>Telegram Username</label>
                            <Controller name="telegram_username" control={control} render={({ field }) =>
                                <TextField {...field} variant="outlined" size="small" />
                            } />
                        </Grid>}
                        
                        {(userType === "organiser") && <Grid display="flex" flexDirection="column" margin="5px" xs={4} item={true}>
                            <label>Description</label>
                            <Controller name="description" control={control} render={({ field }) =>
                                <TextField {...field} variant="outlined" size="small" />
                            } />
                        </Grid>}
                        

                    </Grid>
                </Box>
                <Box p="13px" >
                    <CustomButton buttonName={"Save"} />
                </Box>
            </form>
        </>
    )
}

export default MyDetails;

const inputs = [
    {
        id: 1,
        name: "name",
        label: "Full Name",
    }, {
        id: 2,
        name: "email",
        label: "Email",
    },
    {
        id: 3,
        name: "contact_no",
        label: "Contact Number",
    },
]
