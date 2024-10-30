import Button from "@mui/material/Button";
const Support = () => {
    return (
        <div className="px-12 py-10 rounded-sm border border-gray-700 bg-gray-900">
            <div className="flex md:flex-row flex-col md:items-center items-start justify-between md:space-y-0 space-y-3">
                <div className="md:w-3/4 w-full text-white space-y-2">
                    <h3 className="text-2xl font-semibold">
                        We're here to help you!
                    </h3>
                    <p className="text-gray-600 font-semibold">
                        Ask a question or file a support ticket, manage requst,
                        report an issues. Our team support team will get back to
                        you by email
                    </p>
                </div>

                <Button variant="outlined" sx={{ textTransform: "capitalize" }}>
                    Get Support Now
                </Button>
            </div>
        </div>
    );
};

export default Support;
