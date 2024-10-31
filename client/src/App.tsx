import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<PublicRoutes />} />
                <Route path="secure/*" element={<AuthRoutes />} />
                <Route path="admin/dashboard/*" element={<AdminRoutes />} />
                <Route path="user/dashboard/*" element={<UserRoutes />} />
            </Routes>
        </Router>
    );
}
