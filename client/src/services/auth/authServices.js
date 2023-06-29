import axiosInstance from "../../utils/axiosInstance";

async function login(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/user/login",
    data: user
  })

  if (res.status !== 200) return false;
  console.log(res)
  localStorage.setItem("jwt", res.data.accessToken);
  return true;
}

async function register(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/user/register",
    data: user
  })
  console.log(res)
  if (res.status !== 201) return false;
  return true;
}

export {
  login, register
};