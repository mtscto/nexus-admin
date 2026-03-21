import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../../features/auth/services/authService";

export default function ProtectedRoute() {
    const user = authService.getCurrentUser();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}