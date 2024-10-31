import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
    const location = useLocation();
    const { roles } = useAuth();

    const content = roles.some((role: string) =>
        allowedRoles.includes(role)
    ) ? (
        <Outlet />
    ) : (
        <Navigate to="/secure/sign-in" state={{ from: location }} replace />
    );

    return content;
};
export default RequireAuth;
