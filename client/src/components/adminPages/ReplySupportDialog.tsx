import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import {
    useReplySupportTicketMutation,
    useFetchSupportTicketByIdQuery,
} from "../../features/admin/adminApiSlie";
import Alert from "../common/Alert";
import InputField from "../common/InputField";

const ReplySupportDialog = ({ open, onClose, ticketId }: any) => {
    const [formData, setFormData] = useState({
        reply: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const { data: ticketData, isLoading } =
        useFetchSupportTicketByIdQuery(ticketId);

    const ticket = ticketData?.supportTicket || {};

    const [replyToSupportTicket] = useReplySupportTicketMutation();

    if (isLoading) return <p>Loading...</p>;

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await replyToSupportTicket({
                ticketId,
                data: formData,
            });
            console.log(response);
            setSuccessMessage("Reply sent successfully");
            setStatusType("success");
            setShowAlert(true);
        } catch (e: any) {
            console.log(e);
            setErrorMessage(e.data.message || "Reply failed");
            setStatusType("error");
            setShowAlert(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        bgcolor: "#0A0F2C",
                        color: "white",
                        padding: "20px 40px 0",
                        fontSize: "30px",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Reply to Support Ticket
                </DialogTitle>
                <form onSubmit={handleSubmit} className="bg-dashboard p-5">
                    <DialogContent>
                        <InputField
                            label="Department"
                            value={ticket.department}
                            onChange={handleInputChange}
                            name="department"
                            type="text"
                            placeholder="Enter Reply"
                            disabled={true}
                            required
                        />
                        <InputField
                            label="Complaint"
                            value={ticket.complaint}
                            onChange={handleInputChange}
                            name="complain"
                            type="textarea"
                            placeholder="Enter Reply"
                            disabled={true}
                            required
                        />
                        <InputField
                            label="Reply"
                            value={formData.reply}
                            onChange={handleInputChange}
                            name="reply"
                            type="text"
                            placeholder="Enter Reply"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Send Reply
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

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

export default ReplySupportDialog;
