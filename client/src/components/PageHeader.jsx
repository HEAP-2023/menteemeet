import { Typography } from "@mui/material"

const PageHeader = ({text}) => {
    return (            
        <Typography variant="h2" margin="40px 30px">{text}</Typography>
    );
}

export default PageHeader;