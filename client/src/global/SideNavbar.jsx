// https://www.npmjs.com/package/react-pro-sidebar

import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { generateColors } from "../theme";


const SideNavbar = ({enrolled}) => {
    const colors = generateColors();

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
                    <MenuItem component={<Link to="/explore" />}> Explore </MenuItem>
                    <MenuItem component={<Link to="/calendar" />}> Calendar </MenuItem>
                    <SubMenu label="My Programmes" 
                    rootStyles={{
                        [`& .ps-submenu-content`]: {
                            width : "80%"
                        },
                    }}>
                        {Object.entries(enrolled).map(([key, {id, name, img, link}]) => {
                            console.log(id)
                            return (<MenuItem component={<Link to={link} />} key={id} >
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