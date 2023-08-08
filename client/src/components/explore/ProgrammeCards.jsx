import React from 'react'
import { Card, Typography, CardMedia } from '@mui/material'
import {Box} from '@mui/material';
import { ImgGetUrl } from '../../functions';



export default function ProgrammeCards({
    progImg,
    progName,
    progDesc,
    progDL,
}) {

  // useEffect(() => {
  //   console.log("PROGIMG:", progImg);
  // }, [])

  const img = ImgGetUrl(progImg);
  if (img) console.log("PROGIMG:", img);

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
      <Box
        sx={{
          width:"100px", height:"100px", marginBottom:"20px", borderRadius:"15px", backgroundPosition:"center",
          backgroundImage: `url('${img}')`,
          position:"relative", overflow:"hidden", backgroundSize:"cover"
        }}>
      </Box>
      <div>
        <Typography fontFamily="prompt" fontWeight="400">
          Name: {progName}
        </Typography>
        <Typography fontFamily="prompt" fontWeight="400">
          Description: {progDesc}
        </Typography>
        <Typography fontFamily="prompt" fontWeight="400">
          Deadline: {progDL}
        </Typography>
      </div>
    </Card>
  );
};
