import DepositForm from "../../components/userPages/deposit/DepositForm";

const FundAccount = () => {
    return (
        <div className="container mx-auto p-6 border border-gray-200 rounded-lg">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-300">
                    Fund Your Account
                </h1>
                <p className="text-gray-300 mt-2">
                    Add funds to your account securely and start managing your
                    investments.
                </p>
            </header>

            {/* Main Content Section with Flex Layout */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Deposit Form */}
                <div className="flex-1">
                    <DepositForm />
                </div>

                {/* Side Panel with Important Tips and Reminder */}
                <div className="flex-1 space-y-6">
                    {/* Information Section */}
                    <section className="p-4 border border-gray-200 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-300">
                            Important Tips
                        </h2>
                        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                            <li>
                                Ensure all account information is correct before
                                proceeding.
                            </li>
                            <li>
                                Double-check the deposit amount as it cannot be
                                modified after submission.
                            </li>
                            <li>
                                Contact support if you encounter any issues
                                during the deposit process.
                            </li>
                        </ul>
                    </section>

                    {/* Reminder / Warning Section */}
                    <section className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg">
                        <h3 className="font-semibold">Please Note:</h3>
                        <p>
                            Deposits are non-refundable. Review all information
                            carefully before proceeding.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FundAccount;
