import PageHeader from '../../components/PageHeader';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, TextField, Grid } from "@mui/material";
import CustomButton from '../../components/programme/CustomButton';
import { useForm, Controller } from "react-hook-form";


const AccountSettings = ({ acctInfo }) => {
    const {
        name,
        email, username, password, telegramUsername, contactNumber } = acctInfo;


    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: name,
            email: email,
            username: username,
            password: password,
            telegramUsername: telegramUsername,
            contactNumber: contactNumber
        }
    });

    const handleSave = (data) => {
        const accountSettingsSave = {
            fullName: data.fullName,
            email: data.email,
            username: data.username,
            password: data.password,
            telegramUsername: data.telegramUsername,
            contactNumber: data.contactNumber
        }

        console.log("Updated account settings:", accountSettingsSave);
    }
    return <>
        <Box height="100%" display="grid" gridTemplateRows="1fr 3fr 1fr 1fr 1fr 1fr 6fr">
            <form onSubmit={handleSubmit(handleSave)} noValidate>
                <PageHeader text="Account Settings" />

                {/* name and profile pic */}
                <Box display="flex" p="20px" alignItems={"center"}>
                    <Box>
                        <AccountCircleOutlinedIcon fontSize="large" sx={{ transform: "scale(4)", margin: "40px" }} />
                    </Box>
                    <Box sx={{ marginLeft: "20px" }}>
                        <CustomButton buttonName={"Change"} />
                    </Box>
                </Box>

                {/* account details */}
                <Box display="flex" p="20px" pb="10px" >
                    <Grid container spacing={2} justifyContent="left">
                        {
                            inputs.map((value, index) => {
                                return (
                                    <Grid display="flex" flexDirection="column" margin="15px" xs={4}>
                                        <label>{value.label}</label>
                                        <Controller name={value.name} control={control} render={({ field }) =>
                                            <TextField {...field} variant="outlined" size="small" isRequired={value.required} />
                                        } />
                                        <label style={{ color: "#FF0000" }}>{value.errorMessage}</label>
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
        </Box>
    </>
}

export default AccountSettings;

const inputs = [
    {
        id: 1,
        name: "fullName",
        label: "Full Name",
        errorMessage: "Full name is required",
        required: true
    }, {
        id: 2,
        name: "email",
        label: "Email",
        errorMessage: "Email is required",
        required: true
    }, {
        id: 3,
        name: "username",
        label: "Username",
        errorMessage: "Username is required",
        required: true
    },
    {
        id: 4,
        name: "password",
        label: "Password",
        errorMessage: "Password is required",
        required: true
    }, {
        id: 5,
        name: "telegramUsername",
        label: "Telegram Username",
        errorMessage: "Telegram username is required",
        required: true
    }, {
        id: 6,
        name: "contactNumber",
        label: "Contact Number"
    }
]