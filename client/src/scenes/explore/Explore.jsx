import { Box, TextField, InputAdornment, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import PageHeader from "../../components/PageHeader"
import { createContext, useState } from "react"
import DisplayProgs from "../../components/explore/DisplayProgs"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate, useParams } from "react-router-dom";


export const FeedBackContext = createContext()

const Explore = () => {
    const [userQuery, setUserQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false); // Add this line

    const prog_id = useParams();
    const navigate = useNavigate()
    const onchange = (e) => {
        if(prog_id){
            navigate("/explore")
        }
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
        <FeedBackContext.Provider value={setOpenDialog}>
            <DisplayProgs userQuery={userQuery}/>
        </FeedBackContext.Provider>
            
            {/* Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Success</DialogTitle>
                    <DialogContent> <p>Application has been successfully submitted.</p> </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { 
                            setOpenDialog(false);
                        }
                            }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
        </Box>);
    
}

export default Explore;

// get all
// ['programme_id', 
// 'name', 
// 'description',
// 'category', 
// 'display_image']
