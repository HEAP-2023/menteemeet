import { Box } from "@mui/material";
import Section from "../Section"

const MainPage = () => {
    return (
        <Box display="flex" justifyContent="space-around" width="100%" height="100%">
            <Box width="45%" height="100%" display="flex" flexDirection="column" alignItems="center" >
                {/* Upcoming Sessions */}
                <Section header="Upcoming Sessions" rows={upcomingSession} rowColor="#AEAEFF" highlight={true}></Section>
                {/* Tasks */}
                <Section header="Tasks" rows={tasks} rowColor="#AEAEFF" checkbox={true}></Section>
                {/* Announcements */}
                <Section header="Announcements" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
            </Box>

            <Box width="45%">
                {/* events */}
                <Section header="Progress" rows={progress} rowColor="#AEAEFF" highlight={true}></Section>
                {/* events */}
                <Section header="Forum" rows={forum} rowColor="#AEAEFF"></Section>
                {/* events */}
                <Section header="Resources" rows={resources} rowColor="#AEAEFF" highlight={true}></Section>
            </Box>
        </Box>
    )
}

export default MainPage;

// hardcoded content to be fetched maybe tanstack query aka react query

const upcomingSession = [
    {
        title: "Session 1",
        body: "body",
        dtg: "dtg1",
        location: "location1"
    },
    {
        title: "Session 2",
        body: "body",
        dtg: "dtg 2",
        location: "location 2"
    }
]

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

const announcements = [
    {
        title : "announcement header1",
        body : "announcement body1",
        dtg : "dtg1",
    },
    {
        title : "announcement header2",
        body : "announcement body2",
        dtg : "dtg2",
    },
    
]

const progress = [
    {
        body: "Mentor(s): Alice Mentee(s): Ben, Carl"
    }
]

const forum = [
    {
        title: "Latest Dicussion on Agile",
        body: "Q: What type of Agile Methodology should our group use?"
    }
]

const resources = [
    {
        name: "Google Drive",
        link: "https://drive.google.com",
        icon: "../../../images/programme/google-drive.png"
    },{
        name: "Notion",
        link: "https://www.notion.so",
        icon: "../../../images/programme/notion.png"
    },
    {
        name: "Medium",
        link: "https://medium.com",
        icon: "../../../images/programme/medium-blog.png"
    },
    {
        name: "PPT - topic1.pdf",
        link: undefined,
        icon: undefined,
    },{
        name: "PPT - topic2.pdf",
        link: undefined,
        icon: undefined, 
    },{
        name: "Course Materials.zip",
        link: undefined,
        icon: undefined,
    }
]