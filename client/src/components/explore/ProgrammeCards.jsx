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
  return (
    <Card
      sx={{width:"100%", mt:"20px", padding:"20px", borderRadius:"20px"}}>
      <div
        style={{width:"50px"}}>
        <img src="/images/loginExplore/categories(1).png">
        </img>
      </div>

      <div>
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
