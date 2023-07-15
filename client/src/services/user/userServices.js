import axiosInstance from "../../utils/axiosInstance";

export const getUserDetails = async (id) => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data;
}

export const putUserDetails = async (id, data) => {
    console.log(id, data)
    const res = await axiosInstance({
        method : "put",
        url : `/users/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data : data
    })
    localStorage.setItem("jwt", res.data.getAccessToken);
    return res.data;
}