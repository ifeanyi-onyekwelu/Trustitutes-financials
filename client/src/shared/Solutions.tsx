import Account1 from "../assets/img/account1.webp";
import Account2 from "../assets/img/account2.webp";
import Account3 from "../assets/img/account3.webp";
import OpenAccountButton from "../components/OpenAccountButton";

const Solutions = () => {
    const solutionsItem = [
        {
            image: Account1,
            heading: "Checking Account",
            body: "Choose from our checking account that allow you to earn interest, avoid fees, and easily manager your account.",
        },
        {
            image: Account2,
            heading: "Savings Account",
            body: "Choose from our savings account that allow you to save, make transactions, and easily manager your account.",
        },
        {
            image: Account3,
            heading: "Business Account",
            body: "Choose from our business account that allow you to earn interest, perform transaction, business only features and easily manager your account",
        },
    ];

    return (
        <section className="text-center py-12 w-full flex justify-center items-center">
            <div className="container sm:w-4/5 w-full px-4 sm:px-0">
                <h4 className="text-green-800 font-bold my-2">
                    Open your account from anywhere in the world
                </h4>
                <h2 className="text-4xl sm:text-7xl font-bold my-2">
                    Solutions for Every <br />
                    Business Need.
                </h2>
                <p className="text-xl font-normal my-2">
                    Power up your business with a full-stack online bank account
                    that fits your need.
                </p>

                <div className="p-8 sm:flex gap-2 block">
                    {solutionsItem.map((item) => (
                        <div className="bg-white rounded-sm py-12 px-4 flex flex-col items-center justify-between w-full md:w-5/12 shadow-md shadow-gray-300 sm:mb-0 mb-4">
                            <img src={item.image} alt="" />
                            <h3 className="text-2xl font-semibold my-2">
                                {item.heading}
                            </h3>
                            <p className="text-lg mb-4">{item.body}</p>
                            <OpenAccountButton />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Solutions;
