import axiosInstance from "../../utils/axiosInstance"
const { default: axiosAlgo } = require("../../utils/axiosAlgo")




export const getGrouping = async(progID) => {
    const res = await axiosAlgo({
        method : "get",
        url : `/get-groupings/programme/${progID}`
    })
    return res.data
}

export const createGrouping = async(data) => {
    const res = await axiosAlgo({
        method : "post",
        url : `/create-groupings`,
        data : data
    })
    console.log(res.data)
    return res.data
}

export const getMMbyProgID = async(progID) => {
    const res = await axiosInstance({
        method : "get",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `programmes/${progID}/get-mentees-mentors`
    })
    console.log(res.data)
    return res.data;
}


export const editGrouping = async(progID, data) => {
    const res = await axiosAlgo({
        method : "put",
        url : `/edit-groups/programme/${progID}`,
        data : data
    })
    console.log(res.data)
    return res.data
}