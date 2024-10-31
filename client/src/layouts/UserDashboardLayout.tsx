import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../shared/user/Sidebar";
import Navbar from "../shared/user/Navbar";
import { useFetchUserProfileQuery } from "../features/user/userApiSlice";
import { UserProvider } from "../context/UserContext";

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

    return (
        <UserProvider profile={profile}>
            <div className="flex bg-[#0A0F2C]">
                <Sidebar />
                <div className="md:ml-[20%] flex flex-col w-full md:w-[80%]">
                    <Navbar toggleSidebar={toggleSidebar} profile={profile} />
                    <main className="flex-1 overflow-auto p-6 min-h-screen">
                        <Outlet />
                    </main>
                </div>
            </div>
        </UserProvider>
    );
};

export default UserDashboardLayout;
