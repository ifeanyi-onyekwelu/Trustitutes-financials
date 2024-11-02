import React, { useState } from "react";
import { useDepositMutation } from "../../../features/user/userApiSlice";
import Alert from "../../common/Alert";
import formatAmount from "../../../config/formatAmount";

const DepositForm = () => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState<number>(0);
    const [receipt, setReceipt] = useState<File | null>(null);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [statusType, setStatusType] = useState<"error" | "success">("error");
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const [deposit, { isLoading }] = useDepositMutation();

    const handleNextStep = () => {
        if (step === 1 && amount) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setReceipt(file);
            setErrorMessage("");
        } else {
            setReceipt(null);
            setErrorMessage("Only PDF files are allowed");
            setShowAlert(true);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!receipt) {
            setErrorMessage("Please upload a PDF receipt");
            setShowAlert(true);
            return;
        }

        try {
            const response = await deposit({ amount });
            console.log(response);
            setSuccessMessage("Deposit Successful");
            setStatusType("success");
            setShowAlert(true);

            setTimeout(() => {
                location.href = "/user/dashboard";
            }, 3000);
        } catch (error: any) {
            setErrorMessage(error.data.message || "Deposit Failed");
            setStatusType("error");
            setShowAlert(true);
        }
    };

    return (
        <div className="container mx-auto p-6 w-full md:max-w-md bg-gray-900 rounded-lg text-gray-300">
            {step === 1 && (
                // Step 1: Enter Deposit Amount
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Deposit Amount</h2>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        placeholder="Enter amount"
                        className="w-full p-3 rounded-md bg-gray-800 text-gray-300"
                    />
                    <button
                        onClick={handleNextStep}
                        disabled={!amount}
                        className="bg-text text-white py-2 px-4 rounded-md hover:bg-darkNavyBlue transition-colors duration-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {step === 2 && (
                // Step 2: Show Account Details
                <div className="space-y-6">
                    <div className="p-4 rounded-md">
                        <h2 className="text-2xl font-semibold">
                            Send Only This Amount:
                        </h2>
                        <p className="text-md text-deepNavyBlue mt-1">
                            ${formatAmount(amount)}
                        </p>
                        <div className="mt-6">
                            <p className="text-xl">Account Number:</p>
                            <p className="text-md text-deepNavyBlue">
                                1234567890
                            </p>
                        </div>
                        <div className="mt-4">
                            <p className="text-xl">Bank Name:</p>
                            <p className="text-md text-deepNavyBlue">
                                XYZ Bank
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleNextStep}
                        className="bg-text text-white py-2 px-4 rounded-md hover:bg-darkNavyBlue transition-colors duration-300"
                    >
                        Next
                    </button>
                    <div className="mt-4 text-red-400 text-sm">
                        <p className="font-semibold">Important:</p>
                        <p>
                            Your account may be blocked if fraudulent activity
                            is detected.
                        </p>
                    </div>
                </div>
            )}

            {step === 3 && (
                // Step 3: Upload Receipt
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold">Upload Receipt</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Please upload a PDF file as proof of your transaction.
                    </p>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="w-full text-gray-300"
                    />
                    <button
                        onClick={onSubmit}
                        className="bg-text text-white py-2 px-4 rounded-md hover:bg-darkNavyBlue transition-colors duration-300 mt-4"
                        disabled={isLoading || !receipt}
                    >
                        Submit
                    </button>
                </div>
            )}

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

export default DepositForm;
