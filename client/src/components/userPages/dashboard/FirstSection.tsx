import Button from "@mui/material/Button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

type FirstSectionProps = {
    fullName: string;
};

const FirstSection = ({ fullName }: FirstSectionProps) => {
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) return "Good morning";
        if (currentHour < 18) return "Good afternoon";
        return "Good evening";
    };

    const navigate = useNavigate();

    const navigateToDeposit = () => navigate("deposit");

    const navigateToTransfer = () => navigate("transfer");

    const content = (
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border-2 border-gray-800 p-5 md:space-y-0 space-y-5 rounded">
            <div className="greet text-white">
                <h2 className="font-medium md:text-2xl text-md">
                    {getGreeting()} {fullName}
                </h2>
                <p>At a glance summary of your account!</p>
            </div>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<MdOutlineArrowRightAlt />}
                    onClick={navigateToDeposit}
                >
                    Deposit
                </Button>
                <Button
                    variant="contained"
                    endIcon={<MdOutlineArrowRightAlt />}
                    sx={{ bgcolor: "gray" }}
                    onClick={navigateToTransfer}
                >
                    Transfer fund
                </Button>
            </Stack>
        </div>
    );
    return content;
};

export default FirstSection;
