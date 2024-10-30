import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import UserDashboard from "../features/user/Dashboard";
import UserTransactions from "../features/user/Transactions";
import UserProfile from "../features/user/Profile";
import UserFundAccount from "../features/user/Deposit";
import UserConfirmTransfer from "../features/user/ConfirmDeposit";
import UserTransferFunds from "../features/user/Transfer";
import UserTransactionDetails from "../features/user/TransactionDetails";
import UserWithdraw from "../features/user/Withdraw";

function UserRoutes() {
    return (
        <Routes>
            <Route element={<UserDashboardLayout />}>
                <Route index element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="deposit" element={<UserFundAccount />} />
                <Route
                    path="confirm-deposit"
                    element={<UserConfirmTransfer />}
                />
                <Route path="transfer" element={<UserTransferFunds />} />
                <Route path="transactions" element={<UserTransactions />} />
                <Route path="withdraw" element={<UserWithdraw />} />
            </Route>
        </Routes>
    );
}

export default UserRoutes;
