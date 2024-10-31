import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../shared/user/Sidebar";
import Navbar from "../shared/user/Navbar";
import { useFetchUserProfileQuery } from "../features/user/userApiSlice";
import { UserProvider } from "../context/UserContext";
import SideBarDrawer from "../shared/user/Drawer";

const UserDashboardLayout = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
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
                <SideBarDrawer open={open} toggleDrawer={toggleDrawer} />
                <div className="md:ml-[20%] flex flex-col w-full md:w-[80%]">
                    <Navbar
                        toggleDrawer={toggleDrawer}
                        open={open}
                        profile={profile}
                    />
                    <main className="flex-1 overflow-auto p-6 min-h-screen">
                        <Outlet />
                    </main>
                </div>
            </div>
        </UserProvider>
    );
};

export default UserDashboardLayout;
