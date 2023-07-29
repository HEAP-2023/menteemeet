import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField } from "@mui/material";
import { getProgsByName } from '../../services/programmes/programmeServices';
import ProgrammeCards from './ProgrammeCards';



const RSearchBox = () => {
  const [userQuery, setUserQuery] = useState("");
  const [progsFound, setProgsFound] = useState([]);
  
  const onchange = (e) => {
    setUserQuery(e.target.value);
  }

  useEffect(() => {
    console.log(userQuery);
    if (!userQuery) {
      setProgsFound([]);
      return;
    }
    getProgsByName(userQuery)
      .then(
        (res) => setProgsFound(res.data)
      ).catch(
        err => console.log(err)
      )
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