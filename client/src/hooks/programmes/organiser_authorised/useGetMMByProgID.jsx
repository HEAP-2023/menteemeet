import { useQuery } from "@tanstack/react-query";
import { getMMbyProgID } from "../../../services/algo/groupings";

const useGetMMByProgID = (progID) => {
    return useQuery(["getMM", progID], () => getMMbyProgID(progID))
}
export default useGetMMByProgID;