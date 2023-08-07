import { Box, Divider, Dialog, Slide, Stack, Typography, CircularProgress, IconButton, Badge } from "@mui/material";
import useGetApprovedApps from "../../hooks/user/useGetApprovedApps";
import useGetPendingApps from "../../hooks/user/useGetPendingApps";
import useGetRejectedApps from "../../hooks/user/useGetRejectedApps";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import { toggleNotifs, updateApplications } from "../../state(kiv)";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

// redux
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useMemo } from "react";
import SectionHeader from "../SectionHeader";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Notifications = () => {
    const { data : approvedApp, status:approvedStatus, isSuccess:approvedSuccess  } = useGetApprovedApps();
    const { data : pendingApp, status:pendingStatus, isSuccess:pendingSuccess } = useGetPendingApps();
    const { data : rejectedApp, status:rejectedStatus, isSuccess:rejectedSuccess } = useGetRejectedApps();

    const notificationNo = useMemo(() => {
        let count = 0;
        if(approvedSuccess && !!approvedApp){
            count += approvedApp.length
        }
        if(pendingSuccess && !!pendingApp){
            count += pendingApp.length
        }
        if(rejectedSuccess && !!rejectedApp){
            count += rejectedApp.length
        }
        return count;
    },[approvedSuccess, pendingSuccess, rejectedSuccess, pendingApp])

    const dispatch = useDispatch()
    const openNotifs = useSelector((state)=> state.user.openNotifs)
    
        return (
        <Box key={notificationNo}>
            <IconButton onClick={() => {dispatch(toggleNotifs())}}>
            <Badge badgeContent={notificationNo}  color="secondary">
                <NotificationsOutlinedIcon />
            </Badge>
        </IconButton>
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
        </Box>
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