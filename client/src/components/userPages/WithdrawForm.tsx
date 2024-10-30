import React from "react";
import Input from "../Input";

const WithdrawForm = ({ handleSubmit, onChange, formData, isTransferring }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <Input
                    name="accountName"
                    label="Account Name"
                    onChange={onChange}
                    value={formData.accountName}
                />
            </div>
            <div className="mb-4">
                <Input
                    name="accountNumber"
                    label="Account Number"
                    onChange={onChange}
                    value={formData.accountNumber}
                />
            </div>
            <div className="mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bank Name
                    </label>
                    <select
                        name="bankName"
                        value={formData.bankName}
                        onChange={onChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Bank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="First Bank">First Bank</option>
                        <option value="United Bank of Africa">
                            United Bank of Africa
                        </option>
                        <option value="Wema Bank">Wema Bank</option>
                        <option value="Keystone Bank">Keystone Bank</option>
                        <option value="GTB Bank">GTB Bank</option>
                        <option value="Fidelity Bank">Fidelity Bank</option>
                        <option value="FCMB Bank">FCMB Bank</option>
                    </select>
                </div>
            </div>
            <div className="mb-4">
                <Input
                    type="number"
                    name="amount"
                    label="Amount"
                    onChange={onChange}
                    value={formData.amount}
                />
            </div>
            <button
                type="submit"
                className="bg-deepNavyBlue hover:bg-darkNavyBlue text-white py-2 px-4 rounded-md transition-colors duration-300 w-full"
                disabled={isTransferring}
            >
                {isTransferring ? "Loading..." : "Submit"}
            </button>
        </form>
    );
};

export default WithdrawForm;
