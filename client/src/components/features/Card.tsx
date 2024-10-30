const Card = ({ icon, title, description }: any) => {
    return (
        <div className="bg-bg p-5 md:p-10 rounded-xl flex md:flex-row flex-col items-start md:space-x-4 md:space-y-0 space-y-3 transform transition-transform duration-300 hover:-translate-y-2 border border-transparent hover:border-alternate">
            <div className="flex-shrink-0">
                <div className="bg-alternate p-4 rounded-md">
                    <img src={icon} alt={title} className="h-10 w-10" />
                </div>
            </div>
            <div className="flex flex-col space-y-2 items-start">
                <h3 className="font-black text-primary text-2xl">{title}</h3>
                <p className="text-gray-700 font-medium md:text-lg text-sm">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
