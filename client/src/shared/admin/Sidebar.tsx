import { IoBook, IoHome, IoPerson } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <div
            className={`bg-deepNavyBlue text-white space-y-6 py-7 absolute inset-y-0 left-0 transform transition-all duration-200 ease-in-out md:relative md:translate-x-0 h-screen sm:block ${
                isOpen ? "block" : "hidden"
            }`}
        >
            <nav className="h-full relative px-2">
                <h2 className="text-center font-bold text-xl font-serif mb-10">
                    Dashboard
                </h2>
                <div className="space-y-2 mb-6">
                    <h4 className="text-gray-300 text-sm px-4 uppercase tracking-wide">
                        USER
                    </h4>
                    <Link
                        to=""
                        className={`flex items-center mb-2 py-2.5 px-4 gap-3 rounded transition duration-200 hover:bg-gray-700 mg-2 ${
                            pathname === "/dashboard/admin/me"
                                ? "bg-gray-700"
                                : ""
                        }`}
                    >
                        <IoHome className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="profile"
                        className={`flex items-center mb-2 py-2.5 px-4 gap-3 rounded transition duration-200 hover:bg-gray-700 mg-2 ${
                            location.pathname === "/dashboard/admin/me/profile"
                                ? "bg-gray-700"
                                : ""
                        }`}
                    >
                        <IoPerson className="w-5 h-5" />
                        <span>Profile</span>
                    </Link>
                </div>

                {/* Transfer Section */}
                <div className="space-y-2 mb-6">
                    <h4 className="text-gray-300 text-sm px-4 uppercase tracking-wide">
                        Wallet
                    </h4>
                    <Link
                        to="/dashboard/admin/me/transactions"
                        className={`flex items-center mb-2 py-2.5 px-4 gap-3 rounded transition duration-200 hover:bg-gray-700 ${
                            pathname === "/dashboard/admin/me/transactions"
                                ? "bg-gray-700"
                                : ""
                        }`}
                    >
                        <IoBook className="w-5 h-5" />
                        <span>Transactions</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
