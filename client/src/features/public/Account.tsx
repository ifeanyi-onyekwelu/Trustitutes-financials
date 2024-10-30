import AccountFeature1 from "../../assets/img/account-feature1.webp";
import AccountFeature2 from "../../assets/img/account-feature2.webp";
import AccountFeature3 from "../../assets/img/account-feature3.webp";

import LinkBtn from "../../components/common/LinkBtn";
import AccountTypes from "../../components/accounts/AccountTypes/AccountTypes";
import AccountComparisonTable from "../../components/accounts/AccountComparison/AccountComparison";
import BreadcrumbSection from "../../components/common/BreadcrumbSection";

const Account = () => {
    const features = [
        {
            image: AccountFeature1,
            title: "No minimum balance required",
            body: "Taking the first step towards your dreams should be a breeze, not a burden.",
        },
        {
            image: AccountFeature2,
            title: "No monthly account fees",
            body: "So that every month, you can focus on investing in your ambitions.",
        },
        {
            image: AccountFeature3,
            title: "No SSN needed",
            body: "All we need is basic information about you and your address.",
        },
    ];

    return (
        <>
            <BreadcrumbSection pageTitle="Accounts" page="Accounts" />

            <section className="py-3 md:py-16">
                <div className="container mx-auto">
                    <AccountTypes />
                </div>
            </section>

            <section className="py-3 md:py-16">
                <div className="container mx-auto">
                    <AccountComparisonTable />
                </div>
            </section>

            <section className="py-3 md:py-16 bg-primary rounded-3xl">
                <div className="container mx-auto">
                    <div className="py-16 text-center text-white">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-4xl font-bold mb-4">
                                Ready to Take Control of Your Finances?
                            </h2>
                            <p className="text-lg mb-8">
                                Open an account with us today and start enjoying
                                the benefits!
                            </p>
                            <div className="flex justify-center space-x-4">
                                <LinkBtn href="/auth/sign-up">
                                    Apply Now
                                </LinkBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Account;
