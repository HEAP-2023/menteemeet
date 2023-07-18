const { default: axiosInstance } = require("../../utils/axiosInstance")

export const postProgramme = async(programme) => {
    const res = await axiosInstance({
        method : "post",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : "/programmes",
        data : programme,
    })
    console.log(res)
    return res;
}