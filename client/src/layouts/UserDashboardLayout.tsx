import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../shared/user/Sidebar";
import Navbar from "../shared/user/Navbar";
import { useFetchUserProfileQuery } from "../features/user/userApiSlice";

const UserDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const {
        data: profile,
        isLoading,
        isError,
    } = useFetchUserProfileQuery("userProfile");

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>An error occurred...</p>;

    const content = (
        <div className="flex bg-gray-200">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="md:ml-[25%] flex flex-col w-full md:w-[80%] bg-[#0A0F2C]">
                <Navbar toggleSidebar={toggleSidebar} profile={profile} />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );

    return content;
};

export default UserDashboardLayout;
