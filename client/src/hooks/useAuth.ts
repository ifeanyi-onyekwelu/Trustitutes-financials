import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = localStorage.getItem("accessToken");
    let isAdmin = false;
    let isUser = false;
    let status = null;

    if (token) {
        const decoded: any = jwtDecode(token);
        const { roles } = decoded.user;

        isUser = roles.includes("user");
        isAdmin = roles.includes("admin");

        if (isUser) status = "User";
        if (isAdmin) status = "Admin";

        return { roles, status, isUser, isAdmin };
    }

    return { roles: [], isUser, isAdmin, status };
};
export default useAuth;
