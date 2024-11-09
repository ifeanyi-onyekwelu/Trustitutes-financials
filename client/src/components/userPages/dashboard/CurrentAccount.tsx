import { Link } from "react-router-dom";
import { IoWallet } from "react-icons/io5";
import formatAmount from "../../../config/formatAmount";

interface Props {
    balance: number;
    accountNumber: number;
    currency: string;
}

const CurrentAccount = ({ balance, accountNumber, currency }: Props) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl text-white font-semibold">
                    Current Account
                </h3>
                <Link to="transfer" className="text-blue-700 font-semibold">
                    Transfer Fund
                </Link>
            </div>

            <div className="bg-gray-900 p-5 space-y-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <IoWallet className="rounded-full bg-gray-50 h-5 w-5 px-1" />
                    <span className="text-gray-400 font-bold">
                        {accountNumber}
                    </span>
                </div>
                <div className="flex space-x-1 items-center text-gray-400">
                    <p className="font-bold text-xl">{formatAmount(balance)}</p>
                    <p className="text-xl">{currency}</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentAccount;
