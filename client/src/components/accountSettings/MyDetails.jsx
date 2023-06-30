import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Grid, TextField } from "@mui/material";
import CustomButton from '../../components/programme/CustomButton';
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const MyDetails = ({ acctInfo }) => {
    const {
        name,
        email, username, telegramUsername, contactNumber } = acctInfo;

    const myDetailsSchema = yup.object()
        .shape(
            {
                fullName: yup.string()
                    .required("Full name is required"),
                email: yup.string()
                    .email("Invalid email format")
                    .required("Email is required"),
                username: yup.string()
                    .required("Username is required"),
                contactNumber: yup.string()
                    .required("Contact number is required")
                    .matches(/^\d{8,}$/, "Invalid contact number format")                  
            }
        ).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fullName: name,
            email: email,
            username: username,
            contactNumber: contactNumber,
            telegramUsername: telegramUsername,
        },
        resolver: yupResolver(myDetailsSchema)
    });


    const handleSave = (data) => {
        const accountSettingsSave = {
            fullName: data.fullName,
            email: data.email,
            username: data.username,
            contactNumber: data.contactNumber,
            telegramUsername: data.telegramUsername,
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
        name: "fullName",
        label: "Full Name",
    }, {
        id: 2,
        name: "email",
        label: "Email",
    }, {
        id: 3,
        name: "username",
        label: "Username",
    },
    {
        id: 4,
        name: "contactNumber",
        label: "Contact Number",
    },
    {
        id: 5,
        name: "telegramUsername",
        label: "Telegram Username",
    },
]