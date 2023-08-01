import axiosInstance from "../../utils/axiosInstance";

export const getUserDetails = async (id) => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.user;
}

export const putUserDetails = async (data) => {
    console.log(data)
    const res = await axiosInstance({
        method : "put",
        url : `/users`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        data : data
    })
    localStorage.setItem("jwt", res.data.getAccessToken);
    return res.data;
}

export const getAllProgsParticipating = async () => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/programmes/enrolled`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    const data = res.data.getUserProgObj
    const formattedObj = data.map(prog => ({
        deadline : prog["Programmes.deadline"], 
        description : prog["Programmes.description"], 
        display_image : prog["Programmes.display_image"], 
        menteeCapacity : prog["Programmes.menteeCapacity"], 
        mentorCapacity : prog["Programmes.mentorCapacity"], 
        name : prog["Programmes.name"], 
        organiser_id : prog["Programmes.organiser_id"], 
        programmeEnd : prog["Programmes.programmeEnd"], 
        programmeStart : prog["Programmes.programmeStart"], 
        programme_id : prog["Programmes.programme_id"], 
    }))
    return formattedObj;
}


export const getApprovedApplications = async ()  => {
    const res = await axiosInstance({
        method : "get",
        url : `/users/approvedApps`,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    })
    return res.data.appArray
}