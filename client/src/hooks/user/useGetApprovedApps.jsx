import { useQuery } from "@tanstack/react-query";
import { getApprovedApplications } from "../../services/user/userServices";
const useGetApprovedApps = () => {
    return (
        useQuery(["getApproved"], getApprovedApplications)
    );
}
export default useGetApprovedApps;