import { IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const Hero = ({ pageTitle }: any) => {
    const content = (
        <section className="h-[60vh] hero-bg bg-contain">
            <div className="flex items-center justify-start h-full">
                <div className="p-4">
                    <h1 className="text-5xl sm:text-8xl font-bold">
                        {pageTitle}
                    </h1>
                    <div className="flex items-center gap-2 text-[20px]">
                        <Link to={""}>Banking</Link>
                        <IoChevronForward className="w-5 h-5" />
                        <span>{pageTitle}</span>
                    </div>
                </div>
            </div>
        </section>
    );
    return content;
};

export default Hero;
