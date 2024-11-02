import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

import RequireAuth from "./features/auth/requireAuth.tsx";
import ROLES from "./config/roles";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="secure/*" element={<AuthRoutes />} />
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                    <Route path="admin/dashboard/*" element={<AdminRoutes />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="user/dashboard/*" element={<UserRoutes />} />
                </Route>
            </Routes>
        </Router>
    );
}
