import { ImCoinDollar } from "react-icons/im";
import { IoCloudDownload, IoPeople } from "react-icons/io5";
import { Link } from "react-router-dom";

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
    const content = (
        <div className="first-section">
            <div className="credit">
                <div className="credit-title">
                    <div className="icon">
                        <IoPeople className="w-5 h-5" />
                    </div>
                    <h3 className="status-name">Total Users</h3>
                </div>

                <div className="credit-balance">
                    <h2>{totalUsers} </h2>
                </div>
            </div>
            <div className="credit">
                <div className="credit-title">
                    <div className="icon">
                        <ImCoinDollar className="w-5 h-5" />
                    </div>
                    <h3 className="status-name">Total Transactions</h3>
                </div>

                <div className="credit-balance">
                    <h2>${totalTransactions}</h2>
                </div>
            </div>
            <div className="credit">
                <div className="credit-title">
                    <div className="icon ">
                        <IoCloudDownload className="w-5 h-5" />
                    </div>
                    <h3 className="status-name">Total Deposit</h3>
                </div>

                <div className="credit-balance">
                    <h2>${totalDeposit}</h2>
                </div>
            </div>
            <div className="credit">
                <div className="credit-title">
                    <Link
                        className="block w-full transition-colors text-blue-300 hover:text-blue-400 p-2 mt-2 rounded"
                        to="confirm-deposit"
                    >
                        Pending Deposits
                    </Link>
                </div>

                <div className="credit-balance">
                    <Link
                        className="block w-full text-green-300 hover:text-blue-300 transition-colors p-2 mt-2 rounded"
                        to="confirm-withdraw"
                    >
                        Pending Withdrawals
                    </Link>
                </div>
            </div>
        </div>
    );
    return content;
};

export default FirstSection;
