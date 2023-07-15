import { getUserDetails } from "../../services/user/userServices";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useUserDetails = () => {
    // const id = useSelector((state) => state.user.userBasicDetails.account_id)
    const id = useSelector((state) => state.user.userBasicDetails["User.user_id"])
    return useQuery(['userBasicDetails', id], () => getUserDetails(id))
} 