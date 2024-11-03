import { IoHome } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc";
import { BiSupport, BiMoney } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useFetchTotalBalanceQuery } from "../../features/admin/adminApiSlie";
import formatAmount from "../../config/formatAmount";

const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;

    const { data: totalBalanceData, isLoading } =
        useFetchTotalBalanceQuery("totalBalance");

    if (isLoading) return <p>Loading...</p>;

    const menuItems = [
        {
            to: "/admin/dashboard",
            label: "Dashboard",
            icon: <IoHome className="w-5 h-5" />,
        },
        {
            to: "transactions",
            label: "Transaction History",
            icon: <VscHistory className="w-5 h-5" />,
        },
        {
            to: "accounts",
            label: "Manage Accounts",
            icon: <BiMoney className="w-5 h-5" />,
        },
        {
            to: "users",
            label: "User Management",
            icon: <AiOutlineUser className="w-5 h-5" />,
        },
        {
            to: "support-tickets",
            label: "Support Tickets",
            icon: <BiSupport className="w-5 h-5" />,
        },
    ];

    return (
        <div
            className={`bg-dashboard text-white w-[20%] fixed transition-all duration-200 ease-in-out md:block hidden border-r border-gray-700 overflow-auto`}
            id="sidebar"
        >
            <div className="border-b border-gray-700 p-5 mb-10">
                <h1>Dashboard</h1>
            </div>

            <div className="px-6 space-y-1 mb-10">
                <h3 className="uppercase text-white font-black text-sm">
                    Total Balance
                </h3>
                <div className="flex justify-between">
                    <h1 className="text-3xl text-blue-500">
                        <span className="font-extrabold">
                            {formatAmount(totalBalanceData.totalBalance)}
                        </span>{" "}
                        USD
                    </h1>
                </div>
                <p className="text-gray-300">
                    <span className="font-extrabold">
                        {formatAmount(totalBalanceData.totalBalance)}
                    </span>{" "}
                    USD
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
            </nav>
        </div>
    );
};

export default Sidebar;
