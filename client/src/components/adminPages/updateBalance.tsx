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
    useUpdateUserBalanceMutation,
    useFetchAccountQuery,
} from "../../features/admin/adminApiSlie";
import Alert from "../common/Alert";

const UpdateBalanceModal = ({ open, onClose, accountId }: any) => {
    const [formData, setFormData] = useState({
        amount: "",
        operation: "add",
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

    const [updateBalance, { isLoading }] = useUpdateUserBalanceMutation();
    const { data: accountData, isLoading: accountLoading } =
        useFetchAccountQuery(accountId);

    const account = accountData?.account || {};

    if (accountLoading) return <p>Loading...</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await updateBalance({
                accountId,
                data: formData,
            }).unwrap();
            setSuccessMessage("User balance updated successful");
            setStatusType("success");
            setShowAlert(true);

            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (e: any) {
            console.error("Error:", e);
            setErrorMessage(e.data.message || "Balance update Failed");
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
                    Update Balance
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
                            label="Full Name"
                            value={`${account?.user?.firstName} ${account?.user?.lastName}`}
                            onChange={handleInputChange}
                            name="user"
                            type="string"
                            disabled={true}
                        />
                        <InputField
                            label="Operation"
                            value={formData.operation}
                            onChange={handleInputChange}
                            name="operation"
                            type="select"
                            required
                            placeholder="Select an op"
                            options={[
                                {
                                    value: "add",
                                    label: "Add",
                                },
                                {
                                    value: "remove",
                                    label: "Remove",
                                },
                            ]}
                        />
                        <InputField
                            label="Amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            name="amount"
                            type="number"
                            placeholder="Enter Amount"
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
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Update Balance"}
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

export default UpdateBalanceModal;
