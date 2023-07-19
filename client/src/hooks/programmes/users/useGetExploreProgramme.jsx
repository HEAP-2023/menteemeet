import { useInfiniteQuery } from "@tanstack/react-query"
import { getInfiniteProgramme } from "../../../services/programmes/userServices"

const LENGTH = 3 //IDK IF THIS IS SUPPOSED TO BE FETCHED SOMEWHERE OR WHAT BUT IT IS THE TOTAL NUMBER OF PAGES AVAILABLE


const useGetExploreProgramme = () => {
    return useInfiniteQuery(["explore"], getInfiniteProgramme, {
        getNextPageParam : (lastPage, pages)=> {
            if(pages < LENGTH){
                return pages.length + 1;
            }
            else {
                return undefined
            }
        }
    })
}
export default useGetExploreProgramme;