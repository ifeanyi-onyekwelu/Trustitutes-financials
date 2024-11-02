import React, { useState, useEffect } from "react";
import {
    useGetRecpientAccountQuery,
    useTransferMutation,
} from "./userApiSlice";
import TransferForm from "../../components/userPages/TransferForm";
import Alert from "../../components/common/Alert";

const TransferFunds = () => {
    const [formData, setFormData] = useState({
        toAccountNumber: "",
        recipientName: "",
        amount: "",
        transferType: "account", // Default to "account" for regular transfer
        wireDetails: {
            bankName: "",
            swiftCode: "",
            routingNumber: "",
            recipientAddress: "",
        },
    });

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const {
        data: recipientData,
        error: recipientError,
        isLoading: isFetchingRecipient,
    } = useGetRecpientAccountQuery(formData.toAccountNumber, {
        skip: !formData.toAccountNumber,
    });

    const [transfer, { isLoading: transferLoading }] = useTransferMutation();

    const handleOnChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name in formData.wireDetails) {
            // Update wire details if the field is within wireDetails
            setFormData((prevState) => ({
                ...prevState,
                wireDetails: {
                    ...prevState.wireDetails,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await transfer(formData).unwrap();
            setSuccessMessage("Transfer Successful");
            setStatusType("success");
            setShowAlert(true);

            setTimeout(() => {
                location.href = "/user/dashboard/transfer";
            }, 3000);
        } catch (error: any) {
            setErrorMessage(error.data.message || "Transfer Failed");
            setStatusType("error");
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (recipientData?.success) {
            setFormData((prevState) => ({
                ...prevState,
                recipientName: `${recipientData.user.firstName} ${recipientData.user.lastName}`,
            }));
        } else if (recipientError || !formData.toAccountNumber) {
            setFormData((prevState) => ({
                ...prevState,
                recipientName: "",
            }));
        }
    }, [recipientData, recipientError, formData.toAccountNumber]);

    return (
        <div className="container mx-auto p-1 w-full">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
                Send Fund
            </h1>

            <TransferForm
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}
                toAccountNumber={formData.toAccountNumber}
                isFetchingRecipient={isFetchingRecipient}
                recipientName={formData.recipientName}
                amount={formData.amount}
                transferType={formData.transferType}
                wireDetails={formData.wireDetails}
            />

            <div className="mt-4 text-gray-500 text-sm text-center">
                <p className="font-semibold">Important:</p>
                <p>Ensure the correct recipient account number and amount.</p>
                <p>Incorrect submissions may result in the loss of funds.</p>
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
        </div>
    );
};

export default TransferFunds;
