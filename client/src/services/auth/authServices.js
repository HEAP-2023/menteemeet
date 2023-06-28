import axiosInstance from "../../utils/axiosInstance";


async function login(user) {
  const res = await axiosInstance({
    method: "post",
    url: "/user/register",
    data: user
  })

  if (res.status !== 200) return false;

  localStorage.setItem("jwt", res.data.accessToken);
  return true;
}

export {
  login 
};