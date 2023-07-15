import axiosInstance from "../../utils/axiosInstance";
export const getUserDetails = async (id) => {
    console.log(localStorage.getItem("jwt"))
    const res = await axiosInstance({
        method : "get",
        url : `/users/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data;
}
