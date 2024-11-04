import {
    useFetchAllUsersQuery,
    useFetchAllTransactionsQuery,
    useActivateUserAccountMutation,
    useSuspendUserAccountMutation,
} from "./adminApiSlie";
import { useState, useEffect } from "react";
import FirstSection from "../../components/adminPages/dashboard/FirstSection";
import "../../assets/css/Dashboard.css";
import UserManagementTable from "../../components/adminPages/dashboard/UserManagementTable";
import { Divider } from "@mui/material";
import Alert from "../../components/common/Alert";

const Dashboard = () => {
    const { data: usersData } = useFetchAllUsersQuery("allUsers");
    const { data: transactionsData } =
        useFetchAllTransactionsQuery("allTransactions");

    const [activateUserAccount] = useActivateUserAccountMutation();
    const [suspendUserAccount] = useSuspendUserAccountMutation();

    const [totalTransactions, setTotalTransactions] = useState<number>(0);
    const [totalDeposit, setTotalDeposit] = useState<number>(0);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const users = usersData?.users || [];
    const transactions = transactionsData?.transactions || [];

    useEffect(() => {
        let total = 0;
        let deposits = 0;

        transactions.forEach((transaction: any) => {
            total += transaction.amount;
            if (transaction.type === "deposit") deposits += transaction.amount;
        });

        setTotalTransactions(total);
        setTotalDeposit(deposits);
    }, [transactions]);

    const handleMutation = async (mutation: any, params: any) => {
        try {
            const result = await mutation(params).unwrap();
            setSuccessMessage(result?.message);
            setStatusType("success");
            setShowAlert(true);
            setTimeout(() => {
                location.reload();
            }, 1000);
        } catch (err: any) {
            console.log(`Failed! ${err}`);
            setErrorMessage(err.data.message || "Transfer Failed");
            setStatusType("error");
            setShowAlert(true);
        }
    };

    return (
        <div className="p-2 md:p-6 min-h-screen">
            <FirstSection
                totalTransactions={totalTransactions}
                totalUsers={users.length}
                totalDeposit={totalDeposit}
            />

            <section className="bg-white p-4 shadow-lg rounded-lg mt-4 space-y-4">
                <h2 className="text-3xl font-extrabold mb-4">
                    Newly Registered Users
                </h2>

                <Divider />

                <UserManagementTable
                    users={users}
                    suspendUserAccount={suspendUserAccount}
                    activateUserAccount={activateUserAccount}
                    handleMutation={handleMutation}
                />
            </section>

            {showAlert && (
                <Alert
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    statusType={statusType}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            )}
        </div>
    );
};

export default Dashboard;
