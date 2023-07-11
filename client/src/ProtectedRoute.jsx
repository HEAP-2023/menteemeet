import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
// import useVerifyJWT from "./hooks/useVerifyJwt"

export const ProtectedRoute = () => {
    // const {data, isSuccess} = useVerifyJWT()
    const userType = useSelector((state) => state.user.userType)

    return (
        userType ? 
        <Outlet/> :
        <Navigate to="/login/start"></Navigate>
    )
}

export const UnprotectedRoute = () => {
    // const {data, isSuccess} = useVerifyJWT()
    const userType = useSelector((state) => state.user.userType)

    return (
        userType ? 
        <Navigate to="/"></Navigate> :
        <Outlet/>
    )
}
