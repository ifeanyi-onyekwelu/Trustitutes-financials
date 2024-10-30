import { Link } from "react-router-dom";
import { IoWallet } from "react-icons/io5";

interface Props {
    balance: number;
    accountNumber: number;
}

const CurrentAccount = ({ balance, accountNumber }: Props) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl text-white font-semibold">
                    Current Account
                </h3>
                <Link to="/transfer" className="text-blue-700 font-semibold">
                    Transfer Fund
                </Link>
            </div>

            <div className="bg-gray-900 p-5 space-y-2 rounded-lg">
                <div className="flex space-x-5">
                    <IoWallet className="p-3 rounded-full bg-blue-50 text-gray-400" />
                    <span className="text-gray-400 font-bold">
                        ********51612
                    </span>
                </div>
                <div className="flex space-x-1 items-center text-gray-400">
                    <p className="font-bold text-xl">493,128</p>
                    <p className="text-xl">USD</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentAccount;
