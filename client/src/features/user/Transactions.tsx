import TransactionsTable from "../../components/TransactionsTable";
import { useFetchTransactionsQuery } from "./userApiSlice";

const Transaction = () => {
    const { data: transactionsData } =
        useFetchTransactionsQuery("userTransactions");

    const transactions = transactionsData?.transactions || [];
    return (
        <div className="bg-dashboard">
            <div className="container mx-auto p-4">
                <TransactionsTable transactions={transactions} />
            </div>
        </div>
    );
};

export default Transaction;
