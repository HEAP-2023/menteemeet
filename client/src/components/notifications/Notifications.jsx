import { Box, Divider, Dialog, Slide, Stack, Typography, CircularProgress } from "@mui/material";
import useGetApprovedApps from "../../hooks/user/useGetApprovedApps";
import useGetPendingApps from "../../hooks/user/useGetPendingApps";
import useGetRejectedApps from "../../hooks/user/useGetRejectedApps";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import { toggleNotifs, updateApplications } from "../../state(kiv)";
// redux
import { useDispatch, useSelector } from "react-redux";
import { forwardRef } from "react";
import SectionHeader from "../SectionHeader";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Notifications = () => {
    const { data : approvedApp, status:approvedStatus  } = useGetApprovedApps();
    const { data : pendingApp, status:pendingStatus } = useGetPendingApps();
    const { data : rejectedApp, status:rejectedStatus } = useGetRejectedApps();

    const dispatch = useDispatch()
    

    const openNotifs = useSelector((state)=> state.user.openNotifs)
    
        return (
            <Dialog
            open={openNotifs}
            TransitionComponent={Transition}
            keepMounted
            onClose = {() => dispatch(toggleNotifs())}
    >
        <Box sx={{p : "20px"}}>
            <SectionHeader margin="0" text="Applications"/>
            <Stack>
               <NotificationExpanded header="Approved Applications" apps={approvedApp} status={approvedStatus}/>
               <NotificationExpanded header="Pending Applications" apps={pendingApp} status={pendingStatus}/>
               <NotificationExpanded header="Rejected Applications" apps={rejectedApp} status={rejectedStatus}/>

            </Stack>
        </Box>
          </Dialog>
        )
    
    
}


const NotificationExpanded = ({header, apps, status}) => {
    if(status === "loading"){
        return <CircularProgress/>
    }
    if(status === "success"){
        if(apps === false){
            return (
                <Stack p="20px">
                    <Typography fontWeight="700">{header}</Typography>
                    <Divider/>
                        <Typography>No Application</Typography>
                </Stack>
            )
        }
        return (
            <Stack p="20px">
                <Typography fontWeight="700">{header}</Typography>
                <Divider/>
                {
                apps.map(app => (
                    <Box key={app.application_id}>
                        <Typography>{app.Programme.name}</Typography>
                        <Box display="flex" pl="20px">
                            <HistoryOutlinedIcon/>
                            <Typography>applied on : </Typography>
                            <Typography>{app.date}</Typography>
                        </Box>
                    </Box>
                    
                ))
                }
            </Stack>
        )
    }
}

export default Notifications