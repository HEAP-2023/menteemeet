import { Box, Button } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import PageHeader  from "../../components/PageHeader"
import { useParams } from 'react-router-dom';
import Sessions from "../../components/programme/tabs/Sessions";
import MainPage from "../../components/programme/tabs/MainPage";
import Feedback from "../../components/programme/tabs/Feedback";
import Applications from "../../components/programme/tabs/Applications";
// redux
import { useSelector } from "react-redux";
import Groupings from "../../components/programme/tabs/Groupings";
import Statistics from "../../components/programme/tabs/Statistics";
import DeleteProgrammeModal from "../../components/programme/DeleteProgrammeModal";


const Programme = ({programme_details}) => {
    const {id} = useParams();
    const programmes = useSelector((state) => state.user.programmes)
    const programme = programmes.find(program => program.programme_id === Number(id));
    console.log(programme);
    const [tab, changeTab] = useState("main")

    const tabChange = (event, newValue) => {
        changeTab(newValue);
    } 
    const [deleteModal, setDeleteModal] = useState(false)

    const userType = useSelector((state) => state.user.userBasicDetails.account_type);
    const userName = useSelector((state) => state.user.userBasicDetails.name)

    return (
        <Box>
            <DeleteProgrammeModal id={id} open={deleteModal} setDeleteModal={setDeleteModal} programme_name={programme.name}/>

            {/* header */}
            <Box display="flex" justifyContent="space-between">
                <PageHeader text={`Welcome, ${userName}`}/>
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
                    <MainPage />
                </TabPanel>
                <TabPanel value="sessions" index={1}>
                    <Sessions programmeID={id}/>
                </TabPanel>
                <TabPanel value="groupings" index={2}>
                    <Groupings/>
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

export default Programme;



