const { default: axiosInstance } = require("../../utils/axiosInstance")

export const postProgramme = async(programme) => {
    const res = await axiosInstance({
        method : "post",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organiser/programmes`,
        data : programme,
    })
    console.log(res)
    return res;
}

export const delProgramme = async(org_id, programme_id) => {
    const res = await axiosInstance({
        method : "delete",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organiser/${org_id}/programmes/${programme_id}`
    })
}