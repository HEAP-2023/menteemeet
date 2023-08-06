// send in mentor and mentee to create group

import { useMutation } from "@tanstack/react-query"
import { editGrouping } from "../../services/algo/groupings"
import { useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { setSuccessModal } from "../../state(kiv)"
const usePutNewGrouping = (progID) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    return useMutation((data) => editGrouping(progID, data), {
        onSuccess : (data) => {
            queryClient.invalidateQueries(["getGroup", progID])
            console.log(data)
            dispatch(setSuccessModal(true))
        },
        onError : (err) => {
            const errorMessage = err.response.data.message 
            console.log(err)
        }, 
    })
}
export default usePutNewGrouping