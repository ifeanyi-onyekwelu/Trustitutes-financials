import SectionHeader from "../../common/SectionHeader";
import Card from "./Card";

const accountTypes = [
    {
        title: "Savings Account",
        description:
            "Earn interest on your savings with flexible access to your funds.",
        features: [
            "High interest rates",
            "No monthly fees",
            "Automatic savings tools",
        ],
        image: "/path/to/savings-icon.png", // Replace with actual icon path
    },
    {
        title: "Checking Account",
        description:
            "Manage daily expenses with no minimum balance requirements.",
        features: [
            "Free debit card",
            "Overdraft protection",
            "Bill pay options",
        ],
        image: "/path/to/checking-icon.png", // Replace with actual icon path
    },
    {
        title: "Business Account",
        description:
            "Designed for businesses, with tools to help you manage finances.",
        features: ["Expense tracking", "Multiple user access", "24/7 support"],
        image: "/path/to/business-icon.png", // Replace with actual icon path
    },
    {
        title: "Student Account",
        description:
            "A flexible account with perks for students, like no monthly fees.",
        features: ["No minimum deposit", "Budgeting tools", "Cashback offers"],
        image: "/path/to/student-icon.png", // Replace with actual icon path
    },
];

function AccountTypes() {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Section Title */}
                <SectionHeader
                    h3Text="Explore Our Account Types"
                    h1Text="Find the account that suits your needs and start banking with us today."
                    align="center"
                />

                <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {accountTypes.map((account, index) => (
                        <Card>{account}</Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AccountTypes;
