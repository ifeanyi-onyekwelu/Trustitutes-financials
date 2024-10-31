import { Link } from "react-router-dom";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { RootState } from "../app/store";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const accessToken = useSelector((state: RootState) =>
        selectCurrentToken(state)
    );
    console.log("Access token", accessToken);

    const links = [
        { href: "/", label: "Home" },
        { href: "/accounts", label: "Accounts" },
        { href: "/services", label: "Services" },
        { href: "/loans", label: "Loans & Credit" },
        { href: "/about-us", label: "About Us" },
        { href: "/help", label: "Help & Support" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    const content = (
        <nav className="sticky top-0 z-10 w-full bg-white shadow-md py-3">
            <div className="px-4 md:px-20">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex ">
                        <div className="flex-shrink-0 flex items-center">
                            <h1>Banking</h1>
                        </div>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center">
                        {links &&
                            links.map((link) => (
                                <Link
                                    to={link.href}
                                    key={link.label}
                                    className="text-text hover:text-gray-700 px-3 py-2 text-md font-bold"
                                >
                                    {link.label}
                                </Link>
                            ))}
                    </div>
                    <div className="flex items-center">
                        <Link
                            className="text-primary hover:text-text px-3 py-2 text-md font-black"
                            to={"/secure/sign-up"}
                        >
                            Sign In
                        </Link>
                        <span className="text-gray-500">/</span>
                        <Link
                            className="text-primary hover:text-text px-3 py-2 text-md font-black"
                            to={"/secure/sign-up"}
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div className="flex items-center sm:hidden">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-white text-xl bg-primary"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <IoClose /> : <IoMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {links &&
                            links.map((link) => (
                                <Link
                                    to={link.href}
                                    key={link.label}
                                    className="block text-text hover:text-white hover:bg-primary px-3 py-2 rounded-sm text-base font-bold transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </nav>
    );

    return content;
};

export default Header;
