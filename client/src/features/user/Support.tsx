import CreateSupportTicketForm from "../../components/userPages/support/CreateSupportTicketForm";
import FirstSection from "../../components/userPages/support/FirstSection";
import { useState } from "react";
import Alert from "../../components/common/Alert";
import { IoAlert } from "react-icons/io5";
import SupportTicketsTable from "../../components/userPages/support/SupportTicketsTable";
import {
    useCreateSupportTicketMutation,
    useGetAllSupportTicketQuery,
} from "./userApiSlice";

const Support = () => {
    const [formData, setFormData] = useState({
        department: "",
        complaint: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [createSupportTicket, { isLoading }] =
        useCreateSupportTicketMutation();

    const { data: supportTicketData } =
        useGetAllSupportTicketQuery("supportTicket");

    const supportTickets = supportTicketData?.supportTickets || [];
    console.log(supportTickets);

    const handleOnChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createSupportTicket(formData).unwrap();
            console.log(response);
            setSuccessMessage("Support ticket created successfully!");
            setStatusType("success");
            setShowAlert(true);
        } catch (error: any) {
            setErrorMessage(
                error.data.message || "Failed to create support ticket"
            );
            setStatusType("error");
            setShowAlert(true);
        }
    };

    return (
        <>
            <FirstSection />
            <CreateSupportTicketForm
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}
                department={formData.department}
                complaint={formData.complaint}
            />

            <div className="bg-gray-900">
                <div className="flex space-x-1 items-center bg-blue-700 px-3 py-3 mt-5">
                    <IoAlert />
                    <p>Previous support tickets</p>
                </div>
                <div className="p-6 space-y-4">
                    <SupportTicketsTable supportTickets={supportTickets} />
                </div>
            </div>

            {showAlert && (
                <Alert
                    successMessage={successMessage}
                    errorMessage={errorMessage}
                    statusType={statusType}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            )}
        </>
    );
};

export default Support;
