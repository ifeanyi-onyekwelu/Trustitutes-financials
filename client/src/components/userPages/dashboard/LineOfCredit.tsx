import { Link } from "react-router-dom";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";

const LineOfCredit = ({ currency }: any) => {
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

            <div className="rounded-lg flex md:flex-row flex-col md:space-x-4 space-x-0 items-center md:space-y-0 space-y-5">
                <div className="w-full md:w-1/2 bg-gray-900 p-5  rounded-lg">
                    <div className="flex space-x-2 mb-2">
                        <IoCheckmarkCircle className="rounded-full bg-gray-50 h-5 w-5 px-1" />
                        <span className="text-gray-400 font-bold text-sm">
                            Business Support Lo...
                        </span>
                    </div>
                    <div className="flex space-x-1 items-center text-gray-400">
                        <p className="font-bold text-xl">+ 0</p>
                        <p className="text-xl">{currency}</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-gray-900 p-5  rounded-lg">
                    <div className="flex space-x-2 mb-2">
                        <IoWallet className="rounded-full bg-gray-50 h-5 w-5 px-1" />
                        <span className="text-gray-400 font-bold text-sm">
                            FICO Credit Score
                        </span>
                    </div>
                    <div className="flex space-x-1 items-center text-gray-400">
                        <p className="font-bold text-xl">0</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LineOfCredit;
