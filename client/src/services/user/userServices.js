import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export const getUserDetails = async (id) => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.user;
}

export const putUserDetails = async (data) => {
    console.log(data)
    const res = await axiosInstance({
        method : "put",
        url : `/users`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data : data
    })
    localStorage.setItem("jwt", res.data.getAccessToken);
    return res.data;
}

export const getAllProgsParticipating = async () => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/programmes/enrolled`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    const data = res.data.getUserProgObj
    const formattedObj = data.map(prog => ({
        deadline : prog["Programmes.deadline"], 
        description : prog["Programmes.description"], 
        display_image : prog["Programmes.display_image"], 
        menteeCapacity : prog["Programmes.menteeCapacity"], 
        mentorCapacity : prog["Programmes.mentorCapacity"], 
        name : prog["Programmes.name"], 
        organiser_id : prog["Programmes.organiser_id"], 
        programmeEnd : prog["Programmes.programmeEnd"], 
        programmeStart : prog["Programmes.programmeStart"], 
        programme_id : prog["Programmes.programme_id"], 
        role : prog["Programmes.UserProgramme.role"],
    }))
    return formattedObj;
}


export const getApprovedApplications = async ()  => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/approvedApps`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.appArray
}

export const getPendingApplications = async ()  => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/pendingApps`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.appArray
}

export const getRejectedApplications = async ()  => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/rejectedApps`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.appArray
}


export const getAllSessions = async () => {
    const res = await axiosInstance({
        method: "get",
        url: "/users/session",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

export const addSessionByGrpID = async (session, progID) => {
    const res = await axiosInstance({
        method: "post",
        url: `/users/session/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: session
    })
    console.log("SESSION:",session);
    return res
}

export const updateSessionBySessionID = async(session) => {
    const res = await axiosInstance({
        method: "put",
        url: "/users/session/update",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: session
    })
    console.log("SESSION:",session);
    return res
}

export const deleteSessionBySessionID = async(sessID) => {
    const res = await axiosInstance({
        method: "delete",
        url: `/users/session/${sessID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: sessID
    })
    return res
}

export const getAllFeedback = async() => {
    const res = await axiosInstance({
        method: "get",
        url: "/users/feedback",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

export const addFeedback = async(feedback) => {
    const res = await axiosInstance({
        method: 'post',
        url: "/users/addFeedback",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: feedback
    })
    return res
}

export const getListOfMentors = async(progID) => {
    const res = await axiosInstance({
        method: "get",
        url: `/users/listofMentors/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

export const getListOfMentees = async(progID) => {
    const res = await axiosInstance({
        method: "get",
        url: `/users/listofMentees/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

export const getAllAnnouncementsUser = async () => {
    const res = await axiosInstance({
        method: "get",
        url: '/users/announcements',
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

