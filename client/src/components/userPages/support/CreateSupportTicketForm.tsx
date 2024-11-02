import { Button } from "@mui/material";
import InputField from "../../common/InputField";
import { IoAlert } from "react-icons/io5";
import SupportTicketsTable from "./SupportTicketsTable";

const CreateSupportTicketForm = ({
    handleSubmit,
    handleOnChange,
    department,
    complaint,
}: any) => {
    const departmentOptions = [
        { label: "Customer Support", value: "customer_support" },
        { label: "Technical Support", value: "technical_support" },
        { label: "Billing", value: "billing" },
        { label: "Other", value: "other" },
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-lg shadow-lg text-white"
        >
            <div className="bg-gray-900">
                <div className="flex space-x-1 items-center bg-blue-700 px-3 py-3 mt-5">
                    <IoAlert />
                    <p>Create a support ticket</p>
                </div>
                <div className="p-6 space-y-4">
                    <InputField
                        value={department}
                        onChange={handleOnChange}
                        name="department"
                        type="select"
                        placeholder="Please Select Customer Service Department"
                        required
                        options={departmentOptions}
                    />
                    <InputField
                        value={complaint}
                        onChange={handleOnChange}
                        name="complaint"
                        type="textarea"
                        placeholder="Describe your complaint"
                        required
                    />

                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CreateSupportTicketForm;
