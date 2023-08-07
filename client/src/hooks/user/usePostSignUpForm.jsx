import { postSignUp } from "../../services/programmes/userServices";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux";
import { setSuccessModal } from "../../state(kiv)";

const usePostSignUpForm = (setDialogOpen) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    return useMutation(postSignUp, {
        onSuccess : (data) => {
            console.log(data);
            setDialogOpen(false)
            dispatch(setSuccessModal(true))
            queryClient.invalidateQueries(["getPending"])
        },
        onError : (err)=> {
            console.log(err)
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        },
        
    })
} 

export default usePostSignUpForm