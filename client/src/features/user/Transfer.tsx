import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    useGetRecpientAccountQuery,
    useTransferMutation,
} from "./userApiSlice";
import TransferForm from "../../components/userPages/TransferForm";

const TransferFunds = () => {
    const [amount, setAmount] = useState("");
    const [toAccountNumber, setToAccountNumber] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const [transfer, { isLoading: isTransferring }] = useTransferMutation();
    const {
        data: recipientData,
        error: recipientError,
        isLoading: isFetchingRecipient,
    } = useGetRecpientAccountQuery(toAccountNumber, { skip: !toAccountNumber });

    const handleAmountChange = (e: any) => setAmount(e.target.value);
    const handleToAccountNumberChange = (e: any) => {
        setToAccountNumber(e.target.value);
        setRecipientName("");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!amount || !toAccountNumber) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            await transfer({ amount, toAccountNumber }).unwrap();
            setError("");
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate("/dashboard");
            }, 2000);
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
        <div className="container mx-auto p-6 max-w-lg bg-gradient-to-br shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-900">
                Transfer Funds
            </h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <TransferForm
                handleSubmit={handleSubmit}
                toAccountNumber={toAccountNumber}
                handleToAccountNumberChange={handleToAccountNumberChange}
                isFetchingRecipient={isFetchingRecipient}
                recipientName={recipientName}
                handleAmountChange={handleAmountChange}
                isTransferring={isTransferring}
                amount={amount}
            />

            <div className="mt-4 text-gray-600 text-sm text-center">
                <p className="font-semibold">Important:</p>
                <p>Ensure the correct recipient account number and amount.</p>
                <p>Incorrect submissions may result in the loss of funds.</p>
            </div>

            {showModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs w-full text-center animate-fade-in">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-16 h-16 mx-auto text-green-500 animate-bounce"
                        >
                            <path
                                fill="#10B981"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.25 7.25l-6.25 6.25-3.25-3.25-1.5 1.5L10 17.5l7.75-7.75-1.5-1.5z"
                            />
                        </svg>
                        <p className="text-lg mt-4 text-green-600 font-semibold">
                            Transfer Successful!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransferFunds;
