import React, { useState, useEffect } from "react";
import { useGetRecpientAccountQuery } from "./userApiSlice";
import TransferForm from "../../components/userPages/TransferForm";
import TransferFailed from "../../components/common/Dialog/TransferFailed";

const TransferFunds = () => {
    const [amount, setAmount] = useState("");
    const [toAccountNumber, setToAccountNumber] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const {
        data: recipientData,
        error: recipientError,
        isLoading: isFetchingRecipient,
    } = useGetRecpientAccountQuery(toAccountNumber, { skip: !toAccountNumber });

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setAmount(e.target.value);
    const handleToAccountNumberChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setToAccountNumber(e.target.value);
        setRecipientName("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !toAccountNumber) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            setShowModal(true);
        } catch (error: any) {
            setError(error.data.message);
        }
    };

    useEffect(() => {
        if (recipientData?.success) {
            setRecipientName(
                `${recipientData.user.firstName} ${recipientData.user.lastName}`
            );
        } else if (recipientError || !toAccountNumber) {
            setRecipientName("");
        }
    }, [recipientData, recipientError, toAccountNumber]);

    return (
        <div className="container mx-auto p-6 w-full rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
                Send Fund
            </h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <TransferForm
                handleSubmit={handleSubmit}
                toAccountNumber={toAccountNumber}
                handleToAccountNumberChange={handleToAccountNumberChange}
                isFetchingRecipient={isFetchingRecipient}
                recipientName={recipientName}
                handleAmountChange={handleAmountChange}
                amount={amount}
            />

            <div className="mt-4 text-gray-500 text-sm text-center">
                <p className="font-semibold">Important:</p>
                <p>Ensure the correct recipient account number and amount.</p>
                <p>Incorrect submissions may result in the loss of funds.</p>
            </div>

            <TransferFailed
                open={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default TransferFunds;
