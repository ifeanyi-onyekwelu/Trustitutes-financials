import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminDashboardLayout";
import Dashboard from "../features/admin/Dashboard";
import Transactions from "../features/admin/TransactionList";
import UserManagement from "../features/admin/UserManagement.";
import Profile from "../features/admin/Profile";
import UserDetailsPage from "../features/admin/UserDetailsPage";
import Settings from "../features/admin/Settings";
import AccountList from "../features/admin/Accounts";
import SupportTicketsLists from "../features/admin/SupportTicket";

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="users/:userId" element={<UserDetailsPage />} />
                <Route path="accounts" element={<AccountList />} />
                <Route
                    path="support-tickets"
                    element={<SupportTicketsLists />}
                />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
