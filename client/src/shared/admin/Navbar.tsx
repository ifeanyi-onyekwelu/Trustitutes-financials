import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { IoLogOut, IoMenu, IoPerson, IoSettings } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Navbar = ({ toggleSidebar, profile }: any) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [logout, { isSuccess }] = useLogoutMutation();

    useEffect(() => {
        if (isSuccess) {
            localStorage.removeItem("accessToken");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const onClick = () => logout(null);

    return (
        <nav className="bg-deepNavyBlue text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        onClick={toggleSidebar}
                        className="mr-4 block md:hidden"
                    >
                        <IoMenu className="text-white w-5 h-5" />
                    </button>
                </div>
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2"
                            onClick={toggleDropdown}
                        >
                            <img
                                className="w-8 h-8 rounded-full"
                                src={profile.user.profilePicture}
                                alt="User Profile"
                            />
                            <p className="flex gap-1">
                                <span>{profile.user.firstName}</span>
                                <span>{profile.user.lastName}</span>
                            </p>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                                <Link
                                    to="profile"
                                    className="px-4 py-2 text-gray-800 hover:bg-gray-200 flex gap-2 border-b-2"
                                >
                                    <IoPerson className="w-5 h-5" />
                                    Profile
                                </Link>
                                <Link
                                    to="profile"
                                    className="flex gap-2 px-4 py-2 text-gray-800 hover:bg-gray-200 border-b-2"
                                >
                                    <IoSettings className="w-5 h-5" />
                                    Settings
                                </Link>
                                <button
                                    className="flex gap-2 w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                                    onClick={onClick}
                                >
                                    <IoLogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
