import { FiArrowUpRight } from "react-icons/fi";

const Card = ({ icon, title, description }: any) => {
    return (
        <div className="bg-white md:p-10 p-6 rounded-xl flex flex-col items-start transform transition-transform duration-300 hover:-translate-y-2 border border-transparent hover:border-alternate">
            <div className="flex flex-col space-y-2 items-start">
                <img src={icon} alt={title} />
                <h3 className="font-black text-primary text-2xl">{title}</h3>
                <p className="text-gray-700 font-medium text-lg">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
