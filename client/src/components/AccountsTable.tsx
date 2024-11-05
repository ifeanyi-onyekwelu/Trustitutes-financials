import formatAmount from "../config/formatAmount";
import { Button } from "@mui/material";
import { useState } from "react";
import UpdateBalanceModal from "./adminPages/updateBalance";

const AccountTable = ({ accounts }: any) => {
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
        null
    );
    const [accountBalances, setAccountBalances] = useState(accounts);

    const handleBalanceUpdate = (accountId: string, newBalance: number) => {
        setAccountBalances((prevBalances: any) =>
            prevBalances.map((account: any) =>
                account._id === accountId
                    ? { ...account, balance: newBalance }
                    : account
            )
        );
    };

    return (
        <div className="overflow-x-auto">
            {accountBalances.length ? (
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
                                Account Number
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Balance
                            </th>
                            <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountBalances.map((account: any) => (
                            <tr
                                key={account._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="px-4 py-2 text-gray-700">
                                    <span className="inline-block min-w-36">
                                        {account?.user
                                            ? `${account?.user?.firstName} ${account?.user?.lastName}`
                                            : "Deleted Account"}
                                    </span>
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
                                <td className="px-4 py-2 text-gray-700">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={() =>
                                            setSelectedAccountId(account._id)
                                        }
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No accounts</p>
            )}
            {selectedAccountId && (
                <UpdateBalanceModal
                    open={Boolean(selectedAccountId)}
                    onClose={() => setSelectedAccountId(null)}
                    accountId={selectedAccountId}
                    onBalanceUpdate={handleBalanceUpdate} // Pass the update handler
                />
            )}
        </div>
    );
};

export default AccountTable;
