// https://www.npmjs.com/package/react-pro-sidebar

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { generateColors } from "../theme";
import { useSelector } from "react-redux";

const SideNavbar = ({enrolled}) => {
    const colors = generateColors();
    const userType = useSelector((state) => state.user.userType);


    return (
        <Box width="20%" bgcolor="primary.main">
            {/* logo */}
            <Box width="100%" bgcolor="primary.main" display="flex" justifyContent="center" alignItems="center" p="30px">
                Mentee meet logo
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
                        <MenuItem component={<Link to="/newProgramme/create" />}> Create Programme </MenuItem>
                        :
                        <MenuItem component={<Link to="/explore" />}> Explore </MenuItem>
                    }
                    
                    <MenuItem component={<Link to="/calendar" />}> Calendar </MenuItem>
                    <SubMenu label={userType==="organiser" ? "Programmes" : "My Programmes"} 
                    rootStyles={{
                        [`& .ps-submenu-content`]: {
                            width : "80%"
                        },
                    }}>
                        {Object.entries(enrolled).map(([key, {id, name, img}]) => {
                            return (<MenuItem component={<Link to={`programmes/${id}`} />} key={id} >
                                {name}
                            </MenuItem>);
                        })}
                    </SubMenu>
                </Menu>
            </Sidebar>;
        </Box>
    );
}
export default SideNavbar