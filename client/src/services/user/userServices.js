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
    console.log(res.data.getUserProgObj)
    return res.data.getUserProgObj;
}