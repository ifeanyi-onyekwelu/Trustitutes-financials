import { FiArrowUpRight } from "react-icons/fi";

const Card = ({ icon, title, description }: any) => {
    return (
        <div className="bg-bg md:p-10 p-6 rounded-xl flex flex-col items-start transform transition-transform duration-300 hover:-translate-y-2 border border-transparent hover:border-alternate">
            <div className="flex flex-col space-y-2 items-start">
                <h3 className="font-black text-primary text-2xl">{title}</h3>
                <p className="text-gray-700 font-medium text-lg">
                    {description}
                </p>
            </div>
            <div className="flex justify-between w-full items-center py-4">
                <img src={icon} alt={title} className="h-10 w-10" />
                <span className="p-3 rounded-full bg-alternate text-black w-fit">
                    <FiArrowUpRight />
                </span>
            </div>
        </div>
    );
};

export default Card;
