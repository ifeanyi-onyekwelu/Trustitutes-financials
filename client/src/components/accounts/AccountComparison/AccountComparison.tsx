import SectionHeader from "../../common/SectionHeader";

const accountTypes = [
    {
        name: "Savings Account",
        interestRate: "1.5% APY",
        minDeposit: "$50",
        monthlyFee: "None",
        access: "Mobile & Online Banking",
    },
    {
        name: "Checking Account",
        interestRate: "0.1% APY",
        minDeposit: "$0",
        monthlyFee: "None with direct deposit",
        access: "Mobile & Online Banking",
    },
    {
        name: "Business Account",
        interestRate: "1.0% APY",
        minDeposit: "$500",
        monthlyFee: "$15",
        access: "Mobile, Online, & In-Branch",
    },
    {
        name: "Student Account",
        interestRate: "1.2% APY",
        minDeposit: "$0",
        monthlyFee: "None",
        access: "Mobile & Online Banking",
    },
];

function AccountComparisonTable() {
    return (
        <div className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <SectionHeader
                    h3Text="Compare Our Accounts"
                    h1Text="Quickly compare the features and benefits of each account type."
                    align="center"
                />

                {/* Comparison Table */}
                <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="p-4 text-left border-b border-gray-300 text-lg font-semibold">
                                    Account Type
                                </th>
                                <th className="p-4 text-left border-b border-gray-300 text-lg font-semibold">
                                    Interest Rate
                                </th>
                                <th className="p-4 text-left border-b border-gray-300 text-lg font-semibold">
                                    Minimum Deposit
                                </th>
                                <th className="p-4 text-left border-b border-gray-300 text-lg font-semibold">
                                    Monthly Fee
                                </th>
                                <th className="p-4 text-left border-b border-gray-300 text-lg font-semibold">
                                    Access
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountTypes.map((account, idx) => (
                                <tr
                                    key={idx}
                                    className={`${
                                        idx % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    } border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200`}
                                >
                                    <td className="p-4 text-gray-800 font-medium">
                                        {account.name}
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        {account.interestRate}
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        {account.minDeposit}
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        {account.monthlyFee}
                                    </td>
                                    <td className="p-4 text-gray-700">
                                        {account.access}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-gray-500 text-sm">
                    <p>
                        Note: Interest rates are subject to change and may vary
                        based on account eligibility.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountComparisonTable;
