import { Divider, Dialog, Slide, Stack, Typography, CircularProgress } from "@mui/material";
import useGetApprovedApps from "../../hooks/user/useGetApprovedApps";
import { toggleNotifs, updateApplications } from "../../state(kiv)";
// redux
import { useDispatch, useSelector } from "react-redux";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Notifications = () => {
    const { data : approvedApp, status:approvedStatus  } = useGetApprovedApps();
    const dispatch = useDispatch()
    

    const openNotifs = useSelector((state)=> state.user.openNotifs)
    
        return (
            <Dialog
            open={openNotifs}
            TransitionComponent={Transition}
            keepMounted
            onClose = {() => dispatch(toggleNotifs())}
    >
            <Stack>
               <NotificationExpanded header="Approved Applications" apps={approvedApp} status={approvedStatus}/>
    
               <NotificationExpanded header="Pending Applications"/>
               <NotificationExpanded header="Rejected Applications"/>

            </Stack>
          </Dialog>
        )
    
    
}


const NotificationExpanded = ({header, apps=[], status}) => {
    if(status === "loading"){
        return <CircularProgress/>
    }
    if(status === "success"){
        return (
            <Stack p="20px">
                <Typography fontWeight="700">{header}</Typography>
                <Divider/>
                {
                (apps.length > 0) ? 
                apps.map(app => <Typography>{app}</Typography>) : 
                <Typography>
                    no applications yet
                </Typography>}
            </Stack>
        )
    }
}

export default Notifications