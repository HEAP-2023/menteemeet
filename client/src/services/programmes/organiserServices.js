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
        url : `/organisers/programmes/${programme_id}`
    })
}


export const getAllProgsCreated = async() => {
    const res = await axiosInstance({
        method : "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organisers/programmes`,
    })
    return res.data.getOrgProgObj;
}

export const getApplicationsByProgID = async(progID) => {
    const res = await axiosInstance({
        method : "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organisers/programmes/${progID}/applications`,
    })
    return res;
}

export const putApplicationAcceptance = async(appID, approval) => {
    const res = await axiosInstance({
        method: "put",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url: `/organisers/applications/${appID}`,
        data: approval
    })
    console.log("res:", res);
    return res
}

export const getAllSessionsOrganiser = async() => {
    const res = await axiosInstance({
        method:'get',
        url: '/organisers/sessions',
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}