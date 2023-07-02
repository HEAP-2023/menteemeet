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
        url: "/user/login",
        data: user
    })
    console.log(res)
    
    // below can be omitted just return the request but role must be included ah 
    if (res.status !== 200) return (
        {authorised : false}
    );
    
    localStorage.setItem("jwt", res.data.accessToken);
    return (
    {
        authorised : true,
        role : "mentee", // here i should get a res.data.role
    }
    )
}

async function register(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/user/register",
    data: user
  })
  console.log(res)
  if (res.status !== 201) return (
    {authorised : false}
);


    return (
    {
        authorised : true,
        role : "mentee", // here i should get a res.data.role
    }
    )
}

export {
  login, register,
  verifyJWT
};