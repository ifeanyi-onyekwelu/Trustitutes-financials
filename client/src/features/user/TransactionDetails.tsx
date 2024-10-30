import { useParams } from "react-router-dom";
import { useFetchATransactionsQuery } from "./userApiSlice";

const TransactionDetailsPage = () => {
    const { transactionId } = useParams();
    const {
        data: transactionData,
        isLoading,
        isError,
    } = useFetchATransactionsQuery(transactionId);

    const transaction = transactionData?.transaction || {};

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
                    <h2 className="text-xl font-semibold">Amount</h2>
                    <p className="text-gray-800">{transaction.amount}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Type</h2>
                    <p className="text-gray-800 capitalize">
                        {transaction.type}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Status</h2>
                    <p
                        className={`text-gray-800 ${
                            transaction.status === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {transaction.status}
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Description</h2>
                    <p className="text-gray-800">{transaction.description}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Date</h2>
                    <p className="text-gray-800">
                        {new Date(transaction.date).toLocaleDateString()}
                    </p>
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
            </div>
        </div>
    );
};

export default TransactionDetailsPage;
