import { login } from "../../services/auth/authServices";
import { useMutation } from "@tanstack/react-query"
import { logIn } from "../../state(kiv)";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const useLogin = (reset) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation(login, {
        onSuccess : (data) => {
            console.log(data)
            dispatch(logIn({ type : data.role }))
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