import Button from "@mui/material/Button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Stack from "@mui/material/Stack";

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

    const content = (
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border-2 border-gray-800 p-5 md:space-y-0 space-y-5 rounded">
            <div className="greet text-white">
                <h2 className="font-medium md:text-3xl text-2xl">
                    {getGreeting()} {fullName}
                </h2>
                <p>At a glance summary of your account!</p>
            </div>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    endIcon={<MdOutlineArrowRightAlt />}
                >
                    Deposit
                </Button>
                <Button
                    variant="contained"
                    endIcon={<MdOutlineArrowRightAlt />}
                    sx={{ bgcolor: "gray" }}
                >
                    Transfer fund
                </Button>
            </Stack>
        </div>
    );
    return content;
};

export default FirstSection;
