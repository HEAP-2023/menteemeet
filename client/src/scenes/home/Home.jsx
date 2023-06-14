import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import SectionHeader from "../../components/SectionHeader"
import Section from "../../components/home/Section"
import HomeCarousel from "../../components/home/HomeCarousel"




const Home = () => {
    const colors = generateColors();
    

    return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
        <PageHeader text={`Welcome, ${username}`}/>
        
        {/* carousel */}
        <SectionHeader text={"Featured Events"}/>
        <HomeCarousel content={recommended_programmes}/>

        <Box display="flex" justifyContent="space-around" width="100%" height="100%">
            <Box width="45%" height="100%" display="flex" flexDirection="column" alignItems="center" > 
                {/* announcements */}
                <Section header="Announcement" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                {/* tasks */}
                <Section header="Tasks" rows={tasks} checkbox={true}></Section>
            </Box>

            <Box width="45%">
                {/* events */}
                <Section header="Events" rows={events} showDTG={true}></Section>
            </Box>

        </Box>


    </Box>)
}
export default Home











// hardcoded content to be fetched maybe tanstack query aka react query
const username = "Neo"
const announcements = {
    announcement_1 : {
        title : "announcement header1",
        body : "announcement body1",
        dtg : "dtg1",
    },
    announcement_2 : {
        title : "announcement header2",
        body : "announcement body2",
        dtg : "dtg2",
    },
    
}

const events = {
    event_1 : {
        title : "event header1",
        body : "event body1",
        dtg : "dtg1",
    },
    event_2 : {
        title : "event header2",
        body : "event body2",
        dtg : "dtg2",
    },
    event_3 : {
        title : "event header3",
        body : "event body3",
        dtg : "dtg3",
    },
}

const tasks = {
    task_1 : {
        title : "task header1",
        body : "task body1",
        dtg : "dtg1",
    },
    task_2 : {
        title : "task header2",
        body : "task body2",
        dtg : "dtg2",
    },
}

const recommended_programmes = {
    programID_1 : {
        id : 1,
        name : "programme_1",
        img : "../../images/home/mentorship_1.jpg",
        link : "https://youtu.be/dQw4w9WgXcQ",
    },
    programID_2 : {
        id : 2,
        name : "programme_2",
        img : "../../images/home/mentorship_2.png",
        link : "/mentorshipPrograms/available/2",
    },
    programID_3 : {
        id : 3,
        name : "programme_3",
        img : "../../images/home/mentorship_3.jpg",
        link : "/mentorshipPrograms/available/3",
    },
    programID_4 : {
        id : 4,
        name : "programme_4",
        img : "../../images/home/mentorship_4.png",
        link : "/mentorshipPrograms/available/4",
    },
    programID_5 : {
        id : 5,
        name : "programme_5",
        img : "../../images/home/mentorship_5.png",
        link : "/mentorshipPrograms/available/5",
    },
    programID_6 : {
        id : 6,
        name : "programme_6",
        img : "../../images/home/mentorship_6.jpg",
        link : "/mentorshipPrograms/available/6",
    },
}