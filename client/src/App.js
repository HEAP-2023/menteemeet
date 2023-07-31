import { BrowserRouter, Routes, Route} from "react-router-dom"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme"


import SideNavbar from "./global/SideNavbar";
import Topbar from "./global/Topbar";
import Home from "./scenes/home/Home"
import Explore from "./scenes/explore/Explore";
import Profile from "./scenes/profile/Profile";
import Programme from "./scenes/programme/Programme";
import LoginStart from "./scenes/login/LoginStart";
import LoginExplore from "./scenes/login/LoginExplore"
import Test from "./scenes/testingGrounds/Test";
import CreateProgramme from "./scenes/createProgramme/CreateProgramme";
import Calendar from "./scenes/calendar/Calendar";
import { useSelector } from "react-redux";
import { ProtectedRoute, UnprotectedRoute } from "./ProtectedRoute"
import AccountSettings from "./scenes/accountSettings/AccountSettings";



function App() {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
            <BrowserRouter>
        <div className="app">
            {userType && <SideNavbar enrolled={programmes_enrolled}/>}
            
           <main className="content">
                {userType && <Topbar></Topbar>}
                <Routes>
                    {/* public routes */}
                    <Route element={<UnprotectedRoute/>}>
                        <Route path="/login/start" element={<LoginStart/>}></Route>
                        <Route path="/login/explore" element={<LoginExplore/>}></Route>
                    </Route>

                    {/* private routes */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/" element={<Home/>} role={userType}></Route>
                        <Route path="/explore/:id?" element={<Explore />}></Route>
                        <Route path="/profile" element={<Profile peerReviews={peerReviews} history={history}/>}></Route>
                        {userType === "organiser" 
                            && <Route path="/programme/create" element={<CreateProgramme/>}/>}
                        <Route path="/programmes/:id" element={<Programme programme_details={programmes_enrolled}/>}></Route>
                        <Route path="/test" element={<Test/>} />
                        <Route path="/accountSettings" element={<AccountSettings/>} />
                        <Route path="/calendar" element={<Calendar />} />
                    </Route>
                </Routes>
            </main>
        </div>
                </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


const programmes_enrolled = [
    {
        id : 14,
        name : "program_1",
        img : "../../images/home/mentorship_1.jpg",
    },
    {
        id : 2,
        name : "program_2",
        img : "../../images/home/mentorship_2.png",
    },
    {
        id : 3,
        name : "program_3",
        img : "../../images/home/mentorship_3.jpg",
    },
]





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