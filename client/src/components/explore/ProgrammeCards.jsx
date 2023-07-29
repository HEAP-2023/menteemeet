import React from 'react'
import { Card } from '@mui/material'


export default function ProgrammeCards({
    progName,
    progDesc,
    progDL,
}) {
  return (
        <Card
            fontFamily="prompt" fontWeight="300"
            sx={{ width:"100%", marginTop:"20px", paddingLeft:"20px"}}>
            <p>Programme Name: {progName}</p>
            <p>Programme Description: {progDesc}</p>
            <p>Deadline: {progDL}</p>
        </Card>
  )
}
