import { useQuery } from "@tanstack/react-query";
import { getGrouping } from "../../services/algo/groupings";

const useGetGrouping = (progID) => {
    return useQuery(["getGroup", progID], () => getGrouping(progID))
}

export default useGetGrouping