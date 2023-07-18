import { logout } from "../../services/auth/authServices";
import { useMutation } from "@tanstack/react-query"
import { logOut, updateDetails } from "../../state(kiv)";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector((state) => state.user.userBasicDetails.user_id)
    return useMutation(() => logout(id), {
        onSuccess : (data) => {
            dispatch(logOut())
            console.log(data)
            localStorage.setItem("jwt", "");
        },
        onError : (err)=> {
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        }
    })
}
export default useLogout;