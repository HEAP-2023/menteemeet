import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logOut, updateProgrammes } from "./state(kiv)"
import useGetAllProgsInvolved from "./hooks/programmes/useGetAllProgsInvolved"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"



export const ProtectedRoute = () => {
    const userType = useSelector((state) => state.user.userBasicDetails.account_type)
    const {data, isSuccess, isError, error} = useGetAllProgsInvolved()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if(isError){
            if(error.response.status === 400 || error.response.status === 403){
                dispatch(logOut())
                queryClient.clear()
                localStorage.setItem("jwt", "");
                navigate("/login/start")
            }
            }

        if(isSuccess){
            dispatch(updateProgrammes(data))
            const programmes = data
            console.log(programmes)
        }
    },[isSuccess, isError])
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
