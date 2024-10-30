import React from "react";
import { Link } from "react-router-dom";

const TransactionManagementTable = ({ transactions }: any) => {
    return (
        <table className="w-full text-left table-auto">
            <thead>
                <tr>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Amount</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction: any) => (
                    <tr key={transaction._id}>
                        <td className="border px-4 py-2">
                            {transaction.userId.firstName}
                            {transaction.userId.lastName}
                        </td>
                        <td className="border px-4 py-2">
                            {transaction.amount}
                        </td>
                        <td className="border px-4 py-2">{transaction.type}</td>
                        <td className="border px-4 py-2">
                            {transaction.status}
                        </td>
                        <td className="border px-4 py-2 space-x-2">
                            <Link
                                to={`transactions/${transaction._id}`} // Example URL structure, adjust as per your application's routing
                                className="bg-blue-500 text-white px-2 py-1 rounded inline-flex justify-center"
                            >
                                View Transaction
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionManagementTable;
