import { Box } from "@mui/material";
import Section from "../Section"
import {useEffect, useState} from "react";
import { getSessionsByProgID } from "../../../services/programmes/userServices";
import { getAnnouncementsByProgID } from "../../../services/organiser/organiserServices";
const MainPage = (programmeID) => {
    const [rows, setRows] = useState([]);
    const now = new Date().getTime();
    let upcomingSessions = rows.filter((item) => new Date(`${item.date} ${item.end_time}`).getTime() >= now);
    upcomingSessions = upcomingSessions.sort(
        (objA, objB) => Number(new Date(`${objA.date} ${objA.start_time}`).getTime()) - Number(new Date(`${objB.date} ${objB.start_time}`).getTime())
    )

    useEffect(() => {
        getSessionsByProgID(programmeID.programmeID)
      .then(res => {
        // console.log("res", res)
        setRows(res.data.sessionsWithRole);
      })
      .catch(err => {
        // console.log("ERROR:", err);
      })
  },[programmeID.programmeID])

    const [rerender, setRerender] = useState(false);
    const handleRerender = () => {
        setRerender(true);
    }
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        getAnnouncementsByProgID(programmeID.programmeID)
        .then(res => {
            setAnnouncements(res.data.announcementArray)
            console.log("announcements:" ,announcements)
            setRerender(false);
        })
        .catch(err => {
            console.log("ERROR:", err);
          })
    }, [programmeID.programmeID, rerender])
  
    return (
        <Box display="flex" justifyContent="space-around" width="100%" height="100%">
            <Box width="45%" height="100%" display="flex" flexDirection="column" alignItems="center" >
                {/* Upcoming Sessions */}
                <Section header="Upcoming Sessions" rows={upcomingSessions} rowColor="#AEAEFF" highlight={true} showDTG={true}></Section>
                {/* Tasks -- Removed */}
                {/* <Section header="Tasks" rows={tasks} rowColor="#AEAEFF" checkbox={true}></Section> */}
                {/* Announcements */}
                <Section header="Announcements" rows={announcements} rowColor="#AEAEFF" highlight={true} handleRerender={handleRerender}></Section>
            </Box>

            <Box width="45%">
                {/* Progress */}
                <Section header="Progress" rows={progress} rowColor="#AEAEFF" highlight={true}></Section>
                {/* Forum -- Removed */}
                {/* <Section header="Forum" rows={forum} rowColor="#AEAEFF"></Section> */}
                {/* Resources */}
                <Section header="Resources" rows={resources} rowColor="#AEAEFF" highlight={true}></Section>
            </Box>
        </Box>
    )
}

export default MainPage;

// hardcoded content to be fetched maybe tanstack query aka react query

// const upcomingSession = [
//     {
//         title: "Session 1",
//         body: "body",
//         dtg: "dtg1",
//         location: "location1"
//     },
//     {
//         title: "Session 2",
//         body: "body",
//         dtg: "dtg 2",
//         location: "location 2"
//     }
// ]

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

const progress = [
    {
        body: "Mentor(s): 40  Mentee(s): 60"
    }
]

// const forum = [
//     {
//         title: "Latest Dicussion on Agile",
//         body: "Q: What type of Agile Methodology should our group use?"
//     }
// ]

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