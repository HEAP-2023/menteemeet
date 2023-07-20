import { Box, Button, Typography, Dialog, DialogContent, DialogTitle,  } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
import { useState } from "react"
import FindOutMore from "./FindOutMore"
import SignUpForm from "./SignUpElements/SignUpForm"

const Element = ({details, id}) => {
    const colors = generateColors();
    const {
        name,  
        description,
        media, 
    } = details

    const [dialogOpen, setDialogOpen] = useState(null)

    return (<Box display="flex" p="20px" >
        <Dialog
            open={!!dialogOpen}
            onClose={() => setDialogOpen(null)}
            scroll="body"
        >
            <DialogContent>
                {
                    dialogOpen === "findOutMore" && <FindOutMore/>
                }
                {
                    dialogOpen === "signUp" && <SignUpForm id={id}/>
                }
            </DialogContent>
        </Dialog>

        {/* image */}
        <Box width="30%" height="300px">
            <img src={media} alt="no img" style={{width:"100%", height:"100%", objectFit:"contain"}}/>
        </Box>

        {/* details */}
        <Box width="70%" height="300px" display="grid" gridTemplateRows="1fr 5fr 2fr" rowGap="20px" p="20px">
            <SectionHeader text={name} margin="0"/>
            <Typography>{description}</Typography>
            <Box width="30%" display="flex" justifyContent="space-between" >
                <Button variant="contained" sx={{borderRadius:20}} 
                onClick={() => setDialogOpen("findOutMore")}
                >Find Out More</Button>
                <Button variant="contained" sx={{borderRadius:20, bgcolor: `${colors.text[500]}` ,color:"#ffffff"}}
                onClick={() => setDialogOpen("signUp")}
                >Sign Up</Button>
            </Box>
        </Box>
    </Box>);
}
export default Element;


