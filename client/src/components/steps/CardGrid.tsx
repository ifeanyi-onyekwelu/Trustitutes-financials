import Card from "./Card";

// Example icons (replace with actual image paths)
import savingIcon from "../../assets/img/savings.png";
import loanIcon from "../../assets/img/loans.png";
import mobileIcon from "../../assets/img/mobile.png";
import insuranceIcon from "../../assets/img/insurance.png";

const StepsCardGrid = () => {
    const cardData = [
        {
            icon: savingIcon,
            title: "Saving Account",
            description:
                "Our commitment to security transparency and customer centricity ensures that every transaction is no.",
        },
        {
            icon: loanIcon,
            title: "Personal Loan",
            description:
                "Our commitment to security transparency and customer centricity ensures that every transaction is no.",
        },
        {
            icon: mobileIcon,
            title: "Mobile Banking",
            description:
                "Our commitment to security transparency and customer centricity ensures that every transaction is no.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4 md:p-0 p-5">
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                />
            ))}
        </div>
    );
};

export default StepsCardGrid;
