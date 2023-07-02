import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
// import useVerifyJWT from "./hooks/useVerifyJwt"

const ProtectedRoute = () => {
    // const {data, isSuccess} = useVerifyJWT()
    const userType = useSelector((state) => state.user.userType)

    return (
        userType ? 
        <Outlet/> :
        <Navigate to="/login/start"></Navigate>
    )
}
export default ProtectedRoute