import { register } from "../../services/auth/authServices";
import { useMutation } from "@tanstack/react-query"
import { logIn, updateDetails } from "../../state(kiv)";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const useSignup = (reset) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation(register, {
        onSuccess : (data) => {
            console.log(data)
            dispatch(logIn({ type : data.account_type }))
            dispatch(updateDetails({...data}))
            navigate("/");
        },
        onError : (err)=> {
            const errorMessage = err.response.data.message 
            alert(errorMessage);
            reset();
        }
    })
}
export default useSignup;