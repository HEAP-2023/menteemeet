// https://www.npmjs.com/package/react-pro-sidebar

import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { generateColors } from "../theme";
import { useSelector } from "react-redux";
import useGetAllProgsInvolved from "../hooks/programmes/useGetAllProgsInvolved";
import Submenu from "./Submenu";

const SideNavbar = () => {
    const colors = generateColors();
    const userType = useSelector((state) => state.user.userBasicDetails.account_type);
    
    return (
        <Box width="20%" bgcolor="primary.main">
            {/* logo */}
            <Box width="100%" bgcolor="primary.main" display="flex" justifyContent="center" alignItems="center" p="0px">
                <img src="../../images/global/menteemeet.png" style={{width: "200px", margin: "5px 0px 0p 0px", height: "100px", objectFit: "contain", padding:"0px"}} />
            </Box>
            
            {/* navbar */}
            <Sidebar backgroundColor={colors.primary[500]} width="100%">
                <Menu
                menuItemStyles={{
                    root : {
                        display:"flex",
                        flexDirection : "column",
                        alignItems : "center",
                    },
                    button: {
                      // the active class will be added automatically by react router
                      // so we can use it to style the active menu item
                      [`&.active`]: {
                        backgroundColor: `${colors.primary[500]}`,
                    },
                      marginTop: "20px",
                      color: `${colors.text[500]}`,
                      borderRadius:"20px",
                      backgroundColor:`${colors.bg[500]}`,
                      width:"80%",
                      fontFamily : "Nunito",
                      fontSize : "14px"
                    },
                  }}>
                    <MenuItem component={<Link to="/" />}> Home </MenuItem>

                    {
                        userType === "organiser" ? 
                        <MenuItem component={<Link to="/programme/create" />}> Create Programme </MenuItem>
                        :
                        <MenuItem component={<Link to="/explore" />}> Explore </MenuItem>
                    }
                    
                    <MenuItem component={<Link to="/calendar" />}> Calendar </MenuItem>
                    {/* <SubMenu label={userType==="organiser" ? "Programmes" : "My Programmes"} 
                    rootStyles={{
                        [`& .ps-submenu-content`]: {
                            width : "80%"
                        },
                    }}>
                        {enrolled.length > 0 && 
                        Object.entries(enrolled).map(([key, {programme_id, name}]) => {
                            return (<MenuItem component={<Link to={`programmes/${programme_id}`} />} key={programme_id} >
                                {name}
                            </MenuItem>);
                        })
                        }
                    </SubMenu> */}
                        <Submenu/>
                </Menu>
            </Sidebar>
        </Box>
    );
    // }


}
export default SideNavbar