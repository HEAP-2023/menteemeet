import {useMutation, useQueryClient} from "@tanstack/react-query"
import { delProgramme } from "../../../services/programmes/organiserServices";
import { useDispatch, useSelector } from "react-redux";
import { setFailureModal, setSuccessModal } from "../../../state(kiv)";
const useDeleteProgramme = () => {
    const id = useSelector((state) => state.user.userBasicDetails.user_id)
    const dispatch = useDispatch()
    return useMutation((prog_id) => delProgramme(id, prog_id), {
        onSuccess : (data) => {
            console.log("successfully deleted prog if exist since doesnt account for prog that doesnt exist")
            dispatch(setSuccessModal(true))
        },
        onError : (data) => {
            console.log(data)
            dispatch(setFailureModal(true))
        },
        
    }) 
}
export default useDeleteProgramme;