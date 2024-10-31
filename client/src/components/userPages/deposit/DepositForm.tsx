import React from "react";

const DepositForm = ({ onClick }: any) => {
    const content = (
        <div className="container mx-auto p-6 max-w-md bg-gray-900 rounded-lg text-gray-300">
            <div className="p-4 rounded-md mb-6 space-y-1">
                <p className="text-2xl">Account Number:</p>
                <p className="text-md text-deepNavyBlue">1234567890</p>
                <p className="text-2xl mt-4">Bank Name:</p>
                <p className="text-md text-deepNavyBlue">XYZ Bank</p>
            </div>
            <button
                className="bg-text text-white py-2 px-4 rounded-md hover:bg-darkNavyBlue transition-colors duration-300"
                onClick={onClick}
            >
                I've made the transfer
            </button>
            <div className="mt-4 text-red-400 text-sm">
                <p className="font-semibold">Important:</p>
                <p>
                    Your account may be blocked if fraudulent activity is
                    detected.
                </p>
            </div>
        </div>
    );
    return content;
};

export default DepositForm;
