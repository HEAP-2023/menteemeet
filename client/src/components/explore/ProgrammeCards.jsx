import React from 'react'
import { Card, Typography, CardMedia } from '@mui/material'



export default function ProgrammeCards({
    progImg,
    progName,
    progDesc,
    progDL,
}) {

  // return (
  //       <Card
  //           sx={{ width:"100%", marginTop:"20px", padding:"20px", borderRadius:"20px"}}>
  //           <div width="50px" length="50px" overflow="hidden">
  //             <img src="../images/loginExplore/Untitled design (2).png" 
  //                   style={{borderRadius:"80%", height:"auto", width:"30%", objectFit:"cover"}}>
  //             </img>
  //           </div>
            
  //           <>
  //             <Typography
  //               fontFamily="prompt" fontWeight="400">
  //               Programme Name: {progName}</Typography>
  //             <Typography
  //               fontFamily="prompt" fontWeight="400">Programme Description: {progDesc}</Typography>
  //             <Typography
  //               fontFamily="prompt" fontWeight="400">Deadline: {progDL}</Typography>
  //           </>
  //       </Card>
  // )
  const cardStyle = {
    width: "100%",
    marginTop: "20px",
    padding: "20px",
    borderRadius: "20px",
    display: "flex", // Add flex display to enable side-by-side layout
  };

  const imageContainerStyle = {
    width: "50px",
    height: "50px",
    overflow: "hidden",
    borderRadius: "50%",
  };

  const imageStyle = {
    width: "auto",
    height: "auto",
    objectFit: "scale-down",
  };

  const textContainerStyle = {
    marginLeft: "30px", // Add some spacing between the image and text
  };

  return (
    <Card sx={cardStyle}>
      <div style={imageContainerStyle}>
        <img src={"../images/loginExplore/Untitled design (2).png"} alt="Programme" style={imageStyle} />
      </div>

      <div style={textContainerStyle}>
        <Typography fontFamily="prompt" fontWeight="400">
          Programme Name: {progName}
        </Typography>
        <Typography fontFamily="prompt" fontWeight="400">
          Programme Description: {progDesc}
        </Typography>
        <Typography fontFamily="prompt" fontWeight="400">
          Deadline: {progDL}
        </Typography>
      </div>
    </Card>
  );
};
