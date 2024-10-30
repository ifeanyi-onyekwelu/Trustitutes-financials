import Breadcrumb from "../../components/common/BreadcrumbSection";
import AllLoans from "../../components/loans/Loans";
const steps = [
    {
        title: "Step 1: Choose Loan Type",
        description: "Select the type of loan that best suits your needs.",
    },
    {
        title: "Step 2: Complete Application",
        description:
            "Fill out the application form with your personal information.",
    },
    {
        title: "Step 3: Submit Documents",
        description: "Upload the necessary documents for verification.",
    },
    {
        title: "Step 4: Review and Sign",
        description: "Review your loan terms and sign the agreement.",
    },
    {
        title: "Step 5: Receive Funds",
        description: "Once approved, funds will be disbursed to your account.",
    },
];

const Loans = () => {
    return (
        <>
            <Breadcrumb pageTitle="Loans & Credit" page="Loans & Credit" />
            <section className="py-3 md:py-16">
                <div className="container mx-auto">
                    <AllLoans />
                </div>
            </section>
        </>
    );
};

export default Loans;
