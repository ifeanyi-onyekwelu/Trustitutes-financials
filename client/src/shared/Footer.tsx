import {
    IoChevronForward,
    IoLogoFacebook,
    IoLogoInstagram,
    IoLogoLinkedin,
    IoLogoTwitter,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
    const companyLinks = [
        { name: "About Us", to: "/about-us" },
        { name: "Account", to: "/account" },
        { name: "Affiliate", to: "/affiliate" },
    ];

    const supportLinks = [
        { name: "Faqs", to: "/faqs" },
        { name: "Contact", to: "/contact" },
    ];

    return (
        <footer className="bg-gray-100 py-8 px-5">
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center mb-6">
                        <img src="" alt="Logo" className="mb-4 mx-auto" />
                        <p className="text-lg text-gray-600">
                            A modern, technology-first bank built for you and
                            your growing business.
                        </p>
                        <div className="flex justify-center mt-4">
                            <IoLogoFacebook />
                            <IoLogoTwitter />
                            <IoLogoLinkedin />
                            <IoLogoInstagram />
                        </div>
                    </div>
                    <div className="text-center mb-6">
                        <h4 className="text-gray-700 text-xl font-medium mb-4">
                            Company
                        </h4>
                        <ul>
                            {companyLinks.map((link, index) => (
                                <li key={index} className="group relative mb-2">
                                    <Link
                                        to={link.to}
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center mb-6">
                        <h4 className="text-gray-700 text-xl font-medium mb-4">
                            Support
                        </h4>
                        <ul>
                            {supportLinks.map((link, index) => (
                                <li key={index} className="group relative mb-2">
                                    <IoChevronForward className="h-4 w-4 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <Link
                                        to={link.to}
                                        className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="text-center mb-6">
                        <h4 className="text-gray-700 text-xl font-medium mb-4">
                            Subscribe
                        </h4>
                        <p className="text-gray-600 mb-2">
                            Stay updated with the latest news and offers.
                        </p>
                        <form className="flex items-center justify-center">
                            <input
                                type="email"
                                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                                placeholder="Your Email Address"
                            />
                            <button
                                type="submit"
                                className="bg-deepNavyBlue hover:bg-black text-white px-4 py-2 ml-2 rounded-md focus:outline-none transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        &copy; 2024 PayFox. All Rights Reserved.
                    </p>
                    <div className="mt-2">
                        <Link
                            to="/privacy-policy"
                            className="text-gray-600 hover:text-gray-700 mr-4"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms-conditions"
                            className="text-gray-600 hover:text-gray-700"
                        >
                            Terms and Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
