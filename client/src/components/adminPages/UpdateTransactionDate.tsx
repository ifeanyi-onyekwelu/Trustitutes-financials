import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import InputField from "../common/InputField";
import {
    useFetchTransactionByIdQuery,
    useUpdateTransactionDateMutation,
} from "../../features/admin/adminApiSlie";
import Alert from "../common/Alert";

const UpdateTransactionDate = ({ open, onClose, transactionId }: any) => {
    const [formData, setFormData] = useState({
        date: new Date().toISOString().slice(0, 10), // Default to current date in YYYY-MM-DD format
    });
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const { data: transactionData, isLoading: transactionLoading } =
        useFetchTransactionByIdQuery(transactionId);

    const [updateTransactionDate] = useUpdateTransactionDateMutation();

    if (transactionLoading) return <p>Loading...</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await updateTransactionDate({
                transactionId,
                data: formData,
            }).unwrap();
            console.log(response);
            setSuccessMessage("Transaction date updated successfully");
            setStatusType("success");
            setShowAlert(true);
        } catch (e: any) {
            setErrorMessage(e.data.message || "Date update failed");
            setStatusType("error");
            setShowAlert(true);
        }

        onClose();
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
                    Update Transaction Date
                </DialogTitle>
                <form onSubmit={handleSubmit} className="bg-dashboard p-5">
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexFlow: "column",
                            gap: "20px",
                        }}
                    >
                        <InputField
                            label="Transaction Date"
                            value={formData.date}
                            onChange={handleInputChange}
                            name="date"
                            type="date"
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onClose}
                            color="primary"
                            variant="outlined"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Update Date
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

export default UpdateTransactionDate;
