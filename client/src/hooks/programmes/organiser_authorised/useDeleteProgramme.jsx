import {useMutation} from "@tanstack/react-query"
import { delProgramme } from "../../../services/programmes/organiserServices";


const useDeleteProgramme = () => {
    return useMutation(delProgramme, {
        onSuccess : (data) => {
            console.log(data)
        },
        onError : (data) => {
            console.log(data)
        },
        
    }) 
}
export default useDeleteProgramme;