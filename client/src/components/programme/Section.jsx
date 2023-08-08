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
import { format} from "date-fns";
import { addAnnouncementByProgID } from "../../services/organiser/organiserServices"
import { useParams } from 'react-router-dom';

const Section = ({ header, rows, rowColor = "primary.main", highlight = false, checkbox = false, showDTG = false, handleRerender }) => {
    const {id} = useParams();
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const progress = 90; // to change
    const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
    const handleModalOpen = () => setAnnouncementModalOpen(true);
    const handleModalClose = () => setAnnouncementModalOpen(false);

    const announcementSchema = yup.object()
        .shape({
            description: yup.string()
                .required("Required"),
            title: yup.string()
                .required("Required"),                
        }).required()

    const { control, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(announcementSchema) });
    const handleSave = (data) => {
        console.log("data:",id)
        const newAnnouncement = {
            title: data.title,
            description: data.description,
            programme_id: id
        }
        addAnnouncementByProgID(newAnnouncement)
            .then(res => {
            console.log("res", res);
            handleRerender();
          })
            .catch(err => {
            console.log("ERROR:", err);
          })
        handleModalClose();
        reset({ title: "" });
        reset({ description: "" });
    }
    let content;
    if (header === 'Resources') {
        content = <Box display="inline-flex" flexDirection="column" alignItems="left" ml="25px" pb="15px">
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
                rows.map((item, index) => {
                    const day = format(new Date(item.date), "EEE");
                    const dayOfMonth = format(new Date(item.date), 'dd');
                    const month = format(new Date(item.date), 'MMM');
                    return (
                        <Box key={index} display="flex" flexDirection="row" width="95%" bgcolor="background.main" mt="5px" mb="18px" p="10px" minHeight="100px" borderRadius="5px"  >
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
                    const [announcement_id, details] = row;
                    return (
                        <SectionRow key={announcement_id} details={details} rowColor={rowColor} checkbox={checkbox} highlight={highlight} showDTG={showDTG} handleRerender={handleRerender}/>
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
                        <SectionHeader text={header} margin="5px 0px 5px 25px"/>
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
                                        <ErrorMessage errors={errors} name="title" render={({ message }) => <p style={{ color: "#ff0000", margin:'0px 10px', display: "inline-block" }}>{message}</p>} />
                                    </Typography>
                                    <Controller name="title" defaultValue={""} control={control} render={({ field }) =>
                                        <TextField {...field} sx={{ size: "small", width: "100%" }} />
                                    } />
                                    <Typography>
                                        Description
                                        <ErrorMessage errors={errors} name="description" render={({ message }) => <p style={{ color: "#ff0000", margin:'0px 10px', display: "inline-block" }}>{message}</p>} />
                                    </Typography>
                                    <Controller name="description" defaultValue={""} control={control} render={({ field }) =>
                                        <TextField {...field} sx={{ size: "small", width: "100%" }} />
                                    } />
                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        {/* <ErrorMessage errors={errors} name="description" render={({ message }) => <p style={{ color: "#ff0000", marginLeft: "35px" }}>{message}</p>} /> */}
                                        <CustomButton buttonName={"Submit"} />
                                    </Box>
                                </form>
                            </Box>
                        </Modal>
                    </Box>
                </>
                ) : (<SectionHeader text={header} margin="5px 0px 5px 25px" />)}
            {content}
        </Box>)
}
export default Section;