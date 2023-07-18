import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import PageHeader  from "../../components/PageHeader"
import { useParams } from 'react-router-dom';
import Sessions from "../../components/programme/tabs/Sessions";
import MainPage from "../../components/programme/tabs/MainPage";
import Feedback from "../../components/programme/tabs/Feedback";

// redux
import { useSelector } from "react-redux";
import Groupings from "../../components/programme/tabs/Groupings";
import Statistics from "../../components/programme/tabs/Statistics";



const Programme = ({programme_details}) => {
    const {id} = useParams();
  
    const programme = programme_details.find(program => program.id === Number(id));

    const [tab, changeTab] = useState("main")

    const tabChange = (event, newValue) => {
        changeTab(newValue);
    } 

    const userType = useSelector((state) => state.user.userType);
    const lastName = useSelector((state) => state.user.userBasicDetails.name)

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
                selectionFollowsFocus
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
                    <MainPage />
                </TabPanel>
                <TabPanel value="sessions" index={1}>
                    <Sessions/>
                </TabPanel>
                <TabPanel value="groupings" index={2}>
                    <Groupings/>
                </TabPanel>
                <TabPanel value="feedback" index={3}>
                    <Feedback />
                </TabPanel>
                {userType === "organiser" &&
                    <TabPanel value="statistics" index={4}>
                        <Statistics/>
                    </TabPanel>
                }
                </TabContext>
        </Box>
    )
}

export default Programme;



