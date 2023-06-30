import axiosInstance from "../../utils/axiosInstance";



async function login(user) {
    const res = await axiosInstance({
        method: "post",
        url: "/user/login",
        data: user
    })
    console.log(res)
    
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
  login, register
};