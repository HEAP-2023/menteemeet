import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {
    const userType = useSelector((state) => state.user.userType)

    return (
        userType ? 
        <Outlet/> :
        <Navigate to="/login/start"></Navigate>
    )
}
export default ProtectedRoute