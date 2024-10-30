import {
    useFetchAllUsersQuery,
    useFetchAllTransactionsQuery,
    useActivateUserAccountMutation,
    useSuspendUserAccountMutation,
    useDeleteUserAccountMutation,
} from "./adminApiSlie";
import { useState, useEffect } from "react";

import "chart.js/auto";
import { Link } from "react-router-dom";
import FirstSection from "../../components/adminPages/dashboard/FirstSection";
import "../../assets/css/Dashboard.css";
import Charts from "../../components/adminPages/dashboard/Charts";
import UserManagementTable from "../../components/adminPages/dashboard/UserManagementTable";
import TransactionManagementTable from "../../components/adminPages/dashboard/TransactionManagementTable";
import Modal from "../../components/adminPages/dashboard/Modal";

const Dashboard = () => {
    const { data: usersData } = useFetchAllUsersQuery("allUsers");
    const { data: transactionsData } =
        useFetchAllTransactionsQuery("allTransactions");

    const [activateUserAccount] = useActivateUserAccountMutation();
    const [suspendUserAccount] = useSuspendUserAccountMutation();
    const [deleteUserAccount] = useDeleteUserAccountMutation();

    const [totalTransactions, setTotalTransactions] = useState<number>(0);
    const [totalDeposit, setTotalDeposit] = useState<number>(0);

    const users = usersData?.users || [];
    const transactions = transactionsData?.transactions || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<any>(null);

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

    const openModal = (content: any) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const userStatusData = {
        labels: ["Active", "Inactive"],
        datasets: [
            {
                label: "User Status",
                data: [
                    users.filter((user: any) => user.isActive).length,
                    users.filter((user: any) => !user.isActive).length,
                ],
                backgroundColor: ["#4CAF50", "#FF9800"],
            },
        ],
    };

    const transactionTypeData = {
        labels: ["Deposits", "Withdrawals"],
        datasets: [
            {
                label: "Transaction Types",
                data: [
                    transactions.filter((t: any) => t.type === "deposit")
                        .length,
                    transactions.filter((t: any) => t.type === "withdrawal")
                        .length,
                ],
                backgroundColor: ["#2196F3", "#F44336"],
            },
        ],
    };

    const handleMutation = async (mutation: any, params: any) => {
        try {
            const result = await mutation(params).unwrap();
            console.log(`RESPONSE: ${JSON.stringify(result)}`);
        } catch (err: any) {
            console.log(`Failed! ${err}`);
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <FirstSection
                totalTransactions={totalTransactions}
                totalUsers={users.length}
                totalDeposit={totalDeposit}
            />

            <Charts
                userStatusData={userStatusData}
                transactionTypeData={transactionTypeData}
            />

            <section className="bg-white p-4 shadow-lg rounded-lg mt-4">
                <h2 className="text-xl font-semibold mb-4">User Management</h2>

                <UserManagementTable
                    users={users}
                    suspendUserAccount={suspendUserAccount}
                    activateUserAccount={activateUserAccount}
                    openModal={openModal}
                    deleteUserAccount={deleteUserAccount}
                    handleMutation={handleMutation}
                />
            </section>

            {/* <section className="bg-white p-4 shadow-lg rounded-lg mt-4">
                <h2 className="text-xl font-semibold mb-4">
                    Transaction Management
                </h2>
                <div className="overflow-auto">
                    <TransactionManagementTable transactions={transactions} />
                </div>
            </section> */}

            <Modal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                modalContent={modalContent}
            />
        </div>
    );
};

export default Dashboard;
