import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../features/admin/Dashboard";
import AdminTransactions from "../features/admin/TransactionList";
import AdminTransactionDetails from "../features/admin/TransactionDetails";
import AdminUsers from "../features/admin/UserList";
import AdminUserDetails from "../features/admin/UserDetailsPage";
import AdminProfile from "../features/admin/Profile";

function AdminRoutes() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="transactions" element={<AdminTransactions />} />
                <Route
                    path="transactions/:transactionId"
                    element={<AdminTransactionDetails />}
                />
                <Route path="users" element={<AdminUsers />} />
                <Route path="users/:userId" element={<AdminUserDetails />} />
                <Route path="profile" element={<AdminProfile />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
