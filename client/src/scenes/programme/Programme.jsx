import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import PageHeader  from "../../components/PageHeader"
import { useNavigate, useParams } from 'react-router-dom';
import Sessions from "../../components/programme/tabs/Sessions";
import MainPage from "../../components/programme/tabs/MainPage";
import Feedback from "../../components/programme/tabs/Feedback";
import Applications from "../../components/programme/tabs/Applications";
import GenerateGroup from "./GenerateGroup";
import useGetGrouping from "../../hooks/algo/useGetGrouping";
import { SuccessModal, FailureModal } from "../../components/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";

// redux
import { useSelector } from "react-redux";
import Groupings from "../../components/programme/tabs/Groupings";
import Statistics from "../../components/programme/tabs/Statistics";
import DeleteProgrammeModal from "../../components/programme/DeleteProgrammeModal";


const Programme = () => {
    const {id} = useParams();
    const programmes = useSelector((state) => state.user.programmes)
    const programme = programmes.find(program => program.programme_id === Number(id));
    const navigate = useNavigate()
    console.log(programme);
    let userRole = programme?.role;
    const [tab, changeTab] = useState("main")

    const tabChange = (event, newValue) => {
        changeTab(newValue);
    } 
    const [deleteModal, setDeleteModal] = useState(false)

    const userType = useSelector((state) => state.user.userBasicDetails.account_type);
    const userName = useSelector((state) => state.user.userBasicDetails.name)
    const queryClient = useQueryClient()


    const { data , isSuccess, isError, isLoading } = useGetGrouping(id)
    // console.log(data)

    if(userRole === undefined){
        userRole = "organiser";
    }

    if(isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary"/>
            </Box>
        )
    }

    if(isSuccess){
    return (
        <Box>
            <SuccessModal info={"successfully delete programme"} actions={() => {
                navigate("/")
                queryClient.invalidateQueries(["getInvolved"]);
                window.location.reload()
                }}/>
            <FailureModal info={"failed to delete programme"}/>
            <DeleteProgrammeModal id={id} open={deleteModal} setDeleteModal={setDeleteModal} programme_name={programme.name}/>
    
            {/* header */}
            <Box display="flex" justifyContent="space-between">
                <PageHeader text={`Welcome, ${userName} (${userRole})`}/>
                <PageHeader text={`${programme.name} Mentorship Programme`}/>
            </Box>
            <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}} display="flex" justifyContent="space-between">
                <Tabs value={tab} onChange={tabChange} 
                selectionFollowsFocus
                textColor="inherit"
                indicatorColor="secondary"
                aria-label="basic tabs example">
                    <Tab label="Main Page" value="main" />
                    <Tab label="Sessions" value="sessions" />
                    <Tab label="Groupings" value="groupings"/>
                    <Tab label="Feedback" value="feedback"/>
                    {userType === "organiser" &&
                        <Tab label="Applications" value="applications"/>
                    }
                    {userType === "organiser" &&
                        <Tab label="Statistics" value="statistics"/>
                    }
                </Tabs>
                {userType === "organiser" &&
                    <Button variant="contained" disableElevation sx={{mr :"20px", borderRadius:"20px", color:"#ffffff", background:"#E44949", '&:hover': {
                        color: '#ffffff',
                        backgroundColor: '#E44949',
                    },}}
                    onClick={() => setDeleteModal(true)}
                    >Delete Programme</Button>
                }
            </Box>
                <TabPanel value="main" index={0}>   
                    <MainPage programmeID={id}/>
                </TabPanel>
                <TabPanel value="sessions" index={1}>
                    <Sessions programmeID={id}/>
                </TabPanel>
                <TabPanel value="groupings" index={2}>

                    {/* if organiser & no usergroup -> generate group */}
                    {data.length < 1 && <GenerateGroup progID={id}/>}
                    
                    {/* if have usergroup -> groupings */}
                    {data.length > 0   && <Groupings id={id}/>}


                </TabPanel>
                <TabPanel value="feedback" index={3}>
                    <Feedback />
                </TabPanel>
                {userType === "organiser" &&
                    <TabPanel value="applications" index={4}>
                        <Applications programmeID={id}/>
                    </TabPanel>
                }
                {userType === "organiser" &&
                    <TabPanel value="statistics" index={5}>
                        <Statistics/>
                    </TabPanel>
                }
                </TabContext>
        </Box>
    )
            }
}

export default Programme;



