import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Element from "../../components/explore/Element"
import SearchBar from "../../components/explore/SearchBar"
import useGetExploreProgramme from "../../hooks/programmes/users/useGetExploreProgramme"
import CircularProgress from '@mui/material/CircularProgress';
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react"


const Explore = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
      });
      const {isLoading, data, hasNextPage, fetchNextPage, isSuccess, isFetching} = useGetExploreProgramme()
      
      useEffect(() => {
          if(inView && hasNextPage){
              console.log("reached bottom")
              fetchNextPage()
          }
      }, [inView])


      if(isLoading){
        console.log("loading")
        return  <CircularProgress />
    }
    if(isSuccess){
         
        const programmes = Object.entries(data.pages).map(([key, value]) => value.programmes).flat(1)
        console.log(programmes)

        if(programmes.length === 0){
            return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                No Programmes Available Yet
            </Box>)
        }
        return (
        <Box display="flex" flexDirection="column">
            <PageHeader text="Explore Programmes" />
            
            {/* search bar */}
            {/* i have trouble getting it to rounded borders :( */}
            <Box width="100%" height="10vh" p="20px" >
                <SearchBar></SearchBar>
            </Box>

            {/* programme should have overflowY */}
            {
                programmes.map((p) => <Element key={p.programme_id} details={p} />)
            }

            {/* bottom */}
            {isFetching && <CircularProgress/>}
            <Box ref={ref} height="20px"></Box>
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
