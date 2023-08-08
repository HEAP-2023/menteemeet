import { Box, Accordion, AccordionDetails, AccordionSummary, Typography, Stack } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Header from "../../components/login/start/Header";
import LoginOverlay from "../../components/login/LoginOverlay";
import { generateColors } from "../../theme";

const FAQ = () => {
    const colors = generateColors()
    return (
    <Box>
      <LoginOverlay />
      <Header/>
    <Stack
    sx={{
        '&> :nth-child(even)':{
            '&>div':{
              backgroundColor: colors.primary[500]
            }
          },
          '&> :nth-child(odd)':{
            '&>div':{
              backgroundColor: "#AEAEFF"
            }
          },
    }}
    >
        {
            faq.map(q => <FaqRow title={q.title} details={q.details}/>)
        }
    </Stack>
        
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
        title : "Why do i need this webapp?",
        details : "It is fairly prevalent to have mentors and mentees navigating the tech sector with so many different types of technology out there. Traditionally, pairing of mentors and mentees are done manually and it is a problem for organisers, mentors and mentees to find a suitable team and hence this webapp automates the process for you",
    },
    {
        title : "What is the tech stack used here?",
        details : "SQL Express React Node",
    },
    {
        title : "What are some of the frontend libraries used?",
        details : "1. Material UI \n 2. Tanstack Query (query data from backend) \n 3. React Hook Form \n 4. yup (form validation) \n 5. nivo (charts) \n 6. FramerMotion (animation) \n",
    },
    {
        title : "Is this app secure?",
        details : "We have enhanced security through the use of jwt tokens and encryption when storing passwords",
    },
    
]