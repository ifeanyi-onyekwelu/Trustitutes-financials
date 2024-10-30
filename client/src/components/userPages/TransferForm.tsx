import React from "react";
import InputField from "../common/InputField";
import { Button } from "@mui/material";

const TransferForm = ({
    handleSubmit,
    toAccountNumber,
    handleToAccountNumberChange,
    isFetchingRecipient,
    recipientName,
    handleAmountChange,
    amount,
}: any) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                label="Recipient Account Number"
                value={toAccountNumber}
                onChange={handleToAccountNumberChange}
                type="number"
                placeholder="Account Number"
                required
                extraInfo={
                    isFetchingRecipient && toAccountNumber.length >= 10 ? (
                        <p className="text-blue-500">Checking account...</p>
                    ) : recipientName && toAccountNumber.length >= 10 ? (
                        <p className="bg-gray-900 text-gray-400 p-2 rounded-lg font-black">
                            Account Holder: {recipientName}
                        </p>
                    ) : toAccountNumber.length >= 10 && !isFetchingRecipient ? (
                        <p className="bg-gray-900 text-red-700 p-2 rounded-lg font-black">
                            Account not found.
                        </p>
                    ) : null
                }
            />

            <InputField
                label="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
                type="number"
                placeholder="Enter Amount"
                required
            />

            <Button variant="contained" type="submit">
                Submit
            </Button>
        </form>
    );
};

export default TransferForm;
