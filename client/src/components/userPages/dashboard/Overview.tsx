import Avatar from "@mui/material/Avatar";
import Image from "../../../assets/img/avatar.avif";
import formatAmount from "../../../config/formatAmount";

interface Props {
    balance: number;
    lastLogin: string;
    fullName: string;
    ip: string;
    currency: string;
    profileImage: any;
}

const Overview = ({
    balance,
    lastLogin,
    fullName,
    ip,
    currency,
    profileImage,
}: Props) => {
    return (
        <div className="w-full md:w-1/2">
            <h3 className="text-xl text-white font-semibold mb-5">Overview</h3>
            <div className="flex flex-row md:items-center items-start px-8 md:py-12 py-6 rounded-lg bg-blue-950 md:space-x-10 space-x-10">
                <div className="flex flex-col space-y-5 w-1/2">
                    <Avatar
                        alt="Avatar"
                        src={profileImage}
                        sx={{ width: "100px", height: "100px" }}
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-blue-500">
                            Last Login
                        </p>
                        <span className="text-gray-500 md:text-lg text-xs font-bold">
                            29 Oct 24, 15:53 pm
                        </span>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <p className="text-blue-500 font-semibold text-sm">
                            Available balance
                        </p>
                        <h3 className="text-white font-bold text-lg">
                            {currency} {balance && formatAmount(balance)}
                        </h3>
                        <p className="text-md text-gray-400">
                            {fullName ? fullName : "Unknown User"}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-blue-500 font-semibold">
                            Your IP address
                        </p>
                        <p className="text-white">{ip}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
