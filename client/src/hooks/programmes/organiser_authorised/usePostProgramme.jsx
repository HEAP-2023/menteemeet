import { useMutation } from "@tanstack/react-query"
import { postProgramme } from "../../../services/programmes/organiserServices"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
const usePostProgramme = () => {
    const navigate = useNavigate()
    return useMutation(postProgramme, {
        onSuccess : (data) =>  {
            console.log(data)
            navigate("/");
            alert("successfully added programmes")
        },
        onError : (err) => {
            const errorMessage = err.response.data.message 
            alert(errorMessage);
        },
    })
}
export default usePostProgramme 