import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Element from "../../components/explore/Element"
import SearchBar from "../../components/explore/SearchBar"
import useGetExploreProgramme from "../../hooks/programmes/users/useGetExploreProgramme"
import CircularProgress from '@mui/material/CircularProgress';
import { useRef } from "react"


const Explore = () => {
    const {isLoading, data, hasNextPage, fetchNextPage, isSuccess, isFetching} = useGetExploreProgramme()
    const bottom = useRef()
    console.log(data?.pages[0].programmes)
    // if(bottom?.getBoundingClientRect().bottom <= window.innerHeight){
        // console.log(bottom?.current.offsetTop)
        // console.log(window.scrollY)
    // }
    if(isLoading){
        console.log("loading")
        return  <CircularProgress />
    }
    if(isSuccess){
        const programmes = data.pages[0].programmes
        console.log(programmes)
        if(programmes.length === 0){
            return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                No Programmes Available Yet
            </Box>)
        }
        return (<Box display="flex" flexDirection="column" >
            <PageHeader text="Explore Programmes" />
            
            {/* search bar */}
            {/* i have trouble getting it to rounded borders :( */}
            <Box width="100%" height="10vh" p="20px" >
                <SearchBar></SearchBar>
            </Box>

            {/* programme should have overflowY */}
            {
                programmes.map((p)  => <Element key={p.programme_id} details={p} />)
            }
            {isFetching && <CircularProgress/>}
            <div ref={bottom}></div>
        </Box>);
    }
}

export default Explore;

// get all
// ['programme_id', 
// 'name', 
// 'description',
// 'category', 
// 'display_image']
