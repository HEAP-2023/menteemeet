import { Box, TextField } from "@mui/material"
import Element from "./Element";
import useGetExploreProgramme from "../../hooks/programmes/users/useGetExploreProgramme";
import CircularProgress from '@mui/material/CircularProgress';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";



const DisplayProgs = ({userQuery}) => {
    const prog_id = useParams().id;
    const { ref, inView } = useInView({
        threshold: 0.5,
      });
      const {isLoading, data, hasNextPage, fetchNextPage, isSuccess, isFetching} = useGetExploreProgramme()
      
      useEffect(() => {
          if(inView){
              if(!isFetching && hasNextPage){
                  console.log("reached bottom")
                  fetchNextPage()
              }
          }
      }, [inView, isFetching])


      if(isLoading){
        return  <CircularProgress />
    }
    if(isSuccess){
        const programmes = Object.entries(data.pages).map(([key, value]) => value.programmes).flat(1)
        const filteredProgrammes = !prog_id ? 
        programmes.filter(p => p.name.includes(userQuery)) : 
        programmes.filter(p => {
            return p.programme_id === Number(prog_id)
        }) 
        
        // console.log(programmes)
        const sortedProgrammes = sortProgrammes(filteredProgrammes)
        // console.log(sortedProgrammes)

        if(filteredProgrammes.length === 0){
            return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                No Programmes Available
            </Box>)
        }
        return (
        <Box display="flex" flexDirection="column">
            {/* programme should have overflowY */}
            {
                sortedProgrammes.map((p) => <Element key={p.programme_id} details={p} />)
            }

            {/* bottom */}
            <Box ref={ref} height="100px" display="flex" justifyContent="center">
                {hasNextPage && <CircularProgress color="secondary"/>}
            </Box>
        </Box>);
    }
}
export default DisplayProgs;


const sortProgrammes = (programmes) => {
    const ytd = new Date(+new Date() - 86400000)
    const applicable = programmes.filter(p => {
        const deadline = new Date(p.deadline)
        return deadline >= ytd;
    }).sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
    .map(p => ({...p, expired:false}))
    console.log(applicable)
    const expired = programmes.filter(p => {
        const deadline = new Date(p.deadline)
        return deadline < ytd;
    }).sort((a,b) => new Date(b.deadline) - new Date(a.deadline))
    .map(p => ({...p, expired:true}))
    console.log(expired)
    
    return applicable.concat(expired)
}