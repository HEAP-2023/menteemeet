// https://www.npmjs.com/package/react-material-ui-carousel

import { Box, CardContent, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import { Card, Button, CardMedia, Grid } from '@mui/material'
import { useSelector } from "react-redux";
import { sliceIntoChunks } from "../../functions";
import SectionHeader from "../SectionHeader";

import useGetExploreProgramme from "../../hooks/programmes/users/useGetExploreProgramme"
import { ImgGetUrl } from "../../functions";

const Item = ({ content }) => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const { programme_id, name, display_image } = content;
    const link = userType === "organiser" ? `/programmes/${programme_id}` : `/explore/${programme_id}`
    const img = ImgGetUrl(display_image)

    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <SectionHeader text={name} margin="0"/>
            <CardContent sx={{display:"flex",flexDirection: "column", alignItems: "center"}}>
                <CardMedia
                    sx={{ height: "85%", alt: "unable to display", objectFit: "contain" }}
                    component="img"
                    src={!!img ? img : "../images/explore/noImageAvailable.jpeg"}
                />

                {userType !== "organiser" ?  (
                <Button color="primary" variant="contained" component={Link} to={link}>
                    <Typography>Sign Up</Typography>
                </Button>
                ) :  (
                <Button color="primary" variant="contained" component={Link} to={link}>
                    <Typography>View</Typography>
                </Button>
                )
                }
            </CardContent>

        </Card>
    )
}

const Banner = ({content}) => {
    return (<Grid container display="flex" justifyContent="center" height="100%" columnSpacing={2}>
        {content.map(item => {
            return (
            <Grid item display="flex" flexDirection="column" height="100%" key={`${item.programme_id}`}>
                <Item content={item}/>
            </Grid>)
        })}
    </Grid>);
}

const HomeCarousel = () => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const programmes = useSelector((state) => state.user.programmes)
    const {data:exploreProgs, isSuccess, isLoading, isError} = useGetExploreProgramme(9)
    console.log(exploreProgs)
    if(userType === "organiser"){
        const banners = sliceIntoChunks(programmes, 3)
        return (
            <Box width="100%">
                <Carousel height="300px">
                    {
                        banners.map(banner => <Banner content={banner} key={`${banner[0]?.programme_id}-banner`}/>)
                    }
                </Carousel>
            </Box>
        );
    }
    else if(isSuccess && exploreProgs.pages[0]?.programmes.length > 0){
        const banners = sliceIntoChunks(exploreProgs.pages[0].programmes, 3)
        return (
            <Box width="100%">
                <Carousel height="300px">
                    {
                        banners.map(banner => <Banner content={banner} key={`${banner[0]?.programme_id}-banner`}/>)
                    }
                </Carousel>
            </Box>
        );
    }
    else if(isSuccess && exploreProgs.pages[0]?.programmes.length < 1){
        return (<Typography>No Programmes Created</Typography>);
    }
    else if (isLoading){
        return <CircularProgress/>
    }
    return <Typography>Error</Typography>
}
export default HomeCarousel;