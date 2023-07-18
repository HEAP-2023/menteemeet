import { logout } from "../../services/auth/authServices";
import { useMutation } from "@tanstack/react-query"
import { logOut } from "../../state(kiv)";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useLogout = () => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.userBasicDetails.user_id)
    const account_type = useSelector((state) => state.user.userBasicDetails.account_type)
    const backend_role = account_type === "organiser" ? "organiser" : "users" 
    return useMutation(() => logout(id, backend_role), {
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