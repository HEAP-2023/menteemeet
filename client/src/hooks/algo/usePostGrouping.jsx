// send in mentor and mentee to create group

import { useMutation } from "@tanstack/react-query"
import { createGrouping } from "../../services/algo/groupings"
import { useQueryClient } from "@tanstack/react-query"
const usePostGrouping = (progID) => {
    const queryClient = useQueryClient()
    return useMutation(createGrouping, {
        onSuccess : (data) => {
            queryClient.invalidateQueries(["getGroup", progID])
            console.log(data)
        },
        onError : (err) => {
            const errorMessage = err.response.data.message 
            console.log(err)
        }, 
    })
}
export default usePostGrouping