import { useQuery } from "@tanstack/react-query"
import { getSignUpForm } from "../../../services/programmes/userServices"

const useGetSignUpForm = ({id}) => {
    return useQuery(["signUpForm", id], () => getSignUpForm(id))
}
export default useGetSignUpForm;