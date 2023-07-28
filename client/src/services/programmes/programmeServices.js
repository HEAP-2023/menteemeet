import axiosInstance from "../../utils/axiosInstance"

export const getProgsByName = async (progName) => {
    const res = await axiosInstance({
        method : "get",
        url : `/programmes/search-by-name/${progName}`,
    })
    return res;
}
