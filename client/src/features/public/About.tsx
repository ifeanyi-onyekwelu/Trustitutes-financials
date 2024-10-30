import AboutImg from "../../assets/img/about-us.png";

import Faqs from "./Faqs";

import {
    IoCheckmark,
    IoHandLeftSharp,
    IoHeart,
    IoPersonCircle,
} from "react-icons/io5";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";
import SectionHeader from "../../components/common/SectionHeader";
import LinkBtn from "../../components/common/LinkBtn";
import { FiArrowUpRight } from "react-icons/fi";
import ValuesCardGrid from "../../components/values/CardGrid";

const About = () => {
    const features = [
        "Pay Bills On Time Without Missing A Beat",
        "Secure Encryption",
        "Control Your Cash Flow On Demand",
    ];
    const content = (
        <>
            <BreadcrumbSection pageTitle="More About Us" page="About us" />

            <section className="py-2 md:py-10">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-10">
                    <div className="w-full md:w-1/2 text-start md:text-center md:px-10 px-5">
                        <SectionHeader
                            h3Text="About Company"
                            h1Text="Your Right Path To Smart Financial Decisions"
                            align="start"
                        />
                        <p className="text-gray-700 mb-6 md:text-md text-sm text-start">
                            With a robust suite of products ranging from digital
                            banking and payment processing to wealth management
                            and blockchain applications we empower our clients
                        </p>
                        {/* Features */}
                        <ul className="grid grid-cols-1 md:grid-cols-1 gap-5 mb-6">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center space-x-2 bg-bg py-4 px-3 rounded-xl"
                                >
                                    <span className="bg-alternate rounded-full p-1 text-black text-sm">
                                        <IoCheckmark />
                                    </span>
                                    <span className="text-gray-700">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <LinkBtn href="/about-us">
                            Know About Us <FiArrowUpRight />
                        </LinkBtn>
                    </div>
                    <div className="relative w-full md:w-1/2 flex justify-center">
                        <img src={AboutImg} alt="About Us" className="w-full" />
                    </div>
                </div>
            </section>

            <section className="py-2 md:py-16 bg-bg">
                <div className="md:space-y-0 space-y-5">
                    <p className="font-extrabold text-text text-center mb-7">
                        DISCOVER POWERFUL FEATURES FOR FINANCIAL SUCCESS
                    </p>
                    <ValuesCardGrid />
                </div>
            </section>

            <section className="py-16 md:block hidden">
                <div className="container w-full flex md:flex-row flex-col md:space-x-7 md:justify-between text-text">
                    <div className="flex space-x-2 items-center">
                        <h1 className="text-2xl md:text-7xl font-black">1M+</h1>
                        <div className="flex flex-col text-sm md:text-xl">
                            <p>Total</p>
                            <p>Users</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <h1 className="text-3xl md:text-7xl font-black">80+</h1>
                        <div className="flex flex-col text-sm md:text-xl">
                            <p>Countries</p>
                            <p>Provide Served</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <h1 className="text-3xl md:text-7xl font-black">15+</h1>
                        <div className="flex flex-col text-sm md:text-xl">
                            <p>Years</p>
                            <p>Experience</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-2 md:py-10">
                <div className="flex md:flex-row flex-col md:space-x-5 md:space-y-0 space-y-5">
                    <div className="flex flex-col w-full md:w-1/2 md:p-0 p-5">
                        <SectionHeader
                            h3Text="FAQ"
                            h1Text="Frequently Asked Questions"
                            align="start"
                        />
                        <p className="mb-3">
                            With a robust suite of products ranging from digital
                            banking and payment processing to wealth.
                        </p>
                        <LinkBtn href="/services">
                            Browse More <FiArrowUpRight />
                        </LinkBtn>
                    </div>
                    <Faqs />
                </div>
            </section>
        </>
    );
    return content;
};

export default About;
