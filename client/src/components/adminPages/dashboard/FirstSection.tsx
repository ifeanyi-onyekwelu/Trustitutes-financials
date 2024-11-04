import { ImCoinDollar } from "react-icons/im";
import { IoCloudDownload, IoPeople } from "react-icons/io5";
import { Link } from "react-router-dom";
import formatAmount from "../../../config/formatAmount";

type FirstSectionProps = {
    totalUsers: number;
    totalTransactions: number;
    totalDeposit: number;
};

const FirstSection = ({
    totalUsers,
    totalTransactions,
    totalDeposit,
}: FirstSectionProps) => {
    const statsData = [
        {
            icon: <IoPeople className="w-5 h-5" />,
            title: "Total Users",
            value: totalUsers,
        },
        {
            icon: <ImCoinDollar className="w-5 h-5" />,
            title: "Total Transactions",
            value: totalTransactions,
        },
        {
            icon: <IoCloudDownload className="w-5 h-5" />,
            title: "Total Deposit",
            value: totalDeposit,
        },
    ];

    return (
        <div className="first-section flex">
            {statsData.map((stat, index) => (
                <div
                    className="credit flex-1 m-2 p-4 bg-gray-900 rounded-lg shadow-md"
                    key={index}
                >
                    <div className="credit-title flex items-center mb-2">
                        <div className="icon mr-2">{stat.icon}</div>
                        <h3 className="status-name text-lg font-semibold text-gray-300">
                            {stat.title}
                        </h3>
                    </div>
                    <div className="credit-balance">
                        {stat.value !== undefined && (
                            <h2 className="text-2xl font-bold text-gray-800">
                                {formatAmount(stat.value)}
                            </h2>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FirstSection;
