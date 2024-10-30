import { Link } from "react-router-dom";

const LinkBtn = ({ href, children }: { href: string; children: any }) => {
    return (
        <Link
            to={href}
            className="text-black font-bold py-3 px-10 rounded-lg border border-transparent bg-alternate hover:border hover:border-white hove:bg-primary hover:text-white duration-300 hover:bg-primary flex w-fit items-center gap-3"
        >
            {children}
        </Link>
    );
};

export default LinkBtn;
