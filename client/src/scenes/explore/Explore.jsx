import { Box, TextField, InputAdornment } from "@mui/material"
import PageHeader from "../../components/PageHeader"
import { useState } from "react"
import DisplayProgs from "../../components/explore/DisplayProgs"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Explore = () => {
    const [userQuery, setUserQuery] = useState("");
  
    const onchange = (e) => {
        setUserQuery(e.target.value);
    }
    
 
        return (
        <Box display="flex" flexDirection="column">
            <PageHeader text="Explore Programmes" />
            <TextField fullWidth onChange={onchange} 
            sx={{p:"20px"}}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon/>
                  </InputAdornment>
                ),
                sx:{borderRadius: "20px"}
              }}
            />
            <DisplayProgs  userQuery={userQuery}/>
        </Box>);
    
}

export default Explore;

// get all
// ['programme_id', 
// 'name', 
// 'description',
// 'category', 
// 'display_image']
