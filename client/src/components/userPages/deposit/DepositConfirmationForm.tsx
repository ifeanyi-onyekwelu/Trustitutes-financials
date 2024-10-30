import React from "react";
import Input from "../../Input";

const DepositConfirmationForm = ({
    handleSubmit,
    handleFileChange,
    extractText,
    amountFromForm,
    handleAmountChange,
    isLoading,
    isError,
    errorMsg,
}: any) => (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label className="block text-gray-700 font-medium mb-2">
                Upload Receipt (PDF):
            </label>
            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                    handleFileChange(e);
                    extractText(e);
                }}
                className="block w-full text-gray-700 p-2 border border-gray-300 rounded-md"
            />
        </div>

        <Input
            label="Amount"
            name="amount"
            value={amountFromForm}
            onChange={handleAmountChange}
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
        />

        {/* Submit Button */}
        <button
            type="submit"
            className="w-full py-2 px-4 bg-text text-white rounded-md font-semibold transition duration-200"
            disabled={isLoading}
        >
            {isLoading ? "Processing..." : "Confirm"}
        </button>

        {/* Error Message */}
        {isError && errorMsg && (
            <p className="mt-4 text-red-600 text-sm">{errorMsg}</p>
        )}
    </form>
);

export default DepositConfirmationForm;
