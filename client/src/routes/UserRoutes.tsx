import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import Dashboard from "../features/user/Dashboard";
import Transactions from "../features/user/Transactions";
import Profile from "../features/user/Profile";
import FundAccount from "../features/user/Deposit";
import ConfirmTransfer from "../features/user/ConfirmDeposit";
import TransferFunds from "../features/user/Transfer";
import Withdraw from "../features/user/Withdraw";
import CreateVirtualCard from "../features/user/CreateVirtualCard";

function UserRoutes() {
    return (
        <Routes>
            <Route element={<UserDashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="deposit" element={<FundAccount />} />
                <Route path="confirm-deposit" element={<ConfirmTransfer />} />
                <Route path="transfer" element={<TransferFunds />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="withdraw" element={<Withdraw />} />
                <Route
                    path="card/virtual/add"
                    element={<CreateVirtualCard />}
                />
            </Route>
        </Routes>
    );
}

export default UserRoutes;
