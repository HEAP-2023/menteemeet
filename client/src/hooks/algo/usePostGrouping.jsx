// send in mentor and mentee to create group

import { QueryClient, useMutation } from "@tanstack/react-query"
import { createGrouping } from "../../services/algo/groupings"
import { useQueryClient } from "@tanstack/react-query"
const usePostGrouping = () => {

    const queryClient = new QueryClient()
    return useMutation(createGrouping, {
        onSuccess : (data) => {
            queryClient.invalidateQueries(["getMM",])
            console.log(data)
        },
        onError : (err) => {
            const errorMessage = err.response.data.message 
            console.log(err)
        }, 
    })
}
export default usePostGrouping