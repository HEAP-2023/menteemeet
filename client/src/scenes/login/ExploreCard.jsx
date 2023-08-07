import { Box, Card, Typography, CardMedia } from "@mui/material"
const ExploreCard = ({image}) => {
    return (
        <Card
        sx={{ height:"80%", width:"18%", borderRadius:"20px", mt:"30px",
        alignItems:"flex-start", padding:"30px", backgroundPosition: "centre",
        backgroundSize: "cover", color: "#FFFFFF", textTransform:"none"}}
        >
        <div style={{ position: "relative" }}>
          <CardMedia  component="img" width="100%" image={image}/> 
          <Typography fontFamily="prompt" fontWeight="500" variant="h5">Career Development</Typography>

          {/* <div style={{position: "absolute", color: "white",top: 10,left: "50%",transform: "translateX(-50%)",}}> Some text</div> */}
      </div>

    </Card>)
}

export default ExploreCard