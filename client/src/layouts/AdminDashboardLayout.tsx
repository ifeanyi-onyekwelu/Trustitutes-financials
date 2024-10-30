import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../shared/admin/Sidebar";
import Navbar from "../shared/admin/Navbar";
import { useFetchUserProfileQuery } from "../features/user/userApiSlice";

const AdminDashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const {
        data: profile,
        isLoading,
        isError,
        error,
    } = useFetchUserProfileQuery("userProfile");

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>An error occurred...</p>;

    const content = (
        <div className="flex h-screen bg-gray-200">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar toggleSidebar={toggleSidebar} profile={profile} />
                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );

    return content;
};
export default AdminDashboardLayout;
