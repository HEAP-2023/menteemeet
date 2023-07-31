import { useInfiniteQuery } from "@tanstack/react-query"
import { getInfiniteProgramme } from "../../../services/programmes/userServices"

const LENGTH = 3 //IDK IF THIS IS SUPPOSED TO BE FETCHED SOMEWHERE OR WHAT BUT IT IS THE TOTAL NUMBER OF PAGES AVAILABLE


const useGetExploreProgramme = (size=5) => {
    return useInfiniteQuery(["explore"], ({pageParam=1}) => getInfiniteProgramme(pageParam, size), {
        getNextPageParam : (res)=> {
            const {currentPage, totalPages} = res
            if(currentPage < totalPages){
                return currentPage + 1;
            }
            else {
                return undefined
            }
        }
    })
}
export default useGetExploreProgramme;