import { putUserDetails } from "../../services/user/userServices";
import { useMutation } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import { useQueryClient } from '@tanstack/react-query';
export const usePutUserDetails = () => {
    const id = useSelector((state) => state.user.userBasicDetails["user_id"])
    const queryClient = useQueryClient()
    return useMutation((data) => putUserDetails(id, data), {
        onMutate : async(newData) => {
            console.log(newData)
            
            // queryClient.setQueryData(['userBasicDetails', id], newData)
            await queryClient.cancelQueries(["userBasicDetails", id])
        },
        onSuccess : (data) => {
            queryClient.invalidateQueries({queryKey : ["userBasicDetails", id]})
            console.log(data)
            // alert("successfully change details")
        },
        onError : (err)=> {
            console.log(err)
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        },
        
    })
} 