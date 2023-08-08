import { Box } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import SectionHeader from "../../components/SectionHeader"
import Section from "../../components/home/Section"
import HomeCarousel from "../../components/home/HomeCarousel"
// redux
import { useSelector } from "react-redux"
import TransitionScreen from "../../animations/TransitionScreen"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { SuccessModal, FailureModal } from "../../components/SuccessModal";
import { getAllAnnouncements } from "../../services/organiser/organiserServices"
import { useEffect, useState } from "react"
import { getAllAnnouncementsUser, getAllSessions } from "../../services/user/userServices"
import SmallCalendar from "../../components/calendar/SmallCalendar"
const Home = () => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const name = useSelector((state) => state.user.userBasicDetails.name)
    const programmes = useSelector((state) => state.user.programmes)
    const hasProgrammes = !!programmes && programmes.length > 0
    const queryClient = useQueryClient()
    const [announcements, setAnnouncements] = useState([]);
    const [sessions, setSessions] = useState([]);
    useEffect(() => {
        if (userType === "organiser") {
            getAllAnnouncements()
                .then(res => {
                    console.log("res:", res);
                    setAnnouncements(res.data.allAnnouncements);
                })
                .catch(err => console.log("ERROR:", err));
        } else {
            getAllAnnouncementsUser()
                .then(res => {
                    console.log("res:", res);
                    setAnnouncements(res.data.modifiedAnnouncements)
                })
                .catch(err => console.log("ERROR:", err));

            getAllSessions()
                .then(res => {
                    console.log("res getAllSessions:", res)
                    setSessions(res.data.sessionsWithRole)
                })
                .catch(err => console.log("ERROR:", err));
        }
    }, [])
    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column">
            <SuccessModal info={"successfully delete programme"} actions={() => {
                queryClient.invalidateQueries(["getInvolved"]);
            }} />
            <FailureModal info={"failed to delete programme"} />

            <PageHeader text={`Welcome, ${name}`} />

            {/* carousel */}

            <SectionHeader text={userType === "organiser" ? "My Programmes" : "Featured Programmes"} />

            {(!hasProgrammes && userType === "organiser") ?

                <img src="../images/home/no-programmes.png"
                    style={{ margin: "40px", maxHeight: "300px", objectFit: "scale-down" }}
                />

                : <HomeCarousel />
            }

            
                {userType === "organiser" ? (<>
                    <Box display="flex" justifyContent="left" width="100%" height="100%">
                    <Box width="30%">
                        <SmallCalendar />
                    </Box>
                    <Box width="65%" height="100%" display="flex" flexDirection="column" alignItems="center"mb="30px" >
                        {/* announcements */}
                        <Section header="Announcements" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                    </Box>
                    </Box>
                </>) : (<>
                    <Box display="flex" justifyContent="space-around" width="100%" height="100%">
                    <Box width="45%" height="100%" display="flex" flexDirection="column" alignItems="center" mb="30px">
                        {/* announcements */}
                        <Section header="Announcements" rows={announcements} rowColor="#AEAEFF" highlight={true}></Section>
                    </Box>
                    <Box width="45%" mb="30px">
                        {/* events */}
                        <Section header="Upcoming Sessions" rows={sessions} rowColor="#AEAEFF" highlight={true}></Section>
                    </Box>
                    </Box>
                </>)}
            

            {/* <TransitionScreen/> */}
        </Box>

    )
}
export default Home

