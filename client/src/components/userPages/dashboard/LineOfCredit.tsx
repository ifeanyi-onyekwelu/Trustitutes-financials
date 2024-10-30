import { Link } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";

const LineOfCredit = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-xl text-white font-semibold">
                    Loans and line of credit
                </h3>
                <Link to="/transfer" className="text-blue-700 font-semibold">
                    Pay bills
                </Link>
            </div>

            <div className="rounded-lg flex md:space-x-4 space-x-0 items-center">
                <div className="w-full md:w-1/2 bg-gray-900 p-5  rounded-lg">
                    <div className="flex space-x-2 mb-2">
                        <IoCheckmarkCircle className="p-3 rounded-full bg-blue-50 text-gray-400" />
                        <span className="text-gray-400 font-bold text-sm">
                            Business Support Lo...
                        </span>
                    </div>
                    <div className="flex space-x-1 items-center text-gray-400">
                        <p className="font-bold text-xl">+5,000</p>
                        <p className="text-xl">USD</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-gray-900 p-5  rounded-lg">
                    <div className="flex space-x-2 mb-2">
                        <IoWallet className="p-3 rounded-full bg-blue-50 text-gray-400" />
                        <span className="text-gray-400 font-bold text-sm">
                            FICO Credit Score
                        </span>
                    </div>
                    <div className="flex space-x-1 items-center text-gray-400">
                        <p className="font-bold text-xl">750</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineOfCredit;
