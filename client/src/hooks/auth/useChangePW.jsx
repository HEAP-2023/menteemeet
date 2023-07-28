import { changePW } from "../../services/auth/authServices";
import { useMutation } from "@tanstack/react-query"
import { logOut } from "../../state(kiv)";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useChangePW = () => {
    const dispatch = useDispatch();
    return useMutation(changePW, {
        onSuccess : (data) => {
            alert("password successfully changed")
            console.log(data)
            dispatch(logOut())
            localStorage.setItem("jwt", "");
        },
        onError : (err)=> {
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        }
    })
}
export default useChangePW;