import axiosInstance from "../../utils/axiosInstance";

export const putOrganiserDetails = async (data) => {
    console.log(data)
    const res = await axiosInstance({
        method : "put",
        url : `/organisers`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data : data
    })
    localStorage.setItem("jwt", res.data.getAccessToken);
    return res.data;
}

export const getOrganiserDetails = async (id) => {
    const res = await axiosInstance({
        method : "get",
        url : `/organisers/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.organiser;
}

export const getAllAnnouncements = async () => {
    const res = await axiosInstance({
        method: "get",
        url: '/organisers/announcements',
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

export const getAnnouncementsByProgID = async (progID) => {
    const res = await axiosInstance({
        method: "get",
        url: `/organisers/announcements/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}

export const addAnnouncementByProgID = async (data) => {
    const res = await axiosInstance({
        method: 'post',
        url: `/organisers/announcements`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: data
    })
    return res
}

export const deleteAnnouncementsByProgID = async (announcementID) => {
    const res = await axiosInstance({
        method: 'delete',
        url: `/organisers/announcements/${announcementID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: announcementID
    })
    return res
}

export const addOrgFeedback = async(feedback) => {
    const res = await axiosInstance({
        method: 'post',
        url: `/organisers/addOrgFeedback`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data: feedback
    })
    return res
}

export const getAllFeedbackByUsers = async(progID) => {
    const res = await axiosInstance({
        method: 'get',
        url: `/organisers/getAllFeedback/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}