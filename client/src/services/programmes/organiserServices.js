const { default: axiosInstance } = require("../../utils/axiosInstance")

export const postProgramme = async(programme) => {
    const res = await axiosInstance({
        method : "post",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organisers/programmes`,
        data : programme,
    })
    console.log(res)
    return res;
}

export const delProgramme = async(org_id, programme_id) => {
    const res = await axiosInstance({
        method : "delete",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organisers/${org_id}/programmes/${programme_id}`
    })
}


export const getAllProgsCreated = async(org_id) => {
    const res = await axiosInstance({
        method : "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organisers/programmes`,
    })
    return res;
}

export const getApplicationsByProgID = async(progID) => {
    const res = await axiosInstance({
        method : "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organisers/programmes/${progID}/applications`,
    })
    return res;
}