import { useQuery } from "@tanstack/react-query";
import { getPendingApplications } from "../../services/user/userServices";

const useGetPendingApps = () => {
    return (
        useQuery(["getPending"], getPendingApplications)
    );
}
export default useGetPendingApps;