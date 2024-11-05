import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import {
    useReplySupportTicketsMutation,
    useFetchSupportTicketByIdQuery,
} from "../../features/admin/adminApiSlie";
import Alert from "../common/Alert";
import InputField from "../common/InputField";

const ReplySupportDialog = ({ open, onClose, ticketId }: any) => {
    const [reply, setReply] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const { data: ticketData, isLoading } =
        useFetchSupportTicketByIdQuery(ticketId);

    const ticket = ticketData?.supportTicket || {};

    const [replyToSupportTicket] = useReplySupportTicketsMutation();

    if (isLoading) return <p>Loading...</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await replyToSupportTicket({
                ticketId,
                reply,
            }).unwrap();
            setSuccessMessage("Reply sent successfully");
            setStatusType("success");
            setShowAlert(true);
            setReply("");
        } catch (e: any) {
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
                            onChange={(e) => setReply(e.target.value)}
                            name="reply"
                            type="text"
                            placeholder="Enter Reply"
                            disabled={true}
                            required
                        />
                        <InputField
                            label="Complaint"
                            value={ticket.complaint}
                            onChange={(e) => setReply(e.target.value)}
                            name="reply"
                            type="textarea"
                            placeholder="Enter Reply"
                            disabled={true}
                            required
                        />
                        <InputField
                            label="Reply"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
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
