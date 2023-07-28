import React from 'react'

export default function ProgrammeCards({
    progName,
    progDesc,
    progEnd,
}) {
  return (
    <div>
        <h1>Prog Card</h1>
        <p>{progName}</p>
        <p>{progDesc}</p>
        <p>{progEnd}</p>
    </div>
  )
}
