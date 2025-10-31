import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authcontext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(authcontext);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
