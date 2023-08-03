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

export const getAnnouncementsByProgID = async (progID) => {
    const res = await axiosInstance({
        method: "get",
        url: `/organisers/announcements/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}