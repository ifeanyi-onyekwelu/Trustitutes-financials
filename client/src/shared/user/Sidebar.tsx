import { IoBook, IoHome, IoWalletSharp } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiFillCreditCard } from "react-icons/ai";
import { RiExchangeDollarLine } from "react-icons/ri";
import { VscHistory } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const location = useLocation();
    const { pathname } = location;

    // List of menu items to avoid redundancy
    const menuItems = [
        {
            to: "/user/dashboard",
            label: "Dashboard",
            icon: <IoHome className="w-5 h-5" />,
        },
    ];

    const walletItems = [
        {
            to: "/user/dashboard/transactions",
            label: "Transactions",
            icon: <IoBook className="w-5 h-5" />,
        },
        {
            to: "send-money",
            label: "Send Money",
            icon: <IoWalletSharp className="w-5 h-5" />,
        },
        {
            to: "pay-bills",
            label: "Pay Bills",
            icon: <RiSecurePaymentFill className="w-5 h-5" />,
        },
        {
            to: "virtual-card",
            label: "Virtual Cards",
            icon: <AiFillCreditCard className="w-5 h-5" />,
        },
        {
            to: "loan",
            label: "Loan/Credit Funding",
            icon: <RiExchangeDollarLine className="w-5 h-5" />,
        },
        {
            to: "transaction-history",
            label: "Transaction History",
            icon: <VscHistory className="w-5 h-5" />,
        },
    ];

    return (
        <div
            className={`bg-[#0A0F2C] text-white w-[25%] fixed transition-all duration-200 ease-in-out md:block hidden border-r border-gray-700 overflow-auto h-screen`}
            id="sidebar"
        >
            <div className="border-b border-gray-700 p-5 mb-10">
                <h1>Dashboard</h1>
            </div>

            <div className="px-6 space-y-1 mb-10">
                <h3 className="uppercase text-white font-black text-sm">
                    Available balance
                </h3>
                <div className="flex justify-between">
                    <h1 className="text-3xl text-blue-500">
                        <span className="font-extrabold">498,128</span> USD
                    </h1>
                </div>
                <p className="text-gray-300">
                    <span className="font-extrabold">498,128</span> USD
                </p>
            </div>

            <nav className="h-full relative px-2">
                <div className="space-y-2 mb-6">
                    <h4 className="text-gray-300 text-sm px-4 uppercase font-bold">
                        MENU
                    </h4>
                    {menuItems.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center mb-2 py-2.5 px-4 gap-3 rounded transition duration-200 hover:bg-text ${
                                pathname === to ? "bg-text" : ""
                            }`}
                        >
                            {icon}
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>

                {/* Transfer Section */}
                <div className="space-y-2 mb-6">
                    <h4 className="text-gray-300 text-sm px-4 uppercase font-bold">
                        Wallet
                    </h4>
                    {walletItems.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center mb-2 py-2.5 px-4 gap-3 rounded transition duration-200 hover:bg-text ${
                                pathname === to ? "bg-text" : ""
                            }`}
                        >
                            {icon}
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
