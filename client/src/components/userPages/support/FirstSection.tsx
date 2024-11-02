import Button from "@mui/material/Button";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const FirstSection = () => {
    const navigate = useNavigate();
    const navigateToTransfer = () => navigate("/user/dashboard/transfer");

    const content = (
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between border-2 border-gray-800 p-5 md:space-y-0 space-y-5 rounded">
            <div className="greet text-white">
                <h2 className="font-medium md:text-2xl text-md">
                    Customer care
                </h2>
                <p>
                    Our customer care representatives are always committed in
                    giving you the best banking experience
                </p>
            </div>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
