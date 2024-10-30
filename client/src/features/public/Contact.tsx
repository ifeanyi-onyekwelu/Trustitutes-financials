import { IoLocateOutline, IoMail, IoPhoneLandscape } from "react-icons/io5";
import Hero from "../../shared/Hero";
import { IoMdClock } from "react-icons/io";

const Contact = () => {
    return (
        <>
            <Hero pageTitle="Contact" />

            <section id="contact" className="py-12 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6 grid grid-cols-2 gap-6">
                            {/* Address */}
                            <div className="info-item flex items-center space-x-4  shadow-lg shadow-gray-300 rounded-md p-7">
                                <IoLocateOutline />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Address
                                    </h3>
                                    <p>09 Independence Layout</p>
                                    <p>Enugu, NG 400102</p>
                                </div>
                            </div>

                            {/* Phone Numbers */}
                            <div className="info-item flex items-center space-x-4 shadow-gray-300 rounded-md p-7 shadow-lg">
                                <IoPhoneLandscape />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Call Us
                                    </h3>
                                    <p>+234 811 320 8256</p>
                                    <p>+234 816 619 0067</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="info-item flex items-center space-x-4 shadow-gray-300 rounded-md p-7 shadow-lg">
                                <IoMail />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Email Us
                                    </h3>
                                    <p>payfox@gmail.com</p>
                                    <p>support@payfox.com</p>
                                </div>
                            </div>

                            {/* Opening Hours */}
                            <div className="info-item flex items-center space-x-4 shadow-gray-300 rounded-md p-7 shadow-lg">
                                <IoMdClock />
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        Open Hours
                                    </h3>
                                    <p>Monday - Friday</p>
                                    <p>9:00AM - 05:00PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                Send us a message
                            </h2>
                            <form
                                action="forms/contact.php"
                                method="post"
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="border-gray-300 rounded-md shadow-sm w-full py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="border-gray-300 rounded-md shadow-sm w-full py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="border-gray-300 rounded-md shadow-sm w-full py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Subject"
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="border-gray-300 rounded-md shadow-sm w-full py-2 px-3 mt-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Message"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-deepNavyBlue text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:bg-indigo-600"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
