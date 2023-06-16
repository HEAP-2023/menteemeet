import { Grid, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom";
import DownloadIcon from '@mui/icons-material/Download';

const ResourcesRow = ({ resources }) => {
    const links = resources.filter((item) => item.link);
    const downloads = resources.filter((item) => !item.link)
    return (
        <>
            <Typography marginTop="10px" marginBottom="10px">Links</Typography>
            <Grid container spacing={2} justifyContent="left" >
                {
                    links.map((item) => {
                        return (
                            <Grid item xs={12} sm={12} md={6} >
                                <Button variant="contained" 
                                    sx={{ borderRadius: 2, backgroundColor:"white"}} 
                                    startIcon={<img src={item.icon} alt={item.name} 
                                    style={{width: "20px"}}/>} 
                                    component={Link} to={item.link}
                                    target="_blank">
                                    {item.name}
                                </Button>
                             </Grid>
                        )
                    })
                }
            </Grid>
            <Typography marginTop="10px" marginBottom="10px">Downloads</Typography>
            <Grid container spacing={2} justifyContent="left" >
                {
                    downloads.map((item) => {
                        return (
                            <Grid item xs={12} sm={12} md={6} >
                                <Button variant="contained" 
                                    sx={{ borderRadius: 2, backgroundColor:"white"}}>
                                    {item.name}
                                    <DownloadIcon sx={{ fontSize: 20, ml:1} }/>
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