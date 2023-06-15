import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from "react";
import PageHeader  from "../../components/PageHeader"

// redux
import { useSelector } from "react-redux";



const Programme = ({programme_details}) => {
    const [value, changeTab] = useState("main")

    const tabChange = (event, newValue) => {
        changeTab(newValue);
    } 

    const userType = useSelector((state) => state.user.userType);
    const lastName = useSelector((state) => state.user.userDetails.lastName)

    return (
        <Box>

            {/* header */}
            <Box display="flex">
                <PageHeader text={`Welcome, ${lastName}`}/>

            </Box>

            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={tabChange} 
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
                    Item One
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