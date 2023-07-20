import { Box, Typography } from "@mui/material"
import { generateColors } from "../../theme"
import PageHeader from "../../components/PageHeader"
import Element from "../../components/explore/Element"
import SearchBar from "../../components/explore/SearchBar"
import useGetExploreProgramme from "../../hooks/programmes/users/useGetExploreProgramme"



const Explore = ({programmes}) => {
    const {isLoading, data, hasNextPage, fetchNextPage, isFetching} = useGetExploreProgramme()
    console.log(data?.pages[0].programmes)

    return (<Box display="flex" flexDirection="column" >
        <PageHeader text="Explore Programmes" />
        
        {/* search bar */}
        {/* i have trouble getting it to rounded borders :( */}
        <Box width="100%" height="10vh" p="20px" >
            <SearchBar></SearchBar>
        </Box>

        {/* programme should have overflowY */}
        {
            Object.entries(programmes).map(([key,value])  => <Element key={value.PID} details={value} id={2}/>)
        }
    </Box>);
}

export default Explore;

// get all
// ['programme_id', 
// 'name', 
// 'description',
// 'category', 
// 'display_image']
