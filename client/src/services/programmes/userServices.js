import axiosInstance from "../../utils/axiosInstance"


export const getInfiniteProgramme = async(page) => {
    const res = await axiosInstance({
        method : "get",
        url : `/programmes/?page=${page}&size=5`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    console.log(res.data.message)
    return res.data.response
}

export const getSignUpForm = async(id) => {
    const res = await axiosInstance({
        method : "get",
        url : `/programmes/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    console.log(res)
    return res;
}

export const postSignUp = async(signUpForm) => {
    const res = await axiosInstance({
        method : "post",
        url : `users/programmes/`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data : signUpForm
    })
    return res;
}