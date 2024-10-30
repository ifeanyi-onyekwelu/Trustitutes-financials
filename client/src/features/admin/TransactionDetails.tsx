import { useParams } from "react-router-dom";
import {
    useConfirmDepositMutation,
    useConfirmWithdrawMutation,
    useFetchATransactionsQuery,
} from "./adminApiSlie";

const TransactionDetailsPage = () => {
    const { transactionId } = useParams();
    const {
        data: transaction,
        isLoading,
        isError,
    } = useFetchATransactionsQuery(transactionId);

    const [confirmDeposit] = useConfirmDepositMutation();
    const [confirmWithdraw] = useConfirmWithdrawMutation();

    const renderTransactionTypeAction = () => {
        if (!transaction) return null; // Handle case where transaction data is still loading or not available

        if (transaction.type === "deposit") {
            return (
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => confirmDeposit(transactionId as any)}
                >
                    Confirm Deposit
                </button>
            );
        } else if (transaction.type === "withdrawal") {
            return (
                <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => confirmWithdraw(transactionId as any)}
                >
                    Confirm Withdrawal
                </button>
            );
        }
        return null;
    };

    if (isLoading) {
        return <p>Loading transaction details...</p>;
    }

    if (isError || !transaction) {
        return <p>Error loading transaction details.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Transaction Details</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">User</h2>
                    <p>
                        {/* {transaction.userId.firstName}
                        {transaction.userId.lastName} */}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Amount</h2>
                    <p>{transaction.amount}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Type</h2>
                    <p>{transaction.type}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Status</h2>
                    <p>{transaction.status}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p>{transaction.description}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Date</h2>
                    <p>{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                {transaction.receipt && (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Receipt</h2>
                        <img
                            src={transaction.receipt}
                            alt="Receipt"
                            className="max-w-full h-auto"
                        />
                    </div>
                )}
                {/* Render action buttons based on transaction type */}
                {renderTransactionTypeAction()}
            </div>
        </div>
    );
};

export default TransactionDetailsPage;
