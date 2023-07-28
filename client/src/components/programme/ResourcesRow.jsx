import { Grid, Typography, Button, TextField } from "@mui/material"
import Modal from '@mui/base/Modal';
import { Link } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from "@mui/material"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useRef, useState } from "react";
import { useSelector } from "react-redux"
import CustomButton from "./CustomButton"
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";

const ResourcesRow = ({ resources }) => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const links = resources.filter((item) => item.link);
    const downloads = resources.filter((item) => !item.link)
    const [linkModalOpen, setLinkModalOpen] = useState(false);
    const handlelinkModalOpen = () => setLinkModalOpen(true);
    const handlelinkModalClose = () => setLinkModalOpen(false);
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Handle file upload logic here
        console.log('Selected file:', file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const { control, handleSubmit,reset, formState: { errors } } = useForm();
    const handleSave = (data) => {
        console.log(data);
        handlelinkModalClose();
        reset({ link: "" })
    }
    return (
        <>
            {userType === "organiser" ? (<Box display="flex" width={"95%"} alignItems={"center"} margin="10px">
                <Typography marginTop="10px" marginBottom="10px">Links</Typography>
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: "#333D55",
                        ml: 1,
                        mt: 1,
                        ":hover": {
                            backgroundColor: "#333D55",
                            opacity: 0.6
                        },
                        height: "30px"
                    }}
                    endIcon={<AddOutlinedIcon />}
                    onClick={handlelinkModalOpen}
                >Add</Button>
                <Modal
                    open={linkModalOpen}
                    onClose={handlelinkModalClose}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 5,
                        p: 2,
                        outline: 'none',
                        height: '200px',
                        width: '450px',
                        borderRadius: '20px'
                    }}>
                        <form onSubmit={handleSubmit(handleSave)}>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <CloseIcon onClick={handlelinkModalClose} sx={{ cursor: "pointer" }} />
                            </Box>
                            <Typography>
                                Add a link
                            </Typography>
                            <Controller name="link" defaultValue={""} control={control} render={({field}) => 
                            <TextField {...field} sx={{ size: "small", width: "100%" }} />
                            }/>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <CustomButton buttonName={"Save"} />
                            </Box>
                        </form>
                    </Box>
                </Modal>
            </Box>) : (<Typography marginTop="10px" marginBottom="10px">Links</Typography>)}

            <Grid container spacing={2} justifyContent="left" >
                {
                    links.map((item, index) => {
                        return (
                            <Grid item xs={12} sm={12} md={6} key={index}>
                                <Button variant="contained"
                                    sx={{ borderRadius: 2, backgroundColor: "white", boxShadow: 1 }}
                                    startIcon={<img src={item.icon} alt={item.name}
                                        style={{ width: "20px" }} />}
                                    component={Link} to={item.link}
                                    target="_blank">
                                    {item.name}
                                </Button>
                            </Grid>
                        )
                    })
                }
            </Grid>

            {userType === "organiser" ? (<Box display="flex" width={"95%"} alignItems={"center"} margin="10px">
                <Typography marginTop="10px" marginBottom="10px">Downloads</Typography>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Button
                    sx={{
                        color: "white",
                        backgroundColor: "#333D55",
                        ml: 1,
                        mt: 1,
                        ":hover": {
                            backgroundColor: "#333D55",
                            opacity: 0.6
                        },
                        height: "30px"
                    }}
                    endIcon={<FileUploadOutlinedIcon />}
                    type="file"
                    onClick={handleButtonClick}
                >Upload</Button>
            </Box>) : (<Typography marginTop="10px" marginBottom="10px">Downloads</Typography>)}

            <Grid container spacing={2} justifyContent="left" >
                {
                    downloads.map((item, index) => {
                        return (
                            <Grid item xs={12} sm={12} md={6} key={index}>
                                <Button variant="contained"
                                    sx={{ borderRadius: 2, backgroundColor: "white", boxShadow: 1 }}>
                                    {item.name}
                                    <DownloadIcon sx={{ fontSize: 20, ml: 1 }} />
                                </Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}

export default ResourcesRow;