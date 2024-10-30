import { useState } from "react";

const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            count: 1,
            question: "How do I open an account with digital banking?",
            answer: "Opening an account is simple! Just complete the online application, provide required documentation like a government-issued ID, and make an initial deposit if necessary.",
        },
        {
            count: 2,
            question: "What digital banking services are available?",
            answer: "Our digital banking services include online account management, mobile deposits, fund transfers, bill payments, and 24/7 customer support.",
        },
        {
            count: 3,
            question: "How do I reset my online banking password?",
            answer: "To reset your password, click 'Forgot Password' on the login page and follow the instructions. You’ll receive an email with a reset link.",
        },
        {
            count: 4,
            question: "Are online transactions secure?",
            answer: "Yes, we prioritize security by using encryption, two-factor authentication, and fraud monitoring to keep your transactions and information safe.",
        },
    ];

    const content = (
        <div className="flex items-center justify-center flex-col space-y-2 w-full md:w-3/4 p-5">
            {faqs.map((faq, index) => (
                <div
                    className="border-gray-200 p-4 w-full rounded-md bg-bg transition-all duration-300"
                    key={index}
                >
                    <button
                        className="w-full text-left focus:outline-none"
                        onClick={() => handleToggle(index)}
                    >
                        <div className="flex justify-between items-center py-2">
                            <div className="flex space-x-4 font-black text-[13px] md:text-xl">
                                <p>{faq.count}.</p>
                                <h3>{faq.question}</h3>
                            </div>
                            <span>{openIndex === index ? "-" : "+"}</span>
                        </div>
                    </button>
                    {openIndex === index && (
                        <div className="mt-2 text-gray-600 ml-8">
                            {faq.answer}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return content;
};

export default Faqs;
