const { default: axiosInstance } = require("../../utils/axiosInstance")

export const postProgramme = async(id,programme) => {
    const res = await axiosInstance({
        method : "post",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        url : `/organiser/${id}/programmes`,
        data : programme,
    })
    console.log(res)
    return res;
}