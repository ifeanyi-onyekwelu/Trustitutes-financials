import { Link } from "react-router-dom";

const TransactionsTable = ({ transactions }: any) => {
    return (
        <div className="overflow-x-auto">
            {transactions.length ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Amount</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction: any) => (
                            <tr key={transaction._id} className="border-t">
                                <td className="px-4 py-2">
                                    {new Date(
                                        transaction.date
                                    ).toLocaleString()}
                                </td>
                                <td className="px-4 py-2">
                                    {transaction.type}
                                </td>
                                <td className="px-4 py-2">
                                    {transaction.amount}
                                </td>
                                <td className="px-4 py-2">
                                    {transaction.status}
                                </td>
                                <td className="px-4 py-2 text-blue-500 hover:underline">
                                    <Link to={`${transaction._id}`}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions</p>
            )}
        </div>
    );
};

export default TransactionsTable;
