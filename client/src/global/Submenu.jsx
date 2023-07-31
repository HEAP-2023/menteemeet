import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const Submenu = () => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const programmes = useSelector((state) => state.user.programmes)

    if(programmes.length < 1){
        return (
             <SubMenu label={userType==="organiser" ? "None Created" : "Not Enrolled"} 
                    rootStyles={{
                        [`& .ps-submenu-content`]: {
                            width : "80%"
                        },
                    }}>
            </SubMenu>
        )
    }
    return (
        <SubMenu label={userType==="organiser" ? "Programmes" : "My Programmes"} 
        rootStyles={{
                        [`& .ps-submenu-content`]: {
                            width : "80%",
                            borderRadius : "20px",
                            scrollbarWidth : "none"
                        },
                    }}>
                <Box maxHeight="400px">
                        {programmes.length > 0 && 
                        Object.entries(programmes).map(([key, {programme_id, name}]) => {
                            return (
                            <MenuItem component={<Link to={`programmes/${programme_id}`} />} key={programme_id} >
                                {name}  
                            </MenuItem>
                            );
                        })
                        }
                </Box>
        </SubMenu>
    );
}

export default Submenu;
