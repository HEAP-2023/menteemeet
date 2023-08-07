import { putUserDetails } from "../services/user/userServices";
import { useMutation } from "@tanstack/react-query"
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from '@tanstack/react-query';
import { putOrganiserDetails } from "../services/organiser/organiserServices";
import { setFailureModal, setSuccessModal } from "../state(kiv)";
export const usePutDetails = () => {
    const id = useSelector((state) => state.user.userBasicDetails["user_id"])
    const queryClient = useQueryClient()
    const account_type = useSelector((state) => state.user.userBasicDetails.account_type)
    const queryFn = account_type === "organiser" ? putOrganiserDetails : putUserDetails;
    const dispatch = useDispatch()
    return useMutation((data) => queryFn(data), {
        onSuccess : (data) => {
            localStorage.setItem("jwt", data.accessToken)
            queryClient.invalidateQueries({queryKey : ["userBasicDetails", id]})
            console.log(data)
            dispatch(setSuccessModal(true))
        },
        onError : (err)=> {
            console.log(err)
            const errorMessage = err.response.data.message 
            alert(errorMessage);
            dispatch(setFailureModal(true))
        },
        
    })
} 