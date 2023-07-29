import { getUserDetails } from "../services/user/userServices";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getOrganiserDetails } from "../services/organiser/organiserServices";

export const useDetails = () => {
    const id = useSelector((state) => state.user.userBasicDetails["user_id"])
    const account_type = useSelector((state) => state.user.userBasicDetails.account_type)
    const queryFn = account_type === "organiser" ?  getOrganiserDetails : getUserDetails;
    return useQuery(['userBasicDetails', id], () => queryFn(id))
} 