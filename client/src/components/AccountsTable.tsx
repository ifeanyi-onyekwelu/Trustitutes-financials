import { Link } from "react-router-dom";
import formatAmount from "../config/formatAmount";

const AccountTable = ({ accounts }: any) => {
    return (
        <div className="overflow-x-auto">
            {accounts.length ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Full Name
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Email
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Accout Number
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Balance
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account: any) => (
                            <tr
                                key={account._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-2 text-gray-700">
                                    {account?.user
                                        ? `${account?.user?.firstName} ${account?.user?.lastName}`
                                        : "Deleted Account"}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {account?.user?.email}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    {account?.accountNumber}
                                </td>
                                <td className="px-4 py-2 text-gray-700">
                                    ${formatAmount(account?.balance)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No accounts</p>
            )}
        </div>
    );
};

export default AccountTable;
