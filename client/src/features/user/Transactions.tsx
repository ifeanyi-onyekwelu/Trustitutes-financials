import UserTransactionsTable from "./TransactionTable";
import { useFetchTransactionsQuery } from "./userApiSlice";

const Transaction = () => {
    const { data: transactionsData } =
        useFetchTransactionsQuery("userTransactions");

    const transactions = transactionsData?.transactions || [];
    return (
        <div className="bg-dashboard">
            <div className="container mx-auto p-4">
                <UserTransactionsTable transactions={transactions} />
            </div>
        </div>
    );
};

export default Transaction;
