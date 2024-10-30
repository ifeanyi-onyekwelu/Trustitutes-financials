import Card from "./Card";

// Example icons (replace with actual image paths)
import globalIcon from "../../assets/img/services/global.png";
import digitalIcon from "../../assets/img/services/digitalWallet.png";
import onlineIcon from "../../assets/img/services/online.png";
import investmentIcon from "../../assets/img/services/investment.png";
import fundingIcon from "../../assets/img/services/funding.png";
import retirementIcon from "../../assets/img/services/retirements.png";

const AllServicesCardGrid = () => {
    const cardData = [
        {
            icon: globalIcon,
            title: "Global Payment",
            description:
                "Our Global Payment service allows you to send and receive money internationally with ease, ensuring secure and timely transactions across borders.",
        },
        {
            icon: digitalIcon,
            title: "Digital Wallet",
            description:
                "Our Digital Wallet provides a convenient way to store and manage your payment information, making online shopping and peer-to-peer transfers quick and secure.",
        },
        {
            icon: onlineIcon,
            title: "Online Banking",
            description:
                "With our Online Banking service, you can access your accounts anytime, anywhere. Check balances, transfer funds, and pay bills from the comfort of your home.",
        },
        {
            icon: investmentIcon,
            title: "Investment",
            description:
                "Our Investment services offer a variety of options to help you grow your wealth, from stocks and bonds to mutual funds and retirement accounts.",
        },
        {
            icon: fundingIcon,
            title: "Funding",
            description:
                "We provide expert funding solutions to support your business ventures, whether you're looking for startup capital or expansion financing.",
        },
        {
            icon: retirementIcon,
            title: "Retirement Planning",
            description:
                "Our Retirement Planning services ensure that you have a clear strategy for saving and investing for your future, helping you achieve a comfortable retirement.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-5 md:p-0 p-5">
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

export default AllServicesCardGrid;
