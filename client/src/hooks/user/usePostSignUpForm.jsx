import { postSignUp } from "../../services/programmes/userServices";
import { useMutation } from "@tanstack/react-query"
const usePostSignUpForm = () => {
    return useMutation(postSignUp, {
        onSuccess : (data) => {
            console.log(data)
        },
        onError : (err)=> {
            console.log(err)
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        },
        
    })
} 

export default usePostSignUpForm