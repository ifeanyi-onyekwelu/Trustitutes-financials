import Avatar from "@mui/material/Avatar";
import Image from "../../../assets/img/avatar.avif";

interface Props {
    balance: number;
    lastLogin: string;
    fullName: string;
}

const Overview = ({ balance, lastLogin, fullName }: Props) => {
    return (
        <div className="w-full md:w-1/2">
            <h3 className="text-xl text-white font-semibold mb-5">Overview</h3>
            <div className="flex md:flex-row flex-col md:items-center items-start px-8 md:py-12 py-6 rounded-lg bg-blue-950 md:space-x-14 space-x-0 md:space-y-0 space-y-6">
                <div className="flex flex-col space-y-5">
                    <Avatar
                        alt="Avatar"
                        src={Image}
                        sx={{ width: "100px", height: "100px" }}
                    />
                    <div className="flex flex-col">
                        <p className="font-semibold text-blue-500">
                            Last Login
                        </p>
                        <span className="text-gray-500">
                            29 Oct 24, 15:53 pm
                        </span>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex flex-col">
                        <p className="text-blue-500 font-semibold">
                            Available balance
                        </p>
                        <h3 className="text-white font-bold text-2xl">
                            USD {balance ? balance : 498_128}
                        </h3>
                        <p className="text-lg text-gray-600">
                            {fullName ? fullName : "Sarah Oprah"}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-blue-500 font-semibold">
                            Your IP address
                        </p>
                        <p className="text-white">172.122.123.122</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
