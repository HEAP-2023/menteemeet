import axiosInstance from "../../utils/axiosInstance"


export const getInfiniteProgramme = async(page,size) => {
    const res = await axiosInstance({
        method : "get",
        url : `/programmes/?page=${page}&size=${size}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })

    // const programmes = res.data.response.programmes;
    // const out = removeExpired(programmes)
    // console.log(out)
    // return {...res.data.response, programmes : out}

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

export const getUserName = async(userID) => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/${userID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.user["Account.name"];
    // return res;
}

export const getSessionsByProgID = async(progID) => {
    const res = await axiosInstance({
        method: "get",
        url: `/users/session/${progID}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res;
}


const removeExpired = (programmes) => {
    console.log(programmes)
    const today = new Date();

    return programmes.filter(prog => {
        const deadline = new Date(prog.deadline); 
        return deadline >= today;
    })
}