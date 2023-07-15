import { putUserDetails } from "../../services/user/userServices";
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux";

export const usePutUserDetails = (data) => {
    const id = useSelector((state) => state.user.userBasicDetails["User.user_id"])
    
    return useMutation(() => putUserDetails(id, data), {
        onSuccess : (data) => {
            console.log(data)
        },
        onError : (err)=> {
            console.log(err)
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        }
    })
} 