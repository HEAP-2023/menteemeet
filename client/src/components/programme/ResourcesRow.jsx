import { Grid, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from "@mui/material"
import CustomButton from "./CustomButton";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useRef } from "react";
import { useSelector } from "react-redux";

const ResourcesRow = ({ resources }) => {
    const userType = useSelector((state) => state.user.userType)
    const links = resources.filter((item) => item.link);
    const downloads = resources.filter((item) => !item.link)
    const fileInputRef = useRef(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Handle file upload logic here
        console.log('Selected file:', file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <>
            {userType === "organiser" ? (<Box display="flex" width={"95%"} alignItems={"center"} margin="10px">
                <Typography marginTop="10px" marginBottom="10px">Links</Typography>
                <CustomButton buttonName={"Add"} height="30px" endIcon={<AddOutlinedIcon />} />
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