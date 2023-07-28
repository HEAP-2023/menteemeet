import { useQuery } from "@tanstack/react-query"
import { getAllProgsCreated } from "../../services/programmes/organiserServices"
import { useSelector } from "react-redux"
import { getAllProgsParticipating } from "../../services/user/userServices"
import { useCallback } from "react"

const useGetAllProgsInvolved = () => {
    const user_id = useSelector((state) => state.user.userBasicDetails.user_id)
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)

    const queryFn = useCallback(() => {
        if (userType === "organiser"){
            return getAllProgsCreated(user_id)
        }
        return getAllProgsParticipating(userType)
    })
    return useQuery(["getInvolved"], queryFn)
}

export default useGetAllProgsInvolved;

//go create and import a function that gets all programmes that they are participating in currently