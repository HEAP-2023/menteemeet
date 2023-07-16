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
    console.log({...res.data.user, ...res.data.account})
    return ( {...res.data.user, ...res.data.account} )
}

async function register(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/register",
    data: user
  })

    return (res.data.dataValues)
}

const logout = async(id) => {
    console.log("logout")
    const res = await axiosInstance({
        method : "put",
        url : `/users/${id}/logout`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    console.log(res)
    return res.data
}

export {
  login, register, logout,
  verifyJWT
};