import { useQuery } from "@tanstack/react-query";
import { getRejectedApplications } from "../../services/user/userServices";

const useGetRejectedApps = () => {
    return (
        useQuery(["getRejected"], getRejectedApplications)
    );
}
export default useGetRejectedApps;