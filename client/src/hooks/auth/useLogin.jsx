import { login } from "../../services/auth/authServices";
import { useMutation } from "@tanstack/react-query"
import { logIn, updateDetails } from "../../state(kiv)";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const useLogin = (reset) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation(login, {
        onSuccess : (data) => {
            dispatch(logIn({ type : data.account_type }))
            console.log(data)
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
export default useLogin;