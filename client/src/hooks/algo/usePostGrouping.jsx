// send in mentor and mentee to create group

import { useMutation } from "@tanstack/react-query"
import { createGrouping } from "../../services/algo/groupings"
import { useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
const usePostGrouping = (progID, setFailGenerate) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    return useMutation(createGrouping, {
        onSuccess : (data) => {
            queryClient.invalidateQueries(["getGroup", progID])
            console.log(data)
        },
        onError : (err) => {
            const errorMessage = err.response.data.error
            setFailGenerate("Insufficient mentors / mentees")
        }, 
    })
}
export default usePostGrouping