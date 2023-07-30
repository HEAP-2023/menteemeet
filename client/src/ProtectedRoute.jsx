import { Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateProgrammes } from "./state(kiv)"
import useGetAllProgsInvolved from "./hooks/programmes/useGetAllProgsInvolved"
import { useEffect } from "react"

export const ProtectedRoute = () => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const {data, isSuccess, isError} = useGetAllProgsInvolved()
    const dispatch = useDispatch()
    useEffect(() => {
        if(isError){
            console.log("error")
        }
    
        if(isSuccess){
            dispatch(updateProgrammes(data))
            const programmes = data
            console.log(programmes)
        }
    },[isSuccess])
    return (
        userType ? 
        <Outlet/> :
        <Navigate to="/login/start"></Navigate>
    )
}

export const UnprotectedRoute = () => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)

    return (
        userType ? 
        <Navigate to="/"></Navigate> :
        <Outlet/>
    )
}
