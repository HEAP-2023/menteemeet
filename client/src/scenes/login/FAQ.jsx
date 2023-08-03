import { Box, Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from "../../components/login/start/Header";

const FAQ = () => {
    return (
    <Box>
    <Header/>
        {
            faq.map(q => <FaqRow title={q.title} details={q.details}/>)
        }
        
    </Box>)
}
export default FAQ;



const FaqRow = ({title, details}) => {
    return (
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           {details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
}

const faq = [
    {
        title : "title 1",
        details : "answer 1",
    },
    {
        title : "title 2",
        details : "answer 2",
    },
    {
        title : "title 3",
        details : "answer 3",
    },
    {
        title : "title 4",
        details : "answer 4",
    },
]