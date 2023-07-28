import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const verifyJWT = async() => {
    // const res = await axiosInstance({
    //     method : "get",
    //     url : "auth/verify",
    //     headers : {Authorization : `Bearer ${localStorage.getItem("jwt")}`}
    // });

// below can be omitted just return above

    // console.log("VERIFY RES: ", res);

    // return res.status === 200;

    // for now just return true if jwt exists until route is up
    if(localStorage.getItem("jwt") === null){
        return false;
    }
    return true;
}


async function login(user) {
    const res = await axiosInstance({
        method: "post",
        url: "/login",
        data: user
    })
    localStorage.setItem("jwt", res.data.accessToken);
    const user_id = !!res.data.user ? res.data.user.user_id : res.data.organiser.organiser_id
    console.log({...res.data.user, ...res.data.account, ...res.data.organiser, user_id : user_id})
    return ( {...res.data.user, ...res.data.account, ...res.data.organiser, user_id : user_id} )
}

async function register(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/register",
    data: user
  })
  localStorage.setItem("jwt", res.data.accessToken);
    return (res.data)
}

// const logout = async() => {
//     console.log("logout")
//     const res = await axiosInstance({
//         method : "post",
//         url : `/logout`,
//         headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
//     })
//     console.log(res)
//     return res.data
// }

const changePW = async (passwords) => {
    console.log("chagne password")
    const res = await axiosInstance({
        method : "post",
        url : `/change-password`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data : passwords,
    })
    console.log(res)
    return res.data
}


export {
  login, register, 
  verifyJWT, changePW
};