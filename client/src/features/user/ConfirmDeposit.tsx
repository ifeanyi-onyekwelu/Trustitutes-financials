import React, { useState, useRef } from "react";
import pdfToText from "react-pdftotext";
import { useDepositMutation } from "./userApiSlice";
import DepositConfirmationForm from "../../components/userPages/deposit/DepositConfirmationForm";

const ConfirmTransfer = () => {
    const [file, setFile] = useState(null);
    const [deposit, { isError, isLoading }] = useDepositMutation();
    const [amountFromForm, setAmountFromForm] = useState(0);
    const [amountFromPDF, setAmountFromPDF] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const errorRef = useRef<HTMLDivElement>(null);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleAmountChange = (e: any) => {
        setAmountFromForm(e.target.value);
    };

    const extractText = async (e: any) => {
        const file = e.target.files[0];
        try {
            const text = await pdfToText(file);
            const extractedAmount = extractAmountFromText(text);
            setAmountFromPDF(extractedAmount!);
        } catch (error) {
            setErrorMsg("Failed to extract amount from the PDF.");
        }
    };

    const extractAmountFromText = (text: any) => {
        const regex = /\$\s*(\d+(\.\d{1,2})?)/;
        const match = text.match(regex);
        return match ? parseFloat(match[1]) : null;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!file) {
            setErrorMsg("Please upload a payment receipt.");
            return;
        }

        if (amountFromForm !== amountFromPDF) {
            setErrorMsg(
                "Entered amount does not match the amount in the receipt."
            );
            return;
        }

        try {
            const formData = new FormData();
            formData.append("amount", amountFromForm.toString());
            formData.append("receipt", file);

            await deposit(formData).unwrap();
        } catch (err: any) {
            setErrorMsg(
                err?.data?.message || "An error occurred. Please try again."
            );
            errorRef.current?.focus();
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-lg bg-white border border-gray-300 rounded-lg">
            <h1 className="text-3xl font-semibold mb-6">
                Upload Payment Receipt
            </h1>
            <DepositConfirmationForm
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                extractText={extractText}
                amountFromForm={amountFromForm}
                handleAmountChange={handleAmountChange}
                isLoading={isLoading}
                isError={isError}
                errorMsg={errorMsg}
            />
            {errorMsg && (
                <div ref={errorRef} className="mt-4 text-red-600 text-sm">
                    {errorMsg}
                </div>
            )}
            <div className="mt-6 text-gray-600 text-sm">
                <p className="font-semibold">Important:</p>
                <p>
                    Ensure you input the correct amount and submit the original
                    receipt.
                </p>
                <p>Incorrect submissions may result in account restrictions.</p>
            </div>
        </div>
    );
};

export default ConfirmTransfer;
