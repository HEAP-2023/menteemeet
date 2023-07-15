import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

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
    console.log(res)
    // const res = await axios.post(`http://localhost:5001/api/v1/login/`, user)
    localStorage.setItem("jwt", res.data.accessToken);
    return ( res.data.user )
}

async function register(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/register",
    data: user
  })

    return (res.data.dataValues)
}

export {
  login, register,
  verifyJWT
};