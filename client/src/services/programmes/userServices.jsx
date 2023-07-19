import axiosInstance from "../../utils/axiosInstance"


export const getInfiniteProgramme = async(page) => {
    const res = await axiosInstance({
        method : "get",
        url : `/programmes/page=${page}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res
}