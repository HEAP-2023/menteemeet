import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Grid, TextField } from "@mui/material";
import CustomButton from '../../components/programme/CustomButton';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector } from "react-redux";
import { useUserDetails } from '../../hooks/user/useUserDetails';

const MyDetails = ({ acctInfo }) => {
    const {error, isError, isSuccess} = useUserDetails();
    console.log(error)
    if(isError){
        alert(error.message)
    }




    const userType = useSelector((state) => state.user.userType)
    const {
        name,
        email, telegramUsername, contactNumber, description } = acctInfo;

    const myDetailsSchema = yup.object()
        .shape(
            {
                name: yup.string()
                    .required("Full name is required"),
                email: yup.string()
                    .email("Invalid email format")
                    .required("Email is required"),
                contactNumber: yup.string()
                    .required("Contact number is required")
                    .matches(/^\d{8,}$/, "Invalid contact number format")
            }
        ).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: name,
            email: email,
            contactNumber: contactNumber,
            telegramUsername: telegramUsername,
            description: description
        },
        resolver: yupResolver(myDetailsSchema)
    });


    const handleSave = (data) => {
        const accountSettingsSave = {
            name: data.name,
            email: data.email,
            contactNumber: data.contactNumber,
            telegramUsername: data.telegramUsername,
            description: data.description
        }

        console.log("Updated account settings:", accountSettingsSave);
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSave)} noValidate>
                <Box display="flex" p="20px" alignItems={"center"}>
                    <Box>
                        <AccountCircleOutlinedIcon fontSize="large" sx={{ transform: "scale(4)", margin: "40px" }} />
                    </Box>
                    <Box sx={{ marginLeft: "20px" }}>
                        <CustomButton buttonName={"Change"} />
                    </Box>
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

                        {(userType === "mentee" || userType === "mentor") && <Grid display="flex" flexDirection="column" margin="5px" xs={4} item={true}>
                            <label>Telegram Username</label>
                            <Controller name="telegramUsername" control={control} render={({ field }) =>
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
        name: "contactNumber",
        label: "Contact Number",
    },
]