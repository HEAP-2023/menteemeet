import PageHeader from '../../components/PageHeader';
import { Box } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel, TabContext } from '@mui/lab';
import { useState } from 'react';
import MyDetails from '../../components/accountSettings/MyDetails';
import ChangePassword from '../../components/accountSettings/ChangePassword';


const AccountSettings = ({ acctInfo }) => {
    const [tab, changeTab] = useState("myDetails")
    const tabChange = (event, newValue) => {
        changeTab(newValue);
    }
   
    return <>

        <Box height="100%" >
            
                <PageHeader text="Account Settings" />

                {/* Tabs */}
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={tabChange}
                            selectionFollowsFocus
                            textColor="inherit"
                            indicatorColor="secondary"
                            aria-label="basic tabs example">
                            <Tab label="my details" value="myDetails" />
                            <Tab label="change password" value="changePassword" />
                        </Tabs>
                    </Box>
                    <TabPanel value="myDetails" index={0}>
                        <MyDetails acctInfo={acctInfo}/>
                    </TabPanel>
                    <TabPanel value="changePassword" index={1}>
                        <ChangePassword acctInfo={acctInfo}/>
                    </TabPanel>
                </TabContext>
              
                
        </Box>
    </>
}

export default AccountSettings;

