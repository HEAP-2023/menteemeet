import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CssBaseline, Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme"


import SideNavbar from "./global/SideNavbar";
import Topbar from "./global/Topbar";
import Home from "./scenes/home/Home"
import Explore from "./scenes/explore/Explore";
import Profile from "./scenes/profile/Profile";


function App() {
    
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
            <BrowserRouter>
        <div className="app">
            <SideNavbar enrolled={programmes_enrolled}></SideNavbar>
            <main className="content">
                <Topbar acctInfo={acctInfo}></Topbar>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/explore" element={<Explore programmes={Programmes_available}/>}></Route>
                    <Route path="/profile" element={<Profile peerReviews={peerReviews} history={history} acctInfo={acctInfo}/>}></Route>
                </Routes>
            </main>
        </div>
                </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

const acctInfo = {
    acctId : 1,
    name : "NEO SHYH RUEY",
    email : "srneo.2022@scis.smu.edu.sg"
}

const programmes_enrolled = {
    programID1 : {
        id : 1,
        name : "program_1",
        img : "../../images/home/mentorship_1.jpg",
        link : "/mentorshipPrograms/enrolled/1",
    },
    programID2 : {
        id : 2,
        name : "program_2",
        img : "../../images/home/mentorship_2.png",
        link : "/mentorshipPrograms/enrolled/2",
    },
    programID3 : {
        id : 3,
        name : "program_3",
        img : "../../images/home/mentorship_3.jpg",
        link : "/mentorshipPrograms/enrolled/3",
    },
}




const Programmes_available = {
    programmeID1 : {
        PID : 1,
        name : "Programme 1",
        description : "this is the 1st programme  Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años",
        category : "test",
        capacity : 50,
        startDate : "18/3/2023",
        endDate : "19/9/2023",
        applicationDeadline : "17/2/2023",
        media : "../../images/home/mentorship_1.jpg",
        criteria : {1 : "criteria 1", 2 : "criteria 2"},
        link : "https://youtu.be/dQw4w9WgXcQ",
    },
    programmeID2 : {
        PID : 2,
        name : "Programme 2",
        description : "this is the 2nd programme",
        category : "test",
        capacity : 50,
        startDate : "18/3/2023",
        endDate : "19/9/2023",
        applicationDeadline : "17/2/2023",
        media : "../../images/home/mentorship_2.png",
        criteria : {1 : "criteria 3", 2 : "criteria 4"},
        link : "https://youtu.be/dQw4w9WgXcQ",
    },
    programmeID3 : {
        PID : 3,
        name : "Programme 3",
        description : "this is the 3rd programme",
        category : "test",
        capacity : 50,
        startDate : "18/3/2023",
        endDate : "19/9/2023",
        applicationDeadline : "17/2/2023",
        media : "../../images/home/mentorship_3.jpg",
        criteria : {1 : "criteria 3", 2 : "criteria 4"},
        link : "https://youtu.be/dQw4w9WgXcQ",
    }
}


const peerReviews = {
    reviewID1 : {
        RID : 1,
        programmeName : "Heap-2023",
        reviewer : "Leonard",
        reviewerRole : "Mentor",
        date : "12/2/2023",
        rating : "3.7/5",
        comments : "comment 1"
    },
    reviewID2 : {
        RID : 2,
        programmeName : "Heap-2023",
        reviewer : "Leonard",
        reviewerRole : "Mentee",
        date : "12/2/2023",
        rating : "3.7/5",
        comments : "comment 2"
    },
    reviewID3 : {
        RID : 3,
        programmeName : "Heap-2023",
        reviewer : "Leonard",
        reviewerRole : "Mentor",
        date : "12/2/2023",
        rating : "3.7/5",
        comments : "comment 3"
    },
}


const history = {
    historyID1 : {
        HID : 1,
        role : "mentor",
        startDate : "19/2/2022",
        completionDate : "20/2/2023",
        programmeName : "Heap2023"
    },
    historyID2 : {
        HID : 2,
        role : "mentor",
        startDate : "19/2/2022",
        completionDate : "20/2/2023",
        programmeName : "Heap2024"
    },
    historyID3 : {
        HID : 3,
        role : "mentee",
        startDate : "19/2/2022",
        completionDate : "20/2/2023",
        programmeName : "Heap2025"
    }
}