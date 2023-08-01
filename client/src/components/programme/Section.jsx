import { Box, Typography, Button, Modal, TextField, Divider } from "@mui/material"
import { generateColors } from "../../theme"
import SectionHeader from "../../components/SectionHeader"
import SectionRow from "./SectionRow"
import ResourcesRow from "./ResourcesRow"
import ProgressBar from "./charts/ProgressBar"
import CustomButton from "./CustomButton"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useSelector } from "react-redux";
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import {format} from "date-fns";

const Section = ({ header, rows, rowColor = "primary.main", highlight = false, checkbox = false, showDTG = false }) => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const progress = 90; // to change
    const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
    const handleModalOpen = () => setAnnouncementModalOpen(true);
    const handleModalClose = () => setAnnouncementModalOpen(false);

    const announcementSchema = yup.object()
        .shape({
            newAnnouncementContent: yup.string()
                .required("Content is required")
        }).required()

    const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(announcementSchema) });
    const handleSave = (data) => {
        console.log(data)
        handleModalClose();
        reset({ newAnnouncementTitle: "" });
        reset({ newAnnouncementContent: "" });
    }
    let content;
    if (header === 'Resources') {
        content = <Box display="inline-flex" flexDirection="column" alignItems="left">
            <ResourcesRow resources={rows} />
        </Box>
    } else if (header === 'Progress') {
        content = <>
            <Box display="inline-flex" flexDirection="column" alignItems="center"></Box>
            <ProgressBar progress={progress} />
        </>
    }
    else if (header === 'Upcoming Sessions') {
        content = <Box display="inline-flex" flexDirection="column" alignItems="center">
            {
                rows.map((item) => {
                    const day = format(new Date(item.date), "EEE");
                    const dayOfMonth = format(new Date(item.date), 'dd');
                    const month = format(new Date(item.date), 'MMM');
                    return (
                        <Box display="flex" flexDirection="row" width="90%" bgcolor="background.main" marginY="5px" p="10px" minHeight="100px" borderRadius="20px">
                            <Box p="5px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                <Typography>{day}</Typography>
                                <Typography sx={{fontSize: '24px', fontWeight: '700'}}>{dayOfMonth}</Typography>
                                <Typography>{month}</Typography>
                            </Box>
                            <Box p="5px" px="20px">
                                <Divider orientation="vertical" sx={{ borderRightWidth: 3, borderColor: rowColor }} />
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography fontWeight="700" >Session</Typography>
                                <Typography>{item.topic}</Typography>
                                <Typography>{format(new Date(`${item.date} ${item.start_time}`), 'p')}-{format(new Date(`${item.date} ${item.end_time}`), 'p')}</Typography>
                            </Box>
                        </Box>
                    )
                })
            }
        </Box>
    }
    else {
        content = <Box display="inline-flex" flexDirection="column" alignItems="center">
            {
                Object.entries(rows).map((row) => {
                    const [key, details] = row
                    return (
                        <SectionRow key={`${details.title}-${details.dtg}`} details={details} rowColor={rowColor} checkbox={checkbox} highlight={highlight} showDTG={showDTG} />
                    );
                })
            }
        </Box>
    }
    return (
        <Box display="inline-flex" flexDirection="column" bgcolor="primary.main" width="100%" p="10px" borderRadius="20px" mt="20px">

            {header === 'Announcements' && userType === "organiser" ?
                (<>
                    <Box display="flex" width={"95%"} alignItems={"center"}>
                        <SectionHeader text={header} margin="0" />
                        <Button
                            sx={{
                                color: "white",
                                backgroundColor: "#333D55",
                                ml: 1,
                                mt: 1,
                                ":hover": {
                                    backgroundColor: "#333D55",
                                    opacity: 0.6
                                },
                                height: "30px"
                            }}
                            endIcon={<AddOutlinedIcon />}
                            onClick={handleModalOpen}
                        >Add</Button>
                        <Modal
                            open={announcementModalOpen}
                            onClose={handleModalClose}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                bgcolor: 'background.paper',
                                boxShadow: 5,
                                p: 2,
                                outline: 'none',
                                height: '300px',
                                width: '450px',
                                borderRadius: '20px'
                            }}>
                                <form onSubmit={handleSubmit(handleSave)}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <CloseIcon onClick={handleModalClose} sx={{ cursor: "pointer" }} />
                                    </Box>
                                    <Typography>
                                        Add a new announcement
                                    </Typography>
                                    <Typography>
                                        Title
                                    </Typography>
                                    <Controller name="newAnnouncementTitle" defaultValue={""} control={control} render={({ field }) =>
                                        <TextField {...field} sx={{ size: "small", width: "100%" }} />
                                    } />
                                    <Typography>
                                        Content
                                    </Typography>
                                    <Controller name="newAnnouncementContent" defaultValue={""} control={control} render={({ field }) =>
                                        <TextField {...field} sx={{ size: "small", width: "100%" }} />
                                    } />
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <ErrorMessage errors={errors} name="newAnnouncementContent" render={({ message }) => <p style={{ color: "#ff0000", marginLeft: "35px" }}>{message}</p>} />
                                        <CustomButton buttonName={"Submit"} />
                                    </Box>
                                </form>
                            </Box>
                        </Modal>
                    </Box>
                </>
                ) : (<SectionHeader text={header} margin="0" />)}
            {content}
        </Box>)
}
export default Section;