import { Box, Button, Typography, Dialog, DialogContent } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
import { useState } from "react"
import FindOutMore from "./FindOutMore"
import SignUpForm from "./SignUpElements/SignUpForm"
import { ImgGetUrl } from "../../functions"

const Element = ({details}) => {
    const colors = generateColors();
    const {
        programme_id,
        name,  
        description,
        display_image,
        deadline,
    } = details

    const [dialogOpen, setDialogOpen] = useState(null)
    const img = ImgGetUrl(display_image)
    return (<Box display="flex" p="20px" >
        <Dialog
            open={!!dialogOpen}
            onClose={() => setDialogOpen(null)}
            scroll="body"
        >
            <DialogContent>
                {
                    dialogOpen === "findOutMore" && <FindOutMore description={description}/>
                }
                {
                    dialogOpen === "signUp" && <SignUpForm id={programme_id} setDialogOpen={setDialogOpen}/>
                }
            </DialogContent>
        </Dialog>

        {/* image */}
        <Box width="30%" height="300px">
            <img src={!!img ? img : "../images/explore/noImageAvailable.jpeg"} alt="no img" style={{width:"100%", height:"100%", objectFit:"contain"}}/>
        </Box>

        {/* details */}
        <Box width="70%" height="300px" display="grid" gridTemplateRows="1fr 5fr 2fr" rowGap="20px" p="20px">
            <SectionHeader text={name} margin="0"/>
            <Typography>Application Deadline: {deadline}</Typography>
            <Box width="30%" display="flex" justifyContent="space-between" >
                <Button variant="contained" sx={{borderRadius:"20px"}} 
                onClick={() => setDialogOpen("findOutMore")}
                >Find Out More</Button>
                <Button variant="contained" sx={{borderRadius:"20px", bgcolor: `${colors.text[500]}` ,color:"#ffffff"}}
                onClick={() => setDialogOpen("signUp")}
                >Sign Up</Button>
            </Box>
        </Box>
    </Box>);
}
export default Element;


