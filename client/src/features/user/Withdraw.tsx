import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWithdrawMutation } from "./userApiSlice";
import { useQueryClient } from "react-query";
import Input from "../../components/Input";
import WithdrawForm from "../../components/userPages/WithdrawForm";

interface FormData {
    amount: number;
    accountNumber: string;
    accountName: string;
    bankName: string;
}

const Withdraw = () => {
    const [formData, setFormData] = useState<FormData>({
        amount: 0,
        accountName: "",
        accountNumber: "",
        bankName: "",
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [withdraw, { isLoading: isTransferring }] = useWithdrawMutation();

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (
            !formData.accountName ||
            !formData.accountNumber ||
            !formData.amount ||
            !formData.bankName
        ) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await withdraw(formData).unwrap();

            queryClient.invalidateQueries("userAccount");
            queryClient.invalidateQueries("userTransactions");

            setFormData({
                amount: 0,
                accountName: "",
                accountNumber: "",
                bankName: "",
            });
        } catch (error: any) {
            console.error("Error requesting withdraw:", error);
            setError(error.data.message);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-deepNavyBlue">
                Withdraw Funds
            </h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <WithdrawForm
                handleSubmit={handleSubmit}
                onChange={onChange}
                formData={formData}
                isTransferring={isTransferring}
            />
            <div className="mt-4 text-red-600 text-sm">
                <p className="font-semibold">Important:</p>
                <p>Ensure you input the correct account details and amount.</p>
                <p>Incorrect submissions may result in the loss of funds.</p>
            </div>
        </div>
    );
};

export default Withdraw;
