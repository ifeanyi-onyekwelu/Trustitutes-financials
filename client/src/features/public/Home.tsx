import Star from "../../assets/img/Screenshot 2024-10-23 064207.png";
import AboutUs from "../../assets/img/about-us.png";
import LinkBtn from "../../components/common/LinkBtn";
import SectionHeader from "../../components/common/SectionHeader";
import FeaturesCardGrid from "../../components/features/CardGrid";
import { FiArrowUpRight } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import ServicesCardGrid from "../../components/services/CardGrid";
import StepsCardGrid from "../../components/steps/CardGrid";
import Faqs from "./Faqs";

const Home = () => {
    const features = [
        "Instant Transactions",
        "Secure Encryption",
        "Real-Time Analytics",
        "Mobile Compatibility",
        "Digital Receipts",
        "Streamlined Payments",
    ];
    return (
        <>
            <section className="bg-primary text-white py-10 md:py-28 px-8 md:rounded-3xl">
                <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left section */}
                    <div className="space-y-5 md:space-y-10 w-full">
                        <h2 className="text-alternate uppercase mb-4 font-bold">
                            Trusted Banking
                        </h2>
                        <h1 className="text-2xl md:text-7xl font-black mb-6">
                            The Platform For Digital Banking
                        </h1>
                        <div className="flex items-start md:items-center mb-4 gap-5 md:flex-row flex-col">
                            {/* Profile Icons */}
                            <div className="flex -space-x-2 w-fit">
                                <img
                                    src="https://media.istockphoto.com/id/1278978817/photo/portrait-of-happy-mature-man-smiling.jpg?s=612x612&w=0&k=20&c=GPniKSszzPgprveN7sCT5mb-_L3-RSlGAOAsmoDaafw="
                                    alt="User1"
                                    className="w-12 h-12 rounded-full border-2 border-white"
                                />
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/038/974/578/non_2x/ai-generated-professional-portrait-of-a-competent-woman-free-photo.jpg"
                                    alt="User2"
                                    className="w-12 h-12 rounded-full border-2 border-white"
                                />
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/038/974/578/non_2x/ai-generated-professional-portrait-of-a-competent-woman-free-photo.jpg"
                                    alt="User3"
                                    className="w-12 h-12 rounded-full border-2 border-white"
                                />
                            </div>
                            {/* Stats */}
                            <div className="md:ml-5 w-full md:w-[30%]">
                                <p className="text-2xl font-bold">80M+</p>
                                <p className="text-sm font-semibold">
                                    Worldwide User
                                </p>
                            </div>
                            <div className="w-fit">
                                <div className="flex items-center">
                                    <img
                                        src={Star}
                                        alt="Star"
                                        className="w-12"
                                    />
                                    <p className="ml-2 font-bold">
                                        First-Class Smart Banking Experience
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="flex flex-col justify-center lg:items-start space-y-3">
                        <p className="text-lg md:text-xl mb-6">
                            We are at the forefront of revolutionizing the
                            financial landscape through cutting edge fintech
                            solutions. Our mission is to bridge the gap between
                            traditional banking.
                        </p>
                        <LinkBtn href="/contact-us">Contact Us</LinkBtn>
                    </div>
                </div>
            </section>

            <section className="py-2 md:py-10">
                <SectionHeader
                    h3Text="KEY FEATURES"
                    h1Text="Leveraging Technology For Secure & Banking"
                />
                <FeaturesCardGrid />
            </section>

            <section className="py-2 md:py-10">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-10">
                    {/* Left Side - Mobile Mockup */}
                    <div className="relative w-full md:w-1/2 flex justify-center">
                        <img
                            src={AboutUs}
                            alt="Mobile Mockup"
                            className="w-full"
                        />
                    </div>

                    {/* Right Side - Headline and Feature List */}
                    <div className="w-full md:w-1/2 text-start md:text-center md:px-0 px-5">
                        <SectionHeader
                            h3Text="About Finto"
                            h1Text="Start Expanding Your Financial Frontier"
                            align="start"
                        />
                        <p className="text-gray-700 mb-6 md:text-md text-sm">
                            With a robust suite of products ranging from digital
                            banking and payment processing to wealth management
                            and blockchain applications, we empower our clients.
                        </p>
                        {/* Features */}
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center space-x-2"
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
                    <div className="flex flex-col md:p-0 p-5">
                        <SectionHeader
                            h3Text="OUR SERVICES"
                            h1Text="Our Banking Services"
                            align="start"
                        />
                        <p className="mb-3">
                            With a robust suite of products ranging from digital
                            banking and payment processing to wealth.
                        </p>
                        <LinkBtn href="/services">
                            See All Services <FiArrowUpRight />
                        </LinkBtn>
                    </div>
                    <ServicesCardGrid />
                </div>
            </section>

            <section className="py-2 md:py-10">
                <div className="flex md:space-between items-center md:gap-16 md:flex-row flex-col mb-5 md:p-0 p-5">
                    <SectionHeader
                        h3Text="OPENING BANK ACCOUNT"
                        h1Text="Empowering Financial Futures With Innovation"
                        align="start"
                    />
                    <p className="md:text-md text-sm">
                        By integrating advanced technology with financial
                        expertise we provide a comprehensive suite of services
                        that cater to both individuals and businesses
                    </p>
                </div>

                <StepsCardGrid />
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
};

export default Home;
