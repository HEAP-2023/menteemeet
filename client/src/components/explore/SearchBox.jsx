import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField } from "@mui/material";
import { getProgsByName } from '../../services/programmes/programmeServices';
import ProgrammeCards from './ProgrammeCards';



const RSearchBox = () => {
  const [userQuery, setUserQuery] = useState("");
  const [debQuery, setDebQuery] = useState("");
  const [progsFound, setProgsFound] = useState([]);
  
  const onchange = (e) => {
    setUserQuery(e.target.value);
  }

  useEffect(() => {
    console.log("SENDING REQ:", debQuery);
    if (!debQuery) {
      setProgsFound([]);
      return;
    }
    getProgsByName(debQuery)
    .then(
      (res) => {
        console.log("RES DATA:", res.data);
        setProgsFound(res.data);
      }
    ).catch(
      err => console.log(err)
    )
  }, [debQuery])

  useEffect(() => {
   const timeout = setTimeout(() => {
    setDebQuery(userQuery);
   }, 700);

   return () => clearTimeout(timeout);
  }, [userQuery])

  return (
    <>
      {/* <input
        type="text"
        name="searchBox"
        placeholder="Search for programmes"
        onChange={onchange}
        
      /> */}
      <TextField
        fullWidth onChange={onchange}
        >

      </TextField>

      {
        progsFound.length > 0 ? (
          <div>
            {progsFound.map(prog => {
              return (
                <ProgrammeCards
                  key={prog.programme_id}
                  progImg={prog.display_image}
                  progName={prog.name}
                  progDesc={prog.description}
                  progDL={prog.deadline}
                />
              )
            }
            )}
          </div>
        ) : ("")
      }
    </>
  )
}

export default RSearchBox;