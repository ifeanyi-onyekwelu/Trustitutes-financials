import SectionHeader from "../common/SectionHeader";
import Card from "./Card";

const loanTypes = [
    {
        title: "Personal Loan",
        description:
            "Access funds for personal expenses like vacations, medical bills, or home improvements.",
        features: [
            "Flexible repayment terms",
            "No collateral required",
            "Fixed or variable interest rates",
        ],
        image: "/path/to/personal-loan-icon.png", // Replace with actual icon path
    },
    {
        title: "Home Loan",
        description:
            "Finance your dream home with competitive rates and various repayment options.",
        features: [
            "Low down payment options",
            "Fixed and adjustable rates",
            "Fast approval process",
        ],
        image: "/path/to/home-loan-icon.png", // Replace with actual icon path
    },
    {
        title: "Auto Loan",
        description:
            "Get the vehicle you want with our convenient auto loan options.",
        features: [
            "Flexible loan amounts",
            "Competitive interest rates",
            "Quick application process",
        ],
        image: "/path/to/auto-loan-icon.png", // Replace with actual icon path
    },
    {
        title: "Student Loan",
        description:
            "Fund your education with loans designed to make your studies more affordable.",
        features: [
            "Low-interest rates",
            "Grace period after graduation",
            "Repayment flexibility",
        ],
        image: "/path/to/student-loan-icon.png", // Replace with actual icon path
    },
    {
        title: "Business Loan",
        description:
            "Support your business growth with loans tailored for various needs.",
        features: [
            "Quick access to funds",
            "Flexible repayment options",
            "Ideal for startups and established businesses",
        ],
        image: "/path/to/business-loan-icon.png", // Replace with actual icon path
    },
    {
        title: "Debt Consolidation Loan",
        description:
            "Combine multiple debts into a single loan for easier management.",
        features: [
            "Lower interest rates",
            "Fixed monthly payments",
            "Simplifies your finances",
        ],
        image: "/path/to/debt-consolidation-icon.png", // Replace with actual icon path
    },
];

function Loans() {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 text-center">
                {/* Section Title */}
                <SectionHeader
                    h3Text="Discover Our Flexible Loan Solutions"
                    h1Text="Tailored Financing Options to Help You Achieve Your Goals"
                />

                <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {loanTypes.map((loan, index) => (
                        <Card>{loan}</Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Loans;
