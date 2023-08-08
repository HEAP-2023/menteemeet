import { Box, Typography, Divider } from "@mui/material"
import { parse, format, subHours } from "date-fns";
import { useSelector } from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { deleteAnnouncementsByProgID } from "../../services/organiser/organiserServices";
const SectionRow = ({ details, rowColor, checkbox, highlight, showDTG, handleRerender}) => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const { title, description, createdAt, announcement_id } = details;
    const parsedDate = subHours(parse(createdAt, 'dd/MM/yyyy, h:mm:ss a', new Date()), 8);
    const date = format(parsedDate, 'yyyy MMM dd p', {timezone: 'Asia/Singapore'});
    const handleDeleteAnnouncement = () => {
        deleteAnnouncementsByProgID(announcement_id)
        .then(res => {
            console.log(res);
            handleRerender();
        })
        .catch(err => console.log("ERROR:", err))
    }
    return (
        <Box display="flex" flexDirection="row" width="95%" bgcolor="background.main" marginY="5px" p="10px" mb="18px" minHeight="100px" borderRadius="5px">
            {highlight && <Box p="5px" px="20px">
                <Divider orientation="vertical" sx={{ borderRightWidth: 3, borderColor: rowColor }} />
            </Box>}
            <Box display="flex" width="100%" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                    <Typography>{date}</Typography>
                    <Typography fontWeight="700" >{title}</Typography>
                    <Typography>{description}</Typography>
                </Box>
                {userType === "organiser" ? (
                    <Box>
                        <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={handleDeleteAnnouncement} />
                    </Box>
                ) : (<></>)}
            </Box>
        </Box>)
}
export default SectionRow;