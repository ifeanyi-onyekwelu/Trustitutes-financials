import React from "react";

const DepositForm = ({ onClick }: any) => {
    const content = (
        <div className="container mx-auto p-6 max-w-md bg-white rounded-lg">
            <div className="bg-gray-100 p-4 rounded-md mb-6">
                <p className="text-lg">Company Account Number:</p>
                <p className="text-xl font-semibold text-deepNavyBlue">
                    1234567890
                </p>
                <p className="text-lg mt-4">Bank Name:</p>
                <p className="text-xl font-semibold text-deepNavyBlue">
                    XYZ Bank
                </p>
            </div>
            <button
                className="bg-text text-white py-2 px-4 rounded-md hover:bg-darkNavyBlue transition-colors duration-300"
                onClick={onClick}
            >
                I've made the transfer
            </button>
            <div className="mt-4 text-red-600 text-sm">
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
