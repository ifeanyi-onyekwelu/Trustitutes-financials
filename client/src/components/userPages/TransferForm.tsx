import React from "react";

const TransferForm = ({
    handleSubmit,
    toAccountNumber,
    handleToAccountNumberChange,
    isFetchingRecipient,
    recipientName,
    handleAmountChange,
    isTransferring,
    amount,
}: any) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Recipient Account Number
                </label>
                <input
                    type="number"
                    value={toAccountNumber}
                    onChange={handleToAccountNumberChange}
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    required
                    placeholder="Account Number"
                />
                {isFetchingRecipient && toAccountNumber.length >= 10 && (
                    <p className="text-blue-500 mt-1">Checking account...</p>
                )}
                {recipientName &&
                    !isFetchingRecipient &&
                    toAccountNumber.length >= 10 && (
                        <p className="bg-blue-100 text-blue-700 p-2 mt-2 rounded-lg font-medium">
                            Account Holder: {recipientName}
                        </p>
                    )}
                {!recipientName &&
                    toAccountNumber &&
                    toAccountNumber.length >= 10 &&
                    !isFetchingRecipient && (
                        <p className="text-red-500 mt-1">Account not found.</p>
                    )}
            </div>
            <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Enter Amount
                </label>
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full py-2 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
                disabled={isTransferring}
            >
                {isTransferring ? "Transferring..." : "Submit"}
            </button>
        </form>
    );
};

export default TransferForm;
