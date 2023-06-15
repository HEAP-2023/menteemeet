// https://www.npmjs.com/package/react-material-ui-carousel

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import { Card, Button, CardMedia, Grid } from '@mui/material'
import { splitObjIntoArrSize } from "../../functions";


const Item = ({content}) => {
    const {id, name, img, link} = content;
    return (
        <Card sx={{height : "100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <CardMedia
            sx={{ height: "85%", alt:"unable to display", objectFit: "contain" }}
             component="img"
             src={img}
            />
            <Button color="primary" variant="contained" component={Link} to={link}>
                <Typography>Sign Up</Typography>
            </Button>
        </Card>
    )
}

const Banner = ({content}) => {
    return (<Grid container display="flex" justifyContent="center" height="100%" columnSpacing={2}>
        {content.map(item => {
            return (
            <Grid item display="flex" flexDirection="column" height="100%" key={`${item.id}`}>
                <Item content={item}/>
            </Grid>)
        })}
    </Grid>);
}

const HomeCarousel = ({content}) => {
    const banners = splitObjIntoArrSize(3, content);

    return (
        <Box width="100%">
            <Carousel height="300px">
                {
                    banners.map(banner => <Banner content={banner} key={`${banner[0].link}-banner`}/>)
                }
            </Carousel>
        </Box>
    );
}
export default HomeCarousel;