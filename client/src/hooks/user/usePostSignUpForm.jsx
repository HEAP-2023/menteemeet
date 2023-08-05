import { useContext } from "react";
import { postSignUp } from "../../services/programmes/userServices";
import { useMutation } from "@tanstack/react-query"
import { FeedBackContext } from "../../scenes/explore/Explore";

const usePostSignUpForm = (setDialogOpen) => {
    const openFeedback = useContext(FeedBackContext)
    
    return useMutation(postSignUp, {
        onSuccess : (data) => {
            console.log(data);
            setDialogOpen(false)
            openFeedback(true)
        },
        onError : (err)=> {
            console.log(err)
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        },
        
    })
} 

export default usePostSignUpForm