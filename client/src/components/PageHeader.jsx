import { Typography } from "@mui/material"

const PageHeader = ({text, margin="40px 30px"}) => {
    return (            
        <Typography variant="h2" margin={margin}>{text}</Typography>
    );
}

export default PageHeader;