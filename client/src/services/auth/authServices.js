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

export {
  login, register,
  verifyJWT
};