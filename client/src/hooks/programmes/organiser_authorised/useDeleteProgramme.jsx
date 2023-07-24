import {useMutation} from "@tanstack/react-query"
import { delProgramme } from "../../../services/programmes/organiserServices";
import { useSelector } from "react-redux";

const useDeleteProgramme = () => {
    const id = useSelector((state) => state.user.userBasicDetails.user_id)

    return useMutation((prog_id) => delProgramme(id, prog_id), {
        onSuccess : (data) => {
            console.log("successfully deleted prog if exist since doesnt account for prog that doesnt exist")
        },
        onError : (data) => {
            console.log(data)
        },
        
    }) 
}
export default useDeleteProgramme;