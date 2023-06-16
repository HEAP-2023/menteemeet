import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import PageHeader  from "../../components/PageHeader"
import { useParams } from 'react-router-dom';
import Section from "../../components/programme/Section"
import Sessions from "../../components/programme/Sessions";


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
                <PageHeader text={`${programme.name} Mentorship Programme`}/>
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
                            {/* Upcoming Sessions */}
                            <Section header="Upcoming Sessions" rows={upcomingSession} rowColor="#AEAEFF" highlight={true}></Section>
                            {/* Tasks */}
                            <Section header="Tasks" rows={tasks} rowColor="#AEAEFF" highlight={false} checkbox={true} showDTG={false}></Section>
                            {/* Announcements */}
                            <Section header="Announcements" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                        </Box>

                        <Box width="45%">
                            {/* events */}
                            <Section header="Progress" rows={progress} rowColor="#AEAEFF" highlight={true}></Section>
                            {/* events */}
                            <Section header="Forum" rows={forum} rowColor="#AEAEFF" highlight={false}></Section>
                            {/* events */}
                            <Section header="Resources" rows={resources} rowColor="#AEAEFF" highlight={true}></Section>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value="sessions" index={1}>
                    <Sessions/>
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

const forum = [
    {
        title: "Latest Dicussion on Agile",
        body: "Q: What type of Agile Methodology should our group use?"
    }
]

const resources = [
    {
        name: "Google Drive",
        link: "https://drive.google.com",
        icon: "../../../images/programme/google-drive.png"
    },{
        name: "Notion",
        link: "https://www.notion.so",
        icon: "../../../images/programme/notion.png"
    },
    {
        name: "Medium",
        link: "https://medium.com",
        icon: "../../../images/programme/medium-blog.png"
    },
    {
        name: "PPT - topic1.pdf",
        link: undefined,
        icon: undefined,
    },{
        name: "PPT - topic2.pdf",
        link: undefined,
        icon: undefined, 
    },{
        name: "Course Materials.zip",
        link: undefined,
        icon: undefined,
    }
]
