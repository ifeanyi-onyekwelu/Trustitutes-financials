import { Route, Routes } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ForgotPassword from "../features/auth/ForgotPassword";
import AdminRegister from "../features/admin/AdminRegister";
import AdminLogin from "../features/admin/AdminLogin";
import AuthLayout from "../layouts/AuthLayout";

function AuthRoutes() {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="sign-in" element={<Login />} />
                <Route path="sign-up" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="admin/sign-up" element={<AdminRegister />} />
                <Route path="admin/sign-in" element={<AdminLogin />} />
            </Route>
        </Routes>
    );
}

export default AuthRoutes;
