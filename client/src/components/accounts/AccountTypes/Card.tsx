import { IoArrowForwardCircle } from "react-icons/io5";
import LinkBtn from "../../common/LinkBtn";

const Card = ({ children }: any) => {
    return (
        <div className="bg-bg shadow-md md:p-8 p-6 rounded-lg flex flex-col items-start hover:shadow-lg border-gray-200 transform transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-alternate">
            <div className="flex items-center space-x-3 mb-4">
                {/* Optional Icon */}
                <IoArrowForwardCircle className="text-primary text-2xl" />
                <h3 className="font-extrabold text-primary text-md">
                    {children.title}
                </h3>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-md mb-4">{children.description}</p>

            {/* Features List */}
            <ul className="text-gray-600 mb-6 space-y-2">
                {children.features.map((feature: any, idx: any) => (
                    <li key={idx} className="flex items-center">
                        <span className="mr-2 text-primary font-bold">✔</span>
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Section */}
            <div className="flex items-center justify-center w-full mt-auto">
                <LinkBtn href="/auth/sign-up">Open Account </LinkBtn>
            </div>
        </div>
    );
};

export default Card;
