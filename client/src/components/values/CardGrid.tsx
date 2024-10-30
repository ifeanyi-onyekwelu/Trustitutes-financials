import Card from "./Card";

// Example icons (replace with actual image paths)
import solutions from "../../assets/img/solutions.png";
import expert from "../../assets/img/expert.png";
import innovation from "../../assets/img/innovation.png";

const ValuesCardGrid = () => {
    const cardData = [
        {
            icon: solutions,
            title: "Customer-Centric Solutions",
            description:
                "We prioritize our customers' needs, offering tailored solutions that enhance their banking experience and financial well-being.",
        },
        {
            icon: expert,
            title: "Expert Financial Guidance",
            description:
                "Our team of financial experts is dedicated to providing you with the insights and support needed to make informed decisions about your finances.",
        },
        {
            icon: innovation,
            title: "Innovative Banking Technology",
            description:
                "Experience seamless banking with our cutting-edge technology designed to make managing your finances easier and more efficient than ever.",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
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

export default ValuesCardGrid;
