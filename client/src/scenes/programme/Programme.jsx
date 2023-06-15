import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import PageHeader  from "../../components/PageHeader"
import { useParams } from 'react-router-dom';
import Section from "../../components/programme/Section"


// redux
import { useSelector } from "react-redux";



const Programme = ({programme_details}) => {
    const {id} = useParams();
  
    const programme = programme_details.find(program => program.id === Number(id));

    const [tab, changeTab] = useState("main")

    const tabChange = (event, newValue) => {
        changeTab(newValue);
    } 

    const userType = useSelector((state) => state.user.userType);
    const lastName = useSelector((state) => state.user.userDetails.lastName)

    return (
        <Box>

            {/* header */}
            <Box display="flex" justifyContent="space-between">
                <PageHeader text={`Welcome, ${lastName}`}/>
                <PageHeader fontSize="10px" text={`${programme.name} Mentorship Programme`}/>
            </Box>
            <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={tabChange} 
                textColor="inherit"
                indicatorColor="secondary"
                aria-label="basic tabs example">
                    <Tab label="Main Page" value="main" />
                    <Tab label="Sessions" value="sessions" />
                    <Tab label="Groupings" value="groupings"/>
                    <Tab label="Feedback" value="feedback"/>
                    {userType === "organiser" &&
                        <Tab label="Statistics" value="statistics"/>
                    }
                </Tabs>
            </Box>
                <TabPanel value="main" index={0}>   
                    <Box display="flex" justifyContent="space-around" width="100%" height="100%">
                        <Box width="45%" height="100%" display="flex" flexDirection="column" alignItems="center" > 
                            {/* Upcoming Session */}
                            <Section header="Upcoming Session" rows={upcomingSession} rowColor="#AEAEFF" highlight={true}></Section>
                            {/* Tasks */}
                            <Section header="Tasks" rows={tasks} rowColor="#AEAEFF" highlight={true}></Section>
                            {/* Announcements */}
                            <Section header="Announcements" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                        </Box>

                        <Box width="45%">
                            {/* events */}
                            <Section header="Progress" rows={progress} rowColor="#AEAEFF" highlight={true}></Section>
                            {/* events */}
                            <Section header="Forum" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                            {/* events */}
                            <Section header="Resources" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value="sessions" index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value="groupings" index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value="feedback" index={3}>
                    Item Four
                </TabPanel>
                {userType === "organiser" &&
                        <TabPanel value="statistics" index={4}>
                            stats
                        </TabPanel>
                }
                </TabContext>
        </Box>
    )
}

export default Programme;


// hardcoded content to be fetched maybe tanstack query aka react query

const upcomingSession = [
    {
        title: "Session 1",
        body: "body",
        dtg: "dtg1",
        location: "location1"
    },
    {
        title: "Session 2",
        body: "body",
        dtg: "dtg 2",
        location: "location 2"
    }
]

const tasks = {
    task_1 : {
        title : "task header1",
        body : "task body1",
        dtg : "dtg1",
    },
    task_2 : {
        title : "task header2",
        body : "task body2",
        dtg : "dtg2",
    },
}

const announcements = [
    {
        title : "announcement header1",
        body : "announcement body1",
        dtg : "dtg1",
    },
    {
        title : "announcement header2",
        body : "announcement body2",
        dtg : "dtg2",
    },
    
]

const progress = [
    {
        body: "Mentor(s): Alice Mentee(s): Ben, Carl"
    }
]




